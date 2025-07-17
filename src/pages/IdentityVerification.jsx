import React, { useState } from 'react'

const IdentityVerification = ({ darkMode }) => {
  const [currentStep, setCurrentStep] = useState(0) // 0: selection, 1: process, 2: complete
  const [verificationLevel, setVerificationLevel] = useState('')
  const [verificationStatus, setVerificationStatus] = useState({
    light: 'not_started', // not_started, in_progress, completed
    standard: 'not_started',
    full: 'not_started'
  })
  const [verificationData, setVerificationData] = useState({
    email: { verified: false, value: '' },
    phone: { verified: false, value: '' },
    id: { uploaded: false, verified: false, fileName: '', file: null },
    face: { completed: false, verified: false }
  })
  const [currentProcessStep, setCurrentProcessStep] = useState(0) // For multi-step processes

  const handleVerificationSelect = (level) => {
    setVerificationLevel(level)
    setCurrentStep(1) // Move to verification process
    setCurrentProcessStep(0) // Reset process step
    setVerificationStatus(prev => ({
      ...prev,
      [level]: 'in_progress'
    }))
  }

  const handleBackToSelection = () => {
    setCurrentStep(0)
    setVerificationLevel('')
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode ? 'bg-[#00001a]' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <div className="p-6 pb-0">
        <div className="flex items-center justify-between mb-6">
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
            Choose Verification Level
          </h1>
          {currentStep > 0 && (
            <button
              onClick={handleBackToSelection}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 backdrop-blur-xl border ${
                darkMode
                  ? 'bg-white/10 text-white hover:bg-white/20 border-white/20'
                  : 'bg-gray-200 text-[#00001a] hover:bg-gray-300 border-gray-300'
              }`}
            >
              ← Back to Selection
            </button>
          )}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Step 0: Verification Level Selection */}
        {currentStep === 0 && (
          <>
          <div>
            <p className={`text-lg mb-8 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
              Choose your verification level to get started
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Light Verification */}
              <div
                onClick={() => handleVerificationSelect('light')}
                className={`group p-6 cursor-pointer backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden ${
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
                }}
              >
                <div className="mb-4">
                  <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Light Verification
                  </h3>
                </div>
                <p className={`text-sm mb-4 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                  Email and phone verification only
                </p>
                <ul className={`text-sm space-y-2 mb-4 ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                  <li>• Basic account access</li>
                  <li>• Limited transaction amounts</li>
                  <li>• Quick setup process</li>
                </ul>


              </div>

              {/* Standard Verification */}
              <div
                onClick={() => handleVerificationSelect('standard')}
                className={`group p-6 cursor-pointer backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden ${
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
                }}
              >
                <div className="mb-4">
                  <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Standard Verification
                  </h3>
                </div>
                <p className={`text-sm mb-4 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                  Upload government-issued ID
                </p>
                <ul className={`text-sm space-y-2 mb-4 ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                  <li>• Higher transaction limits</li>
                  <li>• Access to premium features</li>
                  <li>• Enhanced security</li>
                </ul>


              </div>

              {/* Full Verification */}
              <div
                onClick={() => handleVerificationSelect('full')}
                className={`group p-6 cursor-pointer backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden ${
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
                }}
              >
                <div className="mb-4">
                  <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Full Verification
                  </h3>
                </div>
                <p className={`text-sm mb-4 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                  ID plus dynamic facial authentication
                </p>
                <ul className={`text-sm space-y-2 mb-4 ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                  <li>• Unlimited transactions</li>
                  <li>• All platform features</li>
                  <li>• Maximum security level</li>
                </ul>


              </div>
            </div>
          </div>

          {/* Verification Status Section */}
          <div
            className={`backdrop-blur-xl border p-8 transition-all duration-500 shadow-xl ${
              darkMode
                ? 'bg-[#00001a]/40 border-white/10 rounded-lg'
                : 'bg-white/40 border-white/20 rounded-2xl'
            }`}
            style={darkMode ? {
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
            } : {
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              transition: 'all 0.3s ease'
            }}
          >
            <div className="text-center mb-10">
              <div className={`group w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center transition-all duration-500 cursor-pointer backdrop-blur-xl shadow-xl relative overflow-hidden ${
                darkMode ? 'bg-[#00001a]/40 border border-white/10 hover:bg-[#00001a]/50 hover:border-white/20' : 'bg-white/40 border border-white/20'
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
              }}
              >
                <svg className={`w-10 h-10 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h2 className={`text-3xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                Verification Status
              </h2>
              <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                Track your verification progress and processing timeline
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Light Verification Status */}
              <div
                className={`group p-6 border transition-all duration-500 cursor-pointer backdrop-blur-xl shadow-xl relative overflow-hidden ${
                  darkMode
                    ? 'bg-[#00001a]/40 border-white/10 rounded-lg hover:bg-[#00001a]/50 hover:border-white/20'
                    : 'bg-white/40 border-white/20 rounded-2xl'
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
                }}
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className={`w-4 h-4 rounded-full flex-shrink-0 ${
                    verificationStatus.light === 'completed' ? 'bg-green-500' :
                    verificationStatus.light === 'in_progress' ? 'bg-yellow-500' :
                    'bg-gray-400'
                  }`}></div>
                  <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Light Verification
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className={`text-base font-semibold ${
                    verificationStatus.light === 'completed' ? 'text-green-500' :
                    verificationStatus.light === 'in_progress' ? 'text-yellow-500' :
                    darkMode ? 'text-white/60' : 'text-[#00001a]/60'
                  }`}>
                    {verificationStatus.light === 'completed' ? 'Verification Complete' :
                     verificationStatus.light === 'in_progress' ? 'Processing...' :
                     'Not Started'}
                  </div>

                  <div className={`text-sm ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`}>
                    {verificationStatus.light === 'completed' ? 'Completed instantly' :
                     verificationStatus.light === 'in_progress' ? 'Processing time: Instant' :
                     'Processing time: Instant'}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        verificationData.email.verified ? 'bg-green-500' : 'bg-gray-400'
                      }`}></div>
                      <span className={`text-sm ${
                        verificationData.email.verified ? 'text-green-500' : darkMode ? 'text-white/60' : 'text-[#00001a]/60'
                      }`}>
                        Email Verification
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        verificationData.phone.verified ? 'bg-green-500' : 'bg-gray-400'
                      }`}></div>
                      <span className={`text-sm ${
                        verificationData.phone.verified ? 'text-green-500' : darkMode ? 'text-white/60' : 'text-[#00001a]/60'
                      }`}>
                        Phone Verification
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Standard Verification Status */}
              <div
                className={`group p-6 border transition-all duration-500 cursor-pointer backdrop-blur-xl shadow-xl relative overflow-hidden ${
                  darkMode
                    ? 'bg-[#00001a]/40 border-white/10 rounded-lg hover:bg-[#00001a]/50 hover:border-white/20'
                    : 'bg-white/40 border-white/20 rounded-2xl'
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
                }}
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className={`w-4 h-4 rounded-full flex-shrink-0 ${
                    verificationStatus.standard === 'completed' ? 'bg-green-500' :
                    verificationStatus.standard === 'in_progress' ? 'bg-yellow-500' :
                    'bg-gray-400'
                  }`}></div>
                  <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Standard Verification
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className={`text-base font-semibold ${
                    verificationStatus.standard === 'completed' ? 'text-green-500' :
                    verificationStatus.standard === 'in_progress' ? 'text-yellow-500' :
                    darkMode ? 'text-white/60' : 'text-[#00001a]/60'
                  }`}>
                    {verificationStatus.standard === 'completed' ? 'Verification Complete' :
                     verificationStatus.standard === 'in_progress' ? 'Under Review' :
                     'Not Started'}
                  </div>

                  <div className={`text-sm ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`}>
                    {verificationStatus.standard === 'completed' ? 'Approved in 2 business days' :
                     verificationStatus.standard === 'in_progress' ? 'Processing time: 2-3 business days' :
                     'Processing time: 2-3 business days'}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        verificationData.id.uploaded ? 'bg-green-500' : 'bg-gray-400'
                      }`}></div>
                      <span className={`text-sm ${
                        verificationData.id.uploaded ? 'text-green-500' : darkMode ? 'text-white/60' : 'text-[#00001a]/60'
                      }`}>
                        ID Document Upload
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        verificationStatus.standard === 'completed' ? 'bg-green-500' :
                        verificationStatus.standard === 'in_progress' ? 'bg-yellow-500' : 'bg-gray-400'
                      }`}></div>
                      <span className={`text-sm ${
                        verificationStatus.standard === 'completed' ? 'text-green-500' :
                        verificationStatus.standard === 'in_progress' ? 'text-yellow-500' :
                        darkMode ? 'text-white/60' : 'text-[#00001a]/60'
                      }`}>
                        Document Review
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Full Verification Status */}
              <div
                className={`group p-6 border transition-all duration-500 cursor-pointer backdrop-blur-xl shadow-xl relative overflow-hidden ${
                  darkMode
                    ? 'bg-[#00001a]/40 border-white/10 rounded-lg hover:bg-[#00001a]/50 hover:border-white/20'
                    : 'bg-white/40 border-white/20 rounded-2xl'
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
                }}
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className={`w-4 h-4 rounded-full flex-shrink-0 ${
                    verificationStatus.full === 'completed' ? 'bg-green-500' :
                    verificationStatus.full === 'in_progress' ? 'bg-yellow-500' :
                    'bg-gray-400'
                  }`}></div>
                  <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Full Verification
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className={`text-base font-semibold ${
                    verificationStatus.full === 'completed' ? 'text-green-500' :
                    verificationStatus.full === 'in_progress' ? 'text-yellow-500' :
                    darkMode ? 'text-white/60' : 'text-[#00001a]/60'
                  }`}>
                    {verificationStatus.full === 'completed' ? 'Verification Complete' :
                     verificationStatus.full === 'in_progress' ? 'Under Review' :
                     'Not Started'}
                  </div>

                  <div className={`text-sm ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`}>
                    {verificationStatus.full === 'completed' ? 'Approved in 3 business days' :
                     verificationStatus.full === 'in_progress' ? 'Processing time: 3-5 business days' :
                     'Processing time: 3-5 business days'}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        verificationData.id.uploaded ? 'bg-green-500' : 'bg-gray-400'
                      }`}></div>
                      <span className={`text-sm ${
                        verificationData.id.uploaded ? 'text-green-500' : darkMode ? 'text-white/60' : 'text-[#00001a]/60'
                      }`}>
                        ID Document Upload
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        verificationData.face.completed ? 'bg-green-500' : 'bg-gray-400'
                      }`}></div>
                      <span className={`text-sm ${
                        verificationData.face.completed ? 'text-green-500' : darkMode ? 'text-white/60' : 'text-[#00001a]/60'
                      }`}>
                        Facial Authentication
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        verificationStatus.full === 'completed' ? 'bg-green-500' :
                        verificationStatus.full === 'in_progress' ? 'bg-yellow-500' : 'bg-gray-400'
                      }`}></div>
                      <span className={`text-sm ${
                        verificationStatus.full === 'completed' ? 'text-green-500' :
                        verificationStatus.full === 'in_progress' ? 'text-yellow-500' :
                        darkMode ? 'text-white/60' : 'text-[#00001a]/60'
                      }`}>
                        Identity Verification
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Processing Timeline */}
            <div
              className={`group p-8 border transition-all duration-500 backdrop-blur-xl shadow-xl relative overflow-hidden cursor-pointer ${
                darkMode
                  ? 'bg-[#00001a]/40 border-white/10 rounded-lg hover:bg-[#00001a]/50 hover:border-white/20'
                  : 'bg-white/40 border-white/20 rounded-2xl'
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
              }}
            >
              <div className="text-center mb-6">
                <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Processing Timeline
                </h3>
                <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                  Expected processing times for each verification level
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={`group p-4 text-center transition-all duration-500 cursor-pointer backdrop-blur-xl shadow-lg relative overflow-hidden ${
                  darkMode
                    ? 'bg-[#00001a]/30 border border-white/10 rounded-lg hover:bg-[#00001a]/40 hover:border-white/20'
                    : 'bg-white/30 border border-white/20 rounded-2xl'
                }`}
                style={darkMode ? {
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.05)',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                } : {
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  if (darkMode) {
                    e.currentTarget.style.boxShadow = '0 0 15px rgba(59, 130, 246, 0.3), 0 2px 6px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.15)';
                  } else {
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (darkMode) {
                    e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.05)';
                  } else {
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                  }
                }}
                >
                  <div className={`text-lg font-semibold mb-1 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Light Verification
                  </div>
                  <div className={`text-sm ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                    Instant approval
                  </div>
                </div>

                <div className={`group p-4 text-center transition-all duration-500 cursor-pointer backdrop-blur-xl shadow-lg relative overflow-hidden ${
                  darkMode
                    ? 'bg-[#00001a]/30 border border-white/10 rounded-lg hover:bg-[#00001a]/40 hover:border-white/20'
                    : 'bg-white/30 border border-white/20 rounded-2xl'
                }`}
                style={darkMode ? {
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.05)',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                } : {
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  if (darkMode) {
                    e.currentTarget.style.boxShadow = '0 0 15px rgba(59, 130, 246, 0.3), 0 2px 6px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.15)';
                  } else {
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (darkMode) {
                    e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.05)';
                  } else {
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                  }
                }}
                >
                  <div className={`text-lg font-semibold mb-1 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Standard Verification
                  </div>
                  <div className={`text-sm ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                    2-3 business days
                  </div>
                </div>

                <div className={`group p-4 text-center transition-all duration-500 cursor-pointer backdrop-blur-xl shadow-lg relative overflow-hidden ${
                  darkMode
                    ? 'bg-[#00001a]/30 border border-white/10 rounded-lg hover:bg-[#00001a]/40 hover:border-white/20'
                    : 'bg-white/30 border border-white/20 rounded-2xl'
                }`}
                style={darkMode ? {
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.05)',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                } : {
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  if (darkMode) {
                    e.currentTarget.style.boxShadow = '0 0 15px rgba(59, 130, 246, 0.3), 0 2px 6px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.15)';
                  } else {
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (darkMode) {
                    e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.05)';
                  } else {
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                  }
                }}
                >
                  <div className={`text-lg font-semibold mb-1 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Full Verification
                  </div>
                  <div className={`text-sm ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                    3-5 business days
                  </div>
                </div>
              </div>
            </div>
          </div>
          </>
        )}

        {/* Step 1: Verification Process */}
        {currentStep === 1 && (
          <div className={`backdrop-blur-xl border p-8 transition-all duration-500 ${
            darkMode
              ? 'bg-white/5 border-white/20 rounded-lg'
              : 'bg-white border-gray-200 rounded-2xl'
          }`}
          style={darkMode ? {
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          } : {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            transition: 'all 0.3s ease'
          }}>

            {/* Light Verification Process */}
            {verificationLevel === 'light' && (
              <div>
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                    darkMode ? 'bg-white/10' : 'bg-[#00001a]/10'
                  }`}>
                    <svg className={`w-8 h-8 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Light Verification
                  </h2>
                  <p className={`text-lg ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                    Verify your email and phone number
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Email Verification */}
                  <div className={`p-6 rounded-lg border ${
                    darkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        Email Verification
                      </h3>
                      {verificationData.email.verified && (
                        <div className="flex items-center space-x-2 text-green-500">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm font-medium">Verified</span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-4">
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        value={verificationData.email.value}
                        onChange={(e) => setVerificationData(prev => ({
                          ...prev,
                          email: { ...prev.email, value: e.target.value }
                        }))}
                        className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 ${
                          darkMode
                            ? 'bg-white/5 border-white/20 text-white placeholder-white/50 focus:border-white/40'
                            : 'bg-white border-gray-300 text-[#00001a] placeholder-gray-500 focus:border-[#00001a]/40'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                      />
                      <button
                        onClick={() => {
                          if (verificationData.email.value) {
                            setVerificationData(prev => ({
                              ...prev,
                              email: { ...prev.email, verified: true }
                            }))
                          }
                        }}
                        disabled={!verificationData.email.value || verificationData.email.verified}
                        className={`w-full px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                          verificationData.email.verified
                            ? darkMode
                              ? 'bg-green-500/20 text-green-400 cursor-not-allowed'
                              : 'bg-green-100 text-green-600 cursor-not-allowed'
                            : !verificationData.email.value
                              ? darkMode
                                ? 'bg-white/10 text-white/50 cursor-not-allowed'
                                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                              : darkMode
                                ? 'bg-white text-[#00001a] hover:bg-white/90'
                                : 'bg-[#00001a] text-white hover:bg-[#00001a]/90'
                        }`}
                      >
                        {verificationData.email.verified ? 'Email Verified' : 'Send Verification Code'}
                      </button>
                    </div>
                  </div>

                  {/* Phone Verification */}
                  <div className={`p-6 rounded-lg border ${
                    darkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        Phone Verification
                      </h3>
                      {verificationData.phone.verified && (
                        <div className="flex items-center space-x-2 text-green-500">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm font-medium">Verified</span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-4">
                      <input
                        type="tel"
                        placeholder="Enter your phone number"
                        value={verificationData.phone.value}
                        onChange={(e) => setVerificationData(prev => ({
                          ...prev,
                          phone: { ...prev.phone, value: e.target.value }
                        }))}
                        className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 ${
                          darkMode
                            ? 'bg-white/5 border-white/20 text-white placeholder-white/50 focus:border-white/40'
                            : 'bg-white border-gray-300 text-[#00001a] placeholder-gray-500 focus:border-[#00001a]/40'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                      />
                      <button
                        onClick={() => {
                          if (verificationData.phone.value) {
                            setVerificationData(prev => ({
                              ...prev,
                              phone: { ...prev.phone, verified: true }
                            }))
                          }
                        }}
                        disabled={!verificationData.phone.value || verificationData.phone.verified}
                        className={`w-full px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                          verificationData.phone.verified
                            ? darkMode
                              ? 'bg-green-500/20 text-green-400 cursor-not-allowed'
                              : 'bg-green-100 text-green-600 cursor-not-allowed'
                            : !verificationData.phone.value
                              ? darkMode
                                ? 'bg-white/10 text-white/50 cursor-not-allowed'
                                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                              : darkMode
                                ? 'bg-white text-[#00001a] hover:bg-white/90'
                                : 'bg-[#00001a] text-white hover:bg-[#00001a]/90'
                        }`}
                      >
                        {verificationData.phone.verified ? 'Phone Verified' : 'Send SMS Code'}
                      </button>
                    </div>
                  </div>

                  {/* Complete Button */}
                  <div className="flex justify-center pt-4">
                    <button
                      onClick={() => {
                        if (verificationData.email.verified && verificationData.phone.verified) {
                          setVerificationStatus(prev => ({
                            ...prev,
                            light: 'completed'
                          }))
                          setCurrentStep(2)
                        }
                      }}
                      disabled={!verificationData.email.verified || !verificationData.phone.verified}
                      className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                        verificationData.email.verified && verificationData.phone.verified
                          ? darkMode
                            ? 'bg-white text-[#00001a] hover:bg-white/90'
                            : 'bg-[#00001a] text-white hover:bg-[#00001a]/90'
                          : darkMode
                            ? 'bg-white/10 text-white/50 cursor-not-allowed'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                      style={verificationData.email.verified && verificationData.phone.verified ? (darkMode ? {
                        boxShadow: '0 4px 12px rgba(255, 255, 255, 0.2)'
                      } : {
                        boxShadow: '0 4px 12px rgba(0, 0, 26, 0.3)'
                      }) : {}}
                    >
                      Complete Light Verification
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Standard Verification Process */}
            {verificationLevel === 'standard' && (
              <div>
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                    darkMode ? 'bg-white/10' : 'bg-[#00001a]/10'
                  }`}>
                    <svg className={`w-8 h-8 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Standard Verification
                  </h2>
                  <p className={`text-lg ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                    Upload your government-issued ID document
                  </p>
                </div>

                <div className="space-y-6">
                  {/* ID Upload Section */}
                  <div className={`p-6 rounded-lg border ${
                    darkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        Government ID Document
                      </h3>
                      {verificationData.id.uploaded && (
                        <div className="flex items-center space-x-2 text-green-500">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm font-medium">Uploaded</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                        Please upload a clear photo of your government-issued ID (passport, driver's license, or national ID card).
                      </p>

                      {!verificationData.id.uploaded ? (
                        <div className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                          darkMode
                            ? 'border-white/20 hover:border-white/40 bg-white/5'
                            : 'border-gray-300 hover:border-gray-400 bg-gray-50'
                        }`}>
                          <svg className={`w-12 h-12 mx-auto mb-4 ${darkMode ? 'text-white/40' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <p className={`text-lg font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                            Upload ID Document
                          </p>
                          <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                            Click to browse or drag and drop your file here
                          </p>
                          <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) => {
                              const file = e.target.files[0]
                              if (file) {
                                setVerificationData(prev => ({
                                  ...prev,
                                  id: {
                                    ...prev.id,
                                    uploaded: true,
                                    fileName: file.name,
                                    file: file
                                  }
                                }))
                              }
                            }}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                        </div>
                      ) : (
                        <div className={`p-4 rounded-lg border ${
                          darkMode ? 'bg-green-500/10 border-green-500/20' : 'bg-green-50 border-green-200'
                        }`}>
                          <div className="flex items-center space-x-3">
                            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <div className="flex-1">
                              <p className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                                {verificationData.id.fileName}
                              </p>
                              <p className="text-sm text-green-500">
                                Document uploaded successfully
                              </p>
                            </div>
                            <button
                              onClick={() => setVerificationData(prev => ({
                                ...prev,
                                id: { uploaded: false, verified: false, fileName: '', file: null }
                              }))}
                              className={`px-3 py-1 text-sm rounded transition-all duration-300 ${
                                darkMode
                                  ? 'bg-white/10 text-white hover:bg-white/20'
                                  : 'bg-gray-200 text-[#00001a] hover:bg-gray-300'
                              }`}
                            >
                              Replace
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Complete Button */}
                  <div className="flex justify-center pt-4">
                    <button
                      onClick={() => {
                        if (verificationData.id.uploaded) {
                          setVerificationStatus(prev => ({
                            ...prev,
                            standard: 'completed'
                          }))
                          setCurrentStep(2)
                        }
                      }}
                      disabled={!verificationData.id.uploaded}
                      className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                        verificationData.id.uploaded
                          ? darkMode
                            ? 'bg-white text-[#00001a] hover:bg-white/90'
                            : 'bg-[#00001a] text-white hover:bg-[#00001a]/90'
                          : darkMode
                            ? 'bg-white/10 text-white/50 cursor-not-allowed'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                      style={verificationData.id.uploaded ? (darkMode ? {
                        boxShadow: '0 4px 12px rgba(255, 255, 255, 0.2)'
                      } : {
                        boxShadow: '0 4px 12px rgba(0, 0, 26, 0.3)'
                      }) : {}}
                    >
                      Complete Standard Verification
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Full Verification Process */}
            {verificationLevel === 'full' && (
              <div>
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                    darkMode ? 'bg-white/10' : 'bg-[#00001a]/10'
                  }`}>
                    <svg className={`w-8 h-8 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Full Verification
                  </h2>
                  <p className={`text-lg ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                    Upload ID document and complete facial authentication
                  </p>
                </div>

                <div className="space-y-6">
                  {/* ID Upload Section */}
                  <div className={`p-6 rounded-lg border ${
                    darkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        Government ID Document
                      </h3>
                      {verificationData.id.uploaded && (
                        <div className="flex items-center space-x-2 text-green-500">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm font-medium">Uploaded</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      {!verificationData.id.uploaded ? (
                        <div className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                          darkMode
                            ? 'border-white/20 hover:border-white/40 bg-white/5'
                            : 'border-gray-300 hover:border-gray-400 bg-gray-50'
                        }`}>
                          <svg className={`w-12 h-12 mx-auto mb-4 ${darkMode ? 'text-white/40' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <p className={`text-lg font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                            Upload ID Document
                          </p>
                          <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) => {
                              const file = e.target.files[0]
                              if (file) {
                                setVerificationData(prev => ({
                                  ...prev,
                                  id: {
                                    ...prev.id,
                                    uploaded: true,
                                    fileName: file.name,
                                    file: file
                                  }
                                }))
                              }
                            }}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                        </div>
                      ) : (
                        <div className={`p-4 rounded-lg border ${
                          darkMode ? 'bg-green-500/10 border-green-500/20' : 'bg-green-50 border-green-200'
                        }`}>
                          <div className="flex items-center space-x-3">
                            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <div className="flex-1">
                              <p className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                                {verificationData.id.fileName}
                              </p>
                              <p className="text-sm text-green-500">
                                Document uploaded successfully
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Facial Authentication Section */}
                  <div className={`p-6 rounded-lg border ${
                    darkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        Facial Authentication
                      </h3>
                      {verificationData.face.completed && (
                        <div className="flex items-center space-x-2 text-green-500">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm font-medium">Completed</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                        Complete facial authentication to verify your identity matches your ID document.
                      </p>

                      {!verificationData.face.completed ? (
                        <div className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                          darkMode
                            ? 'border-white/20 hover:border-white/40 bg-white/5'
                            : 'border-gray-300 hover:border-gray-400 bg-gray-50'
                        }`}>
                          <svg className={`w-12 h-12 mx-auto mb-4 ${darkMode ? 'text-white/40' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          <p className={`text-lg font-medium mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                            Start Facial Authentication
                          </p>
                          <button
                            onClick={() => {
                              setVerificationData(prev => ({
                                ...prev,
                                face: { ...prev.face, completed: true }
                              }))
                            }}
                            disabled={!verificationData.id.uploaded}
                            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                              verificationData.id.uploaded
                                ? darkMode
                                  ? 'bg-white text-[#00001a] hover:bg-white/90'
                                  : 'bg-[#00001a] text-white hover:bg-[#00001a]/90'
                                : darkMode
                                  ? 'bg-white/10 text-white/50 cursor-not-allowed'
                                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            }`}
                          >
                            {verificationData.id.uploaded ? 'Start Camera' : 'Upload ID First'}
                          </button>
                        </div>
                      ) : (
                        <div className={`p-4 rounded-lg border ${
                          darkMode ? 'bg-green-500/10 border-green-500/20' : 'bg-green-50 border-green-200'
                        }`}>
                          <div className="flex items-center space-x-3">
                            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <div className="flex-1">
                              <p className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                                Facial Authentication Complete
                              </p>
                              <p className="text-sm text-green-500">
                                Identity successfully verified
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Complete Button */}
                  <div className="flex justify-center pt-4">
                    <button
                      onClick={() => {
                        if (verificationData.id.uploaded && verificationData.face.completed) {
                          setVerificationStatus(prev => ({
                            ...prev,
                            full: 'completed'
                          }))
                          setCurrentStep(2)
                        }
                      }}
                      disabled={!verificationData.id.uploaded || !verificationData.face.completed}
                      className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                        verificationData.id.uploaded && verificationData.face.completed
                          ? darkMode
                            ? 'bg-white text-[#00001a] hover:bg-white/90'
                            : 'bg-[#00001a] text-white hover:bg-[#00001a]/90'
                          : darkMode
                            ? 'bg-white/10 text-white/50 cursor-not-allowed'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                      style={verificationData.id.uploaded && verificationData.face.completed ? (darkMode ? {
                        boxShadow: '0 4px 12px rgba(255, 255, 255, 0.2)'
                      } : {
                        boxShadow: '0 4px 12px rgba(0, 0, 26, 0.3)'
                      }) : {}}
                    >
                      Complete Full Verification
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Completion */}
        {currentStep === 2 && (
          <div className={`backdrop-blur-xl border p-8 text-center transition-all duration-500 ${
            darkMode
              ? 'bg-white/5 border-white/20 rounded-lg'
              : 'bg-white border-gray-200 rounded-2xl'
          }`}
          style={darkMode ? {
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          } : {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            transition: 'all 0.3s ease'
          }}>
            <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
              darkMode ? 'bg-white/10' : 'bg-[#00001a]/10'
            }`}>
              <svg className={`w-10 h-10 ${darkMode ? 'text-white' : 'text-[#00001a]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
              Verification Complete!
            </h2>
            <p className={`text-lg mb-8 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
              Your {verificationLevel} verification has been completed successfully.
            </p>
            <button
              onClick={() => {
                setCurrentStep(0)
                setVerificationLevel('')
              }}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                darkMode
                  ? 'bg-white text-[#00001a] hover:bg-white/90'
                  : 'bg-[#00001a] text-white hover:bg-[#00001a]/90'
              }`}
              style={darkMode ? {
                boxShadow: '0 4px 12px rgba(255, 255, 255, 0.2)'
              } : {
                boxShadow: '0 4px 12px rgba(0, 0, 26, 0.3)'
              }}
            >
              Start New Verification
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default IdentityVerification
