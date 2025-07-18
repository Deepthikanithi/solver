import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import {
  Star,
  BarChart3,
  Flame,
  Trophy,
  TrendingUp,
  Medal,
  Calendar,
  Search,
  CalendarDays,
  HelpCircle,
  FileText,
  Code,
  Link,
  Paperclip,
  CheckCircle,
  Eye,
  Edit,
  Upload,
  Plus,
  X,
  Send,
  Lightbulb
} from 'lucide-react'

const Dashboard = ({ darkMode }) => {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedSlots, setSelectedSlots] = useState(new Set())
  const [activeDoubtTab, setActiveDoubtTab] = useState(0) // For Anonymous Doubt Pool tabs

  // Anonymous Doubt Pool Statistics
  const [doubtPoolStats, setDoubtPoolStats] = useState({
    totalSolutionsGiven: 12,
    solutionsCompleted: 8,
    solutionsPending: 4,
    totalPointsEarned: 650,
    averageRating: 4.7,
    helpfulVotes: 23
  })

  // Mock available slots data - Clean and minimal
  const mockAvailableSlots = {
    // July 2025 - Only key days with data
    '2025-07-14': ['09:00', '10:00', '14:00', '15:00', '16:00'],
    '2025-07-15': ['09:00', '11:00', '13:00', '15:00', '17:00'],
    '2025-07-16': ['10:00', '11:00', '14:00', '16:00', '18:00'],
    '2025-07-21': ['09:00', '13:00', '14:00', '15:00', '16:00'],
    '2025-07-22': ['10:00', '11:00', '14:00', '15:00', '17:00']
  }

  // Mock booked sessions - Clean and minimal
  const bookedSessions = {
    '2025-07-14': [
      { time: '10:00', student: 'Michael Chen', topic: 'Vue.js Fundamentals' }
    ],
    '2025-07-15': [
      { time: '11:00', student: 'Sarah Davis', topic: 'React Hooks' }
    ],
    '2025-07-21': [
      { time: '13:00', student: 'John Smith', topic: 'TypeScript Basics' }
    ]
  }

  const handleCreateTutorial = () => {
    navigate('/content')
  }

  const handleViewEarnings = () => {
    navigate('/payments')
  }

  // Additional button handlers
  const handleViewDetailedEarnings = () => {
    navigate('/payments')
  }

  const handleViewSessionDetails = (type, id) => {
    console.log(`Viewing details for ${type} with ID: ${id}`)

    const session = sessionRequests.find(s => s.id === id)
    if (session) {
      alert(`Session Details:\n\nStudent: ${session.student}\nTopic: ${session.topic}\nTime: ${session.time}\nDate: ${session.date}\nDifficulty: ${session.difficulty}\nStatus: ${session.status}`)
    } else {
      alert('Session details not found.')
    }
  }

  const handleViewUpcomingSessionDetails = (sessionData) => {
    alert(`Upcoming Session Details:\n\nStudent: ${sessionData.student}\nTopic: ${sessionData.topic}\nTime: ${sessionData.time}\nDate: ${sessionData.date}\nStatus: ${sessionData.status}\nNotes: ${sessionData.notes}`)
  }

  // Function to render leaderboard badges
  const renderBadge = (badge) => {
    switch (badge) {
      case "gold":
        return <Medal className={`w-5 h-5 ${darkMode ? 'text-yellow-500' : 'text-[#00001a]'}`} />
      case "silver":
        return <Medal className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-[#00001a]'}`} />
      case "bronze":
        return <Medal className={`w-5 h-5 ${darkMode ? 'text-amber-600' : 'text-[#00001a]'}`} />
      case "fire":
        return <Flame className={`w-5 h-5 ${darkMode ? 'text-orange-500' : 'text-[#00001a]'}`} />
      case "star":
        return <Star className={`w-5 h-5 ${darkMode ? 'text-yellow-500 fill-yellow-500' : 'text-[#00001a] fill-[#00001a]'}`} />
      default:
        return <Medal className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-[#00001a]'}`} />
    }
  }

  const [showResponseModal, setShowResponseModal] = useState(false)
  const [selectedDoubtId, setSelectedDoubtId] = useState(null)
  const [responseText, setResponseText] = useState('')
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [selectedDoubt, setSelectedDoubt] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editText, setEditText] = useState('')

  // Solution submission states
  const [solutionType, setSolutionType] = useState('text') // 'text', 'code', 'reference', 'content'
  const [codeLanguage, setCodeLanguage] = useState('javascript')
  const [referenceLinks, setReferenceLinks] = useState([''])
  const [attachedContent, setAttachedContent] = useState(null)

  const handleRespond = (requestId) => {
    console.log(`Responding to request: ${requestId}`)
    setSelectedDoubtId(requestId)
    setShowResponseModal(true)
    setResponseText('')
  }

  const submitResponse = () => {
    if (responseText.trim() || referenceLinks.some(link => link.trim()) || attachedContent) {
      // Move the doubt from active to mySolutions
      const doubt = doubtPoolData.activeRequests.find(d => d.id === selectedDoubtId)
      if (doubt) {
        // Create comprehensive solution object
        const solution = {
          ...doubt,
          id: `S${Date.now()}`,
          solvedAt: 'Just now',
          status: 'Pending Review',
          solutionType: solutionType,
          solutionText: responseText,
          codeLanguage: solutionType === 'code' ? codeLanguage : null,
          references: referenceLinks.filter(link => link.trim()),
          attachedContent: attachedContent
        }

        setDoubtPoolData(prevData => ({
          ...prevData,
          activeRequests: prevData.activeRequests.filter(d => d.id !== selectedDoubtId),
          mySolutions: [solution, ...prevData.mySolutions]
        }))

        // Update statistics
        setDoubtPoolStats(prev => ({
          ...prev,
          totalSolutionsGiven: prev.totalSolutionsGiven + 1,
          solutionsPending: prev.solutionsPending + 1,
          totalPointsEarned: prev.totalPointsEarned + doubt.bounty
        }))

        alert(`Comprehensive solution submitted successfully!\n\nSolution Type: ${solutionType}\nPoints Earned: ${doubt.bounty}\nTotal Solutions Given: ${doubtPoolStats.totalSolutionsGiven + 1}`)

        // Auto-switch to My Solutions tab to show the result
        setActiveDoubtTab(1)
      }

      // Reset form
      setShowResponseModal(false)
      setSelectedDoubtId(null)
      setResponseText('')
      setSolutionType('text')
      setCodeLanguage('javascript')
      setReferenceLinks([''])
      setAttachedContent(null)
    } else {
      alert('Please provide at least one form of solution (text, code, reference, or content).')
    }
  }

  // Handler for viewing doubt details
  const handleViewDetails = (doubt) => {
    setSelectedDoubt(doubt)
    setShowDetailsModal(true)
  }

  // Handler for viewing solution status
  const handleViewStatus = (doubt) => {
    alert(`Status: ${doubt.status}\nSubmitted: ${doubt.solvedAt}\nBounty: $${doubt.bounty}\nQuestion: ${doubt.question}`)
  }

  // Handler for editing solution
  const handleEditSolution = (doubt) => {
    setSelectedDoubt(doubt)
    setEditText(`Previous solution for: ${doubt.question}`) // In real app, this would be the actual solution
    setShowEditModal(true)
  }

  // Submit edited solution
  const submitEditedSolution = () => {
    if (editText.trim()) {
      setDoubtPoolData(prevData => ({
        ...prevData,
        mySolutions: prevData.mySolutions.map(solution =>
          solution.id === selectedDoubt.id
            ? { ...solution, status: 'Updated - Pending Review', solvedAt: 'Just now' }
            : solution
        )
      }))

      alert('Solution updated successfully!')
      setShowEditModal(false)
      setSelectedDoubt(null)
      setEditText('')
    } else {
      alert('Please provide an updated solution.')
    }
  }

  // Handler for viewing completed solution
  const handleViewSolution = (doubt) => {
    alert(`Solution for: ${doubt.question}\n\nCompleted: ${doubt.completedAt}\nSolved by: ${doubt.solver}\nBounty: $${doubt.bounty}\n\nThis would show the full solution in a real application.`)
  }

  // Helper functions for solution submission
  const addReferenceLink = () => {
    setReferenceLinks([...referenceLinks, ''])
  }

  const updateReferenceLink = (index, value) => {
    const newLinks = [...referenceLinks]
    newLinks[index] = value
    setReferenceLinks(newLinks)
  }

  const removeReferenceLink = (index) => {
    if (referenceLinks.length > 1) {
      setReferenceLinks(referenceLinks.filter((_, i) => i !== index))
    }
  }

  const handleContentUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setAttachedContent({
        name: file.name,
        size: file.size,
        type: file.type
      })
    }
  }

  const handleJoinSession = (sessionId) => {
    console.log(`Joining session: ${sessionId}`)

    // Check if session is ready to join
    const currentTime = new Date()
    const sessionTime = new Date() // In real app, this would be the actual session time

    const confirmJoin = window.confirm('Are you ready to join this session? This will start the live session.')

    if (confirmJoin) {
      // Simulate joining session
      alert('Joining session... Opening video call interface.')

      // In a real app, this would open the video call interface
      // For now, just navigate to sessions page
      navigate(`/sessions`)
    }
  }

  const handleAcceptSession = (sessionId, studentName) => {
    console.log(`Accepting session ${sessionId} with ${studentName}`)

    // Update local state immediately
    updateSessionStatus(sessionId, 'accepted')

    // Show success feedback
    alert(`Session with ${studentName} has been accepted! The session is now confirmed and will appear in your upcoming sessions.`)
  }

  const handleDeclineSession = (sessionId, studentName) => {
    console.log(`Declining session ${sessionId} with ${studentName}`)

    // Update local state immediately
    updateSessionStatus(sessionId, 'declined')

    // Show feedback
    alert(`Session with ${studentName} has been declined. The student will be notified.`)
  }

  // Anonymous Doubt Pool tab handler - NO REDIRECTION, just local state change
  const handleDoubtTabChange = (tabIndex, tabName) => {
    setActiveDoubtTab(tabIndex)
    console.log(`Switched to ${tabName} tab`)
    // Just change the local state, no navigation needed
  }

  // Session management handlers with state updates
  const [sessionRequests, setSessionRequests] = useState([
    { id: "RS001", student: "John Doe", topic: "React Hooks", time: "2:00 PM - 3:00 PM", date: "Today", difficulty: "Intermediate", status: "pending" },
    { id: "RS002", student: "Jane Smith", topic: "Node.js APIs", time: "4:00 PM - 5:00 PM", date: "Tomorrow", difficulty: "Advanced", status: "pending" },
    { id: "RS003", student: "Mike Wilson", topic: "CSS Grid", time: "10:00 AM - 11:00 AM", date: "Dec 15", difficulty: "Beginner", status: "pending" }
  ])

  const updateSessionStatus = (sessionId, newStatus) => {
    setSessionRequests(prev =>
      prev.map(session =>
        session.id === sessionId
          ? { ...session, status: newStatus }
          : session
      )
    )
  }

  // Doubt Pool Data as state for reactivity
  const [doubtPoolData, setDoubtPoolData] = useState({
    activeRequests: [
      {
        id: "Q001",
        question: "How to implement authentication in React?",
        tags: ["React", "Auth", "JWT"],
        difficulty: "Intermediate",
        timeAgo: "2 hours ago",
        bounty: 50
      },
      {
        id: "Q002",
        question: "Best practices for Node.js error handling?",
        tags: ["Node.js", "Error Handling"],
        difficulty: "Advanced",
        timeAgo: "4 hours ago",
        bounty: 75
      },
      {
        id: "Q003",
        question: "CSS Grid vs Flexbox - when to use which?",
        tags: ["CSS", "Layout"],
        difficulty: "Beginner",
        timeAgo: "6 hours ago",
        bounty: 25
      }
    ],
    mySolutions: [
      {
        id: "S001",
        question: "How to optimize React performance?",
        tags: ["React", "Performance"],
        difficulty: "Advanced",
        solvedAt: "1 day ago",
        bounty: 100,
        status: "Accepted"
      },
      {
        id: "S002",
        question: "Understanding JavaScript closures",
        tags: ["JavaScript", "Closures"],
        difficulty: "Intermediate",
        solvedAt: "3 days ago",
        bounty: 60,
        status: "Pending Review"
      }
    ],
    completed: [
      {
        id: "C001",
        question: "Setting up Docker for development",
        tags: ["Docker", "DevOps"],
        difficulty: "Intermediate",
        completedAt: "1 week ago",
        bounty: 80,
        solver: "You"
      },
      {
        id: "C002",
        question: "MongoDB aggregation pipeline",
        tags: ["MongoDB", "Database"],
        difficulty: "Advanced",
        completedAt: "2 weeks ago",
        bounty: 120,
        solver: "Alex Chen"
      }
    ]
  })

  // Calendar helper functions
  const formatDateKey = (date) => {
    return date.toISOString().split('T')[0]
  }

  const getAvailableSlotsForDate = (date) => {
    const dateKey = formatDateKey(date)
    return mockAvailableSlots[dateKey] || []
  }

  const getBookedSessionsForDate = (date) => {
    const dateKey = formatDateKey(date)
    return bookedSessions[dateKey] || []
  }

  const isSlotBooked = (date, time) => {
    const sessions = getBookedSessionsForDate(date)
    return sessions.some(session => session.time === time)
  }

  const handleSlotClick = (time) => {
    const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDay)
    const dateKey = formatDateKey(selectedDate)
    const slotKey = `${dateKey}-${time}`

    if (isSlotBooked(selectedDate, time)) {
      const session = getBookedSessionsForDate(selectedDate).find(s => s.time === time)
      alert(`This slot is booked with ${session.student} for ${session.topic}`)
      return
    }

    setSelectedSlots(prev => {
      const newSet = new Set(prev)
      if (newSet.has(slotKey)) {
        newSet.delete(slotKey)
        console.log(`Removed slot: ${time} on ${dateKey}`)
      } else {
        newSet.add(slotKey)
        console.log(`Added slot: ${time} on ${dateKey}`)
      }
      return newSet
    })
  }

  const [selectedDay, setSelectedDay] = useState(null)

  // Calendar navigation functions
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  // Get month name and year
  const getMonthYear = () => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]
    return `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`
  }

  // Get calendar days
  const getCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }

    return days
  }

  // Mock data matching the reference dashboard exactly
  const stats = {
    sessionsCompleted: 0,
    earningsThisMonth: 0.00,
    rating: 0.0,
    completionRate: 0
  }

  const recentEarnings = [
    {
      title: 'React Performance Issues',
      duration: '45 min session',
      timeAgo: '3 days ago',
      amount: 45.00
    },
    {
      title: 'AWS Lambda Setup',
      duration: '30 min session',
      timeAgo: '5 days ago',
      amount: 30.00
    },
    {
      title: 'Docker Container Issue',
      duration: '60 min session',
      timeAgo: '1 week ago',
      amount: 60.00
    }
  ]

  const expertiseData = {
    domains: ['Frontend Development', 'ReactJs', 'TypeScript', 'Redux'],
    currentRate: '$45/hour'
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode ? 'bg-[#00001a]' : 'bg-gray-50'
    }`}>



      {/* Header */}
      <div className="p-4 pb-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
              {t('welcomeBack')}, pred
            </h1>
          </div>

          <div className="flex items-center space-x-6">
            <button
              onClick={handleCreateTutorial}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-500 ${
                darkMode
                  ? 'bg-white/3 text-white backdrop-blur-md border border-white/20 hover:bg-white/8 hover:border-white/30'
                  : 'bg-white text-[#00001a] border border-gray-300 hover:bg-gray-50'
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
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.25)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }
              }}
              onMouseLeave={(e) => {
                if (darkMode) {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)';
                } else {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                  e.currentTarget.style.transform = 'translateY(0px)';
                }
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Create Tutorial
            </button>
            <button
              onClick={handleViewEarnings}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-500 ${
                darkMode
                  ? 'bg-white/3 text-white backdrop-blur-md border border-white/20 hover:bg-white/8 hover:border-white/30'
                  : 'bg-[#00001a] text-white border border-[#00001a] hover:bg-[#00001a]/90'
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
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.25)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }
              }}
              onMouseLeave={(e) => {
                if (darkMode) {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)';
                } else {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                  e.currentTarget.style.transform = 'translateY(0px)';
                }
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              View Earnings
            </button>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="p-4 space-y-6">

        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Sessions Completed Card */}
          <div className={`group p-5 backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden cursor-pointer ${
            darkMode
              ? 'rounded-lg bg-white/3 border-white/20 hover:bg-white/8 hover:border-white/30'
              : 'rounded-lg bg-white border-gray-200'
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
            <div className="relative z-10">
              <h3 className={`text-sm font-medium mb-3 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                Sessions Completed
              </h3>
              <div className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                {stats.sessionsCompleted}
              </div>
            </div>
          </div>

          {/* Earnings This Month Card */}
          <div className={`group p-5 backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden cursor-pointer ${
            darkMode
              ? 'rounded-lg bg-white/3 border-white/20 hover:bg-white/8 hover:border-white/30'
              : 'rounded-lg bg-white border-gray-200'
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
            <div className="relative z-10">
              <h3 className={`text-sm font-medium mb-3 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                Earnings This Month
              </h3>
              <div className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                ${stats.earningsThisMonth.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Rating Card */}
          <div className={`group p-5 backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden cursor-pointer ${
            darkMode
              ? 'rounded-lg bg-white/3 border-white/20 hover:bg-white/8 hover:border-white/30'
              : 'rounded-lg bg-white border-gray-200'
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
            <div className="relative z-10">
              <h3 className={`text-sm font-medium mb-3 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                Rating
              </h3>
              <div className={`text-3xl font-bold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                {stats.rating}
                <Star className={`w-6 h-6 ${darkMode ? 'text-yellow-500 fill-yellow-500' : 'text-[#00001a] fill-[#00001a]'}`} />
              </div>
            </div>
          </div>

          {/* Completion Rate Card */}
          <div className={`group p-5 backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden cursor-pointer ${
            darkMode
              ? 'rounded-lg bg-white/3 border-white/20 hover:bg-white/8 hover:border-white/30'
              : 'rounded-lg bg-white border-gray-200'
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
            <div className="relative z-10">
              <h3 className={`text-sm font-medium mb-3 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                Completion Rate
              </h3>
              <div className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                {stats.completionRate}%
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Section */}
        <div className={`group p-5 backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden cursor-pointer ${
          darkMode
            ? 'rounded-lg bg-white/3 border-white/20 hover:bg-white/8 hover:border-white/30'
            : 'rounded-lg bg-white border-gray-200'
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
          <div className="relative z-10">
            <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
              <BarChart3 className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-[#00001a]'}`} />
              Analytics Dashboard
            </h3>

            {/* Analytics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-4">
              {/* Content Growth */}
              <div className={`group p-4 backdrop-blur-sm border transition-all duration-500 cursor-pointer ${
                darkMode ? 'rounded-lg bg-white/3 border-white/20 hover:bg-white/8 hover:border-white/30' : 'rounded-lg bg-gradient-to-br from-white/50 via-white/40 to-white/30 border-white/30'
              }`}
              style={darkMode ? {
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              } : {
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseEnter={(e) => {
                if (darkMode) {
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)';
                } else {
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(21, 58, 168, 0.2), 0 4px 12px rgba(0, 0, 0, 0.08)';
                }
              }}
              onMouseLeave={(e) => {
                if (darkMode) {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)';
                } else {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
                }
              }}>
                <div className={`text-xs font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>Content Growth</div>
                <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>+12%</div>
                <div className={`text-xs ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`}>This month</div>
              </div>

              {/* Solved Problems */}
              <div className={`group p-4 backdrop-blur-sm border transition-all duration-500 cursor-pointer ${
                darkMode ? 'rounded-lg bg-white/3 border-white/20 hover:bg-white/8 hover:border-white/30' : 'rounded-lg bg-gradient-to-br from-white/50 via-white/40 to-white/30 border-white/30'
              }`}
              style={darkMode ? {
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              } : {
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseEnter={(e) => {
                if (darkMode) {
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)';
                } else {
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(21, 58, 168, 0.2), 0 4px 12px rgba(0, 0, 0, 0.08)';
                }
              }}
              onMouseLeave={(e) => {
                if (darkMode) {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)';
                } else {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
                }
              }}>
                <div className={`text-xs font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>Solved Problems</div>
                <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>47</div>
                <div className={`text-xs ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>Total</div>
              </div>

              {/* Streak */}
              <div className={`group p-4 backdrop-blur-sm border transition-all duration-500 cursor-pointer ${
                darkMode ? 'rounded-lg bg-white/3 border-white/20 hover:bg-white/8 hover:border-white/30' : 'rounded-lg bg-gradient-to-br from-white/50 via-white/40 to-white/30 border-white/30'
              }`}
              style={darkMode ? {
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              } : {
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseEnter={(e) => {
                if (darkMode) {
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)';
                } else {
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(21, 58, 168, 0.2), 0 4px 12px rgba(0, 0, 0, 0.08)';
                }
              }}
              onMouseLeave={(e) => {
                if (darkMode) {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)';
                } else {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
                }
              }}>
                <div className={`text-xs font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>Streak</div>
                <div className={`text-lg font-bold flex items-center gap-1 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  <Flame className={`w-4 h-4 ${darkMode ? 'text-orange-500' : 'text-[#00001a]'}`} />
                  7
                </div>
                <div className={`text-xs ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`}>Days</div>
              </div>

              {/* Badge */}
              <div className={`group p-4 backdrop-blur-sm border transition-all duration-500 cursor-pointer ${
                darkMode ? 'rounded-lg bg-white/3 border-white/20 hover:bg-white/8 hover:border-white/30' : 'rounded-lg bg-gradient-to-br from-white/50 via-white/40 to-white/30 border-white/30'
              }`}
              style={darkMode ? {
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              } : {
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseEnter={(e) => {
                if (darkMode) {
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)';
                } else {
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(21, 58, 168, 0.2), 0 4px 12px rgba(0, 0, 0, 0.08)';
                }
              }}
              onMouseLeave={(e) => {
                if (darkMode) {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)';
                } else {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
                }
              }}>
                <div className={`text-xs font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>Badge</div>
                <div className={`text-lg font-bold flex items-center gap-1 ${darkMode ? 'text-yellow-400' : 'text-[#00001a]'}`}>
                  <Trophy className={`w-4 h-4 ${darkMode ? 'text-yellow-500' : 'text-[#00001a]'}`} />
                  Gold
                </div>
                <div className={`text-xs ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`}>Expert</div>
              </div>

              {/* Reached Content */}
              <div className={`group p-4 backdrop-blur-sm border transition-all duration-500 cursor-pointer ${
                darkMode ? 'rounded-lg bg-white/3 border-white/20 hover:bg-white/8 hover:border-white/30' : 'rounded-lg bg-gradient-to-br from-white/50 via-white/40 to-white/30 border-white/30'
              }`}
              style={darkMode ? {
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              } : {
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseEnter={(e) => {
                if (darkMode) {
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)';
                } else {
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(21, 58, 168, 0.2), 0 4px 12px rgba(0, 0, 0, 0.08)';
                }
              }}
              onMouseLeave={(e) => {
                if (darkMode) {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)';
                } else {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
                }
              }}>
                <div className={`text-xs font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>Reached Content</div>
                <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>1.2K</div>
                <div className={`text-xs ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`}>Views</div>
              </div>

              {/* Total Sessions */}
              <div className={`group p-4 backdrop-blur-sm border transition-all duration-500 cursor-pointer ${
                darkMode ? 'rounded-lg bg-white/3 border-white/20 hover:bg-white/8 hover:border-white/30' : 'rounded-lg bg-gradient-to-br from-white/50 via-white/40 to-white/30 border-white/30'
              }`}
              style={darkMode ? {
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              } : {
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseEnter={(e) => {
                if (darkMode) {
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)';
                } else {
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(21, 58, 168, 0.2), 0 4px 12px rgba(0, 0, 0, 0.08)';
                }
              }}
              onMouseLeave={(e) => {
                if (darkMode) {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)';
                } else {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
                }
              }}>
                <div className={`text-xs font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>{t('totalEarnings')}</div>
                <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>23</div>
                <div className={`text-xs ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`}>{t('completedSessions')}</div>
              </div>

              {/* Hours Taught */}
              <div className={`group p-4 backdrop-blur-sm border transition-all duration-500 cursor-pointer ${
                darkMode ? 'rounded-lg bg-white/3 border-white/20 hover:bg-white/8 hover:border-white/30' : 'rounded-lg bg-gradient-to-br from-white/50 via-white/40 to-white/30 border-white/30'
              }`}
              style={darkMode ? {
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              } : {
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseEnter={(e) => {
                if (darkMode) {
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)';
                } else {
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(21, 58, 168, 0.2), 0 4px 12px rgba(0, 0, 0, 0.08)';
                }
              }}
              onMouseLeave={(e) => {
                if (darkMode) {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)';
                } else {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
                }
              }}>
                <div className={`text-xs font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>Hours Taught</div>
                <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>45.5</div>
                <div className={`text-xs ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`}>Hours</div>
              </div>

              {/* Graph Placeholder */}
              <div className={`group p-4 backdrop-blur-sm border transition-all duration-500 cursor-pointer ${
                darkMode ? 'rounded-lg bg-white/3 border-white/20 hover:bg-white/8 hover:border-white/30' : 'rounded-lg bg-gradient-to-br from-white/50 via-white/40 to-white/30 border-white/30'
              }`}
              style={darkMode ? {
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              } : {
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              onMouseEnter={(e) => {
                if (darkMode) {
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)';
                } else {
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(21, 58, 168, 0.2), 0 4px 12px rgba(0, 0, 0, 0.08)';
                }
              }}
              onMouseLeave={(e) => {
                if (darkMode) {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)';
                } else {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
                }
              }}>
                <div className={`text-xs font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>Growth Graph</div>
                <div className={`text-lg font-bold ${darkMode ? 'text-pink-400' : 'text-[#00001a]'}`}>
                  <TrendingUp className={`w-5 h-5 ${darkMode ? 'text-green-500' : 'text-[#00001a]'}`} />
                </div>
                <div className={`text-xs ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`}>Trending</div>
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className={`group p-8 backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden cursor-pointer ${
          darkMode
            ? 'rounded-lg bg-white/3 border-white/20 hover:bg-white/8 hover:border-white/30'
            : 'rounded-lg bg-gradient-to-br from-white/50 via-white/40 to-white/30 border-white/30 shadow-black/10'
        }`}
        style={darkMode ? {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
        } : {
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
        onMouseEnter={(e) => {
          if (darkMode) {
            e.currentTarget.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)';
          } else {
            e.currentTarget.style.boxShadow = '0 0 15px rgba(21, 58, 168, 0.2), 0 4px 12px rgba(0, 0, 0, 0.08)';
          }
        }}
        onMouseLeave={(e) => {
          if (darkMode) {
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)';
          } else {
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
          }
        }}>
          <div className="relative z-10">
            <h3 className={`text-lg font-semibold mb-6 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
              <Trophy className={`w-5 h-5 ${darkMode ? 'text-yellow-500' : 'text-[#00001a]'}`} />
              Leaderboard
            </h3>
            <div className="space-y-4">
              {[
                { rank: 1, name: "Alex Chen", points: 2450, badge: "gold" },
                { rank: 2, name: "Sarah Kim", points: 2380, badge: "silver" },
                { rank: 3, name: "Mike Johnson", points: 2290, badge: "bronze" },
                { rank: 4, name: "You (pred)", points: 2180, badge: "fire" },
                { rank: 5, name: "Emma Davis", points: 2150, badge: "star" }
              ].map((user) => (
                <div key={user.rank} className={`flex items-center justify-between p-4 rounded-lg backdrop-blur-sm border transition-all duration-500 cursor-pointer ${
                  user.name.includes('You')
                    ? darkMode ? 'bg-blue-500/15 border-blue-500/30 hover:bg-blue-500/25 hover:border-blue-500/40' : 'bg-[#00001a]/10 border-[#00001a]/20'
                    : darkMode ? 'bg-white/3 border-white/10 hover:bg-white/8 hover:border-white/20' : 'bg-white/40 border-white/30'
                }`}
                style={darkMode ? {
                  boxShadow: user.name.includes('You') ? '0 2px 15px rgba(59, 130, 246, 0.1)' : '0 2px 10px rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                } : {}}
                onMouseEnter={(e) => {
                  if (darkMode) {
                    if (user.name.includes('You')) {
                      e.currentTarget.style.boxShadow = '0 0 15px rgba(59, 130, 246, 0.15), 0 4px 15px rgba(0, 0, 0, 0.1)';
                    } else {
                      e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.1), 0 8px 15px rgba(0, 0, 0, 0.15)';
                    }
                  }
                }}
                onMouseLeave={(e) => {
                  if (darkMode) {
                    e.currentTarget.style.boxShadow = user.name.includes('You') ? '0 2px 15px rgba(59, 130, 246, 0.1)' : '0 2px 10px rgba(0, 0, 0, 0.05)';
                  }
                }}>
                  <div className="flex items-center space-x-4">
                    <span className="text-xl">{renderBadge(user.badge)}</span>
                    <div>
                      <div className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {user.name}
                      </div>
                      <div className={`text-xs ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                        Rank #{user.rank}
                      </div>
                    </div>
                  </div>
                  <div className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {user.points} pts
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Second Row - Active Sessions and Recent Earnings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Active Sessions */}
          <div className={`group p-8 backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden cursor-pointer ${
            darkMode
              ? 'rounded-lg bg-white/3 border-white/20 hover:bg-white/8 hover:border-white/30'
              : 'rounded-lg bg-white border-gray-200'
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
            <div className="relative z-10">
              <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                {t('activeSessions')}
              </h3>
              <p className={`text-sm mb-8 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                Your ongoing sessions with users
              </p>

              <div className="flex flex-col items-center justify-center py-16">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm border ${
                  darkMode ? 'bg-white/5 border-white/10' : 'bg-gray-200 border-gray-300'
                }`}>
                  <svg className={`w-10 h-10 ${darkMode ? 'text-white/50' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h4 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  No active sessions
                </h4>
                <p className={`text-sm text-center ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                  You don't have any ongoing sessions with users
                </p>
              </div>
            </div>
          </div>

          {/* Recent Earnings */}
          <div className={`group p-8 backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden cursor-pointer ${
            darkMode
              ? 'rounded-lg bg-white/3 border-white/20 hover:bg-white/8 hover:border-white/30'
              : 'rounded-lg bg-white border-gray-200'
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
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Recent Earnings
                </h3>
                <button
                  onClick={handleViewDetailedEarnings}
                  className={`flex items-center gap-2 text-sm px-4 py-2 rounded-lg transition-all duration-300 ${
                    darkMode
                      ? 'text-blue-300 hover:bg-blue-500/10 hover:text-blue-200 border border-blue-500/20'
                      : 'text-[#00001a] hover:bg-[#00001a]/5 border border-[#00001a]/20'
                  }`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View Detailed Earnings
                </button>
              </div>
              <p className={`text-sm mb-8 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                Your recent session payments
              </p>

              <div className="space-y-5">
                {recentEarnings.map((earning, index) => (
                  <div key={index} className={`flex items-center justify-between p-5 rounded-lg backdrop-blur-sm border transition-all duration-500 cursor-pointer ${
                    darkMode ? 'bg-white/3 border-white/10 hover:bg-white/8 hover:border-white/20' : 'bg-white/20 border-[#00001a]/10'
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
                  }}>
                    <div>
                      <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        {earning.title}
                      </h4>
                      <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                        {earning.duration} • {earning.timeAgo}
                      </p>
                    </div>
                    <div className={`text-xl font-bold ${darkMode ? 'text-green-400' : 'text-[#00001a]'}`}>
                      +${earning.amount.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Third Row - Available Slots and Review Sessions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Available Slots Calendar */}
          <div className={`group rounded-lg p-3 backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden cursor-pointer ${
            darkMode
              ? 'bg-white/3 border-white/10 hover:bg-white/8 hover:border-white/20'
              : 'bg-white border-gray-200'
          }`}
        style={darkMode ? {
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
        } : {
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          if (darkMode) {
            e.currentTarget.style.boxShadow = '0 0 25px rgba(59, 130, 246, 0.15), 0 0 50px rgba(59, 130, 246, 0.05), 0 8px 25px rgba(0, 0, 0, 0.2)';
          } else {
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
          }
        }}
        onMouseLeave={(e) => {
          if (darkMode) {
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
          } else {
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
          }
        }}>
          <div className="relative z-10">
            <h3 className={`text-lg font-semibold mb-3 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
              <Calendar className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-[#00001a]'}`} />
              Available Slots
            </h3>
            <p className={`text-sm mb-3 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
              Manage your availability calendar
            </p>

            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={goToPreviousMonth}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  darkMode
                    ? 'text-white/70 hover:text-white hover:bg-white/10'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h4 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                {getMonthYear()}
              </h4>
              <button
                onClick={goToNextMonth}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  darkMode
                    ? 'text-white/70 hover:text-white hover:bg-white/10'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 mb-6">
              {/* Day Headers */}
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className={`text-center text-sm font-medium p-3 ${
                  darkMode ? 'text-white/60' : 'text-gray-600'
                }`}>
                  {day}
                </div>
              ))}

              {/* Calendar Days */}
              {getCalendarDays().map((day, index) => {
                const today = new Date()
                const isToday = day &&
                  currentDate.getFullYear() === today.getFullYear() &&
                  currentDate.getMonth() === today.getMonth() &&
                  day === today.getDate()

                const dayDate = day ? new Date(currentDate.getFullYear(), currentDate.getMonth(), day) : null
                const hasSlots = dayDate && getAvailableSlotsForDate(dayDate).length > 0
                const hasBookings = dayDate && getBookedSessionsForDate(dayDate).length > 0
                const isSelected = selectedDay === day

                return (
                  <div
                    key={index}
                    onClick={() => day && setSelectedDay(day)}
                    className={`h-12 flex items-center justify-center text-sm font-medium cursor-pointer transition-all duration-300 rounded-lg relative ${
                      day
                        ? isSelected
                          ? darkMode
                            ? 'bg-blue-500/40 text-blue-200 border border-blue-400/70'
                            : 'bg-[#00001a] text-white border border-[#00001a]'
                          : isToday
                            ? darkMode
                              ? 'bg-blue-500/30 text-blue-300 border border-blue-400/50'
                              : 'bg-[#00001a]/20 text-[#00001a] border border-[#00001a]/30'
                            : hasBookings
                              ? darkMode
                                ? 'text-white hover:bg-white/10 font-semibold bg-red-500/20 border border-red-500/30'
                                : 'text-[#00001a] hover:bg-[#00001a]/5 font-semibold bg-[#00001a]/10 border border-[#00001a]/20'
                              : hasSlots
                                ? darkMode
                                  ? 'text-white hover:bg-white/10 font-semibold bg-green-500/20 border border-green-500/30'
                                  : 'text-[#00001a] hover:bg-[#00001a]/5 font-semibold bg-[#00001a]/5 border border-[#00001a]/15'
                                : darkMode
                                  ? 'text-white/60 hover:bg-white/5'
                                  : 'text-gray-500 hover:bg-gray-50'
                        : ''
                    }`}>
                    {day || ''}
                    {/* Busy indicator for dates with bookings */}
                    {day && hasBookings && (
                      <div className={`absolute top-1 right-1 w-2 h-2 rounded-full ${
                        darkMode ? 'bg-red-400' : 'bg-[#00001a]'
                      }`}></div>
                    )}
                    {/* Available indicator for dates with open slots */}
                    {day && hasSlots && !hasBookings && (
                      <div className={`absolute top-1 right-1 w-2 h-2 rounded-full ${
                        darkMode ? 'bg-green-400' : 'bg-[#00001a]/60'
                      }`}></div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Time Slots for Selected Day */}
            {selectedDay && (
              <div className="mt-6 pt-6 border-t border-gray-200/20">
                <h4 className={`text-sm font-semibold mb-4 ${darkMode ? 'text-white/80' : 'text-gray-800'}`}>
                  Available Slots - {currentDate.toLocaleDateString('en-US', { month: 'long' })} {selectedDay}, {currentDate.getFullYear()}
                </h4>

                {(() => {
                  const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDay)
                  const availableSlots = getAvailableSlotsForDate(selectedDate)
                  const bookedSessions = getBookedSessionsForDate(selectedDate)

                  if (availableSlots.length === 0) {
                    return (
                      <div className={`text-center py-8 ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                        <svg className={`w-12 h-12 mx-auto mb-3 ${darkMode ? 'text-white/30' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm">No available slots for this day</p>
                      </div>
                    )
                  }

                  return (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {availableSlots.map((time) => {
                        const isBooked = isSlotBooked(selectedDate, time)
                        const bookedSession = bookedSessions.find(session => session.time === time)
                        const dateKey = formatDateKey(selectedDate)
                        const slotKey = `${dateKey}-${time}`
                        const isSelected = selectedSlots.has(slotKey)

                        return (
                          <button
                            key={time}
                            onClick={() => handleSlotClick(time)}
                            className={`p-3 rounded-lg text-sm font-medium transition-all duration-300 border ${
                              isBooked
                                ? darkMode
                                  ? 'bg-green-500/20 text-green-300 border-green-500/30 cursor-default'
                                  : 'bg-[#00001a]/10 text-[#00001a] border-[#00001a]/20 cursor-default'
                                : isSelected
                                  ? darkMode
                                    ? 'bg-blue-500/30 text-blue-200 border-blue-400/50 hover:bg-blue-500/40'
                                    : 'bg-[#00001a] text-white border-[#00001a] hover:bg-[#00001a]/90'
                                  : darkMode
                                    ? 'bg-white/5 text-white/80 border-white/10 hover:bg-white/10 hover:border-white/20'
                                    : 'bg-white/60 text-gray-700 border-gray-200 hover:bg-white hover:border-gray-300'
                            }`}
                          >
                            <div className="flex flex-col items-center">
                              <span className="font-semibold">{time}</span>
                              {isBooked && bookedSession && (
                                <div className="mt-1 text-xs opacity-80">
                                  <div className="truncate">{bookedSession.student}</div>
                                  <div className="truncate">{bookedSession.topic}</div>
                                </div>
                              )}
                              {!isBooked && isSelected && (
                                <div className="mt-1 text-xs opacity-80">Selected</div>
                              )}
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  )
                })()}

                {/* Legend */}
                <div className="mt-4 flex flex-wrap gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${darkMode ? 'bg-green-400' : 'bg-[#00001a]'}`}></div>
                    <span className={darkMode ? 'text-white/70' : 'text-gray-600'}>Booked</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${darkMode ? 'bg-blue-400' : 'bg-[#00001a]'}`}></div>
                    <span className={darkMode ? 'text-white/70' : 'text-gray-600'}>Selected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${darkMode ? 'bg-white/20' : 'bg-[#00001a]/30'}`}></div>
                    <span className={darkMode ? 'text-white/70' : 'text-gray-600'}>Available</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Review Sessions */}
        <div className={`group rounded-lg p-3 backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden cursor-pointer ${
          darkMode
            ? 'bg-white/3 border-white/10 hover:bg-white/8 hover:border-white/20'
            : 'bg-white border-gray-200'
        }`}
        style={darkMode ? {
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
        } : {
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          if (darkMode) {
            e.currentTarget.style.boxShadow = '0 0 25px rgba(59, 130, 246, 0.15), 0 0 50px rgba(59, 130, 246, 0.05), 0 8px 25px rgba(0, 0, 0, 0.2)';
          } else {
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
          }
        }}
        onMouseLeave={(e) => {
          if (darkMode) {
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
          } else {
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
          }
        }}>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <h3 className={`text-lg font-semibold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                <Search className={`w-5 h-5 ${darkMode ? 'text-purple-400' : 'text-[#00001a]'}`} />
                Review Sessions
              </h3>
              <button
                onClick={() => alert('This would navigate to the full Sessions page where you can manage all your session requests, view detailed information, and handle bulk operations.')}
                className={`text-sm px-3 py-1.5 rounded-lg transition-all duration-300 ${
                  darkMode
                    ? 'text-purple-400 hover:bg-purple-500/10 hover:text-purple-300'
                    : 'text-[#00001a] hover:bg-[#00001a]/5'
                }`}>
                View All
              </button>
            </div>
            <p className={`text-sm mb-3 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
              Pending session requests for your approval
            </p>
            <div className="space-y-3">
              {sessionRequests.filter(session => session.status === 'pending').map((session, index) => (
                <div key={index} className={`p-3 rounded-lg border backdrop-blur-sm transition-all duration-500 cursor-pointer ${
                  darkMode ? 'bg-white/3 border-white/10 hover:bg-white/8 hover:border-white/20' : 'bg-white/40 border-gray-200/50'
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
                }}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className={`font-semibold text-base ${darkMode ? 'text-white' : 'text-gray-900'}`}>{session.student}</h4>
                      <p className={`text-sm mt-1 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>{session.topic}</p>
                    </div>
                    <span className={`px-3 py-1 text-xs rounded-lg backdrop-blur-sm border font-semibold ${
                      session.difficulty === 'Beginner'
                        ? darkMode ? 'bg-green-500/15 text-green-400 border-green-500/30' : 'bg-[#00001a]/10 text-[#00001a] border-[#00001a]/20'
                        : session.difficulty === 'Intermediate'
                        ? darkMode ? 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30' : 'bg-[#00001a]/15 text-[#00001a] border-[#00001a]/25'
                        : darkMode ? 'bg-red-500/15 text-red-400 border-red-500/30' : 'bg-[#00001a]/20 text-[#00001a] border-[#00001a]/30'
                    }`}>
                      {session.difficulty}
                    </span>
                  </div>
                  <div className={`text-sm mb-3 ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                    {session.date} • {session.time}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleAcceptSession(session.id, session.student)}
                      className={`flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg transition-all duration-300 backdrop-blur-sm border font-semibold ${
                        darkMode
                          ? 'bg-green-500/15 text-green-400 border-green-500/30 hover:bg-green-500/25 hover:shadow-lg'
                          : 'bg-[#00001a] text-white border-[#00001a] hover:bg-[#00001a]/90'
                      }`}>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Accept
                    </button>
                    <button
                      onClick={() => handleDeclineSession(session.id, session.student)}
                      className={`flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg transition-all duration-300 backdrop-blur-sm border font-semibold ${
                        darkMode
                          ? 'bg-red-500/15 text-red-400 border-red-500/30 hover:bg-red-500/25 hover:shadow-lg'
                          : 'bg-white text-[#00001a] border-[#00001a]/20 hover:bg-[#00001a]/5'
                      }`}>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Decline
                    </button>
                    <button
                      onClick={() => handleViewSessionDetails('review-session', session.id)}
                      className={`flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg transition-all duration-300 backdrop-blur-sm border font-semibold ${
                        darkMode
                          ? 'bg-blue-500/15 text-blue-400 border-blue-500/30 hover:bg-blue-500/25 hover:shadow-lg'
                          : 'bg-[#00001a]/10 text-[#00001a] border-[#00001a]/20 hover:bg-[#00001a]/15'
                      }`}>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View Details
                    </button>
                  </div>
                </div>
              ))}

              {/* Empty state for no pending sessions */}
              {sessionRequests.filter(session => session.status === 'pending').length === 0 && (
                <div className={`text-center py-8 ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                  <CheckCircle className={`w-12 h-12 mx-auto mb-2 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                  <p className="text-sm">No pending session requests</p>
                  <p className="text-xs mt-1">All caught up!</p>
                </div>
              )}
            </div>
          </div>
        </div>
        </div>

        {/* Fourth Row - Upcoming Sessions and Schedule */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Upcoming Sessions with Preview */}
          <div className={`group rounded-lg p-5 backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden cursor-pointer ${
            darkMode
              ? 'bg-white/3 border-white/10 hover:bg-white/8 hover:border-white/20'
              : 'bg-white border-gray-200'
          }`}
          style={darkMode ? {
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          } : {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            if (darkMode) {
              e.currentTarget.style.boxShadow = '0 0 25px rgba(59, 130, 246, 0.15), 0 0 50px rgba(59, 130, 246, 0.05), 0 8px 25px rgba(0, 0, 0, 0.2)';
            } else {
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
            }
          }}
          onMouseLeave={(e) => {
            if (darkMode) {
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            } else {
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            }
          }}>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-semibold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  <Calendar className={`w-5 h-5 ${darkMode ? 'text-green-400' : 'text-[#00001a]'}`} />
                  Upcoming Sessions (Preview)
                </h3>
                <button
                  onClick={() => alert('This would navigate to the full Sessions page showing all your upcoming sessions with detailed scheduling, preparation materials, and session management tools.')}
                  className={`text-sm px-3 py-1.5 rounded-lg transition-all duration-300 ${
                    darkMode
                      ? 'text-green-400 hover:bg-green-500/10 hover:text-green-300'
                      : 'text-[#00001a] hover:bg-[#00001a]/5'
                  }`}>
                  View All
                </button>
              </div>
              <div className="space-y-3">
                {[
                  {
                    id: "US001",
                    student: "Alice Johnson",
                    topic: "JavaScript Fundamentals",
                    time: "2:00 PM - 3:00 PM",
                    date: "Today",
                    status: "Confirmed",
                    avatar: "AJ",
                    notes: "Beginner level, focus on variables and functions"
                  },
                  {
                    id: "US002",
                    student: "Bob Chen",
                    topic: "React State Management",
                    time: "4:30 PM - 5:30 PM",
                    date: "Tomorrow",
                    status: "Pending",
                    avatar: "BC",
                    notes: "Intermediate level, Redux vs Context API"
                  }
                ].map((session, index) => (
                  <div key={index} className={`p-6 rounded-lg border backdrop-blur-sm transition-all duration-500 cursor-pointer ${
                    darkMode ? 'bg-white/3 border-white/10 hover:bg-white/8 hover:border-white/20' : 'bg-white/40 border-gray-200/50'
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
                  }}>
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-sm font-bold backdrop-blur-sm border ${
                        darkMode ? 'bg-blue-500/15 text-blue-400 border-blue-500/30' : 'bg-[#00001a]/10 text-[#00001a] border-[#00001a]/20'
                      }`}>
                        {session.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{session.student}</h4>
                          <span className={`px-3 py-1 text-xs rounded-lg backdrop-blur-sm border font-medium ${
                            session.status === 'Confirmed'
                              ? darkMode ? 'bg-green-500/15 text-green-400 border-green-500/30' : 'bg-[#00001a]/10 text-[#00001a] border-[#00001a]/20'
                              : darkMode ? 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30' : 'bg-[#00001a]/15 text-[#00001a] border-[#00001a]/25'
                          }`}>
                            {session.status}
                          </span>
                        </div>
                        <p className={`text-sm font-semibold mb-2 ${darkMode ? 'text-white/80' : 'text-gray-800'}`}>{session.topic}</p>
                        <p className={`text-sm mb-3 ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                          {session.date} • {session.time}
                        </p>
                        <p className={`text-xs mb-4 ${darkMode ? 'text-white/50' : 'text-gray-400'}`}>{session.notes}</p>
                        <div className="flex space-x-3">
                          <button
                            onClick={() => handleJoinSession(session.id)}
                            className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-all duration-300 backdrop-blur-sm border font-semibold ${
                              darkMode
                                ? 'bg-white/10 text-white border-white/20 hover:bg-white/20 hover:shadow-lg'
                                : 'bg-[#00001a] text-white border-[#00001a] hover:bg-[#00001a]/90'
                            }`}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Join Session
                          </button>
                          <button
                            onClick={() => handleViewUpcomingSessionDetails(session)}
                            className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-all duration-300 backdrop-blur-sm border font-semibold ${
                              darkMode
                                ? 'bg-white/3 text-white/80 border-white/10 hover:bg-white/8 hover:shadow-lg'
                                : 'bg-white text-[#00001a] border-[#00001a]/20 hover:bg-[#00001a]/5'
                            }`}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Expert Profile */}
          <div className={`group rounded-lg p-5 backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden cursor-pointer ${
            darkMode
              ? 'bg-white/3 border-white/10 hover:bg-white/8 hover:border-white/20'
              : 'bg-white border-gray-200'
          }`}
          style={darkMode ? {
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          } : {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            if (darkMode) {
              e.currentTarget.style.boxShadow = '0 0 25px rgba(59, 130, 246, 0.15), 0 0 50px rgba(59, 130, 246, 0.05), 0 8px 25px rgba(0, 0, 0, 0.2)';
            } else {
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
            }
          }}
          onMouseLeave={(e) => {
            if (darkMode) {
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            } else {
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            }
          }}>
            <div className="relative z-10">
              <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                Expert Profile
              </h3>
              <p className={`text-sm mb-4 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                Your expertise and reputation
              </p>

              <div className="space-y-8">
                {/* Expertise Domains */}
                <div>
                  <h4 className={`text-sm font-semibold mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Expertise Domains
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {expertiseData.domains.map((domain, index) => (
                      <span key={index} className={`px-4 py-2 rounded-lg text-sm backdrop-blur-md border transition-all duration-300 cursor-pointer ${
                        darkMode
                          ? 'bg-white/5 text-white border-white/20 hover:bg-white/10 hover:border-white/30 hover:shadow-lg'
                          : 'bg-white/20 text-gray-700 border-white/30'
                      }`}
                      style={darkMode ? {
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                      } : {}}>
                        {domain}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Current Rate */}
                <div>
                  <h4 className={`text-sm font-semibold mb-3 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Current Rate
                  </h4>
                  <div className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    {expertiseData.currentRate}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Schedule Component */}
        <div className={`group rounded-lg p-8 backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden cursor-pointer ${
          darkMode
            ? 'bg-white/3 border-white/10 hover:bg-white/8 hover:border-white/20'
            : 'bg-white border-gray-200'
        }`}
        style={darkMode ? {
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
        } : {
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          if (darkMode) {
            e.currentTarget.style.boxShadow = '0 0 25px rgba(59, 130, 246, 0.15), 0 0 50px rgba(59, 130, 246, 0.05), 0 8px 25px rgba(0, 0, 0, 0.2)';
          } else {
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
          }
        }}
        onMouseLeave={(e) => {
          if (darkMode) {
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
          } else {
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
          }
        }}>
          <div className="relative z-10">
            <h3 className={`text-lg font-semibold mb-6 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
              <CalendarDays className={`w-5 h-5 ${darkMode ? 'text-indigo-400' : 'text-[#00001a]'}`} />
              Schedule
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Today's Schedule */}
              <div>
                <h4 className={`font-semibold mb-4 ${darkMode ? 'text-white/80' : 'text-gray-800'}`}>Today</h4>
                <div className="space-y-3">
                  {[
                    { time: "9:00 AM", title: "Team Standup", type: "meeting" },
                    { time: "2:00 PM", title: "JavaScript Session with Alice", type: "session" },
                    { time: "4:00 PM", title: "Content Review", type: "task" }
                  ].map((item, index) => (
                    <div key={index} className={`flex items-center space-x-4 p-4 rounded-lg backdrop-blur-sm border transition-all duration-300 cursor-pointer ${
                      darkMode ? 'bg-white/3 border-white/10 hover:bg-white/8 hover:border-white/20' : 'bg-white/40 border-white/30'
                    }`}
                    style={darkMode ? {
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    } : {}}>
                      <div className={`w-3 h-3 rounded-full ${
                        item.type === 'session' ? darkMode ? 'bg-blue-500' : 'bg-[#00001a]' :
                        item.type === 'meeting' ? darkMode ? 'bg-green-500' : 'bg-[#00001a]/70' : darkMode ? 'bg-orange-500' : 'bg-[#00001a]/50'
                      }`}></div>
                      <div className="flex-1">
                        <div className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.title}</div>
                        <div className={`text-xs ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>{item.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tomorrow's Schedule */}
              <div>
                <h4 className={`font-semibold mb-4 ${darkMode ? 'text-white/80' : 'text-gray-800'}`}>Tomorrow</h4>
                <div className="space-y-3">
                  {[
                    { time: "10:00 AM", title: "React Session with Bob", type: "session" },
                    { time: "1:00 PM", title: "Lunch Break", type: "break" },
                    { time: "3:00 PM", title: "Content Creation", type: "task" }
                  ].map((item, index) => (
                    <div key={index} className={`flex items-center space-x-4 p-4 rounded-lg backdrop-blur-sm border transition-all duration-300 cursor-pointer ${
                      darkMode ? 'bg-white/3 border-white/10 hover:bg-white/8 hover:border-white/20' : 'bg-white/40 border-white/30'
                    }`}
                    style={darkMode ? {
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    } : {}}>
                      <div className={`w-3 h-3 rounded-full ${
                        item.type === 'session' ? darkMode ? 'bg-blue-500' : 'bg-[#00001a]' :
                        item.type === 'break' ? darkMode ? 'bg-gray-500' : 'bg-[#00001a]/40' : darkMode ? 'bg-orange-500' : 'bg-[#00001a]/60'
                      }`}></div>
                      <div className="flex-1">
                        <div className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.title}</div>
                        <div className={`text-xs ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>{item.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Anonymous Doubt Pools */}
        <div className={`group rounded-lg p-5 backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden cursor-pointer ${
          darkMode
            ? 'bg-white/3 border-white/10 hover:bg-white/8 hover:border-white/20'
            : 'bg-white border-gray-200'
        }`}
        style={darkMode ? {
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
        } : {
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          if (darkMode) {
            e.currentTarget.style.boxShadow = '0 0 25px rgba(59, 130, 246, 0.15), 0 0 50px rgba(59, 130, 246, 0.05), 0 8px 25px rgba(0, 0, 0, 0.2)';
          } else {
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
          }
        }}
        onMouseLeave={(e) => {
          if (darkMode) {
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
          } else {
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
          }
        }}>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-semibold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                <HelpCircle className={`w-5 h-5 ${darkMode ? 'text-cyan-400' : 'text-[#00001a]'}`} />
                Anonymous Doubt Pools
              </h3>
              <button
                onClick={() => alert('This would navigate to the full Community page where you can browse all doubt pools, manage your solutions, track earnings, and participate in the knowledge sharing community.')}
                className={`text-sm px-3 py-1.5 rounded-lg transition-all duration-300 ${
                  darkMode
                    ? 'text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300'
                    : 'text-[#00001a] hover:bg-[#00001a]/5'
                }`}>
                View All
              </button>
            </div>

            {/* Tabs */}
            <div className="flex space-x-2 mb-4">
              {['Active Requests', 'My Solutions', 'Completed'].map((tab, index) => (
                <button
                  key={tab}
                  onClick={() => handleDoubtTabChange(index, tab)}
                  className={`px-4 py-3 text-sm rounded-lg transition-all duration-300 backdrop-blur-sm border font-semibold ${
                    index === activeDoubtTab
                      ? darkMode
                        ? 'bg-blue-500/15 text-blue-400 border-blue-500/30 hover:bg-blue-500/25'
                        : 'bg-[#00001a] text-white border-[#00001a]'
                      : darkMode
                        ? 'bg-white/3 text-white/70 border-white/10 hover:bg-white/8 hover:border-white/20'
                        : 'bg-white text-[#00001a] border-[#00001a]/20 hover:bg-[#00001a]/5'
                  }`}>
                    {tab}
                </button>
              ))}
            </div>

            {/* Statistics Bar */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
              <div className={`p-3 rounded-lg backdrop-blur-sm border ${
                darkMode ? 'bg-white/5 border-white/10' : 'bg-white/50 border-gray-200'
              }`}>
                <div className={`text-xs font-medium mb-1 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                  Solutions Given
                </div>
                <div className={`text-lg font-bold ${darkMode ? 'text-cyan-400' : 'text-[#00001a]'}`}>
                  {doubtPoolStats.totalSolutionsGiven}
                </div>
              </div>

              <div className={`p-3 rounded-lg backdrop-blur-sm border ${
                darkMode ? 'bg-white/5 border-white/10' : 'bg-white/50 border-gray-200'
              }`}>
                <div className={`text-xs font-medium mb-1 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                  Completed
                </div>
                <div className={`text-lg font-bold ${darkMode ? 'text-green-400' : 'text-[#00001a]'}`}>
                  {doubtPoolStats.solutionsCompleted}
                </div>
              </div>

              <div className={`p-3 rounded-lg backdrop-blur-sm border ${
                darkMode ? 'bg-white/5 border-white/10' : 'bg-white/50 border-gray-200'
              }`}>
                <div className={`text-xs font-medium mb-1 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                  Pending Review
                </div>
                <div className={`text-lg font-bold ${darkMode ? 'text-yellow-400' : 'text-[#00001a]'}`}>
                  {doubtPoolStats.solutionsPending}
                </div>
              </div>

              <div className={`p-3 rounded-lg backdrop-blur-sm border ${
                darkMode ? 'bg-white/5 border-white/10' : 'bg-white/50 border-gray-200'
              }`}>
                <div className={`text-xs font-medium mb-1 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                  Points Earned
                </div>
                <div className={`text-lg font-bold ${darkMode ? 'text-purple-400' : 'text-[#00001a]'}`}>
                  {doubtPoolStats.totalPointsEarned}
                </div>
              </div>

              <div className={`p-3 rounded-lg backdrop-blur-sm border ${
                darkMode ? 'bg-white/5 border-white/10' : 'bg-white/50 border-gray-200'
              }`}>
                <div className={`text-xs font-medium mb-1 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                  Avg Rating
                </div>
                <div className={`text-lg font-bold flex items-center gap-1 ${darkMode ? 'text-yellow-400' : 'text-[#00001a]'}`}>
                  {doubtPoolStats.averageRating}
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                </div>
              </div>

              <div className={`p-3 rounded-lg backdrop-blur-sm border ${
                darkMode ? 'bg-white/5 border-white/10' : 'bg-white/50 border-gray-200'
              }`}>
                <div className={`text-xs font-medium mb-1 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                  Helpful Votes
                </div>
                <div className={`text-lg font-bold ${darkMode ? 'text-blue-400' : 'text-[#00001a]'}`}>
                  {doubtPoolStats.helpfulVotes}
                </div>
              </div>
            </div>

            {/* Dynamic Content Based on Active Tab */}
            <div className="space-y-5">
              {(() => {
                let currentData = []
                switch (activeDoubtTab) {
                  case 0:
                    currentData = doubtPoolData.activeRequests
                    break
                  case 1:
                    currentData = doubtPoolData.mySolutions
                    break
                  case 2:
                    currentData = doubtPoolData.completed
                    break
                  default:
                    currentData = doubtPoolData.activeRequests
                }

                return currentData.map((doubt) => (
                <div key={doubt.id} className={`p-6 rounded-lg border backdrop-blur-sm transition-all duration-500 cursor-pointer ${
                  darkMode ? 'bg-white/3 border-white/10 hover:bg-white/8 hover:border-white/20' : 'bg-white/40 border-gray-200/50'
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
                }}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h4 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {doubt.question}
                      </h4>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {doubt.tags.map((tag) => (
                          <span key={tag} className={`px-3 py-1 text-xs rounded-lg backdrop-blur-sm border ${
                            darkMode ? 'bg-blue-500/15 text-blue-400 border-blue-500/30' : 'bg-[#00001a]/10 text-[#00001a] border-[#00001a]/20'
                          }`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                        {doubt.timeAgo || doubt.solvedAt || doubt.completedAt} • {doubt.difficulty}
                        {doubt.status && ` • ${doubt.status}`}
                        {doubt.solver && ` • Solved by ${doubt.solver}`}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-xl font-bold ${darkMode ? 'text-green-400' : 'text-[#00001a]'}`}>
                        ${doubt.bounty}
                      </div>
                      <div className={`text-xs ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                        {activeDoubtTab === 1 ? 'Earned' : activeDoubtTab === 2 ? 'Reward' : 'Bounty'}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    {activeDoubtTab === 0 && (
                      <>
                        <button
                          onClick={() => handleRespond(doubt.id)}
                          className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-all duration-300 backdrop-blur-sm border font-semibold ${
                            darkMode
                              ? 'bg-green-500/15 text-green-400 border-green-500/30 hover:bg-green-500/25 hover:shadow-lg'
                              : 'bg-[#00001a] text-white border-[#00001a] hover:bg-[#00001a]/90'
                          }`}>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                          </svg>
                          Respond
                        </button>
                        <button
                          onClick={() => handleViewDetails(doubt)}
                          className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-all duration-300 backdrop-blur-sm border font-semibold ${
                            darkMode
                              ? 'bg-blue-500/15 text-blue-400 border-blue-500/30 hover:bg-blue-500/25 hover:shadow-lg'
                              : 'bg-white text-[#00001a] border-[#00001a]/20 hover:bg-[#00001a]/5'
                          }`}>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          View Details
                        </button>
                      </>
                    )}

                    {activeDoubtTab === 1 && (
                      <>
                        <button
                          onClick={() => handleViewStatus(doubt)}
                          className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-all duration-300 backdrop-blur-sm border font-semibold ${
                            darkMode
                              ? 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/25 hover:shadow-lg'
                              : 'bg-[#00001a] text-white border-[#00001a] hover:bg-[#00001a]/90'
                          }`}>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          View Status
                        </button>
                        <button
                          onClick={() => handleEditSolution(doubt)}
                          className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-all duration-300 backdrop-blur-sm border font-semibold ${
                            darkMode
                              ? 'bg-blue-500/15 text-blue-400 border-blue-500/30 hover:bg-blue-500/25 hover:shadow-lg'
                              : 'bg-white text-[#00001a] border-[#00001a]/20 hover:bg-[#00001a]/5'
                          }`}>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit Solution
                        </button>
                      </>
                    )}

                    {activeDoubtTab === 2 && (
                      <>
                        <button
                          onClick={() => alert(`This doubt was completed ${doubt.completedAt} by ${doubt.solver}`)}
                          className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-all duration-300 backdrop-blur-sm border font-semibold ${
                            darkMode
                              ? 'bg-gray-500/15 text-gray-400 border-gray-500/30 hover:bg-gray-500/25 hover:shadow-lg'
                              : 'bg-[#00001a] text-white border-[#00001a] hover:bg-[#00001a]/90'
                          }`}>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Completed
                        </button>
                        <button
                          onClick={() => handleViewSolution(doubt)}
                          className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-all duration-300 backdrop-blur-sm border font-semibold ${
                            darkMode
                              ? 'bg-blue-500/15 text-blue-400 border-blue-500/30 hover:bg-blue-500/25 hover:shadow-lg'
                              : 'bg-white text-[#00001a] border-[#00001a]/20 hover:bg-[#00001a]/5'
                          }`}>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          View Solution
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
              })()}
            </div>
          </div>
        </div>

        {/* Fourth Row - Your Content */}
        <div className="grid grid-cols-1 gap-4">
          <div className={`group rounded-lg p-5 backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden cursor-pointer ${
            darkMode
              ? 'bg-white/3 border-white/10 hover:bg-white/8 hover:border-white/20'
              : 'bg-gradient-to-br from-white/50 via-white/40 to-white/30 border-white/30 shadow-black/10'
          }`}
          style={darkMode ? {
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          } : {}}
          onMouseEnter={(e) => {
            if (darkMode) {
              e.currentTarget.style.boxShadow = '0 0 25px rgba(59, 130, 246, 0.15), 0 0 50px rgba(59, 130, 246, 0.05), 0 8px 25px rgba(0, 0, 0, 0.2)';
            }
          }}
          onMouseLeave={(e) => {
            if (darkMode) {
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            }
          }}>
            <div className="relative z-10">
              <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                Your Content
              </h3>
              <p className={`text-sm mb-4 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                Tutorials and resources you've created
              </p>

              <div className="flex flex-col items-center justify-center py-16">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm border ${
                  darkMode ? 'bg-white/5 border-white/10' : 'bg-gray-200 border-gray-300'
                }`}>
                  <svg className={`w-10 h-10 ${darkMode ? 'text-white/50' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h4 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  No content created yet
                </h4>
                <p className={`text-sm text-center mb-6 ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                  Start creating tutorials and resources to share your expertise
                </p>
                <button
                  onClick={handleCreateTutorial}
                  className={`px-6 py-3 rounded-lg backdrop-blur-md transition-all duration-300 border shadow-lg font-semibold ${
                    darkMode
                      ? 'bg-white/10 text-white border-white/20 hover:bg-white/20 hover:shadow-xl'
                      : 'bg-[#00001a] text-white hover:bg-[#00001a]/90 border-[#00001a] shadow-black/10'
                  }`}
                >
                  Create Your First Tutorial
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Comprehensive Solution Submission Modal */}
      {showResponseModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-lg p-6 ${
            darkMode ? 'bg-[#00001a] border border-white/20' : 'bg-white border border-gray-200'
          }`}>
            <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
              <Lightbulb className="w-5 h-5" />
              Provide Your Solution
            </h3>
            <p className={`text-sm mb-6 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
              Help the student by providing a comprehensive solution. You can use text, code, references, or attach content.
            </p>

            {/* Solution Type Selector */}
            <div className="mb-6">
              <h4 className={`text-sm font-semibold mb-3 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                Solution Type
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { type: 'text', icon: FileText, label: 'Text Solution', desc: 'Written explanation' },
                  { type: 'code', icon: Code, label: 'Code Solution', desc: 'Code examples' },
                  { type: 'reference', icon: Link, label: 'References', desc: 'Helpful links' },
                  { type: 'content', icon: Paperclip, label: 'Attach Content', desc: 'Files/images' }
                ].map((option) => (
                  <button
                    key={option.type}
                    onClick={() => setSolutionType(option.type)}
                    className={`p-3 rounded-lg border text-left transition-all duration-300 ${
                      solutionType === option.type
                        ? darkMode
                          ? 'bg-blue-500/20 border-blue-500/40 text-blue-400'
                          : 'bg-[#00001a]/10 border-[#00001a] text-[#00001a]'
                        : darkMode
                          ? 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                          : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                    }`}>
                    <div className="font-medium text-sm flex items-center gap-2">
                      <option.icon className="w-4 h-4" />
                      {option.label}
                    </div>
                    <div className="text-xs opacity-70">{option.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Text Solution */}
            {(solutionType === 'text' || solutionType === 'code') && (
              <div className="mb-6">
                <h4 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  {solutionType === 'text' ? (
                    <>
                      <FileText className="w-4 h-4" />
                      Your Solution
                    </>
                  ) : (
                    <>
                      <Code className="w-4 h-4" />
                      Code Solution
                    </>
                  )}
                </h4>

                {solutionType === 'code' && (
                  <div className="mb-3">
                    <select
                      value={codeLanguage}
                      onChange={(e) => setCodeLanguage(e.target.value)}
                      className={`px-3 py-2 rounded-lg border text-sm ${
                        darkMode
                          ? 'bg-white/5 border-white/20 text-white'
                          : 'bg-gray-50 border-gray-300 text-[#00001a]'
                      }`}>
                      <option value="javascript">JavaScript</option>
                      <option value="python">Python</option>
                      <option value="java">Java</option>
                      <option value="cpp">C++</option>
                      <option value="html">HTML</option>
                      <option value="css">CSS</option>
                      <option value="react">React</option>
                      <option value="nodejs">Node.js</option>
                    </select>
                  </div>
                )}

                <textarea
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  placeholder={solutionType === 'text'
                    ? "Provide a detailed explanation of the solution..."
                    : "Write your code solution here..."}
                  className={`w-full h-40 p-3 rounded-lg border resize-none font-mono text-sm ${
                    darkMode
                      ? 'bg-white/5 border-white/20 text-white placeholder-white/50'
                      : 'bg-gray-50 border-gray-300 text-[#00001a] placeholder-gray-500'
                  }`}
                />
              </div>
            )}

            {/* Reference Links */}
            {solutionType === 'reference' && (
              <div className="mb-6">
                <h4 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  <Link className="w-4 h-4" />
                  Reference Links
                </h4>
                {referenceLinks.map((link, index) => (
                  <div key={index} className="flex gap-2 mb-3">
                    <input
                      type="url"
                      value={link}
                      onChange={(e) => updateReferenceLink(index, e.target.value)}
                      placeholder="https://example.com/helpful-resource"
                      className={`flex-1 px-3 py-2 rounded-lg border text-sm ${
                        darkMode
                          ? 'bg-white/5 border-white/20 text-white placeholder-white/50'
                          : 'bg-gray-50 border-gray-300 text-[#00001a] placeholder-gray-500'
                      }`}
                    />
                    {referenceLinks.length > 1 && (
                      <button
                        onClick={() => removeReferenceLink(index)}
                        className={`px-3 py-2 rounded-lg border transition-all duration-300 ${
                          darkMode
                            ? 'bg-red-500/20 border-red-500/40 text-red-400 hover:bg-red-500/30'
                            : 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100'
                        }`}>
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={addReferenceLink}
                  className={`text-sm px-3 py-2 rounded-lg border transition-all duration-300 ${
                    darkMode
                      ? 'bg-white/5 border-white/20 text-white/70 hover:bg-white/10'
                      : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                  }`}>
                  <Plus className="w-3 h-3 mr-1" />
                  Add Another Link
                </button>
              </div>
            )}

            {/* Content Upload */}
            {solutionType === 'content' && (
              <div className="mb-6">
                <h4 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  <Paperclip className="w-4 h-4" />
                  Attach Content
                </h4>
                <div className={`border-2 border-dashed rounded-lg p-6 text-center ${
                  darkMode ? 'border-white/20' : 'border-gray-300'
                }`}>
                  <input
                    type="file"
                    onChange={handleContentUpload}
                    className="hidden"
                    id="content-upload"
                    accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.gif"
                  />
                  <label
                    htmlFor="content-upload"
                    className={`cursor-pointer inline-block px-4 py-2 rounded-lg border transition-all duration-300 ${
                      darkMode
                        ? 'bg-white/5 border-white/20 text-white hover:bg-white/10'
                        : 'bg-gray-50 border-gray-200 text-[#00001a] hover:bg-gray-100'
                    }`}>
                    Choose File
                  </label>
                  {attachedContent && (
                    <div className={`mt-3 text-sm flex items-center gap-2 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                      <Paperclip className="w-3 h-3" />
                      {attachedContent.name} ({Math.round(attachedContent.size / 1024)} KB)
                    </div>
                  )}
                  <p className={`text-xs mt-2 ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                    Supported: PDF, DOC, TXT, Images (Max 10MB)
                  </p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowResponseModal(false)
                  setResponseText('')
                  setSolutionType('text')
                  setReferenceLinks([''])
                  setAttachedContent(null)
                }}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  darkMode
                    ? 'bg-white/10 text-white hover:bg-white/20'
                    : 'bg-gray-200 text-[#00001a] hover:bg-gray-300'
                }`}>
                Cancel
              </button>
              <button
                onClick={submitResponse}
                className={`px-6 py-2 rounded-lg transition-all duration-300 font-semibold ${
                  darkMode
                    ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                    : 'bg-[#00001a] text-white hover:bg-[#00001a]/90'
                }`}>
                <Send className="w-4 h-4 mr-2" />
                Submit Solution
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedDoubt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`max-w-2xl w-full rounded-lg p-6 ${
            darkMode ? 'bg-[#00001a] border border-white/20' : 'bg-white border border-gray-200'
          }`}>
            <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
              Doubt Details
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>Question:</h4>
                <p className={`${darkMode ? 'text-white/80' : 'text-gray-700'}`}>{selectedDoubt.question}</p>
              </div>
              <div>
                <h4 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>Tags:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedDoubt.tags.map((tag, index) => (
                    <span key={index} className={`px-2 py-1 rounded text-xs ${
                      darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>Difficulty:</h4>
                  <p className={`${darkMode ? 'text-white/80' : 'text-gray-700'}`}>{selectedDoubt.difficulty}</p>
                </div>
                <div>
                  <h4 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>Bounty:</h4>
                  <p className={`${darkMode ? 'text-green-400' : 'text-green-600'} font-bold`}>${selectedDoubt.bounty}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowDetailsModal(false)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  darkMode
                    ? 'bg-white/10 text-white hover:bg-white/20'
                    : 'bg-gray-200 text-[#00001a] hover:bg-gray-300'
                }`}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Solution Modal */}
      {showEditModal && selectedDoubt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`max-w-2xl w-full rounded-lg p-6 ${
            darkMode ? 'bg-[#00001a] border border-white/20' : 'bg-white border border-gray-200'
          }`}>
            <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
              Edit Solution
            </h3>
            <p className={`text-sm mb-4 ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
              Update your solution for: {selectedDoubt.question}
            </p>
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              placeholder="Update your solution here..."
              className={`w-full h-32 p-3 rounded-lg border resize-none ${
                darkMode
                  ? 'bg-white/5 border-white/20 text-white placeholder-white/50'
                  : 'bg-gray-50 border-gray-300 text-[#00001a] placeholder-gray-500'
              }`}
            />
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setShowEditModal(false)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  darkMode
                    ? 'bg-white/10 text-white hover:bg-white/20'
                    : 'bg-gray-200 text-[#00001a] hover:bg-gray-300'
                }`}>
                Cancel
              </button>
              <button
                onClick={submitEditedSolution}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  darkMode
                    ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                    : 'bg-[#00001a] text-white hover:bg-[#00001a]/90'
                }`}>
                Update Solution
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
