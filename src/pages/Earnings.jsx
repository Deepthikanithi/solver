import React from 'react'

const Earnings = ({ darkMode }) => {
  return (
    <div className={`min-h-screen relative overflow-hidden transition-all duration-500 ${
      darkMode ? 'bg-[#00001a]' : 'bg-white'
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

      <div className="relative px-6 py-6">

        <div className={`group relative backdrop-blur-2xl p-6 rounded-3xl shadow-2xl border transition-all duration-500 ${
          darkMode
            ? 'bg-[#00001a]/30 border-white/20 shadow-black/30'
            : 'bg-white/40 border-[#00001a]/20 shadow-[#00001a]/20'
        }`}>
          <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
            darkMode ? 'bg-white/5' : 'bg-[#00001a]/5'
          }`}></div>
          <div className="relative z-10">
            <p className={`transition-colors duration-500 ${
              darkMode ? 'text-white/70' : 'text-[#00001a]/70'
            }`}>Earnings dashboard coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Earnings
