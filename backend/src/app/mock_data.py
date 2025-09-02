from datetime import datetime, timedelta

from .schemas import (
    Exercise,
    User,
    WorkoutExercise,
    WorkoutExerciseSet,
    WorkoutResponse,
)

# Mock current user
MOCK_USER = User(
    id="user_123",
    name="Alex Johnson",
    email="alex.johnson@example.com",
    avatar_url="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    created_at=datetime.now() - timedelta(days=90),
    total_workouts=23,
    current_streak=5,
)

# Comprehensive exercise database
MOCK_EXERCISES: list[Exercise] = [
    # Strength Training - Upper Body
    Exercise(
        id="ex_001",
        name="Bench Press",
        category="strength",
        muscle_groups=["chest", "triceps", "shoulders"],
        equipment="barbell",
        instructions=(
            "Lie on bench, grip bar slightly wider than shoulders, "
            "lower to chest, press up"
        ),
        is_custom=False,
    ),
    Exercise(
        id="ex_002",
        name="Pull-ups",
        category="strength",
        muscle_groups=["lats", "biceps", "rear delts"],
        equipment="pull-up bar",
        instructions=(
            "Hang from bar, pull body up until chin clears bar, lower with control"
        ),
        is_custom=False,
    ),
    Exercise(
        id="ex_003",
        name="Overhead Press",
        category="strength",
        muscle_groups=["shoulders", "triceps", "core"],
        equipment="barbell",
        instructions=(
            "Stand with feet shoulder-width apart, press bar overhead, "
            "lower to shoulders"
        ),
        is_custom=False,
    ),
    Exercise(
        id="ex_004",
        name="Dumbbell Rows",
        category="strength",
        muscle_groups=["lats", "rhomboids", "biceps"],
        equipment="dumbbells",
        instructions="Hinge at hips, row dumbbell to hip, squeeze shoulder blades",
        is_custom=False,
    ),
    # Strength Training - Lower Body
    Exercise(
        id="ex_005",
        name="Back Squat",
        category="strength",
        muscle_groups=["quadriceps", "glutes", "hamstrings"],
        equipment="barbell",
        instructions=(
            "Bar on upper back, squat down until thighs parallel, "
            "drive up through heels"
        ),
        is_custom=False,
    ),
    Exercise(
        id="ex_006",
        name="Deadlift",
        category="strength",
        muscle_groups=["hamstrings", "glutes", "erector spinae"],
        equipment="barbell",
        instructions=(
            "Hip hinge, grip bar, lift by extending hips and knees simultaneously"
        ),
        is_custom=False,
    ),
    Exercise(
        id="ex_007",
        name="Bulgarian Split Squat",
        category="strength",
        muscle_groups=["quadriceps", "glutes", "calves"],
        equipment="dumbbells",
        instructions=(
            "Rear foot elevated, lunge down on front leg, "
            "drive up through front heel"
        ),
        is_custom=False,
    ),
    # Plyometric Exercises
    Exercise(
        id="ex_008",
        name="Box Jumps",
        category="plyometric",
        muscle_groups=["quadriceps", "glutes", "calves"],
        equipment="plyo box",
        instructions=(
            "Jump onto box with both feet, land softly, step down with control"
        ),
        is_custom=False,
    ),
    Exercise(
        id="ex_009",
        name="Broad Jumps",
        category="plyometric",
        muscle_groups=["quadriceps", "glutes", "hamstrings"],
        equipment="bodyweight",
        instructions=(
            "Jump forward as far as possible, land on both feet, measure distance"
        ),
        is_custom=False,
    ),
    Exercise(
        id="ex_010",
        name="Clap Push-ups",
        category="plyometric",
        muscle_groups=["chest", "triceps", "shoulders"],
        equipment="bodyweight",
        instructions="Explosive push-up with clap at top, land with control",
        is_custom=False,
    ),
    Exercise(
        id="ex_011",
        name="Depth Jumps",
        category="plyometric",
        muscle_groups=["quadriceps", "glutes", "calves"],
        equipment="plyo box",
        instructions="Step off box, land and immediately jump as high as possible",
        is_custom=False,
    ),
    # Cardio/Running
    Exercise(
        id="ex_012",
        name="5K Run",
        category="cardio",
        muscle_groups=["quadriceps", "hamstrings", "calves"],
        equipment="none",
        instructions="Maintain steady pace for 5 kilometers, focus on breathing rhythm",
        is_custom=False,
    ),
    Exercise(
        id="ex_013",
        name="400m Sprint",
        category="cardio",
        muscle_groups=["quadriceps", "hamstrings", "calves"],
        equipment="track",
        instructions="All-out sprint for 400 meters, one lap around standard track",
        is_custom=False,
    ),
    Exercise(
        id="ex_014",
        name="Hill Sprints",
        category="cardio",
        muscle_groups=["quadriceps", "glutes", "calves"],
        equipment="hill",
        instructions="Sprint uphill at maximum effort, walk down for recovery",
        is_custom=False,
    ),
    # Speed Training
    Exercise(
        id="ex_015",
        name="40-Yard Dash",
        category="speed",
        muscle_groups=["quadriceps", "hamstrings", "glutes"],
        equipment="timer",
        instructions="Sprint 40 yards as fast as possible from 3-point stance",
        is_custom=False,
    ),
    Exercise(
        id="ex_016",
        name="5-10-5 Pro Agility",
        category="speed",
        muscle_groups=["quadriceps", "glutes", "calves"],
        equipment="cones",
        instructions=(
            "Start at middle cone, sprint 5 yards, return 10 yards, return 5 yards"
        ),
        is_custom=False,
    ),
    # Custom User Exercise
    Exercise(
        id="ex_017",
        name="Dragon Squats",
        category="strength",
        muscle_groups=["quadriceps", "glutes", "core"],
        equipment="bodyweight",
        instructions="Single-leg squat with opposite leg extended forward",
        is_custom=True,
        created_by="user_123",
    ),
]

