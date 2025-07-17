import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Wallet,
  CreditCard,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  Download,
  Settings,
  Plus,
  Eye,
  EyeOff,
  Filter,
  Search,
  MoreHorizontal,
  CheckCircle,
  Clock,
  AlertCircle,
  Banknote,
  Building2,
  Smartphone,
  Globe,
  BarChart3,
  PieChart,
  Activity,
  RefreshCw
} from 'lucide-react'

const Payments = ({ darkMode }) => {
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('overview')
  const [toggleStates, setToggleStates] = useState({
    autoWithdraw: true,
    paymentReceived: true,
    transferCompleted: false,
    lowBalanceAlert: true,
    monthlyStatements: false,
    twoFactor: true,
    emailVerification: true
  })

  // Function to clean text content from ">" symbols
  const cleanText = (text) => {
    if (typeof text === 'string') {
      return text.replace(/^>\s*/, '').replace(/>\s*/g, '');
    }
    return text;
  }

  // Clean up any ">" symbols that might be injected by external sources
  useEffect(() => {
    const cleanUpSymbols = () => {
      // Find all text nodes and clean them
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
      );

      let node;
      while (node = walker.nextNode()) {
        if (node.textContent && node.textContent.includes('>')) {
          node.textContent = node.textContent.replace(/^>\s*/g, '').replace(/>\s+/g, ' ');
        }
      }
    };

    // Clean up immediately and after a short delay
    cleanUpSymbols();
    const timer = setTimeout(cleanUpSymbols, 100);

    return () => clearTimeout(timer);
  }, [activeSection])
  const [showBalance, setShowBalance] = useState(true)
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [isLoading, setIsLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState('')
  const [transferAmount, setTransferAmount] = useState('')
  const [selectedBank, setSelectedBank] = useState('')
  const [notifications, setNotifications] = useState([])

  // Simulate loading states
  const handleAction = async (action, data = {}) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Show success notification
      const notification = {
        id: Date.now(),
        type: 'success',
        message: `${action} completed successfully!`,
        timestamp: new Date().toISOString()
      }
      setNotifications(prev => [notification, ...prev.slice(0, 4)])

      // Auto-remove notification after 5 seconds
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== notification.id))
      }, 5000)

    } catch (error) {
      // Show error notification
      const notification = {
        id: Date.now(),
        type: 'error',
        message: `Failed to ${action.toLowerCase()}. Please try again.`,
        timestamp: new Date().toISOString()
      }
      setNotifications(prev => [notification, ...prev.slice(0, 4)])
    } finally {
      setIsLoading(false)
      setShowModal(false)
    }
  }

  // Handle transfer
  const handleTransfer = () => {
    if (!transferAmount || !selectedBank) {
      const notification = {
        id: Date.now(),
        type: 'error',
        message: 'Please fill in all required fields.',
        timestamp: new Date().toISOString()
      }
      setNotifications(prev => [notification, ...prev.slice(0, 4)])
      return
    }
    handleAction('Transfer', { amount: transferAmount, bank: selectedBank })
  }

  // Mock data for payments
  const walletData = {
    totalBalance: 12450.75,
    availableBalance: 10250.50,
    pendingEarnings: 2200.25,
    thisMonthEarnings: 3450.00,
    lastMonthEarnings: 2890.50,
    growthPercentage: 19.4
  }

  const paymentMethods = [
    {
      id: 1,
      type: 'UPI',
      name: 'Google Pay',
      identifier: 'pred@okaxis',
      isDefault: true,
      status: 'active',
      icon: Smartphone
    },
    {
      id: 2,
      type: 'Bank',
      name: 'HDFC Bank',
      identifier: '****1234',
      isDefault: false,
      status: 'active',
      icon: Building2
    },
    {
      id: 3,
      type: 'Stripe',
      name: 'Stripe Connect',
      identifier: 'acct_****5678',
      isDefault: false,
      status: 'pending',
      icon: CreditCard
    }
  ]

  const sessionEarnings = [
    {
      id: 1,
      sessionId: 'SES001',
      student: 'Alice Johnson',
      topic: 'React Performance Optimization',
      date: '2025-07-14',
      duration: 60,
      rate: 45,
      amount: 45.00,
      status: 'completed',
      paymentStatus: 'paid'
    },
    {
      id: 2,
      sessionId: 'SES002',
      student: 'Bob Chen',
      topic: 'TypeScript Advanced Concepts',
      date: '2025-07-13',
      duration: 90,
      rate: 45,
      amount: 67.50,
      status: 'completed',
      paymentStatus: 'pending'
    },
    {
      id: 3,
      sessionId: 'SES003',
      student: 'Carol Davis',
      topic: 'Node.js API Development',
      date: '2025-07-12',
      duration: 45,
      rate: 45,
      amount: 33.75,
      status: 'completed',
      paymentStatus: 'paid'
    }
  ]

  // Filter session earnings based on selected filters
  const filteredSessionEarnings = sessionEarnings.filter(session => {
    // Filter by payment status
    if (filterType === 'paid' && session.paymentStatus !== 'paid') return false
    if (filterType === 'pending' && session.paymentStatus !== 'pending') return false
    if (filterType === 'completed' && session.status !== 'completed') return false

    // Filter by time range (for now, showing all as we don't have date filtering logic)
    // You can add date filtering logic here based on selectedTimeRange

    return true
  })

  const transactions = [
    {
      id: 1,
      type: 'earning',
      description: 'Session payment from Alice Johnson',
      amount: 45.00,
      date: '2025-07-14',
      time: '14:30',
      status: 'completed',
      method: 'UPI',
      reference: 'TXN001234'
    },
    {
      id: 2,
      type: 'withdrawal',
      description: 'Bank transfer to HDFC Bank',
      amount: -500.00,
      date: '2025-07-13',
      time: '10:15',
      status: 'completed',
      method: 'Bank',
      reference: 'TXN001235'
    },
    {
      id: 3,
      type: 'earning',
      description: 'Session payment from Bob Chen',
      amount: 67.50,
      date: '2025-07-13',
      time: '16:45',
      status: 'pending',
      method: 'Stripe',
      reference: 'TXN001236'
    }
  ]

  // Filter transactions based on selected filters
  const filteredTransactions = transactions.filter(transaction => {
    // Filter by transaction type
    if (filterType === 'earning' && transaction.type !== 'earning') return false
    if (filterType === 'withdrawal' && transaction.type !== 'withdrawal') return false
    if (filterType === 'completed' && transaction.status !== 'completed') return false
    if (filterType === 'pending' && transaction.status !== 'pending') return false

    // Filter by search query
    if (searchQuery && !transaction.description.toLowerCase().includes(searchQuery.toLowerCase())) return false

    return true
  })

  const paymentStats = {
    totalEarnings: 12450.75,
    totalWithdrawals: 8200.00,
    averageSessionValue: 52.30,
    totalSessions: 238,
    successRate: 98.5,
    averagePayoutTime: '2.3 days'
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

      {/* Notifications */}
      <div className="fixed top-4 right-4 z-40 space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-xl backdrop-blur-xl border shadow-lg transform transition-all duration-500 animate-slide-in-right ${
              notification.type === 'success'
                ? darkMode
                  ? 'bg-green-500/20 border-green-500/30 text-green-400'
                  : 'bg-green-100 border-green-200 text-green-700'
                : darkMode
                  ? 'bg-red-500/20 border-red-500/30 text-red-400'
                  : 'bg-red-100 border-red-200 text-red-700'
            }`}>
            <div className="flex items-center gap-3">
              {notification.type === 'success' ? (
                <CheckCircle size={20} />
              ) : (
                <AlertCircle size={20} />
              )}
              <div>
                <div className="font-medium">{notification.message}</div>
                <div className={`text-xs opacity-70`}>
                  {new Date(notification.timestamp).toLocaleTimeString()}
                </div>
              </div>
              <button
                onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
                className="ml-2 opacity-70 hover:opacity-100 transition-opacity">
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse ${
          darkMode ? 'bg-white/10' : 'bg-[#00001a]/10'
        }`}></div>
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse ${
          darkMode ? 'bg-white/5' : 'bg-[#00001a]/5'
        }`}></div>
      </div>

      <div className="relative p-6 space-y-6">
        {/* Navigation Tabs */}
        <div className={`flex flex-wrap gap-2 p-2 rounded-lg border ${
          darkMode
            ? 'border-white/20'
            : 'bg-white border-[#00001a]/20'
        }`}>
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'wallet', label: 'Wallet', icon: Wallet },
            { id: 'methods', label: 'Payment Methods', icon: CreditCard },
            { id: 'sessions', label: 'Session Earnings', icon: DollarSign },
            { id: 'history', label: 'Transaction History', icon: Activity },
            { id: 'transfer', label: 'Bank Transfer', icon: Building2 },
            { id: 'export', label: 'Export Data', icon: Download },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
                  activeSection === tab.id
                    ? darkMode
                      ? 'border-white/30 text-white border'
                      : 'bg-white text-[#00001a] border border-[#00001a]/30 shadow-sm'
                    : darkMode
                      ? 'text-white/70 hover:border-white/20 hover:text-white border border-transparent'
                      : 'text-[#00001a]/70 hover:bg-[#00001a]/10 hover:text-[#00001a] border border-transparent'
                }`}>
                <Icon size={16} />
                <span className="hidden sm:inline">{cleanText(tab.label)}</span>
              </button>
            )
          })}
        </div>

        {/* Overview Section */}
        {activeSection === 'overview' && (
          <div className="space-y-6">
            {/* Wallet Balance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Total Balance */}
              <div className={`group p-5 border transition-all duration-300 shadow-lg relative overflow-hidden cursor-pointer ${
                darkMode
                  ? 'rounded-lg border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]'
                  : 'rounded-lg bg-white border-[#00001a]/20 hover:border-[#00001a]/30 hover:shadow-[0_0_20px_rgba(0,0,26,0.15)]'
              }`}>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-lg ${
                      darkMode ? 'bg-white/10 text-white' : 'bg-[#00001a]/10 text-[#00001a]'
                    }`}>
                      <Wallet size={20} />
                    </div>
                    <button
                      onClick={() => setShowBalance(!showBalance)}
                      className={`p-1 rounded transition-colors ${
                        darkMode ? 'text-white/60 hover:text-white' : 'text-[#00001a]/60 hover:text-[#00001a]'
                      }`}>
                      {showBalance ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                  </div>
                  <div className={`text-sm mb-1 ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                    Total Balance
                  </div>
                  <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    {showBalance ? `$${walletData.totalBalance.toLocaleString()}` : '••••••'}
                  </div>
                  <div className={`text-sm flex items-center gap-1 mt-2 ${
                    darkMode ? 'text-white/60' : 'text-[#00001a]/60'
                  }`}>
                    <TrendingUp size={14} />
                    +{walletData.growthPercentage}% this month
                  </div>
                </div>
              </div>

              {/* Available Balance */}
              <div className={`group p-5 border transition-all duration-300 shadow-lg relative overflow-hidden cursor-pointer ${
                darkMode
                  ? 'rounded-lg border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]'
                  : 'rounded-lg bg-white border-[#00001a]/20 hover:border-[#00001a]/30 hover:shadow-[0_0_20px_rgba(0,0,26,0.15)]'
              }`}>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-lg ${
                      darkMode ? 'bg-white/10 text-white' : 'bg-[#00001a]/10 text-[#00001a]'
                    }`}>
                      <DollarSign size={20} />
                    </div>
                  </div>
                  <div className={`text-sm mb-1 ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                    Available Balance
                  </div>
                  <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    {showBalance ? `$${walletData.availableBalance.toLocaleString()}` : '••••••'}
                  </div>
                  <div className={`text-sm mt-2 ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                    Ready for withdrawal
                  </div>
                </div>
              </div>

              {/* Pending Earnings */}
              <div className={`group p-5 border transition-all duration-300 shadow-lg relative overflow-hidden cursor-pointer ${
                darkMode
                  ? 'rounded-lg border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]'
                  : 'rounded-lg bg-white border-gray-200 hover:border-gray-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.1)]'
              }`}>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-lg ${
                      darkMode ? 'bg-white/10 text-white' : 'bg-[#00001a]/10 text-[#00001a]'
                    }`}>
                      <Clock size={20} />
                    </div>
                  </div>
                  <div className={`text-sm mb-1 ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                    Pending Earnings
                  </div>
                  <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    {showBalance ? `$${walletData.pendingEarnings.toLocaleString()}` : '••••••'}
                  </div>
                  <div className={`text-sm mt-2 ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                    Processing...
                  </div>
                </div>
              </div>

              {/* This Month Earnings */}
              <div className={`group p-5 border transition-all duration-300 shadow-lg relative overflow-hidden cursor-pointer ${
                darkMode
                  ? 'rounded-lg border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]'
                  : 'rounded-lg bg-white border-[#00001a]/20 hover:border-[#00001a]/30 hover:shadow-[0_0_20px_rgba(0,0,26,0.15)]'
              }`}>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-lg ${
                      darkMode ? 'bg-white/10 text-white' : 'bg-[#00001a]/10 text-[#00001a]'
                    }`}>
                      <Calendar size={20} />
                    </div>
                  </div>
                  <div className={`text-sm mb-1 ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                    This Month
                  </div>
                  <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    {showBalance ? `$${walletData.thisMonthEarnings.toLocaleString()}` : '••••••'}
                  </div>
                  <div className={`text-sm mt-2 ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                    vs ${walletData.lastMonthEarnings.toLocaleString()} last month
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Statistics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Payment Stats */}
              <div className={`group p-6 border transition-all duration-500 shadow-xl relative overflow-hidden cursor-pointer ${
                darkMode
                  ? 'rounded-lg border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]'
                  : 'rounded-lg bg-white border-[#00001a]/20 hover:border-[#00001a]/30 hover:shadow-[0_0_25px_rgba(0,0,26,0.2)]'
              }`}>
                <div className="relative z-10">
                  <h3 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Payment Statistics
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className={`group/stat p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                      darkMode ? 'border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'border-[#00001a]/20 hover:border-[#00001a]/30 hover:shadow-[0_0_15px_rgba(0,0,26,0.15)]'
                    }`}>
                      <div className={`text-sm mb-1 ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                        Total Sessions
                      </div>
                      <div className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        {paymentStats.totalSessions}
                      </div>
                    </div>
                    <div className={`group/stat p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                      darkMode ? 'border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'border-[#00001a]/20 hover:border-[#00001a]/30 hover:shadow-[0_0_15px_rgba(0,0,26,0.15)]'
                    }`}>
                      <div className={`text-sm mb-1 ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                        Avg Session Value
                      </div>
                      <div className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        ${paymentStats.averageSessionValue}
                      </div>
                    </div>
                    <div className={`group/stat p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                      darkMode ? 'border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'border-[#00001a]/20 hover:border-[#00001a]/30 hover:shadow-[0_0_15px_rgba(0,0,26,0.15)]'
                    }`}>
                      <div className={`text-sm mb-1 ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                        Success Rate
                      </div>
                      <div className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        {paymentStats.successRate}%
                      </div>
                    </div>
                    <div className={`group/stat p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                      darkMode ? 'border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'border-[#00001a]/20 hover:border-[#00001a]/30 hover:shadow-[0_0_15px_rgba(0,0,26,0.15)]'
                    }`}>
                      <div className={`text-sm mb-1 ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                        Avg Payout Time
                      </div>
                      <div className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        {paymentStats.averagePayoutTime}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className={`group p-6 border transition-all duration-300 shadow-lg relative overflow-hidden cursor-pointer ${
                darkMode
                  ? 'rounded-lg border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]'
                  : 'rounded-lg bg-white border-gray-200 hover:border-gray-300 hover:shadow-[0_0_25px_rgba(0,0,0,0.15)]'
              }`}>
                <div className="relative z-10">
                  <h3 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => setActiveSection('transfer')}
                      className={`w-full flex items-center gap-3 p-4 rounded-lg border transition-all duration-300 ${
                        darkMode
                          ? 'border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] text-white'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)] text-[#00001a]'
                      }`}>
                      <ArrowUpRight size={20} />
                      <div className="text-left">
                        <div className="font-medium">Transfer to Bank</div>
                        <div className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                          Withdraw your earnings
                        </div>
                      </div>
                    </button>
                    <button
                      onClick={() => setActiveSection('methods')}
                      className={`w-full flex items-center gap-3 p-4 rounded-lg border transition-all duration-300 ${
                        darkMode
                          ? 'border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] text-white'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)] text-[#00001a]'
                      }`}>
                      <Plus size={20} />
                      <div className="text-left">
                        <div className="font-medium">Add Payment Method</div>
                        <div className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                          UPI, Bank, or Stripe
                        </div>
                      </div>
                    </button>
                    <button
                      onClick={() => setActiveSection('export')}
                      className={`w-full flex items-center gap-3 p-4 rounded-lg border transition-all duration-300 ${
                        darkMode
                          ? 'border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] text-white'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)] text-[#00001a]'
                      }`}>
                      <Download size={20} />
                      <div className="text-left">
                        <div className="font-medium">Export Statements</div>
                        <div className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                          Download payment history
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Wallet Section */}
        {activeSection === 'wallet' && (
          <div className="space-y-6">
            {/* Wallet Overview */}
            <div className={`group p-6 border transition-all duration-300 shadow-lg relative overflow-hidden cursor-pointer ${
              darkMode
                ? 'rounded-lg border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]'
                : 'rounded-lg bg-white border-gray-200 hover:border-gray-300 hover:shadow-[0_0_25px_rgba(0,0,0,0.15)]'
            }`}>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Wallet Overview
                  </h3>
                  <button
                    onClick={() => setShowBalance(!showBalance)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 border ${
                      darkMode
                        ? 'border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] text-white'
                        : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)] text-[#00001a]'
                    }`}>
                    {showBalance ? <Eye size={16} /> : <EyeOff size={16} />}
                    {showBalance ? 'Hide' : 'Show'} Balance
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className={`group/wallet p-6 rounded-lg border text-center transition-all duration-300 cursor-pointer ${
                    darkMode ? 'border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'border-gray-200 hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                  }`}>
                    <div className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      {showBalance ? `$${walletData.totalBalance.toLocaleString()}` : '••••••'}
                    </div>
                    <div className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                      Total Balance
                    </div>
                  </div>
                  <div className={`group/wallet p-6 rounded-lg border text-center transition-all duration-300 cursor-pointer ${
                    darkMode ? 'border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'border-gray-200 hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                  }`}>
                    <div className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      {showBalance ? `$${walletData.availableBalance.toLocaleString()}` : '••••••'}
                    </div>
                    <div className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                      Available for Withdrawal
                    </div>
                  </div>
                  <div className={`group/wallet p-6 rounded-lg border text-center transition-all duration-300 cursor-pointer ${
                    darkMode ? 'border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'border-gray-200 hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                  }`}>
                    <div className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      {showBalance ? `$${walletData.pendingEarnings.toLocaleString()}` : '••••••'}
                    </div>
                    <div className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                      Pending Earnings
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={() => setActiveSection('transfer')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 border font-semibold ${
                      darkMode
                        ? 'border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] text-white'
                        : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)] text-[#00001a]'
                    }`}>
                    <ArrowUpRight size={18} />
                    Withdraw Funds
                  </button>
                  <button
                    onClick={() => setActiveSection('history')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 border font-semibold ${
                      darkMode
                        ? 'border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] text-white'
                        : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)] text-[#00001a]'
                    }`}>
                    <Activity size={18} />
                    View History
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payment Methods Section */}
        {activeSection === 'methods' && (
          <div className="space-y-6">
            <div className={`group p-6 border transition-all duration-500 shadow-xl relative overflow-hidden cursor-pointer ${
              darkMode
                ? 'rounded-lg border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]'
                : 'rounded-lg bg-white border-gray-200 hover:border-gray-300 hover:shadow-[0_0_25px_rgba(0,0,0,0.15)]'
            }`}>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Payment Methods
                  </h3>
                  <button className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 border font-semibold ${
                    darkMode
                      ? 'border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] text-white'
                      : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)] text-[#00001a]'
                  }`}>
                    <Plus size={16} />
                    Add Method
                  </button>
                </div>

                <div className="space-y-4">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon
                    return (
                      <div
                        key={method.id}
                        className={`group/method p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                          darkMode ? 'border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'border-gray-200 hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                        }`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-lg ${
                              darkMode ? 'bg-white/10' : 'bg-white'
                            }`}>
                              <Icon size={24} className={darkMode ? 'text-white' : 'text-[#00001a]'} />
                            </div>
                            <div>
                              <div className={`font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                                {method.name}
                              </div>
                              <div className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                                {method.type} • {method.identifier}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {method.isDefault && (
                              <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                                darkMode ? 'bg-white/20 text-white' : 'bg-[#00001a]/20 text-[#00001a]'
                              }`}>
                                Default
                              </span>
                            )}
                            <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                              darkMode ? 'bg-white/10 text-white/80' : 'bg-[#00001a]/10 text-[#00001a]/80'
                            }`}>
                              {method.status}
                            </span>
                            <button className={`p-2 rounded-lg transition-colors ${
                              darkMode ? 'text-white/60 hover:text-white hover:bg-white/10' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
                            }`}>
                              <MoreHorizontal size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Session Earnings Section */}
        {activeSection === 'sessions' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className={`p-4 rounded-lg border ${
              darkMode
                ? 'border-white/20'
                : 'bg-white border-gray-200'
            }`}>
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2">
                  <Search size={16} className={darkMode ? 'text-white/60' : 'text-gray-500'} />
                  <input
                    type="text"
                    placeholder="Search sessions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`px-3 py-2 rounded-lg border transition-all duration-300 ${
                      darkMode
                        ? 'border-white/20 text-white placeholder-white/50 focus:border-white/40 bg-transparent'
                        : 'bg-white border-gray-200 text-[#00001a] placeholder-gray-500 focus:border-gray-300'
                    }`}
                  />
                </div>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className={`px-3 py-2 rounded-lg border transition-all duration-300 ${
                    darkMode
                      ? 'border-white/20 text-white focus:border-white/40 bg-transparent'
                      : 'bg-white border-gray-200 text-[#00001a] focus:border-gray-300'
                  }`}
                  style={darkMode ? {
                    backgroundColor: 'transparent',
                    color: 'white'
                  } : {
                    backgroundColor: 'white',
                    color: '#00001a'
                  }}>
                  <option value="all" style={darkMode ? { backgroundColor: '#1a1a2e', color: 'white' } : { backgroundColor: 'white', color: '#00001a' }}>All Sessions</option>
                  <option value="paid" style={darkMode ? { backgroundColor: '#1a1a2e', color: 'white' } : { backgroundColor: 'white', color: '#00001a' }}>Paid</option>
                  <option value="pending" style={darkMode ? { backgroundColor: '#1a1a2e', color: 'white' } : { backgroundColor: 'white', color: '#00001a' }}>Pending</option>
                  <option value="completed" style={darkMode ? { backgroundColor: '#1a1a2e', color: 'white' } : { backgroundColor: 'white', color: '#00001a' }}>Completed</option>
                </select>
                <select
                  value={selectedTimeRange}
                  onChange={(e) => setSelectedTimeRange(e.target.value)}
                  className={`px-3 py-2 rounded-lg border transition-all duration-300 ${
                    darkMode
                      ? 'border-white/20 text-white focus:border-white/40 bg-transparent'
                      : 'bg-white border-gray-200 text-[#00001a] focus:border-gray-300'
                  }`}
                  style={darkMode ? {
                    backgroundColor: 'transparent',
                    color: 'white'
                  } : {
                    backgroundColor: 'white',
                    color: '#00001a'
                  }}>
                  <option value="7d" style={darkMode ? { backgroundColor: '#1a1a2e', color: 'white' } : { backgroundColor: 'white', color: '#00001a' }}>Last 7 days</option>
                  <option value="30d" style={darkMode ? { backgroundColor: '#1a1a2e', color: 'white' } : { backgroundColor: 'white', color: '#00001a' }}>Last 30 days</option>
                  <option value="90d" style={darkMode ? { backgroundColor: '#1a1a2e', color: 'white' } : { backgroundColor: 'white', color: '#00001a' }}>Last 90 days</option>
                  <option value="all" style={darkMode ? { backgroundColor: '#1a1a2e', color: 'white' } : { backgroundColor: 'white', color: '#00001a' }}>All time</option>
                </select>
              </div>
            </div>

            {/* Session Earnings List */}
            <div className={`group border transition-all duration-500 shadow-xl relative overflow-hidden cursor-pointer ${
              darkMode
                ? 'rounded-lg border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]'
                : 'rounded-lg bg-white border-gray-200 hover:border-gray-300 hover:shadow-[0_0_25px_rgba(0,0,0,0.15)]'
            }`}>
              <div className="relative z-10">
                <div className="p-6 border-b border-white/10">
                  <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Session Earnings
                  </h3>
                </div>
                <div className="divide-y divide-white/10">
                  {filteredSessionEarnings.map((session) => (
                    <div key={session.id} className={`group/session p-6 transition-all duration-300 cursor-pointer ${
                      darkMode ? 'hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold backdrop-blur-sm border ${
                            darkMode ? 'bg-white/10 text-white border-white/20' : 'bg-[#00001a]/10 text-[#00001a] border-[#00001a]/20'
                          }`}>
                            {session.student.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                              {session.student}
                            </h4>
                            <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                              {session.topic}
                            </p>
                            <p className={`text-xs ${darkMode ? 'text-white/40' : 'text-[#00001a]/40'}`}>
                              {session.date} • {session.duration} min • ${session.rate}/hr
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                            ${session.amount.toFixed(2)}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                              darkMode ? 'bg-white/10 text-white/80' : 'bg-[#00001a]/10 text-[#00001a]/80'
                            }`}>
                              {session.paymentStatus}
                            </span>

                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {filteredSessionEarnings.length === 0 && (
                    <div className="p-8 text-center">
                      <div className={`text-lg font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        No sessions found
                      </div>
                      <div className={`text-sm ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                        No sessions match the selected filters
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Transaction History Section */}
        {activeSection === 'history' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className={`p-4 rounded-lg border ${
              darkMode
                ? 'border-white/20'
                : 'bg-white border-gray-200'
            }`}>
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2">
                  <Search size={16} className={darkMode ? 'text-white/60' : 'text-gray-500'} />
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`px-3 py-2 rounded-lg border transition-all duration-300 ${
                      darkMode
                        ? 'border-white/20 text-white placeholder-white/50 focus:border-white/40 bg-transparent'
                        : 'bg-white border-gray-200 text-[#00001a] placeholder-gray-500 focus:border-gray-300'
                    }`}
                  />
                </div>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className={`px-3 py-2 rounded-lg border transition-all duration-300 ${
                    darkMode
                      ? 'border-white/20 text-white focus:border-white/40 bg-transparent'
                      : 'bg-white border-gray-200 text-[#00001a] focus:border-gray-300'
                  }`}
                  style={darkMode ? {
                    backgroundColor: 'transparent',
                    color: 'white'
                  } : {
                    backgroundColor: 'white',
                    color: '#00001a'
                  }}>
                  <option value="all" style={darkMode ? { backgroundColor: '#1a1a2e', color: 'white' } : { backgroundColor: 'white', color: '#00001a' }}>All Transactions</option>
                  <option value="earning" style={darkMode ? { backgroundColor: '#1a1a2e', color: 'white' } : { backgroundColor: 'white', color: '#00001a' }}>Earnings</option>
                  <option value="withdrawal" style={darkMode ? { backgroundColor: '#1a1a2e', color: 'white' } : { backgroundColor: 'white', color: '#00001a' }}>Withdrawals</option>
                  <option value="completed" style={darkMode ? { backgroundColor: '#1a1a2e', color: 'white' } : { backgroundColor: 'white', color: '#00001a' }}>Completed</option>
                  <option value="pending" style={darkMode ? { backgroundColor: '#1a1a2e', color: 'white' } : { backgroundColor: 'white', color: '#00001a' }}>Pending</option>
                </select>
                <button className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 border ${
                  darkMode
                    ? 'border-white/20 hover:border-white/30 text-white'
                    : 'bg-white border-gray-200 hover:border-gray-300 text-[#00001a]'
                }`}
                style={darkMode ? {
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease'
                } : {
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  if (darkMode) {
                    e.currentTarget.style.boxShadow = '0 0 15px rgba(59, 130, 246, 0.3), 0 2px 8px rgba(0, 0, 0, 0.1)';
                  } else {
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                }}>
                  <Filter size={16} />
                  More Filters
                </button>
              </div>
            </div>

            {/* Transaction List */}
            <div className={`group border transition-all duration-500 shadow-xl relative overflow-hidden cursor-pointer ${
              darkMode
                ? 'rounded-lg border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]'
                : 'rounded-lg bg-white border-gray-200 hover:border-gray-300 hover:shadow-[0_0_25px_rgba(0,0,0,0.15)]'
            }`}>
              <div className="relative z-10">
                <div className="p-6 border-b border-white/10">
                  <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Transaction History
                  </h3>
                </div>
                <div className="divide-y divide-white/10">
                  {filteredTransactions.map((transaction) => (
                    <div key={transaction.id} className={`group/transaction p-6 transition-all duration-300 cursor-pointer ${
                      darkMode ? 'hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-sm border ${
                            darkMode ? 'bg-white/10 text-white border-white/20' : 'bg-[#00001a]/10 text-[#00001a] border-[#00001a]/20'
                          }`}>
                            {transaction.type === 'earning' ? (
                              <ArrowDownLeft size={20} />
                            ) : (
                              <ArrowUpRight size={20} />
                            )}
                          </div>
                          <div>
                            <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                              {transaction.description}
                            </h4>
                            <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                              {transaction.date} at {transaction.time} • {transaction.method}
                            </p>
                            <p className={`text-xs ${darkMode ? 'text-white/40' : 'text-[#00001a]/40'}`}>
                              Ref: {transaction.reference}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                            {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                              darkMode ? 'bg-white/10 text-white/80' : 'bg-[#00001a]/10 text-[#00001a]/80'
                            }`}>
                              {transaction.status}
                            </span>

                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {filteredTransactions.length === 0 && (
                    <div className="p-8 text-center">
                      <div className={`text-lg font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        No transactions found
                      </div>
                      <div className={`text-sm ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                        No transactions match the selected filters
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-6 border-t border-white/10">
                  <button className={`w-full py-3 rounded-lg transition-all duration-300 border font-semibold ${
                    darkMode
                      ? 'border-white/20 hover:border-white/30 text-white'
                      : 'bg-white border-gray-200 hover:border-gray-300 text-[#00001a]'
                  }`}
                  style={darkMode ? {
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease'
                  } : {
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (darkMode) {
                      e.currentTarget.style.boxShadow = '0 0 15px rgba(59, 130, 246, 0.3), 0 2px 8px rgba(0, 0, 0, 0.1)';
                    } else {
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                  }}>
                    Load More Transactions
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bank Transfer Section */}
        {activeSection === 'transfer' && (
          <div className="space-y-6">
            <div className={`group p-6 border transition-all duration-500 shadow-xl relative overflow-hidden cursor-pointer ${
              darkMode
                ? 'rounded-lg border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]'
                : 'rounded-lg bg-white border-gray-200 hover:border-gray-300 hover:shadow-[0_0_25px_rgba(0,0,0,0.15)]'
            }`}>
              <div className="relative z-10">
                <h3 className={`text-xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Transfer to Bank Account
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Transfer Form */}
                  <div className="space-y-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>
                        Available Balance
                      </label>
                      <div className={`group/balance p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                        darkMode ? 'border-white/10 hover:border-white/20 hover:bg-white/5 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'border-[#00001a]/10 hover:border-[#00001a]/20 hover:bg-[#00001a]/5 hover:shadow-[0_0_15px_rgba(0,0,26,0.2)]'
                      }`}>
                        <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                          ${walletData.availableBalance.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>
                        Transfer Amount
                      </label>
                      <input
                        type="number"
                        placeholder="Enter amount"
                        value={transferAmount}
                        onChange={(e) => setTransferAmount(e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 ${
                          darkMode
                            ? 'border-white/20 text-white placeholder-white/50 focus:border-white/40 bg-transparent'
                            : 'bg-white border-gray-200 text-[#00001a] placeholder-gray-500 focus:border-gray-300'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>
                        Bank Account
                      </label>
                      <select
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 ${
                          darkMode
                            ? 'border-white/20 text-white focus:border-white/40 bg-transparent'
                            : 'bg-white border-gray-200 text-[#00001a] focus:border-gray-300'
                        }`}>
                        <option value="" style={darkMode ? { backgroundColor: '#1a1a2e', color: 'white' } : { backgroundColor: 'white', color: '#00001a' }}>Select Bank Account</option>
                        <option value="hdfc-1234" style={darkMode ? { backgroundColor: '#1a1a2e', color: 'white' } : { backgroundColor: 'white', color: '#00001a' }}>HDFC Bank - ****1234 (Primary)</option>
                        <option value="sbi-5678" style={darkMode ? { backgroundColor: '#1a1a2e', color: 'white' } : { backgroundColor: 'white', color: '#00001a' }}>State Bank of India - ****5678</option>
                        <option value="icici-9012" style={darkMode ? { backgroundColor: '#1a1a2e', color: 'white' } : { backgroundColor: 'white', color: '#00001a' }}>ICICI Bank - ****9012</option>
                        <option value="axis-3456" style={darkMode ? { backgroundColor: '#1a1a2e', color: 'white' } : { backgroundColor: 'white', color: '#00001a' }}>Axis Bank - ****3456</option>
                        <option value="add-new" style={darkMode ? { backgroundColor: '#1a1a2e', color: 'white' } : { backgroundColor: 'white', color: '#00001a' }}>+ Add New Bank Account</option>
                      </select>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>
                        Transfer Note (Optional)
                      </label>
                      <textarea
                        placeholder="Add a note for this transfer"
                        rows={3}
                        className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 ${
                          darkMode
                            ? 'border-white/20 text-white placeholder-white/50 focus:border-white/40 bg-transparent'
                            : 'bg-white border-gray-200 text-[#00001a] placeholder-gray-500 focus:border-gray-300'
                        }`}
                      />
                    </div>

                    <button
                      onClick={handleTransfer}
                      disabled={isLoading}
                      className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg transition-all duration-300 border font-semibold disabled:opacity-50 disabled:cursor-not-allowed ${
                        darkMode
                          ? 'border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] text-white'
                          : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)] text-[#00001a]'
                      }`}>
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <ArrowUpRight size={18} />
                          Initiate Transfer
                        </>
                      )}
                    </button>
                  </div>

                  {/* Transfer Info */}
                  <div className={`p-6 rounded-lg border ${
                    darkMode ? 'border-white/20' : 'bg-white border-gray-200'
                  }`}>
                    <h4 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      Transfer Information
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                          Processing Time
                        </span>
                        <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                          1-3 business days
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                          Transfer Fee
                        </span>
                        <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                          Free
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                          Minimum Amount
                        </span>
                        <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                          $10.00
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                          Daily Limit
                        </span>
                        <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                          $5,000.00
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Export Data Section */}
        {activeSection === 'export' && (
          <div className="space-y-6">
            <div className={`group p-6 border transition-all duration-500 shadow-xl relative overflow-hidden cursor-pointer ${
              darkMode
                ? 'rounded-lg border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]'
                : 'rounded-lg bg-white border-gray-200 hover:border-gray-300 hover:shadow-[0_0_25px_rgba(0,0,0,0.15)]'
            }`}>
              <div className="relative z-10">
                <h3 className={`text-xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Export Payment Data
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Export Options */}
                  <div className="space-y-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>
                        Date Range
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="date"
                          className={`px-4 py-3 rounded-lg border transition-all duration-300 ${
                            darkMode
                              ? 'border-white/20 text-white focus:border-white/40 bg-transparent'
                              : 'bg-white border-gray-200 text-[#00001a] focus:border-gray-300'
                          }`}
                        />
                        <input
                          type="date"
                          className={`px-4 py-3 rounded-lg border transition-all duration-300 ${
                            darkMode
                              ? 'border-white/20 text-white focus:border-white/40 bg-transparent'
                              : 'bg-white border-gray-200 text-[#00001a] focus:border-gray-300'
                          }`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>
                        Export Format
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {['PDF', 'CSV', 'Excel'].map((format) => (
                          <button
                            key={format}
                            className={`p-3 rounded-lg border transition-all duration-300 font-medium ${
                              darkMode
                                ? 'border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] text-white'
                                : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)] text-[#00001a]'
                            }`}>
                            {cleanText(format)}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>
                        Data Type
                      </label>
                      <div className="space-y-2">
                        {[
                          'All Transactions',
                          'Session Earnings Only',
                          'Withdrawals Only',
                          'Payment Methods'
                        ].map((type) => (
                          <label key={type} className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              className="rounded border-gray-300"
                              defaultChecked={type === 'All Transactions'}
                            />
                            <span className={`text-sm ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>
                              {type}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => handleAction('Export generation')}
                      disabled={isLoading}
                      className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-lg transition-all duration-300 border font-semibold disabled:opacity-50 disabled:cursor-not-allowed ${
                        darkMode
                          ? 'border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] text-white'
                          : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)] text-[#00001a]'
                      }`}>
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                          Generating...
                        </>
                      ) : (
                        <>
                          <Download size={18} />
                          Generate Export
                        </>
                      )}
                    </button>
                  </div>

                  {/* Recent Exports */}
                  <div className={`group/exports p-6 rounded-lg border transition-all duration-300 cursor-pointer ${
                    darkMode ? 'border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                  }`}>
                    <h4 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      Recent Exports
                    </h4>
                    <div className="space-y-3">
                      {[
                        { name: 'Payment_Statement_July_2025.pdf', date: '2025-07-14', size: '2.3 MB' },
                        { name: 'Session_Earnings_Q2_2025.csv', date: '2025-07-01', size: '1.8 MB' },
                        { name: 'Transaction_History_June_2025.xlsx', date: '2025-06-30', size: '3.1 MB' }
                      ].map((file, index) => (
                        <div key={index} className={`group/file flex items-center justify-between p-3 rounded-lg border transition-all duration-300 cursor-pointer ${
                          darkMode ? 'border-white/20 hover:border-white/30' : 'bg-white border-gray-200 hover:border-gray-300'
                        }`}>
                          <div>
                            <div className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                              {file.name}
                            </div>
                            <div className={`text-xs ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                              {file.date} • {file.size}
                            </div>
                          </div>
                          <button className={`p-2 rounded-lg transition-colors ${
                            darkMode ? 'text-white/60 hover:text-white hover:bg-white/10' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                          }`}>
                            <Download size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Section */}
        {activeSection === 'settings' && (
          <div className="space-y-6">
            {/* Payment Preferences */}
            <div className={`group p-6 border transition-all duration-500 shadow-xl relative overflow-hidden cursor-pointer ${
              darkMode
                ? 'rounded-lg border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]'
                : 'rounded-lg bg-white border-gray-200 hover:border-gray-300 hover:shadow-[0_0_25px_rgba(0,0,0,0.15)]'
            }`}>
              <div className="relative z-10">
                <h3 className={`text-xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Payment Preferences
                </h3>

                <div className="space-y-6">
                  {/* Auto-withdrawal Settings */}
                  <div className={`group/setting p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                    darkMode ? 'border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                  }`}>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                          Auto-withdrawal
                        </h4>
                        <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                          Automatically transfer earnings to your bank account
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={toggleStates.autoWithdraw}
                          onChange={(e) => setToggleStates(prev => ({...prev, autoWithdraw: e.target.checked}))}
                        />
                        <div className={`relative w-11 h-6 rounded-full transition-colors ${
                          darkMode ? 'bg-white/20' : 'bg-gray-300'
                        }`}>
                          <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                            toggleStates.autoWithdraw ? 'translate-x-5' : 'translate-x-0'
                          }`}></div>
                        </div>
                      </label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>
                          Minimum Amount
                        </label>
                        <input
                          type="number"
                          placeholder="$100"
                          className={`w-full px-3 py-2 rounded-lg border transition-all duration-300 ${
                            darkMode
                              ? 'border-white/20 text-white placeholder-white/50 focus:border-white/40 bg-transparent'
                              : 'bg-white border-gray-200 text-[#00001a] placeholder-gray-500 focus:border-gray-300'
                          }`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>
                          Frequency
                        </label>
                        <select className={`w-full px-3 py-2 rounded-lg border transition-all duration-300 ${
                          darkMode
                            ? 'border-white/20 text-white focus:border-white/40 bg-transparent'
                            : 'bg-white border-gray-200 text-[#00001a] focus:border-gray-300'
                        }`}>
                          <option>Weekly</option>
                          <option>Bi-weekly</option>
                          <option>Monthly</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Payment Notifications */}
                  <div className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                    darkMode ? 'border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                  }`}>
                    <h4 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      Payment Notifications
                    </h4>
                    <div className="space-y-3">
                      {/* Payment received */}
                      <div className="flex items-center justify-between">
                        <div>
                          <div className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                            Payment received
                          </div>
                          <div className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                            Get notified when you receive payments
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={toggleStates.paymentReceived}
                            onChange={(e) => setToggleStates(prev => ({...prev, paymentReceived: e.target.checked}))}
                          />
                          <div className={`relative w-11 h-6 rounded-full transition-colors ${
                            darkMode ? 'bg-white/20' : 'bg-gray-300'
                          }`}>
                            <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                              toggleStates.paymentReceived ? 'translate-x-5' : 'translate-x-0'
                            }`}></div>
                          </div>
                        </label>
                      </div>

                      {/* Transfer completed */}
                      <div className="flex items-center justify-between">
                        <div>
                          <div className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                            Transfer completed
                          </div>
                          <div className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                            Get notified when bank transfers complete
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={toggleStates.transferCompleted}
                            onChange={(e) => setToggleStates(prev => ({...prev, transferCompleted: e.target.checked}))}
                          />
                          <div className={`relative w-11 h-6 rounded-full transition-colors ${
                            darkMode ? 'bg-white/20' : 'bg-gray-300'
                          }`}>
                            <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                              toggleStates.transferCompleted ? 'translate-x-5' : 'translate-x-0'
                            }`}></div>
                          </div>
                        </label>
                      </div>

                      {/* Low balance alert */}
                      <div className="flex items-center justify-between">
                        <div>
                          <div className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                            Low balance alert
                          </div>
                          <div className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                            Get notified when balance is low
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={toggleStates.lowBalanceAlert}
                            onChange={(e) => setToggleStates(prev => ({...prev, lowBalanceAlert: e.target.checked}))}
                          />
                          <div className={`relative w-11 h-6 rounded-full transition-colors ${
                            darkMode ? 'bg-white/20' : 'bg-gray-300'
                          }`}>
                            <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                              toggleStates.lowBalanceAlert ? 'translate-x-5' : 'translate-x-0'
                            }`}></div>
                          </div>
                        </label>
                      </div>

                      {/* Monthly statements */}
                      <div className="flex items-center justify-between">
                        <div>
                          <div className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                            Monthly statements
                          </div>
                          <div className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                            Receive monthly payment summaries
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={toggleStates.monthlyStatements}
                            onChange={(e) => setToggleStates(prev => ({...prev, monthlyStatements: e.target.checked}))}
                          />
                          <div className={`relative w-11 h-6 rounded-full transition-colors ${
                            darkMode ? 'bg-white/20' : 'bg-gray-300'
                          }`}>
                            <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                              toggleStates.monthlyStatements ? 'translate-x-5' : 'translate-x-0'
                            }`}></div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Security Settings */}
                  <div className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                    darkMode ? 'border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                  }`}>
                    <h4 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      Security Settings
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                            Two-factor authentication
                          </div>
                          <div className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                            Require 2FA for withdrawals above $500
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={toggleStates.twoFactor}
                            onChange={(e) => setToggleStates(prev => ({...prev, twoFactor: e.target.checked}))}
                          />
                          <div className={`relative w-11 h-6 rounded-full transition-colors ${
                            darkMode ? 'bg-white/20' : 'bg-gray-300'
                          }`}>
                            <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                              toggleStates.twoFactor ? 'translate-x-5' : 'translate-x-0'
                            }`}></div>
                          </div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                            Email verification
                          </div>
                          <div className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                            Verify email for new payment methods
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={toggleStates.emailVerification}
                            onChange={(e) => setToggleStates(prev => ({...prev, emailVerification: e.target.checked}))}
                          />
                          <div className={`relative w-11 h-6 rounded-full transition-colors ${
                            darkMode ? 'bg-white/20' : 'bg-gray-300'
                          }`}>
                            <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                              toggleStates.emailVerification ? 'translate-x-5' : 'translate-x-0'
                            }`}></div>
                          </div>
                        </label>
                      </div>

                      <button className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all duration-300 border font-semibold ${
                        darkMode
                          ? 'border-white/20 hover:border-white/30 text-white'
                          : 'bg-white border-gray-200 hover:border-gray-300 text-[#00001a]'
                      }`}
                      style={darkMode ? {
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.3s ease'
                      } : {
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (darkMode) {
                          e.currentTarget.style.boxShadow = '0 0 15px rgba(59, 130, 246, 0.3), 0 2px 8px rgba(0, 0, 0, 0.1)';
                        } else {
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                      }}>
                        <RefreshCw size={16} />
                        Change Payment PIN
                      </button>
                    </div>
                  </div>

                  {/* Save Settings */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleAction('Settings save')}
                      disabled={isLoading}
                      className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 border font-semibold disabled:opacity-50 disabled:cursor-not-allowed ${
                        darkMode
                          ? 'border-white/20 hover:border-white/30 text-white'
                          : 'bg-white border-gray-200 hover:border-gray-300 text-[#00001a]'
                      }`}
                      style={darkMode ? {
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.3s ease'
                      } : {
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (darkMode) {
                          e.currentTarget.style.boxShadow = '0 0 15px rgba(59, 130, 246, 0.3), 0 2px 8px rgba(0, 0, 0, 0.1)';
                        } else {
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                      }}>
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <CheckCircle size={18} />
                          Save Settings
                        </>
                      )}
                    </button>
                    <button className={`px-6 py-3 rounded-lg transition-all duration-300 border font-semibold ${
                      darkMode
                        ? 'border-white/20 hover:border-white/30 text-white'
                        : 'bg-white border-gray-200 hover:border-gray-300 text-[#00001a]'
                    }`}
                    style={darkMode ? {
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                      transition: 'all 0.3s ease'
                    } : {
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (darkMode) {
                        e.currentTarget.style.boxShadow = '0 0 15px rgba(59, 130, 246, 0.3), 0 2px 8px rgba(0, 0, 0, 0.1)';
                      } else {
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                    }}>
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Payments
