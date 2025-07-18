import React, { useState, useRef } from 'react'

const Community = ({ darkMode }) => {
  // State management
  const [solverAnonymity, setSolverAnonymity] = useState(false)
  const [interestedDiscussions, setInterestedDiscussions] = useState(new Set())
  const [notifyDiscussions, setNotifyDiscussions] = useState(new Set())
  const [joinedEvents, setJoinedEvents] = useState(new Set())
  const [notifications, setNotifications] = useState([])
  const [showNotification, setShowNotification] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Notification system
  const showNotificationMessage = (message, type = 'success') => {
    const notification = {
      id: Date.now(),
      message,
      type
    }
    setNotifications(prev => [...prev, notification])
    setShowNotification(true)

    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id))
      if (notifications.length <= 1) {
        setShowNotification(false)
      }
    }, 3000)
  }

  // Sample data with pseudo names for anonymity
  const activeMembers = [
    { id: 1, pseudoName: 'CodeNinja47', avatar: '🥷', status: 'online', expertise: 'React Specialist', contributions: 156, anonymityLevel: 'high' },
    { id: 2, pseudoName: 'PixelMaster', avatar: '🎨', status: 'online', expertise: 'UI/UX Expert', contributions: 142, anonymityLevel: 'medium' },
    { id: 3, pseudoName: 'DataWizard', avatar: '🧙‍♂️', status: 'away', expertise: 'ML Engineer', contributions: 98, anonymityLevel: 'high' },
    { id: 4, pseudoName: 'CloudSurfer', avatar: '☁️', status: 'online', expertise: 'DevOps Pro', contributions: 87, anonymityLevel: 'low' },
    { id: 5, pseudoName: 'ByteHunter', avatar: '🎯', status: 'offline', expertise: 'Frontend Dev', contributions: 76, anonymityLevel: 'medium' },
    { id: 6, pseudoName: 'AlgoMaster', avatar: '⚡', status: 'online', expertise: 'Backend Dev', contributions: 134, anonymityLevel: 'high' },
    { id: 7, pseudoName: 'CyberSage', avatar: '🔮', status: 'away', expertise: 'Security Expert', contributions: 89, anonymityLevel: 'high' }
  ]

  const discussions = [
    {
      id: 1,
      topic: 'Best practices for React performance optimization',
      author: 'CodeNinja47',
      comments: 23,
      minutesAgo: 5,
      category: 'React',
      isHot: true,
      anonymousPost: false
    },
    {
      id: 2,
      topic: 'How to implement dark mode in Next.js applications',
      author: 'PixelMaster',
      comments: 18,
      minutesAgo: 12,
      category: 'Next.js',
      isHot: false,
      anonymousPost: false
    },
    {
      id: 3,
      topic: 'Machine Learning model deployment strategies',
      author: 'Anonymous_Solver_#7834',
      comments: 31,
      minutesAgo: 25,
      category: 'ML',
      isHot: true,
      anonymousPost: true
    },
    {
      id: 4,
      topic: 'CSS Grid vs Flexbox: When to use what?',
      author: 'CloudSurfer',
      comments: 15,
      minutesAgo: 45,
      category: 'CSS',
      isHot: false,
      anonymousPost: false
    },
    {
      id: 5,
      topic: 'Docker containerization best practices',
      author: 'Anonymous_Solver_#2156',
      comments: 27,
      minutesAgo: 67,
      category: 'DevOps',
      isHot: true,
      anonymousPost: true
    },
    {
      id: 6,
      topic: 'Secure API authentication methods',
      author: 'CyberSage',
      comments: 19,
      minutesAgo: 89,
      category: 'Security',
      isHot: false,
      anonymousPost: false
    }
  ]

  const topContributors = [
    { id: 1, pseudoName: 'CodeNinja47', avatar: '🥷', points: 2456, badge: 'Expert', specialty: 'React', rank: 1 },
    { id: 2, pseudoName: 'PixelMaster', avatar: '🎨', points: 2234, badge: 'Expert', specialty: 'Design', rank: 2 },
    { id: 3, pseudoName: 'DataWizard', avatar: '🧙‍♂️', points: 1987, badge: 'Advanced', specialty: 'Data Science', rank: 3 },
    { id: 4, pseudoName: 'AlgoMaster', avatar: '⚡', points: 1756, badge: 'Advanced', specialty: 'Algorithms', rank: 4 },
    { id: 5, pseudoName: 'CloudSurfer', avatar: '☁️', points: 1543, badge: 'Intermediate', specialty: 'DevOps', rank: 5 }
  ]

  const upcomingEvents = [
    {
      id: 1,
      name: 'React 19 Features Deep Dive',
      date: '2025-07-20',
      time: '14:00',
      attendees: 156,
      type: 'Workshop',
      host: 'CodeNinja47',
      anonymousHost: false
    },
    {
      id: 2,
      name: 'AI in Web Development Panel',
      date: '2025-07-22',
      time: '16:30',
      attendees: 234,
      type: 'Panel',
      host: 'Anonymous_Host_#4521',
      anonymousHost: true
    },
    {
      id: 3,
      name: 'Design System Implementation',
      date: '2025-07-25',
      time: '13:00',
      attendees: 89,
      type: 'Tutorial',
      host: 'PixelMaster',
      anonymousHost: false
    },
    {
      id: 4,
      name: 'DevOps Best Practices Q&A',
      date: '2025-07-28',
      time: '15:00',
      attendees: 67,
      type: 'Q&A',
      host: 'CloudSurfer',
      anonymousHost: false
    }
  ]

  // Event handlers
  const handleInterested = async (discussionId) => {
    const isInterested = interestedDiscussions.has(discussionId)
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))

      if (isInterested) {
        setInterestedDiscussions(prev => {
          const newSet = new Set(prev)
          newSet.delete(discussionId)
          return newSet
        })
        showNotificationMessage('Removed from interested discussions! 👎', 'info')
      } else {
        setInterestedDiscussions(prev => new Set([...prev, discussionId]))
        showNotificationMessage('Added to interested discussions! 👍', 'success')

        // Add to user's dashboard feed
        const discussion = discussions.find(d => d.id === discussionId)
        if (discussion) {
          showNotificationMessage(`"${discussion.title}" added to your feed! 📰`, 'info')
        }
      }
    } catch (error) {
      showNotificationMessage('Failed to update interest. Please try again.', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleNotifyMe = async (discussionId) => {
    const isNotifying = notifyDiscussions.has(discussionId)
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))

      if (isNotifying) {
        setNotifyDiscussions(prev => {
          const newSet = new Set(prev)
          newSet.delete(discussionId)
          return newSet
        })
        showNotificationMessage('Notifications disabled for this discussion! 🔕', 'info')
      } else {
        setNotifyDiscussions(prev => new Set([...prev, discussionId]))
        showNotificationMessage('You will be notified of new comments! 🔔', 'success')

        // Set up notification preferences
        const discussion = discussions.find(d => d.id === discussionId)
        if (discussion) {
          showNotificationMessage(`Email notifications enabled for "${discussion.title}"! 📧`, 'info')
        }
      }
    } catch (error) {
      showNotificationMessage('Failed to update notifications. Please try again.', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleShareContent = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Create shareable link
      const shareUrl = `${window.location.origin}/community/share`

      // Try to use Web Share API if available
      if (navigator.share) {
        await navigator.share({
          title: 'Join our Problem Solver Community',
          text: 'Connect with expert problem solvers and share knowledge!',
          url: shareUrl
        })
        showNotificationMessage('Content shared successfully! 🚀', 'success')
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(shareUrl)
        showNotificationMessage('Share link copied to clipboard! 📋', 'success')
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        showNotificationMessage('Failed to share content. Please try again.', 'error')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleJoinEvent = async (eventId) => {
    const isJoined = joinedEvents.has(eventId)
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))

      if (isJoined) {
        setJoinedEvents(prev => {
          const newSet = new Set(prev)
          newSet.delete(eventId)
          return newSet
        })
        showNotificationMessage('Successfully left the event! 👋', 'info')
      } else {
        setJoinedEvents(prev => new Set([...prev, eventId]))
        showNotificationMessage('Successfully registered for the event! 📅', 'success')

        // Send calendar invite (simulate)
        const event = upcomingEvents.find(e => e.id === eventId)
        if (event) {
          showNotificationMessage(`Calendar invite sent for "${event.title}"! 📧`, 'info')
        }
      }
    } catch (error) {
      showNotificationMessage('Failed to update event registration. Please try again.', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  // Additional interactive functions
  const handleMemberClick = async (memberId) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 600))
      const member = activeMembers.find(m => m.id === memberId)
      if (member) {
        showNotificationMessage(`Viewing ${member.name}'s profile! 👤`, 'info')
        // In a real app, this would navigate to the member's profile
      }
    } catch (error) {
      showNotificationMessage('Failed to load member profile.', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDiscussionClick = async (discussionId) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 700))
      const discussion = discussions.find(d => d.id === discussionId)
      if (discussion) {
        showNotificationMessage(`Opening "${discussion.title}" discussion! 💬`, 'info')
        // In a real app, this would navigate to the full discussion
      }
    } catch (error) {
      showNotificationMessage('Failed to load discussion.', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleContributorClick = async (contributorId) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      const contributor = topContributors.find(c => c.id === contributorId)
      if (contributor) {
        showNotificationMessage(`Viewing ${contributor.name}'s contributions! 🏆`, 'info')
        // In a real app, this would show detailed contributor stats
      }
    } catch (error) {
      showNotificationMessage('Failed to load contributor details.', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const formatTimeAgo = (minutes) => {
    if (minutes < 60) {
      return `${minutes} minutes ago`
    } else if (minutes < 1440) {
      const hours = Math.floor(minutes / 60)
      return `${hours} hour${hours > 1 ? 's' : ''} ago`
    } else {
      const days = Math.floor(minutes / 1440)
      return `${days} day${days > 1 ? 's' : ''} ago`
    }
  }

  const getBadgeColor = (badge) => {
    return darkMode ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' : 'bg-[#00001a]/10 text-[#00001a] border-[#00001a]/30'
  }

  const getEventTypeColor = (type) => {
    return darkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-[#00001a]/10 text-[#00001a]'
  }

  return (
    <div className={`min-h-screen transition-all duration-500 relative ${
      darkMode ? 'bg-[#00001a]' : 'bg-white'
    }`}>
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className={`p-6 rounded-2xl backdrop-blur-xl border ${
            darkMode
              ? 'bg-white/10 border-white/20'
              : 'bg-white/90 border-[#00001a]/20'
          }`}>
            <div className="flex items-center gap-4">
              <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${darkMode ? 'border-white' : 'border-[#00001a]'}`}></div>
              <span className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                Processing...
              </span>
            </div>
          </div>
        </div>
      )}
      {/* Notification System */}
      {showNotification && notifications.length > 0 && (
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`px-4 py-3 rounded-lg shadow-lg backdrop-blur-sm border transition-all duration-300 ${
                notification.type === 'success'
                  ? darkMode
                    ? 'bg-white/20 text-white border-white/30'
                    : 'bg-[#00001a]/10 text-[#00001a] border-[#00001a]/30'
                  : notification.type === 'error'
                  ? darkMode
                    ? 'bg-white/20 text-white border-white/30'
                    : 'bg-[#00001a]/10 text-[#00001a] border-[#00001a]/30'
                  : darkMode
                    ? 'bg-white/20 text-white border-white/30'
                    : 'bg-[#00001a]/10 text-[#00001a] border-[#00001a]/30'
              }`}
            >
              {notification.message}
            </div>
          ))}
        </div>
      )}

      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
              Anonymous Community
            </h1>
            <p className={`mt-2 ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
              Connect with fellow solvers through pseudo identities
            </p>
            <p className={`mt-1 text-sm ${darkMode ? 'text-white/40' : 'text-[#00001a]/50'}`}>
              All interactions use chosen pseudo names to maintain solver anonymity
            </p>
          </div>

          {/* Solver Anonymity Toggle */}
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className={`text-sm font-medium block ${darkMode ? 'text-white/70' : 'text-gray-700'}`}>
                  Enhanced Anonymity
                </span>
                <span className={`text-xs block ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                  {solverAnonymity ? 'Maximum privacy mode' : 'Standard pseudo mode'}
                </span>
              </div>
              <button
                onClick={() => setSolverAnonymity(!solverAnonymity)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                  solverAnonymity
                    ? darkMode ? 'bg-white' : 'bg-[#00001a]'
                    : darkMode ? 'bg-white/30' : 'bg-[#00001a]/30'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                    solverAnonymity ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            {solverAnonymity && (
              <div className={`text-xs px-2 py-1 rounded-full ${
                darkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-[#00001a]/10 text-[#00001a]'
              }`}>
                Maximum Privacy Active
              </div>
            )}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Solvers */}
            <div className={`p-6 rounded-lg backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden ${
              darkMode
                ? 'bg-white/3 border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]'
                : 'bg-white border-[#00001a]/20 hover:border-[#00001a]/30 hover:shadow-[0_0_25px_rgba(0,0,26,0.2)]'
            }`}
            style={darkMode ? {
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
            } : {}}>
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Active Solvers
                </h2>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  darkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-[#00001a]/10 text-[#00001a]'
                }`}>
                  Pseudo Identities
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeMembers.map((member) => {
                  const displayName = solverAnonymity && member.anonymityLevel === 'high'
                    ? `Anonymous_${member.id.toString().padStart(4, '0')}`
                    : member.pseudoName

                  const displayAvatar = solverAnonymity && member.anonymityLevel === 'high'
                    ? '🎭'
                    : member.avatar

                  return (
                    <div
                      key={member.id}
                      onClick={() => handleMemberClick(member.id)}
                      className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                        darkMode
                          ? 'border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                          : 'bg-[#00001a]/5 border-[#00001a]/20 hover:border-[#00001a]/30 hover:shadow-[0_0_15px_rgba(0,0,26,0.15)]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                            darkMode ? 'bg-white/10 text-white' : 'bg-[#00001a]/10 text-[#00001a]'
                          }`}>
                            {displayAvatar}
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 ${
                            member.status === 'online'
                              ? darkMode ? 'bg-white' : 'bg-[#00001a]'
                              : member.status === 'away'
                              ? darkMode ? 'bg-white/60' : 'bg-[#00001a]/60'
                              : darkMode ? 'bg-white/30' : 'bg-[#00001a]/30'
                          } ${darkMode ? 'border-slate-800' : 'border-white'}`}></div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                              {displayName}
                            </h3>
                            {member.anonymityLevel === 'high' && (
                              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                                darkMode ? 'bg-red-500/20 text-red-300' : 'bg-red-100 text-red-800'
                              }`}>
                                🔒
                              </span>
                            )}
                          </div>
                          <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>
                            {solverAnonymity && member.anonymityLevel === 'high' ? 'Anonymous Solver' : member.expertise}
                          </p>
                          <p className={`text-xs ${darkMode ? 'text-white/40' : 'text-gray-500'}`}>
                            {member.contributions} contributions
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Recent Discussions */}
            <div className={`p-6 rounded-lg backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden ${
              darkMode
                ? 'bg-white/3 border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]'
                : 'bg-white border-[#00001a]/20 hover:border-[#00001a]/30 hover:shadow-[0_0_25px_rgba(0,0,26,0.2)]'
            }`}
            style={darkMode ? {
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
            } : {}}>
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Recent Discussions
                </h2>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  darkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-[#00001a]/10 text-[#00001a]'
                }`}>
                  Anonymous Forum
                </span>
              </div>
              <div className="space-y-4">
                {discussions.map((discussion) => (
                  <div
                    key={discussion.id}
                    className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                      darkMode
                        ? 'border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                        : 'bg-white border-[#00001a]/20 hover:border-[#00001a]/30 hover:shadow-[0_0_15px_rgba(0,0,26,0.15)]'
                    }`}
                    onClick={() => handleDiscussionClick(discussion.id)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                            {discussion.topic}
                          </h3>
                          {discussion.isHot && (
                            <span className="px-2 py-1 text-xs font-medium bg-red-500/20 text-red-400 rounded-full">
                              🔥 Hot
                            </span>
                          )}
                          {discussion.anonymousPost && (
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              darkMode ? 'bg-gray-500/20 text-gray-300' : 'bg-[#00001a]/10 text-[#00001a]'
                            }`}>
                              🎭 Anonymous
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <span className={`${darkMode ? 'text-white/60' : 'text-gray-600'}`}>
                              by
                            </span>
                            <span className={`font-medium ${
                              discussion.anonymousPost
                                ? darkMode ? 'text-gray-300' : 'text-gray-700'
                                : darkMode ? 'text-white/80' : 'text-gray-800'
                            }`}>
                              {discussion.author}
                            </span>
                            {discussion.anonymousPost && (
                              <span className="text-xs">🔒</span>
                            )}
                          </div>
                          <span className={`${darkMode ? 'text-white/40' : 'text-gray-500'}`}>
                            {discussion.comments} comments
                          </span>
                          <span className={`${darkMode ? 'text-white/40' : 'text-gray-500'}`}>
                            {formatTimeAgo(discussion.minutesAgo)}
                          </span>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        darkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-[#00001a]/10 text-[#00001a]'
                      }`}>
                        {discussion.category}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleInterested(discussion.id)}
                        disabled={isLoading}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all duration-300 ${
                          isLoading
                            ? 'opacity-50 cursor-not-allowed'
                            : interestedDiscussions.has(discussion.id)
                              ? darkMode
                                ? 'bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30'
                                : 'bg-[#00001a] text-white border-[#00001a] hover:bg-[#00001a]/90'
                              : darkMode
                                ? 'border-white/20 text-white/70 hover:border-blue-400/50 hover:shadow-[0_0_10px_rgba(59,130,246,0.3)]'
                                : 'bg-[#00001a] text-white border-[#00001a] hover:bg-[#00001a]/90'
                        }`}
                      >
                        {interestedDiscussions.has(discussion.id) ? 'Interested ✓' : 'Interested'}
                      </button>
                      <button
                        onClick={() => handleNotifyMe(discussion.id)}
                        disabled={isLoading}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all duration-300 ${
                          isLoading
                            ? 'opacity-50 cursor-not-allowed'
                            : notifyDiscussions.has(discussion.id)
                              ? darkMode
                                ? 'bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500/30'
                                : 'bg-[#00001a] text-white border-[#00001a] hover:bg-[#00001a]/90'
                              : darkMode
                                ? 'border-white/20 text-white/70 hover:border-blue-400/50 hover:shadow-[0_0_10px_rgba(59,130,246,0.3)]'
                                : 'bg-white text-[#00001a] border-[#00001a]/60 hover:bg-gray-50 hover:border-[#00001a] shadow-sm'
                        }`}
                      >
                        {notifyDiscussions.has(discussion.id) ? 'Notifying 🔔' : 'Notify Me'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Top Contributors */}
            <div className={`p-6 rounded-lg backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden ${
              darkMode
                ? 'bg-white/3 border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]'
                : 'bg-white border-[#00001a]/20 hover:border-[#00001a]/30 hover:shadow-[0_0_25px_rgba(0,0,26,0.2)]'
            }`}
            style={darkMode ? {
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
            } : {}}>
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Top Contributors
                </h2>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  darkMode ? 'bg-yellow-500/20 text-yellow-300' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  Leaderboard
                </span>
              </div>
              <div className="space-y-3">
                {topContributors.map((contributor, index) => (
                  <div
                    key={contributor.id}
                    onClick={() => handleContributorClick(contributor.id)}
                    className={`p-3 rounded-lg border transition-all duration-300 cursor-pointer ${
                      darkMode
                        ? 'border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                        : 'bg-white border-[#00001a]/20 hover:border-[#00001a]/30 hover:shadow-[0_0_15px_rgba(0,0,26,0.15)]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-bold ${
                          index === 0 ? 'text-yellow-500' :
                          index === 1 ? 'text-gray-400' :
                          index === 2 ? 'text-orange-500' :
                          darkMode ? 'text-white/60' : 'text-gray-600'
                        }`}>
                          #{index + 1}
                        </span>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-lg ${
                          darkMode ? 'bg-white/10 text-white' : 'bg-[#00001a]/10 text-[#00001a]'
                        }`}>
                          {contributor.avatar}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                            {contributor.pseudoName}
                          </h3>
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getBadgeColor(contributor.badge)}`}>
                            {contributor.badge}
                          </span>
                        </div>
                        <p className={`text-xs ${darkMode ? 'text-white/60' : 'text-gray-600'}`}>
                          {contributor.specialty}
                        </p>
                        <p className={`text-xs font-medium ${darkMode ? 'text-white/80' : 'text-gray-800'}`}>
                          {contributor.points.toLocaleString()} points
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Share Content Button */}
            <button
              onClick={handleShareContent}
              disabled={isLoading}
              className={`w-full p-4 rounded-2xl border transition-all duration-300 ${
                isLoading
                  ? darkMode
                    ? 'bg-white/30 border-white/20 text-white/50 cursor-not-allowed'
                    : 'bg-[#00001a]/30 border-[#00001a]/20 text-[#00001a]/50 cursor-not-allowed'
                  : darkMode
                    ? 'bg-white border-white/50 hover:border-white/80 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] text-[#00001a]'
                    : 'bg-[#00001a] border-[#00001a]/50 hover:border-[#00001a]/80 hover:shadow-[0_0_25px_rgba(0,0,26,0.3)] text-white'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                )}
                <span className="font-semibold">
                  {isLoading ? 'Sharing...' : 'Share Content'}
                </span>
              </div>
            </button>

            {/* Upcoming Events */}
            <div className={`p-6 rounded-lg backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden ${
              darkMode
                ? 'bg-white/3 border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]'
                : 'bg-white border-[#00001a]/20 hover:border-[#00001a]/30 hover:shadow-[0_0_25px_rgba(0,0,26,0.2)]'
            }`}
            style={darkMode ? {
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
            } : {}}>
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Upcoming Events
                </h2>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  darkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-[#00001a]/10 text-[#00001a]'
                }`}>
                  Anonymous Events
                </span>
              </div>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                      darkMode
                        ? 'border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                        : 'bg-white border-[#00001a]/20 hover:border-[#00001a]/30 hover:shadow-[0_0_15px_rgba(0,0,26,0.15)]'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                          {event.name}
                        </h3>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className={`${darkMode ? 'text-white/60' : 'text-gray-600'}`}>
                              {new Date(event.date).toLocaleDateString()} at {event.time}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span className={`${darkMode ? 'text-white/60' : 'text-gray-600'}`}>
                              {event.attendees} attendees
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span className={`${
                              event.anonymousHost
                                ? darkMode ? 'text-gray-300' : 'text-gray-700'
                                : darkMode ? 'text-white/60' : 'text-gray-600'
                            }`}>
                              Hosted by {event.host}
                            </span>
                            {event.anonymousHost && (
                              <span className="text-xs">🎭</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getEventTypeColor(event.type)}`}>
                          {event.type}
                        </span>
                        {event.anonymousHost && (
                          <span className={`px-2 py-0.5 text-xs rounded-full ${
                            darkMode ? 'bg-gray-500/20 text-gray-300' : 'bg-[#00001a]/10 text-[#00001a]'
                          }`}>
                            Anonymous Host
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => handleJoinEvent(event.id)}
                      disabled={isLoading}
                      className={`w-full px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-300 ${
                        isLoading
                          ? 'opacity-50 cursor-not-allowed'
                          : joinedEvents.has(event.id)
                            ? darkMode
                              ? 'bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30'
                              : 'bg-[#00001a] text-white border-[#00001a] hover:bg-[#00001a]/90'
                            : darkMode
                              ? 'bg-blue-500/20 text-blue-400 border-blue-500/30 hover:border-blue-400/50 hover:shadow-[0_0_10px_rgba(59,130,246,0.3)]'
                              : 'bg-white text-[#00001a] border-[#00001a]/60 hover:bg-gray-50 hover:border-[#00001a] shadow-sm'
                      }`}
                    >
                      {joinedEvents.has(event.id) ? '✓ Joined' : 'Join Event'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Community