# Mock workout data with realistic progressions
MOCK_WORKOUTS: list[WorkoutResponse] = [
    WorkoutResponse(
        id="workout_001",
        user_id="user_123",
        name="Upper Body Power",
        started_at=datetime.now() - timedelta(days=1),
        completed_at=datetime.now()
        - timedelta(days=1)
        + timedelta(hours=1, minutes=15),
        duration_seconds=4500,
        status="completed",
        notes="Felt strong today, increased weight on bench press",
        exercises=[
            WorkoutExercise(
                exercise=next(
                    ex for ex in MOCK_EXERCISES if ex.id == "ex_001"
                ),  # Bench Press
                sets=[
                    WorkoutExerciseSet(
                        set_number=1,
                        reps=12,
                        weight=135,
                        rest_seconds=120,
                        completed=True,
                    ),
                    WorkoutExerciseSet(
                        set_number=2,
                        reps=10,
                        weight=155,
                        rest_seconds=120,
                        completed=True,
                    ),
                    WorkoutExerciseSet(
                        set_number=3,
                        reps=8,
                        weight=175,
                        rest_seconds=120,
                        completed=True,
                    ),
                    WorkoutExerciseSet(
                        set_number=4,
                        reps=6,
                        weight=185,
                        rest_seconds=180,
                        completed=True,
                    ),
                ],
            ),
            WorkoutExercise(
                exercise=next(
                    ex for ex in MOCK_EXERCISES if ex.id == "ex_002"
                ),  # Pull-ups
                sets=[
                    WorkoutExerciseSet(
                        set_number=1, reps=10, weight=0, rest_seconds=90, completed=True
                    ),
                    WorkoutExerciseSet(
                        set_number=2, reps=8, weight=0, rest_seconds=90, completed=True
                    ),
                    WorkoutExerciseSet(
                        set_number=3, reps=6, weight=0, rest_seconds=90, completed=True
                    ),
                ],
            ),
            WorkoutExercise(
                exercise=next(
                    ex for ex in MOCK_EXERCISES if ex.id == "ex_010"
                ),  # Clap Push-ups
                sets=[
                    WorkoutExerciseSet(
                        set_number=1, reps=8, rest_seconds=60, completed=True
                    ),
                    WorkoutExerciseSet(
                        set_number=2, reps=6, rest_seconds=60, completed=True
                    ),
                    WorkoutExerciseSet(
                        set_number=3, reps=5, rest_seconds=60, completed=True
                    ),
                ],
            ),
        ],
    ),
    WorkoutResponse(
        id="workout_002",
        user_id="user_123",
        name="Lower Body Strength",
        started_at=datetime.now() - timedelta(days=3),
        completed_at=datetime.now()
        - timedelta(days=3)
        + timedelta(hours=1, minutes=30),
        duration_seconds=5400,
        status="completed",
        exercises=[
            WorkoutExercise(
                exercise=next(
                    ex for ex in MOCK_EXERCISES if ex.id == "ex_005"
                ),  # Back Squat
                sets=[
                    WorkoutExerciseSet(
                        set_number=1,
                        reps=10,
                        weight=185,
                        rest_seconds=180,
                        completed=True,
                    ),
                    WorkoutExerciseSet(
                        set_number=2,
                        reps=8,
                        weight=205,
                        rest_seconds=180,
                        completed=True,
                    ),
                    WorkoutExerciseSet(
                        set_number=3,
                        reps=6,
                        weight=225,
                        rest_seconds=180,
                        completed=True,
                    ),
                    WorkoutExerciseSet(
                        set_number=4,
                        reps=5,
                        weight=245,
                        rest_seconds=240,
                        completed=True,
                    ),
                ],
            ),
            WorkoutExercise(
                exercise=next(
                    ex for ex in MOCK_EXERCISES if ex.id == "ex_006"
                ),  # Deadlift
                sets=[
                    WorkoutExerciseSet(
                        set_number=1,
                        reps=8,
                        weight=225,
                        rest_seconds=180,
                        completed=True,
                    ),
                    WorkoutExerciseSet(
                        set_number=2,
                        reps=6,
                        weight=265,
                        rest_seconds=180,
                        completed=True,
                    ),
                    WorkoutExerciseSet(
                        set_number=3,
                        reps=4,
                        weight=295,
                        rest_seconds=240,
                        completed=True,
                    ),
                ],
            ),
            WorkoutExercise(
                exercise=next(
                    ex for ex in MOCK_EXERCISES if ex.id == "ex_008"
                ),  # Box Jumps
                sets=[
                    WorkoutExerciseSet(
                        set_number=1,
                        reps=10,
                        rest_seconds=60,
                        completed=True,
                        notes="24 inch box",
                    ),
                    WorkoutExerciseSet(
                        set_number=2,
                        reps=8,
                        rest_seconds=60,
                        completed=True,
                        notes="24 inch box",
                    ),
                    WorkoutExerciseSet(
                        set_number=3,
                        reps=8,
                        rest_seconds=60,
                        completed=True,
                        notes="24 inch box",
                    ),
                ],
            ),
        ],
    ),
    WorkoutResponse(
        id="workout_003",
        user_id="user_123",
        name="Speed & Agility",
        started_at=datetime.now() - timedelta(days=5),
        completed_at=datetime.now() - timedelta(days=5) + timedelta(minutes=45),
        duration_seconds=2700,
        status="completed",
        exercises=[
            WorkoutExercise(
                exercise=next(
                    ex for ex in MOCK_EXERCISES if ex.id == "ex_015"
                ),  # 40-Yard Dash
                sets=[
                    WorkoutExerciseSet(
                        set_number=1, time_seconds=4.8, rest_seconds=180, completed=True
                    ),
                    WorkoutExerciseSet(
                        set_number=2, time_seconds=4.7, rest_seconds=180, completed=True
                    ),
                    WorkoutExerciseSet(
                        set_number=3,
                        time_seconds=4.6,
                        rest_seconds=180,
                        completed=True,
                        notes="Personal best!",
                    ),
                ],
            ),
            WorkoutExercise(
                exercise=next(
                    ex for ex in MOCK_EXERCISES if ex.id == "ex_016"
                ),  # 5-10-5 Pro Agility
                sets=[
                    WorkoutExerciseSet(
                        set_number=1, time_seconds=4.2, rest_seconds=120, completed=True
                    ),
                    WorkoutExerciseSet(
                        set_number=2, time_seconds=4.1, rest_seconds=120, completed=True
                    ),
                    WorkoutExerciseSet(
                        set_number=3, time_seconds=4.0, rest_seconds=120, completed=True
                    ),
                ],
            ),
            WorkoutExercise(
                exercise=next(
                    ex for ex in MOCK_EXERCISES if ex.id == "ex_009"
                ),  # Broad Jumps
                sets=[
                    WorkoutExerciseSet(
                        set_number=1,
                        distance=8.2,
                        rest_seconds=90,
                        completed=True,
                        notes="8'2\" jump",
                    ),
                    WorkoutExerciseSet(
                        set_number=2,
                        distance=8.4,
                        rest_seconds=90,
                        completed=True,
                        notes="8'4\" jump",
                    ),
                    WorkoutExerciseSet(
                        set_number=3,
                        distance=8.6,
                        rest_seconds=90,
                        completed=True,
                        notes="8'6\" jump - PR!",
                    ),
                ],
            ),
        ],
    ),
    WorkoutResponse(
        id="workout_004",
        user_id="user_123",
        name="Cardio Endurance",
        started_at=datetime.now() - timedelta(days=7),
        completed_at=datetime.now() - timedelta(days=7) + timedelta(minutes=35),
        duration_seconds=2100,
        status="completed",
        exercises=[
            WorkoutExercise(
                exercise=next(
                    ex for ex in MOCK_EXERCISES if ex.id == "ex_012"
                ),  # 5K Run
                sets=[
                    WorkoutExerciseSet(
                        set_number=1,
                        time_seconds=1260,  # 21:00 5K
                        distance=5.0,
                        completed=True,
                        notes="Average pace: 6:45/mile",
                    ),
                ],
            )
        ],
    ),
    # Current/In-Progress Workout
    WorkoutResponse(
        id="workout_005",
        user_id="user_123",
        name="Full Body Circuit",
        started_at=datetime.now(),
        status="in_progress",
        notes="Today's focus: explosive movements",
        exercises=[
            WorkoutExercise(
                exercise=next(
                    ex for ex in MOCK_EXERCISES if ex.id == "ex_005"
                ),  # Back Squat
                sets=[
                    WorkoutExerciseSet(
                        set_number=1,
                        reps=10,
                        weight=185,
                        rest_seconds=120,
                        completed=True,
                    ),
                    WorkoutExerciseSet(
                        set_number=2,
                        reps=8,
                        weight=205,
                        rest_seconds=120,
                        completed=True,
                    ),
                    WorkoutExerciseSet(
                        set_number=3,
                        reps=6,
                        weight=225,
                        rest_seconds=120,
                        completed=False,
                    ),
                ],
            ),
            WorkoutExercise(
                exercise=next(
                    ex for ex in MOCK_EXERCISES if ex.id == "ex_001"
                ),  # Bench Press
                sets=[
                    WorkoutExerciseSet(
                        set_number=1,
                        reps=10,
                        weight=155,
                        rest_seconds=120,
                        completed=False,
                    ),
                    WorkoutExerciseSet(
                        set_number=2,
                        reps=8,
                        weight=175,
                        rest_seconds=120,
                        completed=False,
                    ),
                    WorkoutExerciseSet(
                        set_number=3,
                        reps=6,
                        weight=185,
                        rest_seconds=120,
                        completed=False,
                    ),
                ],
            ),
        ],
    ),
]

