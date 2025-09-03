import { useState, useEffect, useCallback } from 'react';
import { ApiClient } from '../services/api';
import {
  ExerciseFilters,
  WorkoutResponse,
  WorkoutFilters,
  WorkoutCreate,
  ApiState
} from '../types/api';
import { useNotifications } from '../contexts/AppContext';

// Generic API hook for any API call
export function useApiCall<T>(
  apiFunction: () => Promise<T>,
  dependencies: any[] = [],
  options: {
    immediate?: boolean;
    onSuccess?: (data: T) => void;
    onError?: (error: string) => void;
    showErrorNotification?: boolean;
  } = {}
): ApiState<T> & { refetch: () => Promise<void> } {
  const [data, setData] = useState<T | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const { addNotification } = useNotifications();

  const {
    immediate = true,
    onSuccess,
    onError,
    showErrorNotification = false
  } = options;

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(undefined);
      const result = await apiFunction();
      setData(result);
      onSuccess?.(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      setData(undefined);

      if (showErrorNotification) {
        addNotification({
          type: 'error',
          title: 'Error',
          message: errorMessage
        });
      }

      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [apiFunction, onSuccess, onError, showErrorNotification, addNotification]);

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [immediate, fetchData]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchData
  };
}

// User-specific hooks
export function useCurrentUser() {
  return useApiCall(() => ApiClient.getCurrentUser(), [], {
    showErrorNotification: true
  });
}

export function useUserStats() {
  return useApiCall(() => ApiClient.getUserStats(), [], {
    showErrorNotification: true
  });
}

// Exercise-specific hooks
export function useExercises(filters?: ExerciseFilters) {
  return useApiCall(
    () => ApiClient.getExercises(filters),
    [filters],
    {
      showErrorNotification: true
    }
  );
}

export function useExercise(exerciseId: string) {
  return useApiCall(
    () => ApiClient.getExercise(exerciseId),
    [exerciseId],
    {
      showErrorNotification: true
    }
  );
}

// Workout-specific hooks
export function useWorkouts(filters?: WorkoutFilters) {
  return useApiCall(
    () => ApiClient.getWorkouts(filters),
    [filters],
    {
      showErrorNotification: true
    }
  );
}

export function useWorkout(workoutId: string) {
  return useApiCall(
    () => ApiClient.getWorkout(workoutId),
    [workoutId],
    {
      showErrorNotification: true
    }
  );
}

export function useWorkoutTemplates() {
  return useApiCall(() => ApiClient.getWorkoutTemplates(), [], {
    showErrorNotification: true
  });
}

// Mutation hooks for create/update/delete operations
export function useCreateWorkout() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const { addNotification } = useNotifications();

  const createWorkout = useCallback(async (workoutData: WorkoutCreate): Promise<WorkoutResponse | null> => {
    try {
      setIsLoading(true);
      setError(undefined);

      const result = await ApiClient.createWorkout(workoutData);

      addNotification({
        type: 'success',
        title: 'Success',
        message: `Workout "${workoutData.name}" created successfully!`
      });

      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create workout';
      setError(errorMessage);

      addNotification({
        type: 'error',
        title: 'Error',
        message: errorMessage
      });

      return null;
    } finally {
      setIsLoading(false);
    }
  }, [addNotification]);

  return {
    createWorkout,
    isLoading,
    error
  };
}

export function useDeleteWorkout() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const { addNotification } = useNotifications();

  const deleteWorkout = useCallback(async (workoutId: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(undefined);

      await ApiClient.deleteWorkout(workoutId);

      addNotification({
        type: 'success',
        title: 'Success',
        message: 'Workout deleted successfully!'
      });

      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete workout';
      setError(errorMessage);

      addNotification({
        type: 'error',
        title: 'Error',
        message: errorMessage
      });

      return false;
    } finally {
      setIsLoading(false);
    }
  }, [addNotification]);

  return {
    deleteWorkout,
    isLoading,
    error
  };
}

// Hook for API health check
export function useHealthCheck() {
  return useApiCall(() => ApiClient.healthCheck(), [], {
    immediate: false // Don't run immediately, call manually when needed
  });
}

// Hook for combined user data (user + stats)
export function useUserData() {
  const userQuery = useCurrentUser();
  const statsQuery = useUserStats();

  return {
    user: userQuery.data,
    stats: statsQuery.data,
    isLoading: userQuery.isLoading || statsQuery.isLoading,
    error: userQuery.error || statsQuery.error,
    refetch: useCallback(async () => {
      await Promise.all([userQuery.refetch(), statsQuery.refetch()]);
    }, [userQuery, statsQuery])
  };
}
