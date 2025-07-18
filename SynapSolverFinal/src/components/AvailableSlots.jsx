import React, { useState } from 'react'

const AvailableSlots = ({ darkMode }) => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [viewMode, setViewMode] = useState('week') // week, month
  const [showAddSlot, setShowAddSlot] = useState(false)
  
  const [newSlot, setNewSlot] = useState({
    date: '',
    startTime: '',
    endTime: '',
    subject: '',
    level: 'Beginner',
    maxStudents: 3,
    description: ''
  })

  const slots = [
    {
      id: 1,
      date: '2024-01-15',
      startTime: '10:00',
      endTime: '11:00',
      subject: 'Mathematics',
      level: 'Beginner',
      bookedStudents: 0,
      maxStudents: 3,
      status: 'Available',
      description: 'Basic algebra and equations'
    },
    {
      id: 2,
      date: '2024-01-15',
      startTime: '14:00',
      endTime: '15:00',
      subject: 'Physics',
      level: 'Advanced',
      bookedStudents: 2,
      maxStudents: 3,
      status: 'Available',
      description: 'Quantum mechanics fundamentals'
    },
    {
      id: 3,
      date: '2024-01-16',
      startTime: '16:00',
      endTime: '17:00',
      subject: 'Chemistry',
      level: 'Expert',
      bookedStudents: 3,
      maxStudents: 3,
      status: 'Booked',
      description: 'Organic chemistry reactions'
    },
    {
      id: 4,
      date: '2024-01-17',
      startTime: '11:00',
      endTime: '12:00',
      subject: 'Biology',
      level: 'Intermediate',
      bookedStudents: 1,
      maxStudents: 3,
      status: 'Available',
      description: 'Cell biology and genetics'
    }
  ]

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const timeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00']

  const handleAddSlot = () => {
    // Add slot logic here
    console.log('Adding new slot:', newSlot)
    setShowAddSlot(false)
    setNewSlot({
      date: '',
      startTime: '',
      endTime: '',
      subject: '',
      level: 'Beginner',
      maxStudents: 3,
      description: ''
    })
  }

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'bg-green-500/20 text-green-400'
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-400'
      case 'Advanced': return 'bg-orange-500/20 text-orange-400'
      case 'Expert': return 'bg-red-500/20 text-red-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'bg-green-500/20 text-green-400'
      case 'Booked': return 'bg-red-500/20 text-red-400'
      case 'Pending': return 'bg-yellow-500/20 text-yellow-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
          📅 Available Slots Calendar
        </h2>
        <div className="flex items-center space-x-3">
          {/* View Mode Toggle */}
          <div className="flex space-x-1">
            {['week', 'month'].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 ${
                  viewMode === mode
                    ? darkMode
                      ? 'bg-white/20 text-white'
                      : 'bg-[#00001a]/20 text-[#00001a]'
                    : darkMode
                      ? 'bg-[#00001a]/20 text-white/70 hover:bg-[#00001a]/30'
                      : 'bg-white/20 text-[#00001a]/70 hover:bg-white/30'
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
          
          {/* Add Slot Button */}
          <button
            onClick={() => setShowAddSlot(true)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
              darkMode
                ? 'bg-white/20 text-white hover:bg-white/30'
                : 'bg-[#00001a]/20 text-[#00001a] hover:bg-[#00001a]/30'
            }`}
          >
            + Add Slot
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className={`backdrop-blur-2xl rounded-2xl border shadow-2xl transition-all duration-500 ${
        darkMode
          ? 'bg-[#00001a]/40 border-white/10'
          : 'bg-white/40 border-white/20'
      }`}>
        <div className="p-6">
          {/* Week View */}
          {viewMode === 'week' && (
            <div>
              <div className="grid grid-cols-8 gap-2 mb-4">
                <div className={`text-sm font-medium p-2 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                  Time
                </div>
                {weekDays.map((day) => (
                  <div key={day} className={`text-sm font-medium p-2 text-center ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                    {day}
                  </div>
                ))}
              </div>
              
              {timeSlots.map((time) => (
                <div key={time} className="grid grid-cols-8 gap-2 mb-2">
                  <div className={`text-sm p-2 ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`}>
                    {time}
                  </div>
                  {weekDays.map((day, dayIndex) => {
                    const daySlot = slots.find(slot => 
                      slot.startTime === time && 
                      new Date(slot.date).getDay() === (dayIndex + 1) % 7
                    )
                    
                    return (
                      <div
                        key={`${day}-${time}`}
                        className={`p-2 rounded-lg border transition-all duration-300 min-h-[60px] ${
                          daySlot
                            ? darkMode
                              ? 'bg-white/20 border-white/30 hover:bg-white/30'
                              : 'bg-[#00001a]/20 border-[#00001a]/30 hover:bg-[#00001a]/30'
                            : darkMode
                              ? 'bg-[#00001a]/10 border-white/10 hover:bg-[#00001a]/20'
                              : 'bg-white/10 border-white/20 hover:bg-white/20'
                        } cursor-pointer`}
                      >
                        {daySlot && (
                          <div className="space-y-1">
                            <div className={`text-xs font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                              {daySlot.subject}
                            </div>
                            <div className={`text-xs px-1 py-0.5 rounded ${getLevelColor(daySlot.level)}`}>
                              {daySlot.level}
                            </div>
                            <div className={`text-xs ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                              {daySlot.bookedStudents}/{daySlot.maxStudents}
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Slot List */}
      <div className={`backdrop-blur-2xl rounded-2xl border shadow-2xl transition-all duration-500 ${
        darkMode
          ? 'bg-[#00001a]/40 border-white/10'
          : 'bg-white/40 border-white/20'
      }`}>
        <div className="p-6">
          <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
            📋 Slot Details
          </h3>
          <div className="space-y-4">
            {slots.map((slot) => (
              <div
                key={slot.id}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  darkMode ? 'bg-[#00001a]/20 border-white/10' : 'bg-white/20 border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${getLevelColor(slot.level)}`}>
                      📚
                    </div>
                    <div>
                      <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        {slot.subject}
                      </h4>
                      <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                        {slot.date} • {slot.startTime} - {slot.endTime}
                      </p>
                      <p className={`text-sm ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`}>
                        {slot.description}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getLevelColor(slot.level)}`}>
                          {slot.level}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(slot.status)}`}>
                          {slot.status}
                        </span>
                        <span className={`text-xs ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`}>
                          {slot.bookedStudents}/{slot.maxStudents} students
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className={`px-3 py-1 rounded text-xs font-medium transition-all duration-300 ${
                      darkMode
                        ? 'bg-white/20 text-white hover:bg-white/30'
                        : 'bg-[#00001a]/20 text-[#00001a] hover:bg-[#00001a]/30'
                    }`}>
                      Edit
                    </button>
                    <button className={`px-3 py-1 rounded text-xs font-medium transition-all duration-300 ${
                      darkMode
                        ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                        : 'bg-red-500/20 text-red-600 hover:bg-red-500/30'
                    }`}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Slot Modal */}
      {showAddSlot && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className={`max-w-md w-full mx-4 rounded-2xl border shadow-2xl ${
            darkMode
              ? 'bg-[#00001a]/90 border-white/10'
              : 'bg-white/90 border-white/20'
          }`}>
            <div className="p-6">
              <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                Add New Slot
              </h3>
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                    Subject
                  </label>
                  <input
                    type="text"
                    value={newSlot.subject}
                    onChange={(e) => setNewSlot({...newSlot, subject: e.target.value})}
                    className={`w-full p-2 rounded-lg border ${
                      darkMode
                        ? 'bg-[#00001a]/20 border-white/20 text-white'
                        : 'bg-white/20 border-white/30 text-[#00001a]'
                    }`}
                    placeholder="Enter subject"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                      Start Time
                    </label>
                    <input
                      type="time"
                      value={newSlot.startTime}
                      onChange={(e) => setNewSlot({...newSlot, startTime: e.target.value})}
                      className={`w-full p-2 rounded-lg border ${
                        darkMode
                          ? 'bg-[#00001a]/20 border-white/20 text-white'
                          : 'bg-white/20 border-white/30 text-[#00001a]'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                      End Time
                    </label>
                    <input
                      type="time"
                      value={newSlot.endTime}
                      onChange={(e) => setNewSlot({...newSlot, endTime: e.target.value})}
                      className={`w-full p-2 rounded-lg border ${
                        darkMode
                          ? 'bg-[#00001a]/20 border-white/20 text-white'
                          : 'bg-white/20 border-white/30 text-[#00001a]'
                      }`}
                    />
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                    Level
                  </label>
                  <select
                    value={newSlot.level}
                    onChange={(e) => setNewSlot({...newSlot, level: e.target.value})}
                    className={`w-full p-2 rounded-lg border ${
                      darkMode
                        ? 'bg-[#00001a]/20 border-white/20 text-white'
                        : 'bg-white/20 border-white/30 text-[#00001a]'
                    }`}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={handleAddSlot}
                  className={`flex-1 py-2 rounded-lg font-medium transition-all duration-300 ${
                    darkMode
                      ? 'bg-white/20 text-white hover:bg-white/30'
                      : 'bg-[#00001a]/20 text-[#00001a] hover:bg-[#00001a]/30'
                  }`}
                >
                  Add Slot
                </button>
                <button
                  onClick={() => setShowAddSlot(false)}
                  className={`flex-1 py-2 rounded-lg font-medium transition-all duration-300 ${
                    darkMode
                      ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                      : 'bg-red-500/20 text-red-600 hover:bg-red-500/30'
                  }`}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AvailableSlots
