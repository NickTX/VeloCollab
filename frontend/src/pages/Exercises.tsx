import React, { useState } from 'react';

const Exercises: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Strength', 'Cardio', 'Flexibility', 'Balance', 'Sports'];

  const mockExercises = [
    {
      id: 1,
      name: 'Push-ups',
      category: 'Strength',
      targetMuscles: ['Chest', 'Shoulders', 'Triceps'],
      equipment: 'None',
      difficulty: 'Beginner',
      description: 'Classic bodyweight exercise for upper body strength.',
      image: '💪',
    },
    {
      id: 2,
      name: 'Squats',
      category: 'Strength',
      targetMuscles: ['Quadriceps', 'Glutes', 'Hamstrings'],
      equipment: 'None',
      difficulty: 'Beginner',
      description: 'Fundamental lower body movement pattern.',
      image: '🦵',
    },
    {
      id: 3,
      name: 'Burpees',
      category: 'Cardio',
      targetMuscles: ['Full Body'],
      equipment: 'None',
      difficulty: 'Advanced',
      description: 'High-intensity full-body exercise combining strength and cardio.',
      image: '🔥',
    },
    {
      id: 4,
      name: 'Deadlifts',
      category: 'Strength',
      targetMuscles: ['Hamstrings', 'Glutes', 'Lower Back'],
      equipment: 'Barbell',
      difficulty: 'Intermediate',
      description: 'Hip hinge movement targeting posterior chain muscles.',
      image: '🏋️',
    },
    {
      id: 5,
      name: 'Running',
      category: 'Cardio',
      targetMuscles: ['Legs', 'Core'],
      equipment: 'None',
      difficulty: 'Beginner',
      description: 'Classic cardiovascular exercise for endurance building.',
      image: '🏃',
    },
    {
      id: 6,
      name: 'Yoga Flow',
      category: 'Flexibility',
      targetMuscles: ['Full Body'],
      equipment: 'Yoga Mat',
      difficulty: 'Beginner',
      description: 'Gentle stretching and flexibility routine.',
      image: '🧘',
    },
    {
      id: 7,
      name: 'Plank',
      category: 'Strength',
      targetMuscles: ['Core', 'Shoulders'],
      equipment: 'None',
      difficulty: 'Beginner',
      description: 'Isometric core strengthening exercise.',
      image: '⚖️',
    },
    {
      id: 8,
      name: 'Mountain Climbers',
      category: 'Cardio',
      targetMuscles: ['Core', 'Shoulders', 'Legs'],
      equipment: 'None',
      difficulty: 'Intermediate',
      description: 'Dynamic cardio exercise that targets multiple muscle groups.',
      image: '⛰️',
    },
  ];

  const filteredExercises = mockExercises.filter((exercise) => {
    const matchesCategory = selectedCategory === 'All' || exercise.category === selectedCategory;
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.targetMuscles.some(muscle => muscle.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Exercise Library
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Discover exercises to build your perfect workout routine
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Custom Exercise
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Search */}
            <div className="lg:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                Search exercises
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-2 border-gray-300 rounded-md"
                  placeholder="Search by name or muscle group..."
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Exercise Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-lg">📚</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Exercises</dt>
                  <dd className="text-lg font-medium text-gray-900">{mockExercises.length}</dd>
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
                  <span className="text-white text-lg">⭐</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Favorites</dt>
                  <dd className="text-lg font-medium text-gray-900">0</dd>
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
                  <span className="text-white text-lg">📝</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Custom</dt>
                  <dd className="text-lg font-medium text-gray-900">0</dd>
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
                  <span className="text-white text-lg">🔥</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Categories</dt>
                  <dd className="text-lg font-medium text-gray-900">{categories.length - 1}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Exercise Grid */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {selectedCategory === 'All' ? 'All Exercises' : `${selectedCategory} Exercises`}
            </h3>
            <p className="text-sm text-gray-500">
              {filteredExercises.length} exercise{filteredExercises.length !== 1 ? 's' : ''} found
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredExercises.map((exercise) => (
              <div key={exercise.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-3xl">{exercise.image}</div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(exercise.difficulty)}`}>
                        {exercise.difficulty}
                      </span>
                    </div>
                  </div>

                  <h4 className="text-lg font-medium text-gray-900 mb-2">{exercise.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">{exercise.description}</p>

                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="font-medium mr-2">Category:</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {exercise.category}
                      </span>
                    </div>

                    <div className="flex items-center text-sm text-gray-500">
                      <span className="font-medium mr-2">Equipment:</span>
                      <span>{exercise.equipment}</span>
                    </div>

                    <div className="text-sm text-gray-500">
                      <span className="font-medium">Target Muscles:</span>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {exercise.targetMuscles.map((muscle) => (
                          <span key={muscle} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                            {muscle}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex space-x-2">
                    <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                      Add to Workout
                    </button>
                    <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                      ⭐
                    </button>
                    <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                      ℹ️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredExercises.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No exercises found</h3>
              <p className="text-gray-500">
                Try adjusting your search terms or category filter.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Exercises;
