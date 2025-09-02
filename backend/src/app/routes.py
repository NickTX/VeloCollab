import uuid
from datetime import datetime

from fastapi import APIRouter, HTTPException, Query

from .mock_data import (
    MOCK_EXERCISES,
    MOCK_USER,
    MOCK_WORKOUTS,
    WORKOUT_TEMPLATES,
    get_user_stats,
)
from .schemas import (
    APIResponse,
    Exercise,
    StatsResponse,
    User,
    WorkoutCreate,
    WorkoutResponse,
    WorkoutSummary,
)

# Create API router
api_router = APIRouter(prefix="/api", tags=["api"])


# Mock authentication - returns current user
@api_router.get("/users/me", response_model=User)
async def get_current_user():
    """Get current authenticated user profile"""
    return MOCK_USER


@api_router.get("/users/me/stats", response_model=StatsResponse)
async def get_user_stats_endpoint():
    """Get current user's workout statistics"""
    stats = get_user_stats(MOCK_USER.id)
    return StatsResponse(**stats)


@api_router.get("/exercises", response_model=list[Exercise])
async def get_exercises(
    category: str | None = Query(
        None, description="Filter by category: strength, cardio, plyometric, speed"
    ),
    muscle_group: str | None = Query(None, description="Filter by muscle group"),
    search: str | None = Query(None, description="Search exercise names"),
    include_custom: bool = Query(True, description="Include user's custom exercises"),
):
    """Get all exercises with optional filtering"""
    exercises = MOCK_EXERCISES.copy()

    # Apply filters
    if category:
        exercises = [ex for ex in exercises if ex.category.lower() == category.lower()]

    if muscle_group:
        exercises = [
            ex
            for ex in exercises
            if muscle_group.lower() in [mg.lower() for mg in ex.muscle_groups]
        ]

    if search:
        exercises = [ex for ex in exercises if search.lower() in ex.name.lower()]

    if not include_custom:
        exercises = [ex for ex in exercises if not ex.is_custom]

    return exercises


@api_router.get("/exercises/{exercise_id}", response_model=Exercise)
async def get_exercise(exercise_id: str):
    """Get a specific exercise by ID"""
    exercise = next((ex for ex in MOCK_EXERCISES if ex.id == exercise_id), None)
    if not exercise:
        raise HTTPException(status_code=404, detail="Exercise not found")
    return exercise


@api_router.get("/workouts", response_model=list[WorkoutSummary])
async def get_user_workouts(
    status: str | None = Query(
        None, description="Filter by status: planned, in_progress, completed"
    ),
    include_templates: bool = Query(False, description="Include workout templates"),
    limit: int = Query(
        50, ge=1, le=100, description="Maximum number of workouts to return"
    ),
):
    """Get user's workouts with optional filtering"""
    workouts = MOCK_WORKOUTS.copy()

    if include_templates:
        workouts.extend(WORKOUT_TEMPLATES)

    # Apply status filter
    if status:
        workouts = [w for w in workouts if w.status.lower() == status.lower()]

    # Convert to summary format
    summaries = []
    for workout in workouts[:limit]:
        summaries.append(
            WorkoutSummary(
                id=workout.id,
                name=workout.name,
                started_at=workout.started_at,
                completed_at=workout.completed_at,
                duration_seconds=workout.duration_seconds,
                exercise_count=len(workout.exercises),
                status=workout.status,
            )
        )

    return summaries


@api_router.get("/workouts/{workout_id}", response_model=WorkoutResponse)
async def get_workout(workout_id: str):
    """Get a specific workout by ID with full details"""
    # Check both workouts and templates
    all_workouts = MOCK_WORKOUTS + WORKOUT_TEMPLATES
    workout = next((w for w in all_workouts if w.id == workout_id), None)

    if not workout:
        raise HTTPException(status_code=404, detail="Workout not found")

    return workout


@api_router.post("/workouts", response_model=WorkoutResponse)
async def create_workout(workout_data: WorkoutCreate):
    """Create a new workout"""
    # Generate new workout ID
    new_id = f"workout_{uuid.uuid4().hex[:8]}"

    # If creating from template, load template data
    exercises = []
    if workout_data.template_id:
        template = next(
            (t for t in WORKOUT_TEMPLATES if t.id == workout_data.template_id), None
        )
        if template:
            exercises = template.exercises

    # Create new workout
    new_workout = WorkoutResponse(
        id=new_id,
        user_id=MOCK_USER.id,
        name=workout_data.name,
        notes=workout_data.notes,
        started_at=datetime.now(),
        status="planned",
        exercises=exercises,
    )

    # Add to mock data (in real app, this would be saved to database)
    MOCK_WORKOUTS.append(new_workout)

    return new_workout


@api_router.put("/workouts/{workout_id}", response_model=WorkoutResponse)
async def update_workout(workout_id: str, workout_data: WorkoutCreate):
    """Update an existing workout"""
    workout = next((w for w in MOCK_WORKOUTS if w.id == workout_id), None)

    if not workout:
        raise HTTPException(status_code=404, detail="Workout not found")

    # Update workout fields
    workout.name = workout_data.name
    workout.notes = workout_data.notes

    return workout


@api_router.delete("/workouts/{workout_id}", response_model=APIResponse)
async def delete_workout(workout_id: str):
    """Delete a workout"""
    workout_index = next(
        (i for i, w in enumerate(MOCK_WORKOUTS) if w.id == workout_id), None
    )

    if workout_index is None:
        raise HTTPException(status_code=404, detail="Workout not found")

    # Remove from mock data
    deleted_workout = MOCK_WORKOUTS.pop(workout_index)

    return APIResponse(
        success=True, message=f"Workout '{deleted_workout.name}' deleted successfully"
    )


@api_router.get("/workout-templates", response_model=list[WorkoutSummary])
async def get_workout_templates():
    """Get available workout templates"""
    summaries = []
    for template in WORKOUT_TEMPLATES:
        summaries.append(
            WorkoutSummary(
                id=template.id,
                name=template.name,
                started_at=template.started_at,
                completed_at=template.completed_at,
                duration_seconds=template.duration_seconds,
                exercise_count=len(template.exercises),
                status=template.status,
            )
        )

    return summaries
