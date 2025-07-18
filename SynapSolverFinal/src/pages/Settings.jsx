import React, { useState, useEffect } from 'react'
import {
  Globe,
  Settings as SettingsIcon,
  Mail,
  Bell,
  Shield,
  FileText,
  Lock,
  Smartphone,
  Calendar,
  MessageSquare,
  TrendingUp,
  Award,
  CreditCard,
  AlertTriangle,
  Users,
  DollarSign,
  Check,
  X,
  Clock
} from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const Settings = ({ darkMode }) => {
  // Language context
  const { currentLanguage, changeLanguage, t } = useLanguage()
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage || 'en')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedTimezone, setSelectedTimezone] = useState('')

  // Active section state
  const [activeSection, setActiveSection] = useState('language')

  // Settings states
  const [emailAlerts, setEmailAlerts] = useState({
    newMessages: true,
    sessionReminders: true,
    paymentUpdates: false,
    securityAlerts: true
  })

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    calendarReminders: true,
    pushNotifications: false,
    messageNotifications: true,
    weeklyDigest: true,
    achievements: true
  })

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showOnlineStatus: true,
    allowDirectMessages: true,
    shareAnalytics: false
  })

  const [mfa, setMfa] = useState({
    enabled: false,
    method: 'sms',
    backupCodes: false
  })

  // Policy click handlers
  const handlePolicyClick = (policyKey) => {
    // Show notification that policy is being opened
    const notification = document.createElement('div')
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-500 transform translate-x-full ${
      darkMode
        ? 'bg-blue-500/20 border border-blue-500/30 text-blue-400'
        : 'bg-[#00001a] border border-[#00001a] text-white'
    }`
    notification.innerHTML = `
      <div class="flex items-center gap-2">
        <span>📄</span>
        <span>Opening ${policyKey} policy...</span>
      </div>
    `
    document.body.appendChild(notification)

    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)'
    }, 100)

    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)'
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification)
        }
      }, 500)
    }, 3000)

    // In a real app, this would open the policy document
    console.log(`Opening ${policyKey} policy`)
  }

  // MFA backup codes handler
  const handleGenerateBackupCodes = () => {
    // Show notification that backup codes are being generated
    const notification = document.createElement('div')
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-500 transform translate-x-full ${
      darkMode
        ? 'bg-green-500/20 border border-green-500/30 text-green-400'
        : 'bg-[#00001a] border border-[#00001a] text-white'
    }`
    notification.innerHTML = `
      <div class="flex items-center gap-2">
        <span>🔐</span>
        <span>Generating new backup codes...</span>
      </div>
    `
    document.body.appendChild(notification)

    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)'
    }, 100)

    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)'
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification)
        }
      }, 500)
    }, 3000)

    // In a real app, this would generate new backup codes
    console.log('Generating new MFA backup codes')
  }

  // Update selected language when context changes
  useEffect(() => {
    setSelectedLanguage(currentLanguage || 'en')
  }, [currentLanguage])

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedCountry = localStorage.getItem('selectedCountry')
    const savedTimezone = localStorage.getItem('selectedTimezone')
    const savedEmailAlerts = localStorage.getItem('emailAlerts')
    const savedNotifications = localStorage.getItem('notifications')
    const savedPrivacy = localStorage.getItem('privacy')
    const savedMfa = localStorage.getItem('mfa')

    if (savedCountry) setSelectedCountry(savedCountry)
    if (savedTimezone) setSelectedTimezone(savedTimezone)
    if (savedEmailAlerts) setEmailAlerts(JSON.parse(savedEmailAlerts))
    if (savedNotifications) setNotifications(JSON.parse(savedNotifications))
    if (savedPrivacy) setPrivacy(JSON.parse(savedPrivacy))
    if (savedMfa) setMfa(JSON.parse(savedMfa))
  }, [])

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem('selectedCountry', selectedCountry)
  }, [selectedCountry])

  useEffect(() => {
    localStorage.setItem('selectedTimezone', selectedTimezone)
  }, [selectedTimezone])

  useEffect(() => {
    localStorage.setItem('emailAlerts', JSON.stringify(emailAlerts))
  }, [emailAlerts])

  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications))
  }, [notifications])

  useEffect(() => {
    localStorage.setItem('privacy', JSON.stringify(privacy))
  }, [privacy])

  useEffect(() => {
    localStorage.setItem('mfa', JSON.stringify(mfa))
  }, [mfa])
  
  // Language data
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸', native: 'English' },
    { code: 'zh', name: 'Chinese (Simplified)', flag: '🇨🇳', native: '简体中文' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳', native: 'हिन्दी' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸', native: 'Español' },
    { code: 'fr', name: 'French', flag: '🇫🇷', native: 'Français' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦', native: 'العربية' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹', native: 'Português' },
    { code: 'ru', name: 'Russian', flag: '🇷🇺', native: 'Русский' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵', native: '日本語' },
    { code: 'de', name: 'German', flag: '🇩🇪', native: 'Deutsch' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷', native: '한국어' },
    { code: 'it', name: 'Italian', flag: '🇮🇹', native: 'Italiano' },
    { code: 'tr', name: 'Turkish', flag: '🇹🇷', native: 'Türkçe' },
    { code: 'th', name: 'Thai', flag: '🇹🇭', native: 'ไทย' },
    { code: 'vi', name: 'Vietnamese', flag: '🇻🇳', native: 'Tiếng Việt' },
    { code: 'nl', name: 'Dutch', flag: '🇳🇱', native: 'Nederlands' },
    { code: 'pl', name: 'Polish', flag: '🇵🇱', native: 'Polski' }
  ]

  const handleLanguageChange = (langCode) => {
    setSelectedLanguage(langCode)
    changeLanguage(langCode)

    // Store language preference in localStorage for persistence
    localStorage.setItem('preferredLanguage', langCode)

    const selectedLang = languages.find(l => l.code === langCode)
    if (selectedLang) {
      // Show success notification
      const notification = document.createElement('div')
      notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-500 transform translate-x-full ${
        darkMode
          ? 'bg-green-500/20 border border-green-500/30 text-green-400'
          : 'bg-[#00001a] border border-[#00001a] text-white'
      }`
      notification.innerHTML = `
        <div class="flex items-center gap-3">
          <span class="text-2xl">${selectedLang.flag}</span>
          <div>
            <div class="font-medium">Language Changed!</div>
            <div class="text-sm opacity-80">Now using ${selectedLang.name} (${selectedLang.native})</div>
          </div>
        </div>
      `

      document.body.appendChild(notification)

      // Animate in
      setTimeout(() => {
        notification.style.transform = 'translateX(0)'
      }, 100)

      // Animate out and remove
      setTimeout(() => {
        notification.style.transform = 'translateX(100%)'
        setTimeout(() => {
          document.body.removeChild(notification)
        }, 500)
      }, 3000)

      // Force re-render of components that use translations
      window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: langCode } }))
    }
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode ? 'bg-[#00001a]' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <div className="p-6 pb-0">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
              {t('settings')}
            </h1>
            <p className={`text-sm mt-1 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
              Manage your account preferences and security settings
            </p>
          </div>
          <div className={`p-3 rounded-xl ${
            darkMode ? 'bg-white/10' : 'bg-[#00001a]/10'
          }`}>
            <SettingsIcon size={24} className={darkMode ? 'text-white' : 'text-[#00001a]'} />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className={`flex flex-wrap gap-2 p-2 rounded-lg border ${
          darkMode
            ? 'border-white/20'
            : 'bg-white border-gray-200'
        }`}>
          {[
            { id: 'language', label: 'Language', icon: Globe },
            { id: 'email', label: 'Email Alerts', icon: Mail },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'privacy', label: 'Privacy', icon: Shield },
            { id: 'policies', label: 'Policies', icon: FileText },
            { id: 'mfa', label: 'Security (MFA)', icon: Lock }
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeSection === tab.id
                    ? darkMode
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.4)]'
                      : 'bg-[#00001a] text-white border border-[#00001a] shadow-lg'
                    : darkMode
                      ? 'text-white/70 hover:text-white hover:bg-white/5 hover:shadow-[0_0_10px_rgba(255,255,255,0.1)]'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon size={16} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Language Settings */}
        {activeSection === 'language' && (
          <div className={`p-6 rounded-lg backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden ${
            darkMode
              ? 'bg-white/3 border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]'
              : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-[0_0_25px_rgba(0,0,0,0.15)]'
          }`}
          style={darkMode ? {
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          } : {}}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-3 rounded-lg ${
                darkMode ? 'bg-white/10' : 'bg-[#00001a]/10'
              }`}>
                <Globe size={24} className={darkMode ? 'text-white' : 'text-[#00001a]'} />
              </div>
              <div>
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Platform Language Settings
                </h2>
                <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                  Choose your preferred language - applies across the entire platform
                </p>
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-3 ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>
                Display Language ({languages.length} languages available)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 max-h-96 overflow-y-auto">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`p-3 rounded-lg border transition-all duration-300 cursor-pointer ${
                      selectedLanguage === lang.code
                        ? darkMode
                          ? 'bg-blue-500/20 text-blue-400 border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.4)]'
                          : 'bg-[#00001a] text-white border-[#00001a] shadow-lg'
                        : darkMode
                          ? 'border-white/20 text-white/70 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                          : 'bg-gray-50 border-gray-200 hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{lang.flag}</span>
                      <div className="flex-1 text-left">
                        <div className="font-medium text-sm">{lang.name}</div>
                        <div className={`text-xs ${darkMode ? 'text-white/50' : 'text-gray-500'}`}>
                          {lang.native}
                        </div>
                      </div>
                      {selectedLanguage === lang.code && (
                        <span className={`text-lg ${darkMode ? 'text-green-500' : 'text-[#00001a]'}`}>✓</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Country and Timezone Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Country Selection */}
              <div className={`p-4 rounded-lg border transition-all duration-300 ${
                darkMode
                  ? 'border-white/10 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
              }`}>
                <div className="flex items-center gap-3 mb-3">
                  <Globe size={20} className={darkMode ? 'text-white/70' : 'text-gray-600'} />
                  <div>
                    <div className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      Country/Region
                    </div>
                    <div className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                      Select your country or region
                    </div>
                  </div>
                </div>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className={`w-full p-3 rounded-lg border transition-all duration-300 ${
                    darkMode
                      ? 'bg-gray-800 border-white/20 text-white focus:border-blue-400/50 focus:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-[#00001a] focus:shadow-[0_0_15px_rgba(0,0,26,0.2)]'
                  }`}
                  style={darkMode ? {
                    colorScheme: 'dark'
                  } : {}}
                >
                  <option value="" style={darkMode ? { backgroundColor: '#374151', color: 'white' } : {}}>Select Country</option>
                  <option value="US" style={darkMode ? { backgroundColor: '#374151', color: 'white' } : {}}>🇺🇸 United States</option>
                  <option value="CA" style={darkMode ? { backgroundColor: '#374151', color: 'white' } : {}}>🇨🇦 Canada</option>
                  <option value="GB" style={darkMode ? { backgroundColor: '#374151', color: 'white' } : {}}>🇬🇧 United Kingdom</option>
                  <option value="DE" style={darkMode ? { backgroundColor: '#374151', color: 'white' } : {}}>🇩🇪 Germany</option>
                  <option value="FR" style={darkMode ? { backgroundColor: '#374151', color: 'white' } : {}}>🇫🇷 France</option>
                  <option value="ES" style={darkMode ? { backgroundColor: '#374151', color: 'white' } : {}}>🇪🇸 Spain</option>
                  <option value="IT" style={darkMode ? { backgroundColor: '#374151', color: 'white' } : {}}>🇮🇹 Italy</option>
                  <option value="JP" style={darkMode ? { backgroundColor: '#374151', color: 'white' } : {}}>🇯🇵 Japan</option>
                  <option value="CN" style={darkMode ? { backgroundColor: '#374151', color: 'white' } : {}}>🇨🇳 China</option>
                  <option value="IN" style={darkMode ? { backgroundColor: '#374151', color: 'white' } : {}}>🇮🇳 India</option>
                  <option value="BR" style={darkMode ? { backgroundColor: '#374151', color: 'white' } : {}}>🇧🇷 Brazil</option>
                  <option value="AU" style={darkMode ? { backgroundColor: '#374151', color: 'white' } : {}}>🇦🇺 Australia</option>
                  <option value="RU" style={darkMode ? { backgroundColor: '#374151', color: 'white' } : {}}>🇷🇺 Russia</option>
                  <option value="KR" style={darkMode ? { backgroundColor: '#374151', color: 'white' } : {}}>🇰🇷 South Korea</option>
                  <option value="MX" style={darkMode ? { backgroundColor: '#374151', color: 'white' } : {}}>🇲🇽 Mexico</option>
                  <option value="NL" style={darkMode ? { backgroundColor: '#374151', color: 'white' } : {}}>🇳🇱 Netherlands</option>
                  <option value="SE" style={darkMode ? { backgroundColor: '#374151', color: 'white' } : {}}>🇸🇪 Sweden</option>
                  <option value="NO" style={darkMode ? { backgroundColor: '#374151', color: 'white' } : {}}>🇳🇴 Norway</option>
                  <option value="DK" style={darkMode ? { backgroundColor: '#374151', color: 'white' } : {}}>🇩🇰 Denmark</option>
                  <option value="FI" style={darkMode ? { backgroundColor: '#374151', color: 'white' } : {}}>🇫🇮 Finland</option>
                </select>
              </div>

              {/* Timezone Selection */}
              <div className={`p-4 rounded-lg border transition-all duration-300 ${
                darkMode
                  ? 'border-white/10 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
              }`}>
                <div className="flex items-center gap-3 mb-3">
                  <Clock size={20} className={darkMode ? 'text-white/70' : 'text-gray-600'} />
                  <div>
                    <div className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      Timezone
                    </div>
                    <div className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                      Select your timezone
                    </div>
                  </div>
                </div>
                <select
                  value={selectedTimezone}
                  onChange={(e) => setSelectedTimezone(e.target.value)}
                  className={`w-full p-3 rounded-lg border transition-all duration-300 ${
                    darkMode
                      ? 'bg-gray-800 border-white/20 text-white focus:border-blue-400/50 focus:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-[#00001a] focus:shadow-[0_0_15px_rgba(0,0,26,0.2)]'
                  }`}
                  style={darkMode ? {
                    colorScheme: 'dark'
                  } : {}}
                >
                  <option value="" style={darkMode ? { backgroundColor: '#374151', color: 'white' } : {}}>Select Timezone</option>
                  <option value="UTC-12:00" style={darkMode ? { backgroundColor: '#374151', color: 'white' } : {}}>(UTC-12:00) International Date Line West</option>
                  <option value="UTC-11:00" style={darkMode ? { backgroundColor: '#374151', color: 'white' } : {}}>(UTC-11:00) Coordinated Universal Time-11</option>
                  <option value="UTC-10:00" style={darkMode ? { backgroundColor: '#374151', color: 'white' } : {}}>(UTC-10:00) Hawaii</option>
                  <option value="UTC-09:00" style={darkMode ? { backgroundColor: '#374151', color: 'white' } : {}}>(UTC-09:00) Alaska</option>
                  <option value="UTC-08:00" style={darkMode ? { backgroundColor: '#374151', color: 'white' } : {}}>(UTC-08:00) Pacific Time (US & Canada)</option>
                  <option value="UTC-07:00" style={darkMode ? { backgroundColor: '#374151', color: 'white' } : {}}>(UTC-07:00) Mountain Time (US & Canada)</option>
                  <option value="UTC-06:00" style={darkMode ? { backgroundColor: '#374151', color: 'white' } : {}}>(UTC-06:00) Central Time (US & Canada)</option>
                  <option value="UTC-05:00" style={darkMode ? { backgroundColor: '#374151', color: 'white' } : {}}>(UTC-05:00) Eastern Time (US & Canada)</option>
                  <option value="UTC-04:00" style={darkMode ? { backgroundColor: '#374151', color: 'white' } : {}}>(UTC-04:00) Atlantic Time (Canada)</option>
                  <option value="UTC-03:00" style={darkMode ? { backgroundColor: '#374151', color: 'white' } : {}}>(UTC-03:00) Brasilia, Buenos Aires</option>
                  <option value="UTC-02:00" style={darkMode ? { backgroundColor: '#374151', color: 'white' } : {}}>(UTC-02:00) Coordinated Universal Time-02</option>
                  <option value="UTC-01:00" style={darkMode ? { backgroundColor: '#374151', color: 'white' } : {}}>(UTC-01:00) Azores</option>
                  <option value="UTC+00:00" style={darkMode ? { backgroundColor: '#374151', color: 'white' } : {}}>(UTC+00:00) London, Dublin, Lisbon</option>
                  <option value="UTC+01:00" style={darkMode ? { backgroundColor: '#374151', color: 'white' } : {}}>(UTC+01:00) Berlin, Paris, Rome</option>
                  <option value="UTC+02:00" style={darkMode ? { backgroundColor: '#374151', color: 'white' } : {}}>(UTC+02:00) Cairo, Helsinki, Athens</option>
                  <option value="UTC+03:00" style={darkMode ? { backgroundColor: '#374151', color: 'white' } : {}}>(UTC+03:00) Moscow, Kuwait, Riyadh</option>
                  <option value="UTC+04:00" style={darkMode ? { backgroundColor: '#374151', color: 'white' } : {}}>(UTC+04:00) Abu Dhabi, Muscat</option>
                  <option value="UTC+05:00" style={darkMode ? { backgroundColor: '#374151', color: 'white' } : {}}>(UTC+05:00) Islamabad, Karachi</option>
                  <option value="UTC+05:30" style={darkMode ? { backgroundColor: '#374151', color: 'white' } : {}}>(UTC+05:30) New Delhi, Mumbai</option>
                  <option value="UTC+06:00" style={darkMode ? { backgroundColor: '#374151', color: 'white' } : {}}>(UTC+06:00) Dhaka, Almaty</option>
                  <option value="UTC+07:00" style={darkMode ? { backgroundColor: '#374151', color: 'white' } : {}}>(UTC+07:00) Bangkok, Jakarta</option>
                  <option value="UTC+08:00" style={darkMode ? { backgroundColor: '#374151', color: 'white' } : {}}>(UTC+08:00) Beijing, Singapore</option>
                  <option value="UTC+09:00" style={darkMode ? { backgroundColor: '#374151', color: 'white' } : {}}>(UTC+09:00) Tokyo, Seoul</option>
                  <option value="UTC+10:00" style={darkMode ? { backgroundColor: '#374151', color: 'white' } : {}}>(UTC+10:00) Sydney, Melbourne</option>
                  <option value="UTC+11:00" style={darkMode ? { backgroundColor: '#374151', color: 'white' } : {}}>(UTC+11:00) Solomon Islands</option>
                  <option value="UTC+12:00" style={darkMode ? { backgroundColor: '#374151', color: 'white' } : {}}>(UTC+12:00) Auckland, Wellington</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Email Alerts Section */}
        {activeSection === 'email' && (
          <div className={`p-6 rounded-lg backdrop-blur-xl border transition-all duration-500 shadow-xl ${
            darkMode
              ? 'bg-white/3 border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]'
              : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-[0_0_25px_rgba(0,0,0,0.15)]'
          }`}
          style={darkMode ? {
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          } : {}}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-3 rounded-lg ${
                darkMode ? 'bg-white/10' : 'bg-[#00001a]/10'
              }`}>
                <Mail size={24} className={darkMode ? 'text-white' : 'text-[#00001a]'} />
              </div>
              <div>
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Email Alerts
                </h2>
                <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                  Configure which email notifications you want to receive
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { key: 'newMessages', label: 'New Messages', desc: 'Get notified when you receive new messages' },
                { key: 'sessionReminders', label: 'Session Reminders', desc: 'Reminders for upcoming mentoring sessions' },
                { key: 'paymentUpdates', label: 'Payment Updates', desc: 'Notifications about payments and earnings' },
                { key: 'securityAlerts', label: 'Security Alerts', desc: 'Important security and account notifications' }
              ].map((item) => (
                <div key={item.key} className={`p-4 rounded-lg border transition-all duration-300 ${
                  darkMode
                    ? 'border-white/10 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        {item.label}
                      </div>
                      <div className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                        {item.desc}
                      </div>
                    </div>
                    <button
                      onClick={() => setEmailAlerts(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                        emailAlerts[item.key]
                          ? darkMode ? 'bg-blue-500' : 'bg-[#00001a]'
                          : darkMode ? 'bg-white/20' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                          emailAlerts[item.key] ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notifications Section */}
        {activeSection === 'notifications' && (
          <div className={`p-6 rounded-lg backdrop-blur-xl border transition-all duration-500 shadow-xl ${
            darkMode
              ? 'bg-white/3 border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]'
              : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-[0_0_25px_rgba(0,0,0,0.15)]'
          }`}
          style={darkMode ? {
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          } : {}}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-3 rounded-lg ${
                darkMode ? 'bg-white/10' : 'bg-[#00001a]/10'
              }`}>
                <Bell size={24} className={darkMode ? 'text-white' : 'text-[#00001a]'} />
              </div>
              <div>
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Notification Settings
                </h2>
                <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                  Manage all your notification preferences
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { key: 'emailAlerts', label: 'Email Alerts', desc: 'Receive notifications via email', icon: Mail },
                { key: 'calendarReminders', label: 'Calendar Reminders', desc: 'Calendar notifications with note reminders', icon: Calendar },
                { key: 'pushNotifications', label: 'Push Notifications', desc: 'Browser push notifications', icon: Smartphone },
                { key: 'messageNotifications', label: 'Message Notifications', desc: 'Instant message alerts', icon: MessageSquare },
                { key: 'weeklyDigest', label: 'Weekly Digest', desc: 'Weekly summary of your activity', icon: TrendingUp },
                { key: 'achievements', label: 'Achievement Notifications', desc: 'Celebrate your milestones', icon: Award }
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.key} className={`p-4 rounded-lg border transition-all duration-300 ${
                    darkMode
                      ? 'border-white/10 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <Icon size={20} className={darkMode ? 'text-white/70' : 'text-gray-600'} />
                        <div className="flex-1">
                          <div className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                            {item.label}
                          </div>
                          <div className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                            {item.desc}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                          notifications[item.key]
                            ? darkMode ? 'bg-blue-500' : 'bg-[#00001a]'
                            : darkMode ? 'bg-white/20' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                            notifications[item.key] ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Quick Actions */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setNotifications(prev => Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: true }), {}))}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  darkMode
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                    : 'bg-[#00001a] text-white border border-[#00001a] hover:border-[#00001a]/80 hover:shadow-[0_0_15px_rgba(0,0,26,0.2)]'
                }`}
              >
                <Check size={16} />
                Enable All
              </button>
              <button
                onClick={() => setNotifications(prev => Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}))}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  darkMode
                    ? 'bg-white/10 text-white/70 border border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                    : 'bg-gray-100 text-gray-700 border border-gray-300 hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                }`}
              >
                <X size={16} />
                Disable All
              </button>
            </div>
          </div>
        )}

        {/* Privacy Section */}
        {activeSection === 'privacy' && (
          <div className={`p-6 rounded-lg backdrop-blur-xl border transition-all duration-500 shadow-xl ${
            darkMode
              ? 'bg-white/3 border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]'
              : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-[0_0_25px_rgba(0,0,0,0.15)]'
          }`}
          style={darkMode ? {
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          } : {}}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-3 rounded-lg ${
                darkMode ? 'bg-white/10' : 'bg-[#00001a]/10'
              }`}>
                <Shield size={24} className={darkMode ? 'text-white' : 'text-[#00001a]'} />
              </div>
              <div>
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Privacy Settings
                </h2>
                <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                  Control your privacy and data sharing preferences
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Profile Visibility */}
              <div className={`p-4 rounded-lg border transition-all duration-300 ${
                darkMode
                  ? 'border-white/10 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
              }`}>
                <div className="mb-3">
                  <div className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Profile Visibility
                  </div>
                  <div className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                    Who can see your profile information
                  </div>
                </div>
                <div className="space-y-2">
                  {[
                    { value: 'public', label: 'Public', desc: 'Anyone can see your profile' },
                    { value: 'members', label: 'Members Only', desc: 'Only platform members can see your profile' },
                    { value: 'private', label: 'Private', desc: 'Only you can see your profile' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="profileVisibility"
                        value={option.value}
                        checked={privacy.profileVisibility === option.value}
                        onChange={(e) => setPrivacy(prev => ({ ...prev, profileVisibility: e.target.value }))}
                        className={`w-4 h-4 ${darkMode ? 'text-blue-500' : 'text-[#00001a]'}`}
                      />
                      <div>
                        <div className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                          {option.label}
                        </div>
                        <div className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                          {option.desc}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Privacy Toggles */}
              <div className="space-y-4">
                {[
                  { key: 'showOnlineStatus', label: 'Show Online Status', desc: 'Let others see when you\'re online' },
                  { key: 'allowDirectMessages', label: 'Allow Direct Messages', desc: 'Allow other users to message you directly' },
                  { key: 'shareAnalytics', label: 'Share Analytics Data', desc: 'Help improve the platform by sharing usage data' }
                ].map((item) => (
                  <div key={item.key} className={`p-4 rounded-lg border transition-all duration-300 ${
                    darkMode
                      ? 'border-white/10 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                          {item.label}
                        </div>
                        <div className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                          {item.desc}
                        </div>
                      </div>
                      <button
                        onClick={() => setPrivacy(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                          privacy[item.key]
                            ? darkMode ? 'bg-blue-500' : 'bg-[#00001a]'
                            : darkMode ? 'bg-white/20' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                            privacy[item.key] ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Policies Section */}
        {activeSection === 'policies' && (
          <div className={`p-6 rounded-lg backdrop-blur-xl border transition-all duration-500 shadow-xl ${
            darkMode
              ? 'bg-white/3 border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]'
              : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-[0_0_25px_rgba(0,0,0,0.15)]'
          }`}
          style={darkMode ? {
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          } : {}}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-3 rounded-lg ${
                darkMode ? 'bg-white/10' : 'bg-[#00001a]/10'
              }`}>
                <FileText size={24} className={darkMode ? 'text-white' : 'text-[#00001a]'} />
              </div>
              <div>
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Policies & Legal
                </h2>
                <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                  Review platform policies and legal documents
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  key: 'subscription',
                  label: 'Subscription Policy',
                  desc: 'Terms and conditions for subscriptions',
                  icon: CreditCard,
                  color: 'blue'
                },
                {
                  key: 'report',
                  label: 'Reporting Policy',
                  desc: 'Guidelines for reporting content and users',
                  icon: AlertTriangle,
                  color: 'orange'
                },
                {
                  key: 'refer',
                  label: 'Referral Policy',
                  desc: 'Terms for referral program and rewards',
                  icon: Users,
                  color: 'green'
                },
                {
                  key: 'payment',
                  label: 'Payment Policy',
                  desc: 'Payment terms, refunds, and billing',
                  icon: DollarSign,
                  color: 'purple'
                }
              ].map((policy) => {
                const Icon = policy.icon
                return (
                  <div
                    key={policy.key}
                    onClick={() => handlePolicyClick(policy.label)}
                    className={`group p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                      darkMode
                        ? 'border-white/10 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        policy.color === 'blue' ? (darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-[#00001a]/10 text-[#00001a]') :
                        policy.color === 'orange' ? (darkMode ? 'bg-orange-500/20 text-orange-400' : 'bg-[#00001a]/10 text-[#00001a]') :
                        policy.color === 'green' ? (darkMode ? 'bg-green-500/20 text-green-400' : 'bg-[#00001a]/10 text-[#00001a]') :
                        (darkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-[#00001a]/10 text-[#00001a]')
                      }`}>
                        <Icon size={20} />
                      </div>
                      <div className="flex-1">
                        <div className={`font-medium mb-1 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                          {policy.label}
                        </div>
                        <div className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                          {policy.desc}
                        </div>
                        <div className={`text-xs mt-2 ${darkMode ? 'text-blue-500' : 'text-[#00001a]'} group-hover:underline`}>
                          View Policy →
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Legal Links */}
            <div className={`mt-6 p-4 rounded-lg border transition-all duration-300 ${
              darkMode
                ? 'border-white/10 bg-white/5 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
            }`}>
              <div className={`text-sm font-medium mb-3 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                Legal Documents
              </div>
              <div className="flex flex-wrap gap-4 text-sm">
                {[
                  'Terms of Service',
                  'Privacy Policy',
                  'Cookie Policy',
                  'Community Guidelines',
                  'DMCA Policy'
                ].map((doc) => (
                  <button
                    key={doc}
                    onClick={() => handlePolicyClick(doc)}
                    className={`${darkMode ? 'text-blue-500 hover:text-blue-600' : 'text-[#00001a] hover:text-[#00001a]/80'} hover:underline transition-colors duration-200`}
                  >
                    {doc}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MFA Section */}
        {activeSection === 'mfa' && (
          <div className={`p-6 rounded-lg backdrop-blur-xl border transition-all duration-500 shadow-xl ${
            darkMode
              ? 'bg-white/3 border-white/20 hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]'
              : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-[0_0_25px_rgba(0,0,0,0.15)]'
          }`}
          style={darkMode ? {
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          } : {}}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-3 rounded-lg ${
                darkMode ? 'bg-white/10' : 'bg-[#00001a]/10'
              }`}>
                <Lock size={24} className={darkMode ? 'text-white' : 'text-[#00001a]'} />
              </div>
              <div>
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Multi-Factor Authentication
                </h2>
                <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                  Add an extra layer of security to your account
                </p>
              </div>
            </div>

            {/* MFA Status */}
            <div className={`p-4 rounded-lg border mb-6 ${
              mfa.enabled
                ? darkMode
                  ? 'border-green-500/30 bg-green-500/10'
                  : 'border-[#00001a]/30 bg-[#00001a]/5'
                : darkMode
                  ? 'border-orange-500/30 bg-orange-500/10'
                  : 'border-[#00001a]/30 bg-[#00001a]/5'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    mfa.enabled
                      ? darkMode ? 'bg-green-500/20 text-green-400' : 'bg-[#00001a]/10 text-[#00001a]'
                      : darkMode ? 'bg-orange-500/20 text-orange-400' : 'bg-[#00001a]/10 text-[#00001a]'
                  }`}>
                    {mfa.enabled ? <Check size={20} /> : <AlertTriangle size={20} />}
                  </div>
                  <div>
                    <div className={`font-medium ${
                      mfa.enabled
                        ? darkMode ? 'text-green-400' : 'text-[#00001a]'
                        : darkMode ? 'text-orange-400' : 'text-[#00001a]'
                    }`}>
                      {mfa.enabled ? 'MFA Enabled' : 'MFA Disabled'}
                    </div>
                    <div className={`text-sm ${
                      mfa.enabled
                        ? darkMode ? 'text-green-400/70' : 'text-[#00001a]/70'
                        : darkMode ? 'text-orange-400/70' : 'text-[#00001a]/70'
                    }`}>
                      {mfa.enabled
                        ? 'Your account is protected with multi-factor authentication'
                        : 'Enable MFA to secure your account'
                      }
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setMfa(prev => ({ ...prev, enabled: !prev.enabled }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                    mfa.enabled
                      ? darkMode ? 'bg-green-500' : 'bg-[#00001a]'
                      : darkMode ? 'bg-white/20' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                      mfa.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* MFA Configuration */}
            {mfa.enabled && (
              <div className="space-y-6">
                {/* Authentication Method */}
                <div className={`p-4 rounded-lg border transition-all duration-300 ${
                  darkMode
                    ? 'border-white/10 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                }`}>
                  <div className="mb-3">
                    <div className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      Authentication Method
                    </div>
                    <div className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                      Choose how you want to receive authentication codes
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[
                      { value: 'sms', label: 'SMS Text Message', desc: 'Receive codes via text message', icon: Smartphone },
                      { value: 'email', label: 'Email', desc: 'Receive codes via email', icon: Mail },
                      { value: 'app', label: 'Authenticator App', desc: 'Use Google Authenticator or similar app', icon: Lock }
                    ].map((method) => {
                      const Icon = method.icon
                      return (
                        <label key={method.value} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-300 ${
                          mfa.method === method.value
                            ? darkMode
                              ? 'border-blue-500/30 bg-blue-500/10'
                              : 'border-[#00001a] bg-[#00001a]/5'
                            : darkMode
                              ? 'border-white/10 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                              : 'border-gray-200 hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                        }`}>
                          <input
                            type="radio"
                            name="mfaMethod"
                            value={method.value}
                            checked={mfa.method === method.value}
                            onChange={(e) => setMfa(prev => ({ ...prev, method: e.target.value }))}
                            className={`w-4 h-4 ${darkMode ? 'text-blue-500' : 'text-[#00001a]'}`}
                          />
                          <Icon size={20} className={darkMode ? 'text-white/70' : 'text-gray-600'} />
                          <div>
                            <div className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                              {method.label}
                            </div>
                            <div className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                              {method.desc}
                            </div>
                          </div>
                        </label>
                      )
                    })}
                  </div>
                </div>

                {/* Backup Codes */}
                <div className={`p-4 rounded-lg border transition-all duration-300 ${
                  darkMode
                    ? 'border-white/10 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className={`font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                        Backup Codes
                      </div>
                      <div className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>
                        Generate backup codes for account recovery
                      </div>
                    </div>
                    <button
                      onClick={() => setMfa(prev => ({ ...prev, backupCodes: !prev.backupCodes }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                        mfa.backupCodes
                          ? darkMode ? 'bg-blue-500' : 'bg-[#00001a]'
                          : darkMode ? 'bg-white/20' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                          mfa.backupCodes ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  {mfa.backupCodes && (
                    <button
                      onClick={handleGenerateBackupCodes}
                      className={`w-full mt-3 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        darkMode
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                          : 'bg-[#00001a] text-white border border-[#00001a] hover:border-[#00001a]/80 hover:shadow-[0_0_15px_rgba(0,0,26,0.2)]'
                      }`}
                    >
                      Generate New Backup Codes
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Setup Button */}
            {!mfa.enabled && (
              <button
                onClick={() => setMfa(prev => ({ ...prev, enabled: true }))}
                className={`w-full mt-6 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  darkMode
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:border-blue-400/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]'
                    : 'bg-[#00001a] text-white border border-[#00001a] hover:border-[#00001a]/80 hover:shadow-[0_0_15px_rgba(0,0,26,0.2)]'
                }`}
              >
                Set Up Multi-Factor Authentication
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Settings