# Workout templates for quick start
WORKOUT_TEMPLATES: list[WorkoutResponse] = [
    WorkoutResponse(
        id="template_001",
        user_id="system",
        name="Beginner Full Body",
        started_at=datetime.now(),
        status="template",
        is_template=True,
        notes="Perfect for beginners - focuses on compound movements",
        exercises=[
            WorkoutExercise(
                exercise=next(
                    ex for ex in MOCK_EXERCISES if ex.id == "ex_005"
                ),  # Back Squat
                sets=[
                    WorkoutExerciseSet(
                        set_number=1, reps=12, weight=0, rest_seconds=90
                    ),
                    WorkoutExerciseSet(
                        set_number=2, reps=12, weight=0, rest_seconds=90
                    ),
                    WorkoutExerciseSet(
                        set_number=3, reps=12, weight=0, rest_seconds=90
                    ),
                ],
            ),
            WorkoutExercise(
                exercise=next(
                    ex for ex in MOCK_EXERCISES if ex.id == "ex_001"
                ),  # Bench Press
                sets=[
                    WorkoutExerciseSet(
                        set_number=1, reps=10, weight=0, rest_seconds=90
                    ),
                    WorkoutExerciseSet(
                        set_number=2, reps=10, weight=0, rest_seconds=90
                    ),
                    WorkoutExerciseSet(
                        set_number=3, reps=10, weight=0, rest_seconds=90
                    ),
                ],
            ),
            WorkoutExercise(
                exercise=next(
                    ex for ex in MOCK_EXERCISES if ex.id == "ex_004"
                ),  # Dumbbell Rows
                sets=[
                    WorkoutExerciseSet(
                        set_number=1, reps=12, weight=0, rest_seconds=90
                    ),
                    WorkoutExerciseSet(
                        set_number=2, reps=12, weight=0, rest_seconds=90
                    ),
                    WorkoutExerciseSet(
                        set_number=3, reps=12, weight=0, rest_seconds=90
                    ),
                ],
            ),
        ],
    ),
    WorkoutResponse(
        id="template_002",
        user_id="system",
        name="Athletic Performance",
        started_at=datetime.now(),
        status="template",
        is_template=True,
        notes="Combines strength and power for athletic development",
        exercises=[
            WorkoutExercise(
                exercise=next(
                    ex for ex in MOCK_EXERCISES if ex.id == "ex_008"
                ),  # Box Jumps
                sets=[
                    WorkoutExerciseSet(set_number=1, reps=8, rest_seconds=120),
                    WorkoutExerciseSet(set_number=2, reps=8, rest_seconds=120),
                    WorkoutExerciseSet(set_number=3, reps=8, rest_seconds=120),
                ],
            ),
            WorkoutExercise(
                exercise=next(
                    ex for ex in MOCK_EXERCISES if ex.id == "ex_015"
                ),  # 40-Yard Dash
                sets=[
                    WorkoutExerciseSet(set_number=1, time_seconds=0, rest_seconds=180),
                    WorkoutExerciseSet(set_number=2, time_seconds=0, rest_seconds=180),
                    WorkoutExerciseSet(set_number=3, time_seconds=0, rest_seconds=180),
                ],
            ),
        ],
    ),
]


def get_user_stats(user_id: str) -> dict:
    """Calculate user statistics from workout data"""
    user_workouts = [
        w for w in MOCK_WORKOUTS if w.user_id == user_id and w.status == "completed"
    ]

    total_duration = (
        sum(w.duration_seconds or 0 for w in user_workouts) / 3600
    )  # Convert to hours

    return {
        "total_workouts": len(user_workouts),
        "current_streak": 5,  # Mock streak
        "longest_streak": 12,  # Mock streak
        "total_duration_hours": round(total_duration, 1),
        "favorite_exercises": [
            {"name": "Bench Press", "count": 8},
            {"name": "Back Squat", "count": 7},
            {"name": "Pull-ups", "count": 6},
        ],
        "recent_prs": [
            {"exercise": "40-Yard Dash", "value": "4.6s", "date": "2024-01-10"},
            {"exercise": "Broad Jump", "value": "8'6\"", "date": "2024-01-10"},
            {"exercise": "Bench Press", "value": "185 lbs", "date": "2024-01-12"},
        ],
    }
