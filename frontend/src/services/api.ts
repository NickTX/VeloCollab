import React from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import {
  User,
  UserStats,
  Exercise,
  ExerciseFilters,
  WorkoutSummary,
  WorkoutResponse,
  WorkoutCreate,
  WorkoutFilters,
  ApiEndpoints
} from '../types/api';

// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const API_TIMEOUT = 10000; // 10 seconds

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    console.error('API Error:', error);

    // Handle network errors
    if (!error.response) {
      throw new Error('Network error - please check your connection');
    }

    // Handle HTTP error responses
    const { status, data } = error.response;
    const errorData = data as any; // Type assertion for error response

    switch (status) {
      case 400:
        throw new Error(errorData?.error || 'Bad request');
      case 401:
        throw new Error('Authentication required');
      case 403:
        throw new Error('Access forbidden');
      case 404:
        throw new Error('Resource not found');
      case 500:
        throw new Error('Server error - please try again later');
      case 503:
        throw new Error('Service unavailable - please try again later');
      default:
        throw new Error(errorData?.error || `Request failed with status ${status}`);
    }
  }
);

// Utility function to build query parameters
const buildQueryParams = (params: Record<string, any>): string => {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      queryParams.append(key, String(value));
    }
  });

  const queryString = queryParams.toString();
  return queryString ? `?${queryString}` : '';
};

// API Client Class
export class ApiClient {
  // Health check endpoint
  static async healthCheck(): Promise<{ status: string; version: string; timestamp: string }> {
    const response = await apiClient.get('/health');
    return response.data;
  }

  // User endpoints
  static async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<User>(ApiEndpoints.USERS_ME);
    return response.data;
  }

  static async getUserStats(): Promise<UserStats> {
    const response = await apiClient.get<UserStats>(ApiEndpoints.USERS_ME_STATS);
    return response.data;
  }

  // Exercise endpoints
  static async getExercises(filters?: ExerciseFilters): Promise<Exercise[]> {
    const queryParams = filters ? buildQueryParams(filters) : '';
    const response = await apiClient.get<Exercise[]>(`${ApiEndpoints.EXERCISES}${queryParams}`);
    return response.data;
  }

  static async getExercise(exerciseId: string): Promise<Exercise> {
    const response = await apiClient.get<Exercise>(`${ApiEndpoints.EXERCISES_BY_ID}/${exerciseId}`);
    return response.data;
  }

  // Workout endpoints
  static async getWorkouts(filters?: WorkoutFilters): Promise<WorkoutSummary[]> {
    const queryParams = filters ? buildQueryParams(filters) : '';
    const response = await apiClient.get<WorkoutSummary[]>(`${ApiEndpoints.WORKOUTS}${queryParams}`);
    return response.data;
  }

  static async getWorkout(workoutId: string): Promise<WorkoutResponse> {
    const response = await apiClient.get<WorkoutResponse>(`${ApiEndpoints.WORKOUTS_BY_ID}/${workoutId}`);
    return response.data;
  }

  static async createWorkout(workoutData: WorkoutCreate): Promise<WorkoutResponse> {
    const response = await apiClient.post<WorkoutResponse>(ApiEndpoints.WORKOUTS, workoutData);
    return response.data;
  }

  static async updateWorkout(workoutId: string, workoutData: Partial<WorkoutCreate>): Promise<WorkoutResponse> {
    const response = await apiClient.put<WorkoutResponse>(`${ApiEndpoints.WORKOUTS_BY_ID}/${workoutId}`, workoutData);
    return response.data;
  }

  static async deleteWorkout(workoutId: string): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.delete(`${ApiEndpoints.WORKOUTS_BY_ID}/${workoutId}`);
    return response.data;
  }

  // Workout template endpoints
  static async getWorkoutTemplates(): Promise<WorkoutSummary[]> {
    const response = await apiClient.get<WorkoutSummary[]>(ApiEndpoints.WORKOUT_TEMPLATES);
    return response.data;
  }
}

// React Hook for API calls with loading and error states
export const useApiCall = <T>(
  apiFunction: () => Promise<T>,
  dependencies: any[] = []
) => {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchData = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setData(null);
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiFunction]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
};

// Export the axios instance for advanced usage if needed
export { apiClient };

// Helper functions for common operations
export const ApiHelpers = {
  // Format duration from seconds to human readable
  formatDuration: (seconds?: number): string => {
    if (!seconds) return '0m';

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  },

  // Format date string to user-friendly format
  formatDate: (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  },

  // Format datetime string to user-friendly format
  formatDateTime: (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  },

  // Check if workout is currently active
  isWorkoutActive: (workout: WorkoutSummary | WorkoutResponse): boolean => {
    return workout.status === 'in_progress';
  },

  // Calculate workout completion percentage
  getWorkoutCompletionPercentage: (workout: WorkoutResponse): number => {
    if (workout.exercises.length === 0) return 0;

    let totalSets = 0;
    let completedSets = 0;

    workout.exercises.forEach(exercise => {
      totalSets += exercise.sets.length;
      completedSets += exercise.sets.filter(set => set.completed).length;
    });

    return totalSets > 0 ? Math.round((completedSets / totalSets) * 100) : 0;
  },
};

export default ApiClient;
