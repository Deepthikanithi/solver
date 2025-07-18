import React, { useState } from 'react'

const ScheduleManagement = ({ darkMode }) => {
  const [viewMode, setViewMode] = useState('week') // week, month
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showCreateSlot, setShowCreateSlot] = useState(false)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null)
  
  const [newSlot, setNewSlot] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    recurring: false,
    recurringType: 'weekly', // weekly, monthly
    recurringEnd: '',
    subject: '',
    maxStudents: 1,
    price: 0,
    description: ''
  })

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', 
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
  ]

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  const scheduledSlots = [
    {
      id: 1,
      title: 'React Fundamentals',
      date: '2024-01-22',
      startTime: '10:00',
      endTime: '11:00',
      subject: 'React.js',
      bookedStudents: 1,
      maxStudents: 3,
      price: 50,
      status: 'Available',
      recurring: true,
      recurringType: 'weekly'
    },
    {
      id: 2,
      title: 'Python Advanced',
      date: '2024-01-22',
      startTime: '14:00',
      endTime: '15:30',
      subject: 'Python',
      bookedStudents: 2,
      maxStudents: 2,
      price: 75,
      status: 'Booked',
      recurring: false
    },
    {
      id: 3,
      title: 'System Design',
      date: '2024-01-23',
      startTime: '16:00',
      endTime: '18:00',
      subject: 'System Design',
      bookedStudents: 0,
      maxStudents: 1,
      price: 120,
      status: 'Available',
      recurring: true,
      recurringType: 'weekly'
    }
  ]

  const handleCreateSlot = () => {
    console.log('Creating slot:', newSlot)
    setShowCreateSlot(false)
    setNewSlot({
      title: '',
      date: '',
      startTime: '',
      endTime: '',
      recurring: false,
      recurringType: 'weekly',
      recurringEnd: '',
      subject: '',
      maxStudents: 1,
      price: 0,
      description: ''
    })
  }

  const handleSlotClick = (day, time) => {
    setSelectedTimeSlot({ day, time })
    setNewSlot({
      ...newSlot,
      date: day,
      startTime: time
    })
    setShowCreateSlot(true)
  }

  const getSlotForTime = (day, time) => {
    return scheduledSlots.find(slot => 
      slot.date === day && slot.startTime === time
    )
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'Booked': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'Pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getCurrentWeekDates = () => {
    const today = new Date(selectedDate)
    const currentDay = today.getDay()
    const monday = new Date(today)
    monday.setDate(today.getDate() - currentDay + 1)
    
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(monday)
      date.setDate(monday.getDate() + i)
      return date.toISOString().split('T')[0]
    })
  }

  const weekDates = getCurrentWeekDates()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
          📅 Schedule Management
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
          
          {/* Navigation */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                const newDate = new Date(selectedDate)
                newDate.setDate(newDate.getDate() - 7)
                setSelectedDate(newDate)
              }}
              className={`p-2 rounded-lg transition-all duration-300 ${
                darkMode
                  ? 'bg-[#00001a]/20 text-white hover:bg-[#00001a]/30'
                  : 'bg-white/20 text-[#00001a] hover:bg-white/30'
              }`}
            >
              ←
            </button>
            <span className={`px-3 py-1 text-sm font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
              Week of {weekDates[0]}
            </span>
            <button
              onClick={() => {
                const newDate = new Date(selectedDate)
                newDate.setDate(newDate.getDate() + 7)
                setSelectedDate(newDate)
              }}
              className={`p-2 rounded-lg transition-all duration-300 ${
                darkMode
                  ? 'bg-[#00001a]/20 text-white hover:bg-[#00001a]/30'
                  : 'bg-white/20 text-[#00001a] hover:bg-white/30'
              }`}
            >
              →
            </button>
          </div>
          
          {/* Create Slot Button */}
          <button
            onClick={() => setShowCreateSlot(true)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
              darkMode
                ? 'bg-white/20 text-white hover:bg-white/30'
                : 'bg-[#00001a]/20 text-[#00001a] hover:bg-[#00001a]/30'
            }`}
          >
            + Create Slot
          </button>
        </div>
      </div>

      {/* Weekly Calendar */}
      {viewMode === 'week' && (
        <div className={`backdrop-blur-2xl rounded-2xl border shadow-2xl transition-all duration-500 ${
          darkMode
            ? 'bg-[#00001a]/40 border-white/10'
            : 'bg-white/40 border-white/20'
        }`}>
          <div className="p-6">
            {/* Calendar Header */}
            <div className="grid grid-cols-8 gap-2 mb-4">
              <div className={`text-sm font-medium p-3 text-center ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                Time
              </div>
              {weekDays.map((day, index) => (
                <div key={day} className={`text-sm font-medium p-3 text-center ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                  <div>{day.slice(0, 3)}</div>
                  <div className={`text-xs mt-1 ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`}>
                    {new Date(weekDates[index]).getDate()}
                  </div>
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="space-y-1">
              {timeSlots.map((time) => (
                <div key={time} className="grid grid-cols-8 gap-2">
                  <div className={`text-sm p-3 text-center ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`}>
                    {time}
                  </div>
                  {weekDates.map((date, dayIndex) => {
                    const slot = getSlotForTime(date, time)
                    
                    return (
                      <div
                        key={`${date}-${time}`}
                        onClick={() => !slot && handleSlotClick(date, time)}
                        className={`p-2 rounded-lg border transition-all duration-300 min-h-[60px] cursor-pointer ${
                          slot
                            ? `${getStatusColor(slot.status)} border`
                            : darkMode
                              ? 'bg-[#00001a]/10 border-white/10 hover:bg-[#00001a]/20'
                              : 'bg-white/10 border-white/20 hover:bg-white/20'
                        }`}
                      >
                        {slot && (
                          <div className="space-y-1">
                            <div className={`text-xs font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                              {slot.title}
                            </div>
                            <div className={`text-xs ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                              {slot.bookedStudents}/{slot.maxStudents} students
                            </div>
                            <div className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                              ${slot.price}
                            </div>
                            {slot.recurring && (
                              <div className="text-xs">🔄</div>
                            )}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Scheduled Slots List */}
      <div className={`backdrop-blur-2xl rounded-2xl border shadow-2xl transition-all duration-500 ${
        darkMode
          ? 'bg-[#00001a]/40 border-white/10'
          : 'bg-white/40 border-white/20'
      }`}>
        <div className="p-6">
          <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
            📋 Scheduled Slots
          </h3>
          <div className="space-y-4">
            {scheduledSlots.map((slot) => (
              <div
                key={slot.id}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  darkMode ? 'bg-[#00001a]/20 border-white/10' : 'bg-white/20 border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${getStatusColor(slot.status)}`}>
                      📚
                    </div>
                    <div>
                      <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        {slot.title}
                      </h4>
                      <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                        {slot.date} • {slot.startTime} - {slot.endTime}
                      </p>
                      <div className="flex items-center space-x-3 mt-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(slot.status)}`}>
                          {slot.status}
                        </span>
                        <span className={`text-xs ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`}>
                          {slot.bookedStudents}/{slot.maxStudents} students
                        </span>
                        <span className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                          ${slot.price}
                        </span>
                        {slot.recurring && (
                          <span className={`px-2 py-1 rounded text-xs ${
                            darkMode ? 'bg-white/20 text-white' : 'bg-[#00001a]/20 text-[#00001a]'
                          }`}>
                            🔄 {slot.recurringType}
                          </span>
                        )}
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

      {/* Create Slot Modal */}
      {showCreateSlot && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className={`max-w-lg w-full mx-4 rounded-2xl border shadow-2xl max-h-[90vh] overflow-y-auto ${
            darkMode
              ? 'bg-[#00001a]/90 border-white/10'
              : 'bg-white/90 border-white/20'
          }`}>
            <div className="p-6">
              <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                Create New Slot
              </h3>
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                    Title
                  </label>
                  <input
                    type="text"
                    value={newSlot.title}
                    onChange={(e) => setNewSlot({...newSlot, title: e.target.value})}
                    className={`w-full p-2 rounded-lg border ${
                      darkMode
                        ? 'bg-[#00001a]/20 border-white/20 text-white'
                        : 'bg-white/20 border-white/30 text-[#00001a]'
                    }`}
                    placeholder="Enter slot title"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                      Date
                    </label>
                    <input
                      type="date"
                      value={newSlot.date}
                      onChange={(e) => setNewSlot({...newSlot, date: e.target.value})}
                      className={`w-full p-2 rounded-lg border ${
                        darkMode
                          ? 'bg-[#00001a]/20 border-white/20 text-white'
                          : 'bg-white/20 border-white/30 text-[#00001a]'
                      }`}
                    />
                  </div>
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
                      placeholder="Subject"
                    />
                  </div>
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

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                      Max Students
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={newSlot.maxStudents}
                      onChange={(e) => setNewSlot({...newSlot, maxStudents: parseInt(e.target.value)})}
                      className={`w-full p-2 rounded-lg border ${
                        darkMode
                          ? 'bg-[#00001a]/20 border-white/20 text-white'
                          : 'bg-white/20 border-white/30 text-[#00001a]'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                      Price ($)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={newSlot.price}
                      onChange={(e) => setNewSlot({...newSlot, price: parseFloat(e.target.value)})}
                      className={`w-full p-2 rounded-lg border ${
                        darkMode
                          ? 'bg-[#00001a]/20 border-white/20 text-white'
                          : 'bg-white/20 border-white/30 text-[#00001a]'
                      }`}
                    />
                  </div>
                </div>

                {/* Recurring Options */}
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={newSlot.recurring}
                      onChange={(e) => setNewSlot({...newSlot, recurring: e.target.checked})}
                      className="rounded"
                    />
                    <span className={`text-sm font-medium ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                      Recurring Session
                    </span>
                  </label>
                  
                  {newSlot.recurring && (
                    <div className="mt-2 grid grid-cols-2 gap-4">
                      <select
                        value={newSlot.recurringType}
                        onChange={(e) => setNewSlot({...newSlot, recurringType: e.target.value})}
                        className={`p-2 rounded-lg border ${
                          darkMode
                            ? 'bg-[#00001a]/20 border-white/20 text-white'
                            : 'bg-white/20 border-white/30 text-[#00001a]'
                        }`}
                      >
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                      <input
                        type="date"
                        value={newSlot.recurringEnd}
                        onChange={(e) => setNewSlot({...newSlot, recurringEnd: e.target.value})}
                        className={`p-2 rounded-lg border ${
                          darkMode
                            ? 'bg-[#00001a]/20 border-white/20 text-white'
                            : 'bg-white/20 border-white/30 text-[#00001a]'
                        }`}
                        placeholder="End date"
                      />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={handleCreateSlot}
                  className={`flex-1 py-2 rounded-lg font-medium transition-all duration-300 ${
                    darkMode
                      ? 'bg-white/20 text-white hover:bg-white/30'
                      : 'bg-[#00001a]/20 text-[#00001a] hover:bg-[#00001a]/30'
                  }`}
                >
                  Create Slot
                </button>
                <button
                  onClick={() => setShowCreateSlot(false)}
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

export default ScheduleManagement
