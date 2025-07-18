import React, { useState, useEffect } from 'react'
import { 
  Globe, 
  Mail, 
  Bell, 
  Shield, 
  FileText, 
  Lock, 
  Clock 
} from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { useTheme } from '../contexts/ThemeContext'
import { useNotifications } from '../hooks/useNotifications'
import { useToggleStates } from '../hooks/useToggleStates'
import { useLocalStorageState } from '../hooks/useLocalStorage'
import { 
  Card, 
  Button, 
  Toggle, 
  SectionTabs, 
  NotificationToast 
} from '../components/shared'
import { showDOMNotification } from '../utils/notifications'

const Settings = () => {
  const { currentLanguage, changeLanguage, t } = useLanguage()
  const { darkMode, classes } = useTheme()
  const { notifications, showSuccess, removeNotification } = useNotifications()
  
  // Local storage state management
  const { state, updateState } = useLocalStorageState({
    selectedLanguage: currentLanguage || 'en',
    selectedCountry: '',
    selectedTimezone: ''
  })

  // Toggle states for different sections
  const emailAlerts = useToggleStates({
    newMessages: true,
    sessionReminders: true,
    paymentUpdates: false,
    securityAlerts: true
  })

  const notificationSettings = useToggleStates({
    emailAlerts: true,
    calendarReminders: true,
    pushNotifications: false,
    messageNotifications: true,
    weeklyDigest: true,
    achievements: true
  })

  const privacySettings = useToggleStates({
    showOnlineStatus: true,
    allowDirectMessages: true,
    shareAnalytics: false
  })

  const mfaSettings = useToggleStates({
    enabled: false,
    backupCodes: false
  })

  // Active section state
  const [activeSection, setActiveSection] = useState('language')
  const [profileVisibility, setProfileVisibility] = useState('public')

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
    { code: 'it', name: 'Italian', flag: '🇮🇹', native: 'Italiano' }
  ]

  // Navigation tabs
  const tabs = [
    { id: 'language', label: 'Language', icon: Globe },
    { id: 'email', label: 'Email Alerts', icon: Mail },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'policies', label: 'Policies', icon: FileText },
    { id: 'mfa', label: 'Security (MFA)', icon: Lock }
  ]

  // Handlers
  const handleLanguageChange = (langCode) => {
    updateState('selectedLanguage', langCode)
    changeLanguage(langCode)
    showSuccess(`Language changed to ${languages.find(l => l.code === langCode)?.name}`)
  }

  const handlePolicyClick = (policyName) => {
    showDOMNotification(`Opening ${policyName}...`, 'info', darkMode)
  }

  const handleGenerateBackupCodes = () => {
    showDOMNotification('Generating new backup codes...', 'success', darkMode)
  }

  return (
    <div className={`${classes.background} ${classes.transition} min-h-screen`}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${classes.textPrimary}`}>
            {t('settings')}
          </h1>
          <p className={`text-sm ${classes.textSecondary}`}>
            Manage your account preferences and security settings
          </p>
        </div>

        {/* Navigation Tabs */}
        <SectionTabs
          tabs={tabs}
          activeTab={activeSection}
          onTabChange={setActiveSection}
          darkMode={darkMode}
          variant="pills"
        />

        {/* Content Sections */}
        <div className="space-y-6">
          {/* Language Settings */}
          {activeSection === 'language' && (
            <Card darkMode={darkMode}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-lg ${darkMode ? 'bg-white/10' : 'bg-blue-100'}`}>
                  <Globe size={24} className={darkMode ? 'text-white' : 'text-blue-600'} />
                </div>
                <div>
                  <h2 className={`text-xl font-bold ${classes.textPrimary}`}>
                    Platform Language Settings
                  </h2>
                  <p className={classes.textSecondary}>
                    Choose your preferred language - applies across the entire platform
                  </p>
                </div>
              </div>

              {/* Country and Timezone Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Country Dropdown */}
                <div>
                  <label className={`block text-sm font-medium mb-3 ${classes.textPrimary}`}>
                    Country/Region
                  </label>
                  <select
                    value={state.selectedCountry}
                    onChange={(e) => updateState('selectedCountry', e.target.value)}
                    className={`w-full p-3 rounded-lg border ${classes.transition} ${
                      darkMode
                        ? 'bg-gray-800 border-white/20 text-white focus:border-blue-400/50'
                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                    }`}
                  >
                    <option value="">Select Country</option>
                    <option value="US">🇺🇸 United States</option>
                    <option value="CA">🇨🇦 Canada</option>
                    <option value="GB">🇬🇧 United Kingdom</option>
                    {/* Add more countries as needed */}
                  </select>
                </div>

                {/* Timezone Dropdown */}
                <div>
                  <label className={`block text-sm font-medium mb-3 ${classes.textPrimary}`}>
                    Timezone
                  </label>
                  <select
                    value={state.selectedTimezone}
                    onChange={(e) => updateState('selectedTimezone', e.target.value)}
                    className={`w-full p-3 rounded-lg border ${classes.transition} ${
                      darkMode
                        ? 'bg-gray-800 border-white/20 text-white focus:border-blue-400/50'
                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                    }`}
                  >
                    <option value="">Select Timezone</option>
                    <option value="UTC-08:00">(UTC-08:00) Pacific Time</option>
                    <option value="UTC-05:00">(UTC-05:00) Eastern Time</option>
                    <option value="UTC+00:00">(UTC+00:00) London, Dublin</option>
                    {/* Add more timezones as needed */}
                  </select>
                </div>
              </div>

              {/* Language Selection */}
              <div>
                <label className={`block text-sm font-medium mb-3 ${classes.textSecondary}`}>
                  Select Language
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 max-h-96 overflow-y-auto">
                  {languages.map((lang) => (
                    <Button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      variant={state.selectedLanguage === lang.code ? 'primary' : 'outline'}
                      className="p-3 justify-start"
                      darkMode={darkMode}
                    >
                      <span className="text-2xl">{lang.flag}</span>
                      <div className="flex-1 text-left">
                        <div className="font-medium text-sm">{lang.name}</div>
                        <div className={`text-xs ${classes.textMuted}`}>
                          {lang.native}
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {/* Email Alerts Section */}
          {activeSection === 'email' && (
            <Card darkMode={darkMode}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-lg ${darkMode ? 'bg-white/10' : 'bg-blue-100'}`}>
                  <Mail size={24} className={darkMode ? 'text-white' : 'text-blue-600'} />
                </div>
                <div>
                  <h2 className={`text-xl font-bold ${classes.textPrimary}`}>
                    Email Alert Settings
                  </h2>
                  <p className={classes.textSecondary}>
                    Manage your email notification preferences
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
                  <div key={item.key} className={`p-4 rounded-lg border ${classes.border} ${classes.transition} ${classes.hoverCard}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className={`font-medium ${classes.textPrimary}`}>
                          {item.label}
                        </div>
                        <div className={`text-sm ${classes.textSecondary}`}>
                          {item.desc}
                        </div>
                      </div>
                      <Toggle
                        checked={emailAlerts.getToggleValue(item.key)}
                        onChange={() => emailAlerts.toggle(item.key)}
                        color="blue"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Add other sections similarly... */}
        </div>
      </div>

      {/* Notification Toast */}
      <NotificationToast
        notifications={notifications}
        onRemove={removeNotification}
        darkMode={darkMode}
        position="top-right"
      />
    </div>
  )
}

export default Settings
