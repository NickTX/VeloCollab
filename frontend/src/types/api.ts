// TypeScript interfaces matching backend Pydantic schemas

export interface User {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
  created_at: string;
  total_workouts: number;
  current_streak: number;
}

export interface Exercise {
  id: string;
  name: string;
  category: string;
  muscle_groups: string[];
  equipment?: string;
  instructions?: string;
  is_custom: boolean;
  created_by?: string;
}

export interface WorkoutExerciseSet {
  set_number: number;
  reps?: number;
  weight?: number;
  time_seconds?: number;
  distance?: number;
  rest_seconds?: number;
  notes?: string;
  completed: boolean;
}

export interface WorkoutExercise {
  exercise: Exercise;
  sets: WorkoutExerciseSet[];
  notes?: string;
}

export interface WorkoutSummary {
  id: string;
  name: string;
  started_at: string;
  completed_at?: string;
  duration_seconds?: number;
  exercise_count: number;
  status: string;
}

export interface WorkoutResponse {
  id: string;
  user_id: string;
  name: string;
  notes?: string;
  started_at: string;
  completed_at?: string;
  duration_seconds?: number;
  exercises: WorkoutExercise[];
  is_template: boolean;
  status: string;
}

export interface WorkoutCreate {
  name: string;
  notes?: string;
  template_id?: string;
}

export interface UserStats {
  total_workouts: number;
  current_streak: number;
  longest_streak: number;
  total_duration_hours: number;
  favorite_exercises: Array<{
    name: string;
    count: number;
  }>;
  recent_prs: Array<{
    exercise: string;
    value: string;
    date: string;
  }>;
}

export interface APIResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface ErrorResponse {
  success: false;
  error: string;
  details?: Record<string, any>;
}

// API Filter and Query Parameters
export interface ExerciseFilters {
  category?: string;
  muscle_group?: string;
  search?: string;
  include_custom?: boolean;
}

export interface WorkoutFilters {
  status?: string;
  include_templates?: boolean;
  limit?: number;
}

// UI State Types
export interface LoadingState {
  isLoading: boolean;
  error?: string;
}

export interface ApiState<T> extends LoadingState {
  data?: T;
  lastFetched?: Date;
}

// API Endpoints enum for type safety
export enum ApiEndpoints {
  USERS_ME = '/api/users/me',
  USERS_ME_STATS = '/api/users/me/stats',
  EXERCISES = '/api/exercises',
  EXERCISES_BY_ID = '/api/exercises',
  WORKOUTS = '/api/workouts',
  WORKOUTS_BY_ID = '/api/workouts',
  WORKOUT_TEMPLATES = '/api/workout-templates',
}
