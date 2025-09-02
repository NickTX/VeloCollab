from datetime import datetime
from typing import Any

from pydantic import BaseModel, Field


class UserBase(BaseModel):
    """Base user model"""

    name: str = Field(..., min_length=1, max_length=100)
    email: str = Field(..., pattern=r"^[^@]+@[^@]+\.[^@]+$")


class User(UserBase):
    """Complete user model for API responses"""

    id: str
    avatar_url: str | None = None
    created_at: datetime
    total_workouts: int = 0
    current_streak: int = 0

    class Config:
        from_attributes = True


class ExerciseBase(BaseModel):
    """Base exercise model"""

    name: str = Field(..., min_length=1, max_length=100)
    category: str = Field(..., description="strength, cardio, plyometric, flexibility")
    muscle_groups: list[str] = Field(default_factory=list)
    equipment: str | None = None
    instructions: str | None = None


class Exercise(ExerciseBase):
    """Complete exercise model for API responses"""

    id: str
    is_custom: bool = False
    created_by: str | None = None

    class Config:
        from_attributes = True


class WorkoutExerciseSet(BaseModel):
    """Individual set within an exercise"""

    set_number: int = Field(..., ge=1)
    reps: int | None = Field(None, ge=0)
    weight: float | None = Field(None, ge=0)
    time_seconds: float | None = Field(None, ge=0)
    distance: float | None = Field(None, ge=0)
    rest_seconds: int | None = Field(None, ge=0)
    notes: str | None = None
    completed: bool = False


class WorkoutExercise(BaseModel):
    """Exercise within a workout with its sets"""

    exercise: Exercise
    sets: list[WorkoutExerciseSet] = Field(default_factory=list)
    notes: str | None = None


class WorkoutBase(BaseModel):
    """Base workout model"""

    name: str = Field(..., min_length=1, max_length=100)
    notes: str | None = None


class WorkoutCreate(WorkoutBase):
    """Workout creation request model"""

    template_id: str | None = None


class WorkoutResponse(WorkoutBase):
    """Complete workout model for API responses"""

    id: str
    user_id: str
    started_at: datetime
    completed_at: datetime | None = None
    duration_seconds: int | None = None
    exercises: list[WorkoutExercise] = Field(default_factory=list)
    is_template: bool = False
    status: str = Field(
        default="planned", description="planned, in_progress, completed"
    )

    class Config:
        from_attributes = True


class WorkoutSummary(BaseModel):
    """Abbreviated workout info for lists"""

    id: str
    name: str
    started_at: datetime
    completed_at: datetime | None = None
    duration_seconds: int | None = None
    exercise_count: int
    status: str


class StatsResponse(BaseModel):
    """User workout statistics"""

    total_workouts: int
    current_streak: int
    longest_streak: int
    total_duration_hours: float
    favorite_exercises: list[dict[str, Any]]
    recent_prs: list[dict[str, Any]]


class APIResponse(BaseModel):
    """Standard API response wrapper"""

    success: bool = True
    message: str | None = None
    data: Any | None = None


class ErrorResponse(BaseModel):
    """Standard error response"""

    success: bool = False
    error: str
    details: dict[str, Any] | None = None
