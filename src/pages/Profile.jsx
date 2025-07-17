import React, { useState, useEffect } from 'react'

const Profile = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState('Profile')
  const [profileData, setProfileData] = useState({
    firstName: 'pred',
    lastName: '',
    email: 'pred@gmail.com',
    phone: '',
    country: '',
    city: '',
    gender: '',
    dob: '',
    bio: '',
    website: '',
    github: '',
    linkedin: '',
    profilePic: null,
    languages: [],
    skills: [],
    projects: [],
    experience: [],
    achievements: [],
    bankAccount: {
      accountNumber: '',
      routingNumber: '',
      bankName: ''
    }
  })

  const [followers] = useState(1234)
  const [interests, setInterests] = useState(['Programming', 'AI/ML', 'Web Development', 'Teaching'])
  const [profileCompletion, setProfileCompletion] = useState(75)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showBankModal, setShowBankModal] = useState(false)
  const [show2FAModal, setShow2FAModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showDeactivateConfirm, setShowDeactivateConfirm] = useState(false)
  const [saveStatus, setSaveStatus] = useState('') // 'saving', 'saved', 'error'
  const [availabilitySaveStatus, setAvailabilitySaveStatus] = useState('') // 'saving', 'saved', 'error'
  const [weeklySchedule, setWeeklySchedule] = useState({
    monday: { enabled: true, startTime: '09:00', endTime: '17:00' },
    tuesday: { enabled: true, startTime: '09:00', endTime: '17:00' },
    wednesday: { enabled: true, startTime: '09:00', endTime: '17:00' },
    thursday: { enabled: true, startTime: '09:00', endTime: '17:00' },
    friday: { enabled: true, startTime: '09:00', endTime: '17:00' },
    saturday: { enabled: false, startTime: '10:00', endTime: '16:00' },
    sunday: { enabled: false, startTime: '10:00', endTime: '16:00' }
  })
  const [selectedTimeZone, setSelectedTimeZone] = useState('UTC-5')
  const [showTimeZoneModal, setShowTimeZoneModal] = useState(false)

  const tabs = ['Profile', 'Expertise', 'Availability', 'Settings']
  const availableInterests = ['Programming', 'AI/ML', 'Web Development', 'Teaching', 'Data Science', 'Mobile Development', 'DevOps', 'UI/UX Design', 'Blockchain', 'Cybersecurity']
  const languages = ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Portuguese', 'Russian', 'Arabic', 'Hindi']
  const skillCategories = ['Frontend Development', 'Backend Development', 'Mobile Development', 'Data Science', 'Machine Learning', 'DevOps', 'UI/UX Design', 'Database Management']
  const timeZones = [
    { value: 'UTC-12', label: 'UTC-12 (Baker Island)' },
    { value: 'UTC-11', label: 'UTC-11 (American Samoa)' },
    { value: 'UTC-10', label: 'UTC-10 (Hawaii)' },
    { value: 'UTC-9', label: 'UTC-9 (Alaska)' },
    { value: 'UTC-8', label: 'UTC-8 (Pacific Time)' },
    { value: 'UTC-7', label: 'UTC-7 (Mountain Time)' },
    { value: 'UTC-6', label: 'UTC-6 (Central Time)' },
    { value: 'UTC-5', label: 'UTC-5 (Eastern Time)' },
    { value: 'UTC-4', label: 'UTC-4 (Atlantic Time)' },
    { value: 'UTC-3', label: 'UTC-3 (Argentina)' },
    { value: 'UTC-2', label: 'UTC-2 (South Georgia)' },
    { value: 'UTC-1', label: 'UTC-1 (Azores)' },
    { value: 'UTC+0', label: 'UTC+0 (London, Dublin)' },
    { value: 'UTC+1', label: 'UTC+1 (Paris, Berlin)' },
    { value: 'UTC+2', label: 'UTC+2 (Cairo, Athens)' },
    { value: 'UTC+3', label: 'UTC+3 (Moscow, Istanbul)' },
    { value: 'UTC+4', label: 'UTC+4 (Dubai, Baku)' },
    { value: 'UTC+5', label: 'UTC+5 (Karachi, Tashkent)' },
    { value: 'UTC+6', label: 'UTC+6 (Dhaka, Almaty)' },
    { value: 'UTC+7', label: 'UTC+7 (Bangkok, Jakarta)' },
    { value: 'UTC+8', label: 'UTC+8 (Beijing, Singapore)' },
    { value: 'UTC+9', label: 'UTC+9 (Tokyo, Seoul)' },
    { value: 'UTC+10', label: 'UTC+10 (Sydney, Melbourne)' },
    { value: 'UTC+11', label: 'UTC+11 (Solomon Islands)' },
    { value: 'UTC+12', label: 'UTC+12 (New Zealand)' }
  ]
  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

  const toggleInterest = (interest) => {
    setInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    )
  }

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleNestedInputChange = (parent, field, value) => {
    setProfileData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }))
  }

  // Calculate profile completion dynamically
  const calculateProfileCompletion = () => {
    const fields = [
      profileData.firstName,
      profileData.lastName,
      profileData.email,
      profileData.phone,
      profileData.country,
      profileData.city,
      profileData.bio,
      profileData.website,
      profileData.github,
      profileData.linkedin
    ]
    const filledFields = fields.filter(field => field && field.trim() !== '').length
    const interestsFilled = interests.length > 0 ? 1 : 0
    const totalFields = fields.length + 1
    return Math.round(((filledFields + interestsFilled) / totalFields) * 100)
  }

  // Update profile completion when data changes
  useEffect(() => {
    setProfileCompletion(calculateProfileCompletion())
  }, [profileData, interests])

  // Button handlers
  const handleSaveProfile = async () => {
    setSaveStatus('saving')
    try {
      console.log('💾 Saving profile data:', profileData)

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Here you would make actual API call:
      // const response = await fetch('/api/profile', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ ...profileData, interests })
      // })

      setSaveStatus('saved')
      setTimeout(() => setSaveStatus(''), 3000)
    } catch (error) {
      console.error('Error saving profile:', error)
      setSaveStatus('error')
      setTimeout(() => setSaveStatus(''), 3000)
    }
  }

  const handleChangePassword = () => {
    setShowPasswordModal(true)
  }

  const handleTwoFactorAuth = () => {
    setShow2FAModal(true)
  }

  const handleAddBankAccount = () => {
    setShowBankModal(true)
  }

  const handleDeactivateAccount = () => {
    setShowDeactivateConfirm(true)
  }

  const handleDeleteAccount = () => {
    setShowDeleteConfirm(true)
  }

  const handleAccountSettings = () => {
    setActiveTab('Settings')
  }

  // Availability handlers
  const handleScheduleToggle = (day) => {
    setWeeklySchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        enabled: !prev[day].enabled
      }
    }))
  }

  const handleTimeChange = (day, timeType, value) => {
    setWeeklySchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [timeType]: value
      }
    }))
  }

  const handleTimeZoneChange = (timezone) => {
    setSelectedTimeZone(timezone)
    setShowTimeZoneModal(false)
    console.log('🌍 Timezone changed to:', timezone)
  }

  const handleSaveAvailability = async () => {
    setAvailabilitySaveStatus('saving')
    try {
      console.log('📅 Saving availability settings:', { weeklySchedule, selectedTimeZone })

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Here you would make actual API call:
      // const response = await fetch('/api/availability', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ weeklySchedule, selectedTimeZone })
      // })

      setAvailabilitySaveStatus('saved')
      setTimeout(() => setAvailabilitySaveStatus(''), 3000)
    } catch (error) {
      console.error('Error saving availability:', error)
      setAvailabilitySaveStatus('error')
      setTimeout(() => setAvailabilitySaveStatus(''), 3000)
    }
  }

  // Confirmation handlers
  const confirmDeactivateAccount = async () => {
    try {
      console.log('⏸️ Deactivating account...')
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Here you would make actual API call:
      // await fetch('/api/account/deactivate', { method: 'POST' })

      alert('Account has been deactivated successfully.')
      setShowDeactivateConfirm(false)
    } catch (error) {
      console.error('Error deactivating account:', error)
      alert('Failed to deactivate account. Please try again.')
    }
  }

  const confirmDeleteAccount = async () => {
    try {
      console.log('🗑️ Deleting account...')
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Here you would make actual API call:
      // await fetch('/api/account/delete', { method: 'DELETE' })

      alert('Account has been deleted successfully.')
      setShowDeleteConfirm(false)
      // Redirect to login or home page
    } catch (error) {
      console.error('Error deleting account:', error)
      alert('Failed to delete account. Please try again.')
    }
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode ? 'bg-[#00001a]' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <div className="p-6 pb-0">
        <div className="flex items-center justify-between mb-6">
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
            My Profile
          </h1>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Profile Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Profile Card */}
          <div className="lg:col-span-1">
            <div className={`group p-6 backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden cursor-pointer ${
              darkMode
                ? 'rounded-lg bg-white/3 border-white/20 hover:bg-white/8 hover:border-white/30'
                : 'rounded-2xl bg-white border-gray-200'
            }`}
            style={darkMode ? {
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
            } : {
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              if (darkMode) {
                e.currentTarget.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)';
              } else {
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
              }
            }}
            onMouseLeave={(e) => {
              if (darkMode) {
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)';
              } else {
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
              }
            }}>
              {/* Profile Picture */}
              <div className="text-center mb-6">
                <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center text-3xl font-bold mb-4 ${
                  darkMode ? 'bg-white/10 text-white' : 'bg-gray-200 text-[#00001a]'
                }`}>
                  P
                </div>
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  {profileData.firstName}
                </h2>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 ${
                  darkMode ? 'bg-white/10 text-white' : 'bg-gray-100 text-[#00001a]'
                }`}>
                  Solver
                </div>
              </div>

              {/* Account Information */}
              <div className="space-y-4">
                <h3 className={`text-sm font-semibold ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                  Account Information
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>👤</span>
                    <span className={`text-sm ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>Username</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>📧</span>
                    <span className={`text-sm ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>Email</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>📅</span>
                    <span className={`text-sm ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>Member Since</span>
                  </div>
                  <div className={`text-sm ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`}>
                    4/14/2025
                  </div>
                </div>

                {/* Account Settings Button */}
                <button
                  onClick={handleAccountSettings}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 backdrop-blur-sm border ${
                    darkMode
                      ? 'bg-white/5 text-white/80 border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-lg'
                      : 'bg-gray-100 text-[#00001a] border-gray-200 hover:bg-gray-200'
                  }`}
                  style={darkMode ? {
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                  } : {}}
                  onMouseEnter={(e) => {
                    if (darkMode) {
                      e.currentTarget.style.boxShadow = '0 0 15px rgba(59, 130, 246, 0.15), 0 4px 15px rgba(0, 0, 0, 0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (darkMode) {
                      e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
                    }
                  }}
                >
                  <span>⚙️</span>
                  Account Settings
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-1 mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeTab === tab
                      ? darkMode
                        ? 'bg-white/15 text-white border border-white/30'
                        : 'bg-white text-[#00001a] border border-gray-300 shadow-sm'
                      : darkMode
                        ? 'text-white/70 hover:bg-white/5 hover:text-white'
                        : 'text-[#00001a]/70 hover:bg-gray-100 hover:text-[#00001a]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Profile Completion & Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Profile Completion */}
              <div className={`group p-4 backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden cursor-pointer ${
                darkMode
                  ? 'rounded-lg bg-white/3 border-white/20 hover:bg-white/8 hover:border-white/30'
                  : 'rounded-2xl bg-white border-gray-200'
              }`}
              style={darkMode ? {
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              } : {
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (darkMode) {
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)';
                } else {
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (darkMode) {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)';
                } else {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                }
              }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">📊</span>
                  <h3 className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Profile Completion
                  </h3>
                </div>
                <div className="mb-2">
                  <div className={`w-full rounded-full h-2 ${
                    darkMode ? 'bg-white/10' : 'bg-gray-200'
                  }`}>
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        darkMode ? 'bg-white' : 'bg-[#00001a]'
                      }`}
                      style={{width: `${profileCompletion}%`}}
                    ></div>
                  </div>
                </div>
                <p className={`text-xs ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                  {profileCompletion}% Complete
                </p>
              </div>

              {/* Followers */}
              <div className={`group p-4 backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden cursor-pointer ${
                darkMode
                  ? 'rounded-lg bg-white/3 border-white/20 hover:bg-white/8 hover:border-white/30'
                  : 'rounded-2xl bg-white border-gray-200'
              }`}
              style={darkMode ? {
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              } : {
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (darkMode) {
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)';
                } else {
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (darkMode) {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)';
                } else {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                }
              }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">👥</span>
                  <h3 className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Followers
                  </h3>
                </div>
                <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  {followers.toLocaleString()}
                </div>
                <p className={`text-xs ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                  People following you
                </p>
              </div>

              {/* Rate Limit */}
              <div className={`group p-4 backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden cursor-pointer ${
                darkMode
                  ? 'rounded-lg bg-white/3 border-white/20 hover:bg-white/8 hover:border-white/30'
                  : 'rounded-2xl bg-white border-gray-200'
              }`}
              style={darkMode ? {
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              } : {
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (darkMode) {
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)';
                } else {
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (darkMode) {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)';
                } else {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                }
              }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">⚡</span>
                  <h3 className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Rate Limit
                  </h3>
                </div>
                <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  $45/hr
                </div>
                <p className={`text-xs ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                  Current hourly rate
                </p>
              </div>
            </div>

            {/* Main Content */}
            <div className={`group p-6 backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden ${
              darkMode
                ? 'rounded-lg bg-white/3 border-white/20 hover:bg-white/8 hover:border-white/30'
                : 'rounded-2xl bg-white border-gray-200'
            }`}
            style={darkMode ? {
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
            } : {
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              if (darkMode) {
                e.currentTarget.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)';
              } else {
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
              }
            }}
            onMouseLeave={(e) => {
              if (darkMode) {
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)';
              } else {
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
              }
            }}>
              {/* Tab Content */}
              {activeTab === 'Profile' && (
                <div>
                  <h3 className={`text-xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Profile Information
                  </h3>
                  <p className={`text-sm mb-6 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                    Update your personal information and contact details
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Full Name */}
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={profileData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg backdrop-blur-sm border transition-all duration-300 ${
                          darkMode
                            ? 'bg-white/5 text-white border-white/10 focus:border-white/30 focus:bg-white/10'
                            : 'bg-white text-[#00001a] border-gray-200 focus:border-gray-300'
                        }`}
                        placeholder="Enter your full name"
                      />
                    </div>

                    {/* Email Address */}
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg backdrop-blur-sm border transition-all duration-300 ${
                          darkMode
                            ? 'bg-white/5 text-white border-white/10 focus:border-white/30 focus:bg-white/10'
                            : 'bg-white text-[#00001a] border-gray-200 focus:border-gray-300'
                        }`}
                        placeholder="Enter your email address"
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg backdrop-blur-sm border transition-all duration-300 ${
                          darkMode
                            ? 'bg-white/5 text-white border-white/10 focus:border-white/30 focus:bg-white/10'
                            : 'bg-white text-[#00001a] border-gray-200 focus:border-gray-300'
                        }`}
                        placeholder="Your phone number"
                      />
                    </div>

                    {/* Location */}
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                        Location
                      </label>
                      <input
                        type="text"
                        value={`${profileData.city}${profileData.city && profileData.country ? ', ' : ''}${profileData.country}`}
                        onChange={(e) => {
                          const parts = e.target.value.split(',').map(part => part.trim());
                          handleInputChange('city', parts[0] || '');
                          handleInputChange('country', parts[1] || '');
                        }}
                        className={`w-full px-4 py-3 rounded-lg backdrop-blur-sm border transition-all duration-300 ${
                          darkMode
                            ? 'bg-white/5 text-white border-white/10 focus:border-white/30 focus:bg-white/10'
                            : 'bg-white text-[#00001a] border-gray-200 focus:border-gray-300'
                        }`}
                        placeholder="City, Country"
                      />
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="mb-8">
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                      Bio
                    </label>
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg backdrop-blur-sm border transition-all duration-300 min-h-[120px] ${
                        darkMode
                          ? 'bg-white/5 text-white border-white/10 focus:border-white/30 focus:bg-white/10'
                          : 'bg-white text-[#00001a] border-gray-200 focus:border-gray-300'
                      }`}
                      placeholder="Tell us about yourself, your skills, and experience"
                    ></textarea>
                  </div>

                  {/* Social Links */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                        Website
                      </label>
                      <input
                        type="url"
                        value={profileData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg backdrop-blur-sm border transition-all duration-300 ${
                          darkMode
                            ? 'bg-white/5 text-white border-white/10 focus:border-white/30 focus:bg-white/10'
                            : 'bg-white text-[#00001a] border-gray-200 focus:border-gray-300'
                        }`}
                        placeholder="https://yourwebsite.com"
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                        GitHub
                      </label>
                      <input
                        type="url"
                        value={profileData.github}
                        onChange={(e) => handleInputChange('github', e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg backdrop-blur-sm border transition-all duration-300 ${
                          darkMode
                            ? 'bg-white/5 text-white border-white/10 focus:border-white/30 focus:bg-white/10'
                            : 'bg-white text-[#00001a] border-gray-200 focus:border-gray-300'
                        }`}
                        placeholder="https://github.com/username"
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                        LinkedIn
                      </label>
                      <input
                        type="url"
                        value={profileData.linkedin}
                        onChange={(e) => handleInputChange('linkedin', e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg backdrop-blur-sm border transition-all duration-300 ${
                          darkMode
                            ? 'bg-white/5 text-white border-white/10 focus:border-white/30 focus:bg-white/10'
                            : 'bg-white text-[#00001a] border-gray-200 focus:border-gray-300'
                        }`}
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>
                  </div>

                  {/* Interests */}
                  <div className="mb-8">
                    <label className={`block text-sm font-medium mb-4 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                      Interests
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {availableInterests.map((interest) => (
                        <button
                          key={interest}
                          onClick={() => toggleInterest(interest)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                            interests.includes(interest)
                              ? darkMode
                                ? 'bg-white/15 text-white border border-white/30'
                                : 'bg-[#00001a]/10 text-[#00001a] border border-[#00001a]/20'
                              : darkMode
                                ? 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 hover:text-white'
                                : 'bg-white text-[#00001a]/70 border border-gray-200 hover:bg-gray-100 hover:text-[#00001a]'
                          }`}
                        >
                          {interest}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="flex items-center justify-end gap-4">
                    {saveStatus && (
                      <div className={`flex items-center gap-2 text-sm ${
                        saveStatus === 'saving' ? (darkMode ? 'text-white/70' : 'text-[#00001a]/70') :
                        saveStatus === 'saved' ? (darkMode ? 'text-green-400' : 'text-green-600') :
                        saveStatus === 'error' ? (darkMode ? 'text-red-400' : 'text-red-600') : ''
                      }`}>
                        {saveStatus === 'saving' && (
                          <>
                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                            Saving...
                          </>
                        )}
                        {saveStatus === 'saved' && (
                          <>
                            <span>✓</span>
                            Changes saved successfully!
                          </>
                        )}
                        {saveStatus === 'error' && (
                          <>
                            <span>✗</span>
                            Failed to save changes
                          </>
                        )}
                      </div>
                    )}
                    <button
                      onClick={handleSaveProfile}
                      disabled={saveStatus === 'saving'}
                      className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 backdrop-blur-sm border ${
                        saveStatus === 'saving'
                          ? darkMode
                            ? 'bg-white/50 text-[#00001a]/50 border-white/10 cursor-not-allowed'
                            : 'bg-[#00001a]/50 text-white/50 border-[#00001a]/10 cursor-not-allowed'
                          : darkMode
                            ? 'bg-white text-[#00001a] border-white/20 hover:bg-white/90 hover:shadow-lg'
                            : 'bg-[#00001a] text-white border-[#00001a]/20 hover:bg-[#00001a]/90'
                      }`}
                      style={darkMode && saveStatus !== 'saving' ? {
                        boxShadow: '0 4px 20px rgba(255, 255, 255, 0.1)',
                        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                      } : {}}
                      onMouseEnter={(e) => {
                        if (darkMode && saveStatus !== 'saving') {
                          e.currentTarget.style.boxShadow = '0 0 15px rgba(59, 130, 246, 0.15), 0 4px 15px rgba(0, 0, 0, 0.1)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (darkMode && saveStatus !== 'saving') {
                          e.currentTarget.style.boxShadow = '0 4px 20px rgba(255, 255, 255, 0.1)';
                        }
                      }}
                    >
                      {saveStatus === 'saving' ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              )}

              {/* Expertise Tab */}
              {activeTab === 'Expertise' && (
                <div>
                  <h3 className={`text-xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Skills & Expertise
                  </h3>

                  {/* Skills Section */}
                  <div className="mb-8">
                    <h4 className={`text-lg font-medium mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      Technical Skills
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {skillCategories.map((category) => (
                        <div key={category} className={`p-4 rounded-lg border ${
                          darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'
                        }`}>
                          <h5 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                            {category}
                          </h5>
                          <div className="flex items-center gap-2">
                            <div className={`flex-1 h-2 rounded-full ${darkMode ? 'bg-white/10' : 'bg-gray-200'}`}>
                              <div className={`h-2 rounded-full ${darkMode ? 'bg-white' : 'bg-[#00001a]'}`}
                                   style={{width: `${Math.floor(Math.random() * 40) + 60}%`}}></div>
                            </div>
                            <span className={`text-xs ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                              Expert
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="mb-8">
                    <h4 className={`text-lg font-medium mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      Languages
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {languages.slice(0, 5).map((language) => (
                        <span key={language} className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                          darkMode ? 'bg-white/10 text-white' : 'bg-gray-100 text-[#00001a]'
                        }`}>
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Projects Overview */}
                  <div className="mb-8">
                    <h4 className={`text-lg font-medium mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      Recent Projects
                    </h4>
                    <div className="space-y-4">
                      {[1, 2, 3].map((project) => (
                        <div key={project} className={`p-4 rounded-lg border ${
                          darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'
                        }`}>
                          <h5 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                            Project {project}
                          </h5>
                          <p className={`text-sm mb-2 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                            Brief description of the project and technologies used.
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {['React', 'Node.js', 'MongoDB'].map((tech) => (
                              <span key={tech} className={`px-2 py-1 rounded text-xs ${
                                darkMode ? 'bg-white/10 text-white/80' : 'bg-gray-100 text-[#00001a]/80'
                              }`}>
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Availability Tab */}
              {activeTab === 'Availability' && (
                <div>
                  <h3 className={`text-xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Availability Settings
                  </h3>
                  <p className={`text-sm mb-6 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                    Manage your availability and scheduling preferences
                  </p>

                  {/* Weekly Schedule */}
                  <div className={`p-6 rounded-lg border mb-6 ${
                    darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'
                  }`}>
                    <h4 className={`text-lg font-medium mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      Weekly Schedule
                    </h4>
                    <p className={`text-sm mb-6 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                      Set your available hours for each day of the week
                    </p>

                    <div className="space-y-4">
                      {daysOfWeek.map((day) => (
                        <div key={day} className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-300 ${
                          darkMode ? 'bg-white/3 border-white/10 hover:bg-white/5' : 'bg-white border-gray-200 hover:bg-gray-50'
                        }`}>
                          <div className="flex items-center gap-4">
                            <button
                              onClick={() => handleScheduleToggle(day)}
                              className={`w-12 h-6 rounded-full transition-all duration-300 relative shadow-inner ${
                                weeklySchedule[day].enabled
                                  ? darkMode
                                    ? 'bg-white shadow-white/20'
                                    : 'bg-blue-500 shadow-blue-500/30'
                                  : darkMode
                                    ? 'bg-white/20 shadow-black/20'
                                    : 'bg-gray-300 shadow-gray-400/30'
                              }`}
                            >
                              <div className={`w-5 h-5 rounded-full transition-all duration-300 absolute top-0.5 shadow-md ${
                                weeklySchedule[day].enabled
                                  ? darkMode
                                    ? 'right-0.5 bg-[#00001a] shadow-black/30'
                                    : 'right-0.5 bg-white shadow-gray-300/50'
                                  : darkMode
                                    ? 'left-0.5 bg-white shadow-white/30'
                                    : 'left-0.5 bg-white shadow-gray-400/50'
                              }`}></div>
                            </button>
                            <span className={`text-sm font-medium capitalize min-w-[80px] ${
                              darkMode ? 'text-white' : 'text-[#00001a]'
                            }`}>
                              {day}
                            </span>
                          </div>

                          {weeklySchedule[day].enabled && (
                            <div className="flex items-center gap-3">
                              <input
                                type="time"
                                value={weeklySchedule[day].startTime}
                                onChange={(e) => handleTimeChange(day, 'startTime', e.target.value)}
                                className={`px-3 py-2 rounded-lg text-sm backdrop-blur-sm border transition-all duration-300 ${
                                  darkMode
                                    ? 'bg-white/5 text-white border-white/10 focus:border-white/30'
                                    : 'bg-white text-[#00001a] border-gray-200 focus:border-gray-300'
                                }`}
                              />
                              <span className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                                to
                              </span>
                              <input
                                type="time"
                                value={weeklySchedule[day].endTime}
                                onChange={(e) => handleTimeChange(day, 'endTime', e.target.value)}
                                className={`px-3 py-2 rounded-lg text-sm backdrop-blur-sm border transition-all duration-300 ${
                                  darkMode
                                    ? 'bg-white/5 text-white border-white/10 focus:border-white/30'
                                    : 'bg-white text-[#00001a] border-gray-200 focus:border-gray-300'
                                }`}
                              />
                            </div>
                          )}

                          {!weeklySchedule[day].enabled && (
                            <span className={`text-sm ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`}>
                              Unavailable
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Time Zone */}
                  <div className={`p-6 rounded-lg border mb-6 ${
                    darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'
                  }`}>
                    <h4 className={`text-lg font-medium mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      Time Zone
                    </h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`text-sm mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                          Current: {timeZones.find(tz => tz.value === selectedTimeZone)?.label || selectedTimeZone}
                        </p>
                        <p className={`text-xs ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                          This affects how your availability is displayed to students
                        </p>
                      </div>
                      <button
                        onClick={() => setShowTimeZoneModal(true)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 backdrop-blur-sm border ${
                          darkMode
                            ? 'bg-white/10 text-white border-white/20 hover:bg-white/20 hover:shadow-lg'
                            : 'bg-gray-100 text-[#00001a] border-gray-200 hover:bg-gray-200'
                        }`}
                      >
                        Change
                      </button>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="flex items-center justify-end gap-4">
                    {availabilitySaveStatus && (
                      <div className={`flex items-center gap-2 text-sm ${
                        availabilitySaveStatus === 'saving' ? (darkMode ? 'text-white/70' : 'text-[#00001a]/70') :
                        availabilitySaveStatus === 'saved' ? (darkMode ? 'text-green-400' : 'text-green-600') :
                        availabilitySaveStatus === 'error' ? (darkMode ? 'text-red-400' : 'text-red-600') : ''
                      }`}>
                        {availabilitySaveStatus === 'saving' && (
                          <>
                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                            Saving availability...
                          </>
                        )}
                        {availabilitySaveStatus === 'saved' && (
                          <>
                            <span>✓</span>
                            Availability saved successfully!
                          </>
                        )}
                        {availabilitySaveStatus === 'error' && (
                          <>
                            <span>✗</span>
                            Failed to save availability
                          </>
                        )}
                      </div>
                    )}
                    <button
                      onClick={handleSaveAvailability}
                      disabled={availabilitySaveStatus === 'saving'}
                      className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 backdrop-blur-sm border ${
                        availabilitySaveStatus === 'saving'
                          ? darkMode
                            ? 'bg-white/50 text-[#00001a]/50 border-white/10 cursor-not-allowed'
                            : 'bg-blue-300 text-white/70 border-blue-200 cursor-not-allowed'
                          : darkMode
                            ? 'bg-white text-[#00001a] border-white/20 hover:bg-white/90 hover:shadow-lg'
                            : 'bg-blue-500 text-white border-blue-400 hover:bg-blue-600 shadow-lg hover:shadow-blue-500/30'
                      }`}
                      style={darkMode && availabilitySaveStatus !== 'saving' ? {
                        boxShadow: '0 4px 20px rgba(255, 255, 255, 0.1)',
                        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                      } : !darkMode && availabilitySaveStatus !== 'saving' ? {
                        boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3)',
                        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                      } : {}}
                      onMouseEnter={(e) => {
                        if (availabilitySaveStatus !== 'saving') {
                          if (darkMode) {
                            e.currentTarget.style.boxShadow = '0 0 15px rgba(59, 130, 246, 0.15), 0 4px 15px rgba(0, 0, 0, 0.1)';
                          } else {
                            e.currentTarget.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.4), 0 4px 20px rgba(59, 130, 246, 0.2)';
                          }
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (availabilitySaveStatus !== 'saving') {
                          if (darkMode) {
                            e.currentTarget.style.boxShadow = '0 4px 20px rgba(255, 255, 255, 0.1)';
                          } else {
                            e.currentTarget.style.boxShadow = '0 4px 20px rgba(59, 130, 246, 0.3)';
                          }
                        }
                      }}
                    >
                      {availabilitySaveStatus === 'saving' ? 'Saving...' : 'Save Availability'}
                    </button>
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'Settings' && (
                <div>
                  <h3 className={`text-xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Account Settings
                  </h3>

                  {/* Security Settings */}
                  <div className="mb-8">
                    <h4 className={`text-lg font-medium mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      Security
                    </h4>
                    <div className="space-y-4">
                      <button
                        onClick={handleChangePassword}
                        className={`w-full p-4 rounded-lg border text-left transition-all duration-300 backdrop-blur-sm ${
                          darkMode
                            ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white hover:shadow-lg'
                            : 'bg-white border-gray-200 hover:bg-gray-50 text-[#00001a]'
                        }`}
                        style={darkMode ? {
                          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
                          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                        } : {}}
                        onMouseEnter={(e) => {
                          if (darkMode) {
                            e.currentTarget.style.boxShadow = '0 0 15px rgba(59, 130, 246, 0.15), 0 4px 15px rgba(0, 0, 0, 0.1)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (darkMode) {
                            e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
                          }
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-medium">Change Password</h5>
                            <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                              Update your account password
                            </p>
                          </div>
                          <span className="text-lg">🔒</span>
                        </div>
                      </button>

                      <button
                        onClick={handleTwoFactorAuth}
                        className={`w-full p-4 rounded-lg border text-left transition-all duration-300 backdrop-blur-sm ${
                          darkMode
                            ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white hover:shadow-lg'
                            : 'bg-white border-gray-200 hover:bg-gray-50 text-[#00001a]'
                        }`}
                        style={darkMode ? {
                          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
                          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                        } : {}}
                        onMouseEnter={(e) => {
                          if (darkMode) {
                            e.currentTarget.style.boxShadow = '0 0 15px rgba(59, 130, 246, 0.15), 0 4px 15px rgba(0, 0, 0, 0.1)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (darkMode) {
                            e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
                          }
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-medium">Two-Factor Authentication</h5>
                            <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                              Add an extra layer of security
                            </p>
                          </div>
                          <span className="text-lg">📱</span>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Bank Account */}
                  <div className="mb-8">
                    <h4 className={`text-lg font-medium mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      Payment Information
                    </h4>
                    <div className={`p-4 rounded-lg border ${
                      darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'
                    }`}>
                      <h5 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        Bank Account
                      </h5>
                      <p className={`text-sm mb-4 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                        Add your bank account for payments
                      </p>
                      <button
                        onClick={handleAddBankAccount}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 backdrop-blur-sm border ${
                          darkMode
                            ? 'bg-white/10 text-white border-white/20 hover:bg-white/20 hover:shadow-lg'
                            : 'bg-gray-100 text-[#00001a] border-gray-200 hover:bg-gray-200'
                        }`}
                        style={darkMode ? {
                          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
                          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                        } : {}}
                        onMouseEnter={(e) => {
                          if (darkMode) {
                            e.currentTarget.style.boxShadow = '0 0 15px rgba(59, 130, 246, 0.15), 0 4px 15px rgba(0, 0, 0, 0.1)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (darkMode) {
                            e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
                          }
                        }}
                      >
                        Add Bank Account
                      </button>
                    </div>
                  </div>

                  {/* Danger Zone */}
                  <div className="mb-8">
                    <h4 className={`text-lg font-medium mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      Danger Zone
                    </h4>
                    <div className="space-y-3">
                      <button
                        onClick={handleDeactivateAccount}
                        className={`w-full p-4 rounded-lg border text-left transition-all duration-300 backdrop-blur-sm ${
                          darkMode
                            ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white hover:shadow-lg'
                            : 'bg-white border-gray-200 hover:bg-gray-50 text-[#00001a]'
                        }`}
                        style={darkMode ? {
                          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
                          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                        } : {}}
                        onMouseEnter={(e) => {
                          if (darkMode) {
                            e.currentTarget.style.boxShadow = '0 0 15px rgba(59, 130, 246, 0.15), 0 4px 15px rgba(0, 0, 0, 0.1)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (darkMode) {
                            e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
                          }
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-medium">Deactivate Account</h5>
                            <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                              Temporarily disable your account
                            </p>
                          </div>
                          <span className="text-lg">⏸️</span>
                        </div>
                      </button>

                      <button
                        onClick={handleDeleteAccount}
                        className={`w-full p-4 rounded-lg border text-left transition-all duration-300 backdrop-blur-sm ${
                          darkMode
                            ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white hover:shadow-lg'
                            : 'bg-white border-gray-200 hover:bg-gray-50 text-[#00001a]'
                        }`}
                        style={darkMode ? {
                          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
                          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                        } : {}}
                        onMouseEnter={(e) => {
                          if (darkMode) {
                            e.currentTarget.style.boxShadow = '0 0 15px rgba(59, 130, 246, 0.15), 0 4px 15px rgba(0, 0, 0, 0.1)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (darkMode) {
                            e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
                          }
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-medium">Delete Account</h5>
                            <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                              Permanently delete your account and data
                            </p>
                          </div>
                          <span className="text-lg">🗑️</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modals */}
      {/* Deactivate Account Confirmation */}
      {showDeactivateConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`max-w-md w-full p-6 rounded-2xl backdrop-blur-xl border ${
            darkMode ? 'bg-[#00001a]/90 border-white/20' : 'bg-white/90 border-gray-200'
          }`}>
            <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
              Deactivate Account
            </h3>
            <p className={`text-sm mb-6 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
              Are you sure you want to deactivate your account? You can reactivate it later by logging in.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeactivateConfirm(false)}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  darkMode ? 'bg-white/10 text-white border border-white/20 hover:bg-white/20' : 'bg-gray-100 text-[#00001a] border border-gray-200 hover:bg-gray-200'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={confirmDeactivateAccount}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  darkMode ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 hover:bg-yellow-500/30' : 'bg-yellow-100 text-yellow-700 border border-yellow-200 hover:bg-yellow-200'
                }`}
              >
                Deactivate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`max-w-md w-full p-6 rounded-2xl backdrop-blur-xl border ${
            darkMode ? 'bg-[#00001a]/90 border-white/20' : 'bg-white/90 border-gray-200'
          }`}>
            <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
              Delete Account
            </h3>
            <p className={`text-sm mb-6 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
              Are you sure you want to permanently delete your account? This action cannot be undone and all your data will be lost.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  darkMode ? 'bg-white/10 text-white border border-white/20 hover:bg-white/20' : 'bg-gray-100 text-[#00001a] border border-gray-200 hover:bg-gray-200'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteAccount}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  darkMode ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30' : 'bg-red-100 text-red-700 border border-red-200 hover:bg-red-200'
                }`}
              >
                Delete Forever
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`max-w-md w-full p-6 rounded-2xl backdrop-blur-xl border ${
            darkMode ? 'bg-[#00001a]/90 border-white/20' : 'bg-white/90 border-gray-200'
          }`}>
            <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
              Change Password
            </h3>
            <div className="space-y-4 mb-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                  Current Password
                </label>
                <input
                  type="password"
                  className={`w-full px-4 py-3 rounded-lg backdrop-blur-sm border transition-all duration-300 ${
                    darkMode ? 'bg-white/5 text-white border-white/10 focus:border-white/30' : 'bg-white text-[#00001a] border-gray-200 focus:border-gray-300'
                  }`}
                  placeholder="Enter current password"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                  New Password
                </label>
                <input
                  type="password"
                  className={`w-full px-4 py-3 rounded-lg backdrop-blur-sm border transition-all duration-300 ${
                    darkMode ? 'bg-white/5 text-white border-white/10 focus:border-white/30' : 'bg-white text-[#00001a] border-gray-200 focus:border-gray-300'
                  }`}
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className={`w-full px-4 py-3 rounded-lg backdrop-blur-sm border transition-all duration-300 ${
                    darkMode ? 'bg-white/5 text-white border-white/10 focus:border-white/30' : 'bg-white text-[#00001a] border-gray-200 focus:border-gray-300'
                  }`}
                  placeholder="Confirm new password"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowPasswordModal(false)}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  darkMode ? 'bg-white/10 text-white border border-white/20 hover:bg-white/20' : 'bg-gray-100 text-[#00001a] border border-gray-200 hover:bg-gray-200'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  console.log('🔒 Password changed successfully')
                  setShowPasswordModal(false)
                  alert('Password changed successfully!')
                }}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  darkMode ? 'bg-white text-[#00001a] hover:bg-white/90' : 'bg-[#00001a] text-white hover:bg-[#00001a]/90'
                }`}
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Two-Factor Authentication Modal */}
      {show2FAModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`max-w-md w-full p-6 rounded-2xl backdrop-blur-xl border ${
            darkMode ? 'bg-[#00001a]/90 border-white/20' : 'bg-white/90 border-gray-200'
          }`}>
            <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
              Two-Factor Authentication
            </h3>
            <p className={`text-sm mb-6 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
              Scan this QR code with your authenticator app to set up two-factor authentication.
            </p>
            <div className={`w-48 h-48 mx-auto mb-6 rounded-lg border-2 border-dashed flex items-center justify-center ${
              darkMode ? 'border-white/20 bg-white/5' : 'border-gray-300 bg-gray-100'
            }`}>
              <span className={`text-sm ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>QR Code Here</span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShow2FAModal(false)}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  darkMode ? 'bg-white/10 text-white border border-white/20 hover:bg-white/20' : 'bg-gray-100 text-[#00001a] border border-gray-200 hover:bg-gray-200'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  console.log('📱 2FA setup completed')
                  setShow2FAModal(false)
                  alert('Two-factor authentication enabled successfully!')
                }}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  darkMode ? 'bg-white text-[#00001a] hover:bg-white/90' : 'bg-[#00001a] text-white hover:bg-[#00001a]/90'
                }`}
              >
                Enable 2FA
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bank Account Modal */}
      {showBankModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`max-w-md w-full p-6 rounded-2xl backdrop-blur-xl border ${
            darkMode ? 'bg-[#00001a]/90 border-white/20' : 'bg-white/90 border-gray-200'
          }`}>
            <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
              Add Bank Account
            </h3>
            <div className="space-y-4 mb-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                  Bank Name
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-3 rounded-lg backdrop-blur-sm border transition-all duration-300 ${
                    darkMode ? 'bg-white/5 text-white border-white/10 focus:border-white/30' : 'bg-white text-[#00001a] border-gray-200 focus:border-gray-300'
                  }`}
                  placeholder="Enter bank name"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                  Account Number
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-3 rounded-lg backdrop-blur-sm border transition-all duration-300 ${
                    darkMode ? 'bg-white/5 text-white border-white/10 focus:border-white/30' : 'bg-white text-[#00001a] border-gray-200 focus:border-gray-300'
                  }`}
                  placeholder="Enter account number"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                  Routing Number
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-3 rounded-lg backdrop-blur-sm border transition-all duration-300 ${
                    darkMode ? 'bg-white/5 text-white border-white/10 focus:border-white/30' : 'bg-white text-[#00001a] border-gray-200 focus:border-gray-300'
                  }`}
                  placeholder="Enter routing number"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowBankModal(false)}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  darkMode ? 'bg-white/10 text-white border border-white/20 hover:bg-white/20' : 'bg-gray-100 text-[#00001a] border border-gray-200 hover:bg-gray-200'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  console.log('🏦 Bank account added successfully')
                  setShowBankModal(false)
                  alert('Bank account added successfully!')
                }}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  darkMode ? 'bg-white text-[#00001a] hover:bg-white/90' : 'bg-[#00001a] text-white hover:bg-[#00001a]/90'
                }`}
              >
                Add Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Time Zone Selection Modal */}
      {showTimeZoneModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`max-w-md w-full max-h-[80vh] overflow-hidden rounded-2xl backdrop-blur-xl border ${
            darkMode ? 'bg-[#00001a]/90 border-white/20' : 'bg-white/90 border-gray-200'
          }`}>
            <div className="p-6 border-b border-white/10">
              <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                Select Time Zone
              </h3>
              <p className={`text-sm mt-2 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                Choose your local time zone for scheduling
              </p>
            </div>
            <div className="max-h-96 overflow-y-auto p-4">
              <div className="space-y-2">
                {timeZones.map((timezone) => (
                  <button
                    key={timezone.value}
                    onClick={() => handleTimeZoneChange(timezone.value)}
                    className={`w-full p-3 rounded-lg text-left transition-all duration-300 ${
                      selectedTimeZone === timezone.value
                        ? darkMode
                          ? 'bg-white/15 text-white border border-white/30'
                          : 'bg-[#00001a]/10 text-[#00001a] border border-[#00001a]/20'
                        : darkMode
                          ? 'bg-white/5 text-white/80 border border-white/10 hover:bg-white/10'
                          : 'bg-gray-50 text-[#00001a]/80 border border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <div className="text-sm font-medium">{timezone.label}</div>
                  </button>
                ))}
              </div>
            </div>
            <div className="p-4 border-t border-white/10">
              <button
                onClick={() => setShowTimeZoneModal(false)}
                className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  darkMode ? 'bg-white/10 text-white border border-white/20 hover:bg-white/20' : 'bg-gray-100 text-[#00001a] border border-gray-200 hover:bg-gray-200'
                }`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile
