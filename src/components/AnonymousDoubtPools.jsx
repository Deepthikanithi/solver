import React, { useState } from 'react'

const AnonymousDoubtPools = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState('active') // active, completed, my-solutions
  const [selectedDoubt, setSelectedDoubt] = useState(null)
  const [showResponseModal, setShowResponseModal] = useState(false)
  const [response, setResponse] = useState('')
  
  const doubtPools = [
    {
      id: 1,
      title: 'React Hooks - useEffect dependency array issue',
      description: 'I\'m having trouble understanding when to include variables in the useEffect dependency array. Sometimes my component re-renders infinitely.',
      subject: 'React.js',
      difficulty: 'Intermediate',
      tags: ['hooks', 'useEffect', 'dependencies'],
      postedAt: '2024-01-20 14:30',
      responses: 3,
      status: 'Active',
      codeSnippet: `useEffect(() => {
  fetchUserData(userId);
}, [userId, fetchUserData]); // Is this correct?`,
      bounty: 25,
      views: 45
    },
    {
      id: 2,
      title: 'Python list comprehension vs map performance',
      description: 'Which is more efficient for large datasets - list comprehensions or map functions? I need to process millions of records.',
      subject: 'Python',
      difficulty: 'Advanced',
      tags: ['performance', 'list-comprehension', 'map'],
      postedAt: '2024-01-20 10:15',
      responses: 7,
      status: 'Active',
      codeSnippet: `# Option 1
result = [process(item) for item in large_list]

# Option 2  
result = list(map(process, large_list))`,
      bounty: 50,
      views: 89
    },
    {
      id: 3,
      title: 'CSS Grid vs Flexbox for complex layouts',
      description: 'I\'m building a dashboard with multiple panels. Should I use CSS Grid or Flexbox? What are the performance implications?',
      subject: 'CSS',
      difficulty: 'Beginner',
      tags: ['css-grid', 'flexbox', 'layout'],
      postedAt: '2024-01-19 16:45',
      responses: 12,
      status: 'Completed',
      codeSnippet: `.dashboard {
  display: grid; /* or flex? */
  grid-template-columns: 1fr 2fr 1fr;
}`,
      bounty: 15,
      views: 156,
      bestAnswer: {
        author: 'You',
        content: 'For dashboard layouts, CSS Grid is generally better...',
        upvotes: 8
      }
    },
    {
      id: 4,
      title: 'Database indexing strategy for large tables',
      description: 'I have a table with 10M+ records. Query performance is slow even with basic indexes. What indexing strategy should I use?',
      subject: 'Database',
      difficulty: 'Expert',
      tags: ['indexing', 'performance', 'sql'],
      postedAt: '2024-01-19 09:20',
      responses: 5,
      status: 'Active',
      codeSnippet: `SELECT * FROM orders 
WHERE customer_id = ? 
AND order_date BETWEEN ? AND ?
ORDER BY order_date DESC;`,
      bounty: 100,
      views: 234
    }
  ]

  const myResponses = [
    {
      id: 1,
      doubtId: 3,
      title: 'CSS Grid vs Flexbox for complex layouts',
      myResponse: 'For dashboard layouts, CSS Grid is generally better because it provides two-dimensional control...',
      status: 'Best Answer',
      upvotes: 8,
      earnings: 15,
      respondedAt: '2024-01-19 18:30'
    },
    {
      id: 2,
      doubtId: 5,
      title: 'JavaScript closure memory leaks',
      myResponse: 'Memory leaks in closures typically happen when you maintain references to DOM elements...',
      status: 'Accepted',
      upvotes: 3,
      earnings: 30,
      respondedAt: '2024-01-18 14:15'
    }
  ]

  const handleRespond = (doubtId) => {
    setSelectedDoubt(doubtId)
    setShowResponseModal(true)
  }

  const submitResponse = () => {
    console.log('Submitting response:', response, 'for doubt:', selectedDoubt)
    setShowResponseModal(false)
    setResponse('')
    setSelectedDoubt(null)
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/20 text-green-400'
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-400'
      case 'Advanced': return 'bg-orange-500/20 text-orange-400'
      case 'Expert': return 'bg-red-500/20 text-red-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-500/20 text-green-400'
      case 'Completed': return 'bg-blue-500/20 text-blue-400'
      case 'Closed': return 'bg-gray-500/20 text-gray-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const filteredDoubts = doubtPools.filter(doubt => {
    switch (activeTab) {
      case 'active':
        return doubt.status === 'Active'
      case 'completed':
        return doubt.status === 'Completed'
      case 'my-solutions':
        return myResponses.some(response => response.doubtId === doubt.id)
      default:
        return true
    }
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
          💬 Anonymous Doubt Pools
        </h2>
        <div className="flex space-x-2">
          {[
            { key: 'active', label: 'Active Requests', icon: '🔥' },
            { key: 'completed', label: 'Completed', icon: '✅' },
            { key: 'my-solutions', label: 'My Solutions', icon: '🎯' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                activeTab === tab.key
                  ? darkMode
                    ? 'bg-white/20 text-white'
                    : 'bg-[#00001a]/20 text-[#00001a]'
                  : darkMode
                    ? 'bg-[#00001a]/20 text-white/70 hover:bg-[#00001a]/30'
                    : 'bg-white/20 text-[#00001a]/70 hover:bg-white/30'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Doubt Cards */}
      <div className="space-y-4">
        {filteredDoubts.map((doubt) => (
          <div
            key={doubt.id}
            className={`backdrop-blur-2xl rounded-2xl border shadow-2xl transition-all duration-500 hover:shadow-3xl ${
              darkMode
                ? 'bg-[#00001a]/40 border-white/10'
                : 'bg-white/40 border-white/20'
            }`}
          >
            <div className="p-6">
              {/* Doubt Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-xl ${
                    darkMode ? 'bg-white/20' : 'bg-[#00001a]/20'
                  }`}>
                    <span className="text-2xl">💡</span>
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      {doubt.title}
                    </h3>
                    <p className={`text-sm mb-3 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                      {doubt.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {doubt.tags.map((tag, index) => (
                        <span
                          key={index}
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            darkMode ? 'bg-white/20 text-white' : 'bg-[#00001a]/20 text-[#00001a]'
                          }`}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end space-y-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(doubt.status)}`}>
                    {doubt.status}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(doubt.difficulty)}`}>
                    {doubt.difficulty}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                    darkMode ? 'bg-white/20 text-white' : 'bg-[#00001a]/20 text-[#00001a]'
                  }`}>
                    ${doubt.bounty}
                  </span>
                </div>
              </div>

              {/* Code Snippet */}
              {doubt.codeSnippet && (
                <div className={`p-4 rounded-xl mb-4 ${
                  darkMode ? 'bg-[#00001a]/30' : 'bg-white/30'
                }`}>
                  <h4 className={`text-sm font-semibold mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Code Snippet:
                  </h4>
                  <pre className={`text-sm overflow-x-auto ${darkMode ? 'text-white/80' : 'text-[#00001a]/80'}`}>
                    <code>{doubt.codeSnippet}</code>
                  </pre>
                </div>
              )}

              {/* Stats and Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm">
                  <span className={`${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                    👁️ {doubt.views} views
                  </span>
                  <span className={`${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                    💬 {doubt.responses} responses
                  </span>
                  <span className={`${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                    📅 {doubt.postedAt}
                  </span>
                  <span className={`${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                    📚 {doubt.subject}
                  </span>
                </div>
                
                <div className="flex space-x-2">
                  {doubt.status === 'Active' && (
                    <button
                      onClick={() => handleRespond(doubt.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        darkMode
                          ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                          : 'bg-green-500/20 text-green-600 hover:bg-green-500/30'
                      }`}
                    >
                      💡 Respond
                    </button>
                  )}
                  <button
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      darkMode
                        ? 'bg-white/20 text-white hover:bg-white/30'
                        : 'bg-[#00001a]/20 text-[#00001a] hover:bg-[#00001a]/30'
                    }`}
                  >
                    👁️ View Details
                  </button>
                </div>
              </div>

              {/* Best Answer (for completed doubts) */}
              {doubt.status === 'Completed' && doubt.bestAnswer && (
                <div className={`mt-4 p-4 rounded-xl border ${
                  darkMode ? 'bg-green-500/10 border-green-500/30' : 'bg-green-500/10 border-green-500/30'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm font-semibold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                      ✅ Best Answer {doubt.bestAnswer.author === 'You' ? '(Your Solution)' : ''}
                    </span>
                    <span className={`text-sm ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                      👍 {doubt.bestAnswer.upvotes} upvotes
                    </span>
                  </div>
                  <p className={`text-sm ${darkMode ? 'text-white/80' : 'text-[#00001a]/80'}`}>
                    {doubt.bestAnswer.content}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* My Solutions Tab Content */}
      {activeTab === 'my-solutions' && (
        <div className={`backdrop-blur-2xl rounded-2xl border shadow-2xl transition-all duration-500 ${
          darkMode
            ? 'bg-[#00001a]/40 border-white/10'
            : 'bg-white/40 border-white/20'
        }`}>
          <div className="p-6">
            <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
              🎯 My Solution Statistics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className={`p-4 rounded-xl text-center ${
                darkMode ? 'bg-[#00001a]/20' : 'bg-white/20'
              }`}>
                <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  {myResponses.length}
                </div>
                <div className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                  Total Solutions
                </div>
              </div>
              <div className={`p-4 rounded-xl text-center ${
                darkMode ? 'bg-[#00001a]/20' : 'bg-white/20'
              }`}>
                <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  {myResponses.filter(r => r.status === 'Best Answer').length}
                </div>
                <div className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                  Best Answers
                </div>
              </div>
              <div className={`p-4 rounded-xl text-center ${
                darkMode ? 'bg-[#00001a]/20' : 'bg-white/20'
              }`}>
                <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  {myResponses.reduce((sum, r) => sum + r.upvotes, 0)}
                </div>
                <div className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                  Total Upvotes
                </div>
              </div>
              <div className={`p-4 rounded-xl text-center ${
                darkMode ? 'bg-[#00001a]/20' : 'bg-white/20'
              }`}>
                <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  ${myResponses.reduce((sum, r) => sum + r.earnings, 0)}
                </div>
                <div className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                  Total Earnings
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              {myResponses.map((response) => (
                <div
                  key={response.id}
                  className={`p-4 rounded-xl border ${
                    darkMode ? 'bg-[#00001a]/20 border-white/10' : 'bg-white/20 border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        {response.title}
                      </h4>
                      <p className={`text-sm mt-1 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                        {response.myResponse.substring(0, 100)}...
                      </p>
                      <div className="flex items-center space-x-3 mt-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          response.status === 'Best Answer'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {response.status}
                        </span>
                        <span className={`text-xs ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`}>
                          👍 {response.upvotes} upvotes
                        </span>
                        <span className={`text-xs ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`}>
                          📅 {response.respondedAt}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        +${response.earnings}
                      </div>
                      <div className={`text-xs ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                        Earned
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Response Modal */}
      {showResponseModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className={`max-w-2xl w-full mx-4 rounded-2xl border shadow-2xl ${
            darkMode
              ? 'bg-[#00001a]/90 border-white/10'
              : 'bg-white/90 border-white/20'
          }`}>
            <div className="p-6">
              <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                💡 Provide Your Solution
              </h3>
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                    Your Response
                  </label>
                  <textarea
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    rows={8}
                    className={`w-full p-3 rounded-lg border resize-none ${
                      darkMode
                        ? 'bg-[#00001a]/20 border-white/20 text-white'
                        : 'bg-white/20 border-white/30 text-[#00001a]'
                    }`}
                    placeholder="Provide a detailed solution to help solve this doubt..."
                  />
                </div>
                
                <div className={`p-3 rounded-lg ${
                  darkMode ? 'bg-white/10' : 'bg-[#00001a]/10'
                }`}>
                  <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                    💡 <strong>Tips for great responses:</strong>
                  </p>
                  <ul className={`text-xs mt-1 space-y-1 ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                    <li>• Provide clear, step-by-step explanations</li>
                    <li>• Include code examples when relevant</li>
                    <li>• Explain the reasoning behind your solution</li>
                    <li>• Be respectful and constructive</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={submitResponse}
                  disabled={!response.trim()}
                  className={`flex-1 py-3 rounded-lg font-medium transition-all duration-300 ${
                    response.trim()
                      ? darkMode
                        ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                        : 'bg-green-500/20 text-green-600 hover:bg-green-500/30'
                      : 'bg-gray-500/20 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  💡 Submit Solution
                </button>
                <button
                  onClick={() => {
                    setShowResponseModal(false)
                    setResponse('')
                    setSelectedDoubt(null)
                  }}
                  className={`flex-1 py-3 rounded-lg font-medium transition-all duration-300 ${
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

      {/* Empty State */}
      {filteredDoubts.length === 0 && (
        <div className={`backdrop-blur-2xl rounded-2xl border shadow-2xl transition-all duration-500 ${
          darkMode
            ? 'bg-[#00001a]/40 border-white/10'
            : 'bg-white/40 border-white/20'
        }`}>
          <div className="p-12 text-center">
            <div className="text-6xl mb-4">💭</div>
            <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
              No Doubts Found
            </h3>
            <p className={`${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
              {activeTab === 'active' && 'No active doubts at the moment. Check back later!'}
              {activeTab === 'completed' && 'No completed doubts to show.'}
              {activeTab === 'my-solutions' && 'You haven\'t provided any solutions yet.'}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnonymousDoubtPools
