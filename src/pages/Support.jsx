import React, { useState } from 'react'
import { 
  HelpCircle, 
  Mail, 
  MessageCircle, 
  CreditCard, 
  FileText, 
  AlertTriangle,
  Send,
  Phone,
  Clock,
  CheckCircle,
  X,
  Search,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Trash2,
  RefreshCw,
  Shield,
  DollarSign,
  MessageSquare,
  User,
  Settings,
  Book
} from 'lucide-react'

const Support = ({ darkMode }) => {
  // State management
  const [activeSection, setActiveSection] = useState('overview')
  const [chatMessages, setChatMessages] = useState([
    { id: 1, type: 'bot', message: 'Hello! How can I help you today?', time: '10:30 AM' },
    { id: 2, type: 'user', message: 'I need help with my payment', time: '10:31 AM' },
    { id: 3, type: 'bot', message: 'I\'d be happy to help you with payment issues. Can you provide more details?', time: '10:31 AM' }
  ])
  const [newMessage, setNewMessage] = useState('')
  const [selectedFAQ, setSelectedFAQ] = useState(null)
  const [reportForm, setReportForm] = useState({
    type: 'duplicate',
    url: '',
    description: '',
    email: ''
  })
  const [paymentQuery, setPaymentQuery] = useState({
    type: 'refund',
    transactionId: '',
    amount: '',
    description: '',
    email: ''
  })

  // FAQ Data - Updated styling
  const faqData = [
    {
      id: 1,
      category: 'General',
      question: 'How do I get started on SynapMentor?',
      answer: 'Getting started is easy! Simply create an account, complete your profile, verify your skills, and start offering your expertise to help others learn and grow.'
    },
    {
      id: 2,
      category: 'Chat',
      question: 'How does the chat system work?',
      answer: 'Our chat system allows real-time communication between mentors and learners. You can share files, schedule sessions, and maintain conversation history for better learning continuity.'
    },
    {
      id: 3,
      category: 'Payment',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, bank transfers, and digital wallets. All transactions are secure and encrypted for your safety.'
    },
    {
      id: 4,
      category: 'Refund',
      question: 'What is your refund policy?',
      answer: 'We offer a 30-day money-back guarantee for all sessions. If you\'re not satisfied with your experience, contact our support team for a full refund.'
    },
    {
      id: 5,
      category: 'Policies',
      question: 'What are the community guidelines?',
      answer: 'Our community guidelines ensure a safe, respectful environment for learning. This includes professional communication, no harassment, and maintaining educational focus in all interactions.'
    },
    {
      id: 6,
      category: 'Delete Chat',
      question: 'Can I delete my chat history?',
      answer: 'Yes, you can delete individual messages or entire chat conversations. Go to your chat settings and select the delete option. Note that this action cannot be undone.'
    }
  ]

  // Handle functions
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: chatMessages.length + 1,
        type: 'user',
        message: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setChatMessages([...chatMessages, message])
      setNewMessage('')
      
      // Simulate bot response
      setTimeout(() => {
        const botResponse = {
          id: chatMessages.length + 2,
          type: 'bot',
          message: 'Thank you for your message. Our support team will get back to you shortly.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
        setChatMessages(prev => [...prev, botResponse])
      }, 1000)
    }
  }

  const handleDeleteChat = () => {
    setChatMessages([
      { id: 1, type: 'bot', message: 'Hello! How can I help you today?', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ])
  }

  const handleSubmitReport = () => {
    alert('Report submitted successfully! We will review it within 24 hours.')
    setReportForm({ type: 'duplicate', url: '', description: '', email: '' })
  }

  const handleSubmitPaymentQuery = () => {
    alert('Payment query submitted successfully! Our team will respond within 2 business hours.')
    setPaymentQuery({ type: 'refund', transactionId: '', amount: '', description: '', email: '' })
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
              Support Center
            </h1>
            <p className={`text-sm mt-1 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
              Get help, report issues, and find answers to your questions
            </p>
          </div>
          <div className={`p-3 rounded-xl ${
            darkMode ? 'bg-white/10' : 'bg-[#00001a]/10'
          }`}>
            <HelpCircle size={24} className={darkMode ? 'text-white' : 'text-[#00001a]'} />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="p-4">
        <div className={`p-2 rounded-lg backdrop-blur-xl border ${
          darkMode ? 'bg-white/3 border-white/20' : 'bg-white border-gray-200'
        }`}>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'overview', label: 'Overview', icon: HelpCircle },
              { id: 'email', label: 'Email Support', icon: Mail },
              { id: 'report', label: 'Report Content', icon: AlertTriangle },
              { id: 'chat', label: 'Help Desk Chat', icon: MessageCircle },
              { id: 'payment', label: 'Payment Queries', icon: CreditCard },
              { id: 'faq', label: 'F.A.Q', icon: FileText }
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeSection === tab.id
                      ? darkMode
                        ? 'bg-blue-500/20 text-blue-500 border border-blue-500/30'
                        : 'bg-[#00001a] text-white border border-[#00001a]'
                      : darkMode
                        ? 'text-white/70 hover:bg-white/10 hover:text-white'
                        : 'text-gray-500 hover:bg-gray-100 hover:text-gray-500'
                  }`}
                >
                  <Icon size={16} />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="p-4">
        {/* Overview Section */}
        {activeSection === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quick Actions */}
            <div className={`p-6 backdrop-blur-xl border transition-all duration-500 shadow-xl ${
              darkMode
                ? 'rounded-lg bg-white/3 border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]'
                : 'rounded-lg bg-white border-gray-200 hover:border-gray-300 hover:shadow-[0_0_25px_rgba(0,0,0,0.15)]'
            }`}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-lg ${
                  darkMode ? 'bg-white/10' : 'bg-[#00001a]/10'
                }`}>
                  <HelpCircle size={24} className={darkMode ? 'text-white' : 'text-[#00001a]'} />
                </div>
                <div>
                  <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Quick Support
                  </h2>
                  <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-500'}`}>
                    Get immediate help
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { icon: Mail, label: 'Email Support', desc: 'support@synapmentor.com', action: 'email' },
                  { icon: MessageCircle, label: 'Live Chat', desc: 'Chat with our support team', action: 'chat' },
                  { icon: AlertTriangle, label: 'Report Issue', desc: 'Report duplicate content', action: 'report' },
                  { icon: CreditCard, label: 'Payment Help', desc: 'Billing and payment queries', action: 'payment' }
                ].map((item, index) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={index}
                      onClick={() => setActiveSection(item.action)}
                      className={`w-full p-4 rounded-lg border transition-all duration-300 text-left ${
                        darkMode
                          ? 'border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                          : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={20} className={darkMode ? 'text-blue-500' : 'text-[#00001a]'} />
                        <div className="flex-1">
                          <div className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                            {item.label}
                          </div>
                          <div className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                            {item.desc}
                          </div>
                        </div>
                        <ExternalLink size={16} className={darkMode ? 'text-white/40' : 'text-gray-500'} />
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Support Stats */}
            <div className={`p-6 backdrop-blur-xl border transition-all duration-500 shadow-xl ${
              darkMode
                ? 'rounded-lg bg-white/3 border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]'
                : 'rounded-lg bg-white border-gray-200 hover:border-gray-300 hover:shadow-[0_0_25px_rgba(0,0,0,0.15)]'
            }`}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-lg ${
                  darkMode ? 'bg-white/10' : 'bg-[#00001a]/10'
                }`}>
                  <Clock size={24} className={darkMode ? 'text-blue-500' : 'text-[#00001a]'} />
                </div>
                <div>
                  <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Support Status
                  </h2>
                  <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-500'}`}>
                    Our response times
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { label: 'Email Response', time: '< 2 hours', status: 'excellent' },
                  { label: 'Chat Response', time: '< 5 minutes', status: 'excellent' },
                  { label: 'Payment Issues', time: '< 1 hour', status: 'good' },
                  { label: 'Content Reports', time: '< 24 hours', status: 'good' }
                ].map((item, index) => (
                  <div key={index} className={`p-4 rounded-lg border transition-all duration-300 ${
                    darkMode
                      ? 'border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                      : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                          {item.label}
                        </div>
                        <div className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                          Average response time
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-bold ${darkMode ? 'text-blue-500' : 'text-[#00001a]'}`}>
                          {item.time}
                        </div>
                        <div className={`text-xs ${darkMode ? 'text-blue-500' : 'text-[#00001a]'}`}>
                          {item.status}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Email Support Section */}
        {activeSection === 'email' && (
          <div className={`p-6 backdrop-blur-xl border transition-all duration-500 shadow-xl ${
            darkMode
              ? 'rounded-lg bg-white/3 border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]'
              : 'rounded-lg bg-white border-gray-200 hover:border-gray-300 hover:shadow-[0_0_25px_rgba(0,0,0,0.15)]'
          }`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-3 rounded-lg ${
                darkMode ? 'bg-white/10' : 'bg-[#00001a]/10'
              }`}>
                <Mail size={24} className={darkMode ? 'text-blue-500' : 'text-[#00001a]'} />
              </div>
              <div>
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Email Support
                </h2>
                <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-500'}`}>
                  Contact our support team directly
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Information */}
              <div className={`p-6 rounded-lg border transition-all duration-300 ${
                darkMode
                  ? 'border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                  : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
              }`}>
                <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail size={20} className={darkMode ? 'text-blue-500' : 'text-[#00001a]'} />
                    <div>
                      <div className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        General Support
                      </div>
                      <div className={darkMode ? 'text-blue-500' : 'text-[#00001a]'}>
                        support@synapmentor.com
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={20} className={darkMode ? 'text-blue-500' : 'text-[#00001a]'} />
                    <div>
                      <div className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        Phone Support
                      </div>
                      <div className={darkMode ? 'text-blue-500' : 'text-[#00001a]'}>
                        +1 (555) 123-4567
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock size={20} className={darkMode ? 'text-blue-500' : 'text-[#00001a]'} />
                    <div>
                      <div className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        Business Hours
                      </div>
                      <div className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                        Mon-Fri: 9AM-6PM EST
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Email Form */}
              <div className={`p-6 rounded-lg border transition-all duration-300 ${
                darkMode
                  ? 'border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                  : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
              }`}>
                <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Quick Email
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/80' : 'text-gray-500'}`}>
                      Subject
                    </label>
                    <select className={`w-full p-3 rounded-lg backdrop-blur-sm border transition-all duration-300 ${
                      darkMode
                        ? 'bg-white/5 text-white border-white/10 focus:border-white/30 focus:bg-white/10'
                        : 'bg-white text-[#00001a] border-gray-200 focus:border-gray-300'
                    }`}>
                      <option>General Inquiry</option>
                      <option>Technical Support</option>
                      <option>Billing Question</option>
                      <option>Account Issue</option>
                      <option>Feature Request</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/80' : 'text-gray-500'}`}>
                      Message
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Describe your issue or question..."
                      className={`w-full p-3 rounded-lg backdrop-blur-sm border transition-all duration-300 resize-none ${
                        darkMode
                          ? 'bg-white/5 text-white border-white/10 placeholder-white/40 focus:border-white/30 focus:bg-white/10'
                          : 'bg-white text-[#00001a] border-gray-200 placeholder-gray-400 focus:border-gray-300'
                      }`}
                    />
                  </div>
                  <button className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                    darkMode
                      ? 'bg-blue-500/20 text-blue-500 border border-blue-500/30 hover:bg-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]'
                      : 'bg-[#00001a] text-white hover:shadow-lg'
                  }`}>
                    <div className="flex items-center justify-center gap-2">
                      <Send size={16} />
                      Send Email
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Report Content Section */}
        {activeSection === 'report' && (
          <div className={`p-6 backdrop-blur-xl border transition-all duration-500 shadow-xl ${
            darkMode
              ? 'rounded-lg bg-white/3 border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]'
              : 'rounded-lg bg-white border-gray-200 hover:border-gray-300 hover:shadow-[0_0_25px_rgba(0,0,0,0.15)]'
          }`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-3 rounded-lg ${
                darkMode ? 'bg-white/10' : 'bg-[#00001a]/10'
              }`}>
                <AlertTriangle size={24} className={darkMode ? 'text-blue-500' : 'text-[#00001a]'} />
              </div>
              <div>
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Report Content
                </h2>
                <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-500'}`}>
                  Report duplicate content or policy violations
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Report Form */}
              <div className={`p-6 rounded-lg border transition-all duration-300 ${
                darkMode
                  ? 'border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                  : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
              }`}>
                <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Submit Report
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/80' : 'text-gray-500'}`}>
                      Report Type
                    </label>
                    <select
                      value={reportForm.type}
                      onChange={(e) => setReportForm(prev => ({ ...prev, type: e.target.value }))}
                      className={`w-full p-3 rounded-lg backdrop-blur-sm border transition-all duration-300 ${
                        darkMode
                          ? 'bg-white/5 text-white border-white/10 focus:border-white/30 focus:bg-white/10'
                          : 'bg-white text-[#00001a] border-gray-200 focus:border-gray-300'
                      }`}
                    >
                      <option value="duplicate">Duplicate Content</option>
                      <option value="inappropriate">Inappropriate Content</option>
                      <option value="spam">Spam</option>
                      <option value="copyright">Copyright Violation</option>
                      <option value="harassment">Harassment</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/80' : 'text-gray-500'}`}>
                      Content URL
                    </label>
                    <input
                      type="url"
                      value={reportForm.url}
                      onChange={(e) => setReportForm(prev => ({ ...prev, url: e.target.value }))}
                      placeholder="https://synapmentor.com/content/..."
                      className={`w-full p-3 rounded-lg backdrop-blur-sm border transition-all duration-300 ${
                        darkMode
                          ? 'bg-white/5 text-white border-white/10 placeholder-white/40 focus:border-white/30 focus:bg-white/10'
                          : 'bg-white text-[#00001a] border-gray-200 placeholder-gray-400 focus:border-gray-300'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/80' : 'text-gray-500'}`}>
                      Description
                    </label>
                    <textarea
                      rows={4}
                      value={reportForm.description}
                      onChange={(e) => setReportForm(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Please provide details about the issue..."
                      className={`w-full p-3 rounded-lg backdrop-blur-sm border transition-all duration-300 resize-none ${
                        darkMode
                          ? 'bg-white/5 text-white border-white/10 placeholder-white/40 focus:border-white/30 focus:bg-white/10'
                          : 'bg-white text-[#00001a] border-gray-200 placeholder-gray-400 focus:border-gray-300'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/80' : 'text-gray-500'}`}>
                      Your Email
                    </label>
                    <input
                      type="email"
                      value={reportForm.email}
                      onChange={(e) => setReportForm(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="your.email@example.com"
                      className={`w-full p-3 rounded-lg backdrop-blur-sm border transition-all duration-300 ${
                        darkMode
                          ? 'bg-white/5 text-white border-white/10 placeholder-white/40 focus:border-white/30 focus:bg-white/10'
                          : 'bg-white text-[#00001a] border-gray-200 placeholder-gray-400 focus:border-gray-300'
                      }`}
                    />
                  </div>
                  <button
                    onClick={handleSubmitReport}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                      darkMode
                        ? 'bg-blue-500/20 text-blue-500 border border-blue-500/30 hover:bg-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]'
                        : 'bg-[#00001a] text-white hover:shadow-lg'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <AlertTriangle size={16} />
                      Submit Report
                    </div>
                  </button>
                </div>
              </div>

              {/* Report Guidelines */}
              <div className={`p-6 rounded-lg border transition-all duration-300 ${
                darkMode
                  ? 'border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                  : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
              }`}>
                <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Reporting Guidelines
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      title: 'Duplicate Content',
                      description: 'Content that has been copied from another source without proper attribution'
                    },
                    {
                      title: 'Inappropriate Content',
                      description: 'Content that violates our community guidelines or contains offensive material'
                    },
                    {
                      title: 'Copyright Violation',
                      description: 'Content that infringes on intellectual property rights'
                    },
                    {
                      title: 'Spam',
                      description: 'Repetitive, irrelevant, or promotional content'
                    }
                  ].map((item, index) => (
                    <div key={index} className={`p-4 rounded-lg border transition-all duration-300 ${
                      darkMode
                        ? 'border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                        : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                    }`}>
                      <div className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        {item.title}
                      </div>
                      <div className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                        {item.description}
                      </div>
                    </div>
                  ))}
                </div>

                <div className={`mt-6 p-4 rounded-lg ${
                  darkMode ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-[#00001a]/5 border border-[#00001a]/20'
                }`}>
                  <div className="flex items-center gap-2">
                    <Shield size={16} className={darkMode ? 'text-blue-500' : 'text-[#00001a]'} />
                    <p className={darkMode ? 'text-blue-500' : 'text-[#00001a]'}>
                      <strong>Privacy Notice:</strong> All reports are reviewed confidentially. We may contact you for additional information.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Help Desk Chat Section */}
        {activeSection === 'chat' && (
          <div className={`p-6 backdrop-blur-xl border transition-all duration-500 shadow-xl ${
            darkMode
              ? 'rounded-lg bg-white/3 border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]'
              : 'rounded-lg bg-white border-gray-200 hover:border-gray-300 hover:shadow-[0_0_25px_rgba(0,0,0,0.15)]'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-lg ${
                  darkMode ? 'bg-white/10' : 'bg-[#00001a]/10'
                }`}>
                  <MessageCircle size={24} className={darkMode ? 'text-blue-500' : 'text-[#00001a]'} />
                </div>
                <div>
                  <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Help Desk Chat
                  </h2>
                  <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-500'}`}>
                    Live chat with our support team
                  </p>
                </div>
              </div>
              <button
                onClick={handleDeleteChat}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  darkMode
                    ? 'bg-red-500/20 text-red-500 border border-red-500/30 hover:bg-red-500/30'
                    : 'bg-[#00001a]/10 text-[#00001a] border border-[#00001a]/30 hover:bg-[#00001a]/20'
                }`}
                title="Delete Chat"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Chat Window */}
              <div className="lg:col-span-2">
                <div className={`rounded-lg border transition-all duration-300 ${
                  darkMode
                    ? 'border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                    : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                }`}>
                  {/* Chat Header */}
                  <div className={`p-4 border-b ${
                    darkMode ? 'border-white/10' : 'border-gray-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 ${darkMode ? 'bg-blue-500' : 'bg-[#00001a]'} rounded-full animate-pulse`}></div>
                        <div>
                          <div className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                            Support Agent
                          </div>
                          <div className={darkMode ? 'text-blue-500' : 'text-[#00001a]'}>
                            Online - Typically responds in 5 minutes
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className={`p-2 rounded-lg transition-all duration-300 ${
                          darkMode
                            ? 'hover:bg-white/10 text-white/60 hover:text-white'
                            : 'hover:bg-gray-100 text-gray-500 hover:text-gray-500'
                        }`}>
                          <RefreshCw size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="h-96 overflow-y-auto p-4 space-y-4">
                    {chatMessages.map((message) => (
                      <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.type === 'user'
                            ? darkMode
                              ? 'bg-blue-500/20 text-blue-500 border border-blue-500/30'
                              : 'bg-[#00001a] text-white'
                            : darkMode
                              ? 'bg-white/10 text-white border border-white/20'
                              : 'bg-gray-100 text-gray-500 border border-gray-200'
                        }`}>
                          <div className="text-sm">{message.message}</div>
                          <div className={`text-xs mt-1 ${
                            message.type === 'user'
                              ? darkMode ? 'text-blue-500' : 'text-white/70'
                              : darkMode ? 'text-white/50' : 'text-gray-500'
                          }`}>
                            {message.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chat Input */}
                  <div className={`p-4 border-t ${
                    darkMode ? 'border-white/10' : 'border-gray-200'
                  }`}>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Type your message..."
                        className={`flex-1 p-3 rounded-lg backdrop-blur-sm border transition-all duration-300 ${
                          darkMode
                            ? 'bg-white/5 text-white border-white/10 placeholder-white/40 focus:border-white/30 focus:bg-white/10'
                            : 'bg-white text-[#00001a] border-gray-200 placeholder-gray-400 focus:border-gray-300'
                        }`}
                      />
                      <button
                        onClick={handleSendMessage}
                        className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                          darkMode
                            ? 'bg-blue-500/20 text-blue-500 border border-blue-500/30 hover:bg-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]'
                            : 'bg-[#00001a] text-white hover:bg-[#00001a]/90 hover:shadow-lg'
                        }`}
                      >
                        <Send size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Info */}
              <div className="space-y-4">
                <div className={`p-4 rounded-lg border transition-all duration-300 ${
                  darkMode
                    ? 'border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                    : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                }`}>
                  <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Chat Features
                  </h3>
                  <div className="space-y-3">
                    {[
                      { icon: MessageSquare, label: 'Real-time messaging' },
                      { icon: User, label: 'Dedicated support agent' },
                      { icon: Clock, label: 'Chat history saved' }
                    ].map((feature, index) => {
                      const Icon = feature.icon
                      return (
                        <div key={index} className="flex items-center gap-3">
                          <Icon size={16} className={darkMode ? 'text-blue-500' : 'text-[#00001a]'} />
                          <span className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-500'}`}>
                            {feature.label}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className={`p-4 rounded-lg border transition-all duration-300 ${
                  darkMode
                    ? 'border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                    : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                }`}>
                  <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Quick Actions
                  </h3>
                  <div className="space-y-2">
                    {[
                      'I need help with payments',
                      'Technical support needed',
                      'Account access issue',
                      'Feature request'
                    ].map((action, index) => (
                      <button
                        key={index}
                        onClick={() => setNewMessage(action)}
                        className={`w-full p-2 text-left rounded-lg border transition-all duration-300 text-sm ${
                          darkMode
                            ? 'border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] text-white/70 hover:text-white'
                            : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)] text-gray-500 hover:text-gray-500'
                        }`}
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payment Queries Section */}
        {activeSection === 'payment' && (
          <div className={`p-6 backdrop-blur-xl border transition-all duration-500 shadow-xl ${
            darkMode
              ? 'rounded-lg bg-white/3 border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]'
              : 'rounded-lg bg-white border-gray-200 hover:border-gray-300 hover:shadow-[0_0_25px_rgba(0,0,0,0.15)]'
          }`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-3 rounded-lg ${
                darkMode ? 'bg-white/10' : 'bg-[#00001a]/10'
              }`}>
                <CreditCard size={24} className={darkMode ? 'text-blue-500' : 'text-[#00001a]'} />
              </div>
              <div>
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Payment Queries
                </h2>
                <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-500'}`}>
                  Get help with billing, refunds, and payment issues
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Payment Query Form */}
              <div className={`p-6 rounded-lg border transition-all duration-300 ${
                darkMode
                  ? 'border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                  : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
              }`}>
                <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Submit Payment Query
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/80' : 'text-gray-500'}`}>
                      Query Type
                    </label>
                    <select
                      value={paymentQuery.type}
                      onChange={(e) => setPaymentQuery(prev => ({ ...prev, type: e.target.value }))}
                      className={`w-full p-3 rounded-lg backdrop-blur-sm border transition-all duration-300 ${
                        darkMode
                          ? 'bg-white/5 text-white border-white/10 focus:border-white/30 focus:bg-white/10'
                          : 'bg-white text-[#00001a] border-gray-200 focus:border-gray-300'
                      }`}
                    >
                      <option value="refund">Refund Request</option>
                      <option value="billing">Billing Issue</option>
                      <option value="payment_failed">Payment Failed</option>
                      <option value="subscription">Subscription Query</option>
                      <option value="dispute">Payment Dispute</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/80' : 'text-gray-500'}`}>
                      Transaction ID
                    </label>
                    <input
                      type="text"
                      value={paymentQuery.transactionId}
                      onChange={(e) => setPaymentQuery(prev => ({ ...prev, transactionId: e.target.value }))}
                      placeholder="TXN123456789"
                      className={`w-full p-3 rounded-lg backdrop-blur-sm border transition-all duration-300 ${
                        darkMode
                          ? 'bg-white/5 text-white border-white/10 placeholder-white/40 focus:border-white/30 focus:bg-white/10'
                          : 'bg-white text-[#00001a] border-gray-200 placeholder-gray-400 focus:border-gray-300'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/80' : 'text-gray-500'}`}>
                      Amount
                    </label>
                    <input
                      type="text"
                      value={paymentQuery.amount}
                      onChange={(e) => setPaymentQuery(prev => ({ ...prev, amount: e.target.value }))}
                      placeholder="$99.99"
                      className={`w-full p-3 rounded-lg backdrop-blur-sm border transition-all duration-300 ${
                        darkMode
                          ? 'bg-white/5 text-white border-white/10 placeholder-white/40 focus:border-white/30 focus:bg-white/10'
                          : 'bg-white text-[#00001a] border-gray-200 placeholder-gray-400 focus:border-gray-300'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/80' : 'text-gray-500'}`}>
                      Description
                    </label>
                    <textarea
                      rows={4}
                      value={paymentQuery.description}
                      onChange={(e) => setPaymentQuery(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Please describe your payment issue..."
                      className={`w-full p-3 rounded-lg backdrop-blur-sm border transition-all duration-300 resize-none ${
                        darkMode
                          ? 'bg-white/5 text-white border-white/10 placeholder-white/40 focus:border-white/30 focus:bg-white/10'
                          : 'bg-white text-[#00001a] border-gray-200 placeholder-gray-400 focus:border-gray-300'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/80' : 'text-gray-500'}`}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={paymentQuery.email}
                      onChange={(e) => setPaymentQuery(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="your.email@example.com"
                      className={`w-full p-3 rounded-lg backdrop-blur-sm border transition-all duration-300 ${
                        darkMode
                          ? 'bg-white/5 text-white border-white/10 placeholder-white/40 focus:border-white/30 focus:bg-white/10'
                          : 'bg-white text-[#00001a] border-gray-200 placeholder-gray-400 focus:border-gray-300'
                      }`}
                    />
                  </div>
                  <button
                    onClick={handleSubmitPaymentQuery}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                      darkMode
                        ? 'bg-blue-500/20 text-blue-500 border border-blue-500/30 hover:bg-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]'
                        : 'bg-[#00001a] text-white hover:shadow-lg'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <DollarSign size={16} />
                      Submit Payment Query
                    </div>
                  </button>
                </div>
              </div>

              {/* Payment Info */}
              <div className={`p-6 rounded-lg border transition-all duration-300 ${
                darkMode
                  ? 'border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                  : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
              }`}>
                <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Payment Support
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      title: 'Refund Policy',
                      description: '30-day money-back guarantee for all sessions',
                      icon: RefreshCw,
                      color: 'blue'
                    },
                    {
                      title: 'Processing Time',
                      description: 'Refunds processed within 3-5 business days',
                      icon: Clock,
                      color: 'orange'
                    },
                    {
                      title: 'Secure Payments',
                      description: 'All transactions are encrypted and secure',
                      icon: Shield,
                      color: 'green'
                    },
                    {
                      title: 'Multiple Methods',
                      description: 'Credit cards, PayPal, bank transfers accepted',
                      icon: CreditCard,
                      color: 'purple'
                    }
                  ].map((item, index) => {
                    const Icon = item.icon
                    return (
                      <div key={index} className={`p-4 rounded-lg border transition-all duration-300 ${
                        darkMode
                          ? 'border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                          : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                      }`}>
                        <div className="flex items-start gap-3">
                          <Icon size={20} className={`${darkMode ? 'text-blue-500' : 'text-[#00001a]'} mt-0.5`} />
                          <div>
                            <div className={`font-medium mb-1 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                              {item.title}
                            </div>
                            <div className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                              {item.description}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className={`mt-6 p-4 rounded-lg ${
                  darkMode ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-[#00001a]/5 border border-[#00001a]/20'
                }`}>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className={darkMode ? 'text-blue-500' : 'text-[#00001a]'} />
                    <p className={darkMode ? 'text-blue-500' : 'text-[#00001a]'}>
                      <strong>Fast Response:</strong> Payment queries are typically resolved within 2 business hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* F.A.Q Section */}
        {activeSection === 'faq' && (
          <div className={`p-6 backdrop-blur-xl border transition-all duration-500 shadow-xl ${
            darkMode
              ? 'rounded-lg bg-white/3 border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]'
              : 'rounded-lg bg-white border-gray-200 hover:border-gray-300 hover:shadow-[0_0_25px_rgba(0,0,0,0.15)]'
          }`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-3 rounded-lg ${
                darkMode ? 'bg-white/10' : 'bg-[#00001a]/10'
              }`}>
                <FileText size={24} className={darkMode ? 'text-white' : 'text-[#00001a]'} />
              </div>
              <div>
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Frequently Asked Questions
                </h2>
                <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-500'}`}>
                  Find answers to common questions about Chat, Delete Chat, Payment, Refund, and Policies
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* FAQ Categories */}
              <div className={`p-4 rounded-lg border transition-all duration-300 ${
                darkMode
                  ? 'border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                  : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
              }`}>
                <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Categories
                </h3>
                <div className="space-y-2">
                  {['All', 'Chat', 'Delete Chat', 'Payment', 'Refund', 'Policies'].map((category) => (
                    <button
                      key={category}
                      className={`w-full p-3 text-left rounded-lg border transition-all duration-300 ${
                        darkMode
                          ? 'border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] text-white/70 hover:text-white'
                          : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)] text-gray-500 hover:text-gray-500'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{category}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          darkMode ? 'bg-white/10 text-white/60' : 'bg-gray-200 text-gray-500'
                        }`}>
                          {category === 'All' ? faqData.length : faqData.filter(faq => faq.category === category).length}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className={`mt-6 p-4 rounded-lg ${
                  darkMode ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-[#00001a]/5 border border-[#00001a]/20'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Search size={16} className={darkMode ? 'text-blue-500' : 'text-[#00001a]'} />
                    <span className={`text-sm font-medium ${darkMode ? 'text-blue-500' : 'text-[#00001a]'}`}>
                      Can't find what you're looking for?
                    </span>
                  </div>
                  <p className={`text-sm ${darkMode ? 'text-blue-500' : 'text-[#00001a]'}`}>
                    Try our live chat or email support for personalized help.
                  </p>
                </div>
              </div>

              {/* FAQ List */}
              <div className="lg:col-span-2 space-y-4">
                {faqData.map((faq) => (
                  <div key={faq.id} className={`rounded-lg border transition-all duration-300 ${
                    darkMode
                      ? 'border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                      : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                  }`}>
                    <button
                      onClick={() => setSelectedFAQ(selectedFAQ === faq.id ? null : faq.id)}
                      className={`w-full p-4 text-left transition-all duration-300 ${
                        selectedFAQ === faq.id
                          ? darkMode
                            ? 'bg-blue-500/10 border-blue-500/20'
                            : 'bg-[#00001a]/5 border-[#00001a]/20'
                          : 'hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                              darkMode ? 'bg-blue-500/20 text-blue-500' : 'bg-[#00001a]/10 text-[#00001a]'
                            }`}>
                              {faq.category}
                            </span>
                          </div>
                          <div className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                            {faq.question}
                          </div>
                        </div>
                        <div className="ml-4">
                          {selectedFAQ === faq.id ? (
                            <ChevronUp size={20} className={darkMode ? 'text-white/60' : 'text-gray-500'} />
                          ) : (
                            <ChevronDown size={20} className={darkMode ? 'text-white/60' : 'text-gray-500'} />
                          )}
                        </div>
                      </div>
                    </button>

                    {selectedFAQ === faq.id && (
                      <div className={`p-4 border-t ${
                        darkMode ? 'border-white/10' : 'border-gray-200'
                      }`}>
                        <p className={`text-sm leading-relaxed ${darkMode ? 'text-white/70' : 'text-gray-500'}`}>
                          {faq.answer}
                        </p>

                        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/10">
                          <span className={`text-sm ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                            Was this helpful?
                          </span>
                          <div className="flex items-center gap-2">
                            <button className={`p-2 rounded-lg transition-all duration-300 ${
                              darkMode
                                ? 'hover:bg-blue-500/20 text-white/60 hover:text-blue-500'
                                : 'hover:bg-[#00001a]/10 text-gray-500 hover:text-[#00001a]'
                            }`}>
                              <CheckCircle size={16} />
                            </button>
                            <button className={`p-2 rounded-lg transition-all duration-300 ${
                              darkMode
                                ? 'hover:bg-blue-500/20 text-white/60 hover:text-blue-500'
                                : 'hover:bg-[#00001a]/10 text-gray-500 hover:text-[#00001a]'
                            }`}>
                              <X size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Support
