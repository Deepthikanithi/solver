import React from 'react'

const SkillVerification = ({ darkMode }) => {
  return (
    <div className={`transition-all duration-500 ${
      darkMode ? 'bg-[#00001a]' : 'bg-gray-50'
    }`}>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse ${
          darkMode ? 'bg-white/10' : 'bg-[#00001a]/10'
        }`}></div>
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse ${
          darkMode ? 'bg-white/5' : 'bg-[#00001a]/5'
        }`}></div>
      </div>

      <div className="relative p-6 space-y-6 min-h-screen">
        {/* Header */}
        <div className="mb-8">
          <p className={`text-lg ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
            Verify your technical skills and expertise
          </p>
        </div>

        {/* Coming Soon Card */}
        <div className={`p-12 transition-all duration-500 backdrop-blur-xl border text-center ${
          darkMode
            ? 'rounded-lg bg-white/3 border-white/20'
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
            e.currentTarget.style.boxShadow = '0 0 18px rgba(59, 130, 246, 0.4), 0 0 35px rgba(59, 130, 246, 0.2), 0 6px 20px rgba(0, 0, 0, 0.2)';
          } else {
            e.currentTarget.style.boxShadow = '0 0 15px rgba(21, 58, 168, 0.35), 0 0 30px rgba(21, 58, 168, 0.15), 0 6px 16px rgba(0, 0, 0, 0.12)';
          }
        }}
        onMouseLeave={(e) => {
          if (darkMode) {
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)';
          } else {
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
          }
        }}>
          <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
            darkMode ? 'bg-white/10' : 'bg-blue-50'
          }`}>
            <svg className={`w-12 h-12 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
            Coming Soon
          </h2>
          
          <p className={`text-lg mb-6 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
            Skill verification features are currently under development
          </p>

          <div className={`p-6 rounded-lg border backdrop-blur-sm transition-all duration-300 ${
            darkMode
              ? 'bg-white/3 border-white/20'
              : 'bg-white border-gray-200'
          }`}
          style={darkMode ? {
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)'
          } : {
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}
          onMouseEnter={(e) => {
            if (darkMode) {
              e.currentTarget.style.boxShadow = '0 0 12px rgba(59, 130, 246, 0.35), 0 0 25px rgba(59, 130, 246, 0.18), 0 4px 12px rgba(0, 0, 0, 0.15)';
            } else {
              e.currentTarget.style.boxShadow = '0 0 10px rgba(21, 58, 168, 0.3), 0 0 20px rgba(21, 58, 168, 0.12), 0 4px 10px rgba(0, 0, 0, 0.1)';
            }
          }}
          onMouseLeave={(e) => {
            if (darkMode) {
              e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.2)';
            } else {
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
            }
          }}>
            <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
              What's Coming:
            </h3>
            <div className="space-y-2 text-left">
              <div className="flex items-center">
                <svg className={`w-5 h-5 mr-3 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className={`${darkMode ? 'text-white/80' : 'text-[#00001a]/80'}`}>
                  Technical skill assessments
                </span>
              </div>
              <div className="flex items-center">
                <svg className={`w-5 h-5 mr-3 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className={`${darkMode ? 'text-white/80' : 'text-[#00001a]/80'}`}>
                  Portfolio verification
                </span>
              </div>
              <div className="flex items-center">
                <svg className={`w-5 h-5 mr-3 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className={`${darkMode ? 'text-white/80' : 'text-[#00001a]/80'}`}>
                  Certification validation
                </span>
              </div>
              <div className="flex items-center">
                <svg className={`w-5 h-5 mr-3 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className={`${darkMode ? 'text-white/80' : 'text-[#00001a]/80'}`}>
                  Peer review system
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkillVerification
