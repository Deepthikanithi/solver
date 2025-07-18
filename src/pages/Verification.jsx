import React from 'react'
import { useNavigate } from 'react-router-dom'

const Verification = ({ darkMode }) => {
  const navigate = useNavigate()

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode ? 'bg-[#00001a]' : 'bg-gray-50'
    }`}>
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
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
            Verification Hub
          </h1>
          <p className={`text-lg ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
            Choose the type of verification you need
          </p>
        </div>

        {/* Verification Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Skill Verification */}
          <div
            onClick={() => navigate('/skill-verification')}
            className={`group p-8 cursor-pointer transition-all duration-500 backdrop-blur-xl border hover:scale-105 ${
              darkMode
                ? 'rounded-lg bg-white/3 border-white/20 hover:bg-white/8 hover:border-white/30'
                : 'rounded-2xl bg-white border-gray-200 hover:bg-white/90'
            }`}
            style={darkMode ? {
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
            } : {
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              transition: 'all 0.3s ease'
            }}
          >
            {/* Glow effect */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
              darkMode ? 'bg-gradient-to-r from-blue-500/10 via-blue-400/5 to-transparent rounded-lg' : 'bg-gradient-to-r from-blue-500/5 via-blue-400/3 to-transparent rounded-2xl'
            }`}></div>

            <div className="relative z-10">
              <div className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center ${
                darkMode ? 'bg-white/10' : 'bg-[#00001a]/10'
              }`}>
                <svg className={`w-8 h-8 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <h3 className={`text-xl font-bold mb-3 text-center ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                Skill Verification
              </h3>
              
              <p className={`text-center mb-4 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                Verify your technical skills and expertise to build trust with students
              </p>

              <div className={`text-sm text-center ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                Coming Soon
              </div>
            </div>
          </div>

          {/* Identity Verification */}
          <div
            onClick={() => navigate('/identity-verification')}
            className={`group p-8 cursor-pointer transition-all duration-500 backdrop-blur-xl border hover:scale-105 ${
              darkMode
                ? 'rounded-lg bg-white/3 border-white/20 hover:bg-white/8 hover:border-white/30'
                : 'rounded-2xl bg-white border-gray-200 hover:bg-white/90'
            }`}
            style={darkMode ? {
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
            } : {
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              transition: 'all 0.3s ease'
            }}
          >
            {/* Glow effect */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
              darkMode ? 'bg-gradient-to-r from-green-500/10 via-green-400/5 to-transparent rounded-lg' : 'bg-gradient-to-r from-green-500/5 via-green-400/3 to-transparent rounded-2xl'
            }`}></div>

            <div className="relative z-10">
              <div className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center ${
                darkMode ? 'bg-white/10' : 'bg-[#00001a]/10'
              }`}>
                <svg className={`w-8 h-8 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              
              <h3 className={`text-xl font-bold mb-3 text-center ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                Identity Verification
              </h3>
              
              <p className={`text-center mb-4 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                Verify your identity to access all platform features securely
              </p>

              <div className={`text-sm text-center ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                Available Now
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Verification
