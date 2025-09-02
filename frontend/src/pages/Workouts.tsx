import React from 'react';

const Workouts: React.FC = () => {
  const mockWorkouts = [
    {
      id: 1,
      name: 'Upper Body Strength',
      date: '2024-09-01',
      duration: '45 min',
      exercises: 8,
      status: 'completed',
      calories: 320,
    },
    {
      id: 2,
      name: 'Cardio HIIT Session',
      date: '2024-08-30',
      duration: '30 min',
      exercises: 6,
      status: 'completed',
      calories: 280,
    },
    {
      id: 3,
      name: 'Lower Body Power',
      date: '2024-08-28',
      duration: '60 min',
      exercises: 10,
      status: 'completed',
      calories: 450,
    },
  ];

  const workoutTemplates = [
    {
      id: 1,
      name: 'Quick Morning Routine',
      duration: '15 min',
      exercises: 5,
      difficulty: 'Beginner',
      category: 'Full Body',
    },
    {
      id: 2,
      name: 'Strength Building',
      duration: '45 min',
      exercises: 8,
      difficulty: 'Intermediate',
      category: 'Strength',
    },
    {
      id: 3,
      name: 'Cardio Blast',
      duration: '30 min',
      exercises: 6,
      difficulty: 'Advanced',
      category: 'Cardio',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            My Workouts
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Track your fitness journey and manage your workout routines
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Start New Workout
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-lg">💪</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">This Week</dt>
                  <dd className="text-lg font-medium text-gray-900">3 Workouts</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-lg">⏱️</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Time</dt>
                  <dd className="text-lg font-medium text-gray-900">2h 15m</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-lg">🔥</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Calories Burned</dt>
                  <dd className="text-lg font-medium text-gray-900">1,050</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-red-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-lg">📈</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Streak</dt>
                  <dd className="text-lg font-medium text-gray-900">7 days</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Workout Templates */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Workout Templates</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {workoutTemplates.map((template) => (
              <div key={template.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-medium text-gray-900">{template.name}</h4>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    template.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                    template.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {template.difficulty}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2">{template.category}</p>
                <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
                  <span>⏱️ {template.duration}</span>
                  <span>🏋️ {template.exercises} exercises</span>
                </div>
                <button className="mt-3 w-full bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                  Start Workout
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Workouts */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Workouts</h3>
          <div className="space-y-4">
            {mockWorkouts.map((workout) => (
              <div key={workout.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="text-lg font-medium text-gray-900">{workout.name}</h4>
                    <p className="text-sm text-gray-600">{workout.date}</p>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>⏱️ {workout.duration}</span>
                    <span>🏋️ {workout.exercises} exercises</span>
                    <span>🔥 {workout.calories} cal</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      Completed
                    </span>
                  </div>
                </div>
                <div className="mt-3 flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-500 text-sm font-medium">
                    View Details
                  </button>
                  <button className="text-gray-600 hover:text-gray-500 text-sm font-medium">
                    Repeat Workout
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Empty State (for when no workouts exist) */}
      <div className="hidden bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6 text-center">
          <div className="mx-auto h-12 w-12 text-gray-400">
            <span className="text-4xl">💪</span>
          </div>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No workouts yet</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating your first workout routine.
          </p>
          <div className="mt-6">
            <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create your first workout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workouts;
