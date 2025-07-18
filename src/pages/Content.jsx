import React, { useState, useRef } from 'react'

const Content = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState('All Content')
  const [selectedCategory, setSelectedCategory] = useState('All Domains')
  const [selectedContentType, setSelectedContentType] = useState('All Types')
  const [searchQuery, setSearchQuery] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showFilters, setShowFilters] = useState(true)
  const [selectedFiles, setSelectedFiles] = useState([])
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef(null)

  // Form states for content creation
  const [contentForm, setContentForm] = useState({
    title: '',
    category: 'Frontend Development',
    subCategory: '',
    description: '',
    tags: '',
    visibility: 'public',
    contentAccess: 'free',
    contentType: 'Blog'
  })

  // UI states
  const [likedContent, setLikedContent] = useState(new Set())
  const [notifications, setNotifications] = useState([])
  const [showNotification, setShowNotification] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState('All')

  // Template categories for reels
  const reelTemplates = [
    { name: 'All', description: 'All content' },
    { name: 'Tutorials', description: 'Step-by-step guides' },
    { name: 'Quick Tips', description: 'Fast learning tips' },
    { name: 'Code Reviews', description: 'Code analysis' },
    { name: 'Tech News', description: 'Latest updates' },
    { name: 'Live Coding', description: 'Real-time coding' },
    { name: 'Interviews', description: 'Developer talks' },
    { name: 'Project Demos', description: 'Showcase projects' },
    { name: 'Behind Scenes', description: 'Development process' },
    { name: 'Q&A', description: 'Questions & answers' }
  ]

  // Content data
  const [contentItems, setContentItems] = useState([
    {
      id: 1,
      title: 'React Performance Optimization Guide',
      type: 'Blog',
      category: 'Frontend Development',
      subCategory: 'React',
      tags: ['react', 'performance', 'optimization'],
      views: 1234,
      likes: 89,
      comments: 23,
      status: 'published',
      createdAt: '2025-07-14',
      thumbnail: null,
      description: 'Complete guide to optimizing React applications for better performance.',
      author: 'pred',
      isPremium: false
    },
    {
      id: 2,
      title: 'JavaScript ES6+ Features',
      type: 'Video',
      category: 'Programming',
      subCategory: 'JavaScript',
      tags: ['javascript', 'es6', 'modern'],
      views: 2156,
      likes: 145,
      comments: 67,
      status: 'published',
      createdAt: '2025-07-12',
      thumbnail: null,
      description: 'Deep dive into modern JavaScript features and best practices.',
      author: 'pred',
      isPremium: true
    },
    {
      id: 3,
      title: 'Node.js API Development',
      type: 'PDF',
      category: 'Backend Development',
      subCategory: 'Node.js',
      tags: ['nodejs', 'api', 'backend'],
      views: 876,
      likes: 54,
      comments: 12,
      status: 'draft',
      createdAt: '2025-07-10',
      thumbnail: null,
      description: 'Complete tutorial on building RESTful APIs with Node.js.',
      author: 'pred',
      isPremium: false
    },
    {
      id: 4,
      title: 'Machine Learning with Python',
      type: 'Video',
      category: 'Data Science',
      subCategory: 'Machine Learning',
      tags: ['python', 'ml', 'ai', 'tensorflow'],
      views: 3421,
      likes: 234,
      comments: 89,
      status: 'published',
      createdAt: '2025-07-08',
      thumbnail: null,
      description: 'Comprehensive course on machine learning algorithms and implementation.',
      author: 'jane_smith',
      isPremium: true
    },
    {
      id: 5,
      title: 'CSS Grid Layout Mastery',
      type: 'Blog',
      category: 'Frontend Development',
      subCategory: 'CSS',
      tags: ['css', 'grid', 'layout', 'responsive'],
      views: 1876,
      likes: 156,
      comments: 45,
      status: 'published',
      createdAt: '2025-07-06',
      thumbnail: null,
      description: 'Master CSS Grid layout with practical examples and real-world projects.',
      author: 'mike_dev',
      isPremium: false
    },
    {
      id: 6,
      title: 'Docker for Beginners',
      type: 'PDF',
      category: 'DevOps',
      subCategory: 'Containerization',
      tags: ['docker', 'containers', 'devops'],
      views: 2341,
      likes: 198,
      comments: 67,
      status: 'published',
      createdAt: '2025-07-04',
      thumbnail: null,
      description: 'Learn Docker fundamentals and containerization best practices.',
      author: 'sarah_ops',
      isPremium: true
    },
    {
      id: 7,
      title: 'React Native Mobile App',
      type: 'GitHub Repo',
      category: 'Mobile Development',
      subCategory: 'React Native',
      tags: ['react-native', 'mobile', 'ios', 'android'],
      views: 987,
      likes: 76,
      comments: 23,
      status: 'published',
      createdAt: '2025-07-02',
      thumbnail: null,
      description: 'Complete React Native app with authentication and real-time features.',
      author: 'alex_mobile',
      isPremium: false
    },
    {
      id: 8,
      title: 'UI/UX Design Principles',
      type: 'Reel',
      category: 'UI/UX Design',
      subCategory: 'Design Theory',
      tags: ['design', 'ux', 'ui', 'principles', 'tutorials'],
      views: 1543,
      likes: 123,
      comments: 34,
      status: 'published',
      createdAt: '2025-06-30',
      thumbnail: null,
      description: 'Essential design principles every designer should know.',
      author: 'pred',
      isPremium: false
    },
    {
      id: 9,
      title: 'React Hooks in 60 Seconds',
      type: 'Reel',
      category: 'Frontend Development',
      subCategory: 'React',
      tags: ['react', 'hooks', 'quicktips', 'tutorial'],
      views: 2876,
      likes: 234,
      comments: 67,
      status: 'published',
      createdAt: '2025-06-28',
      thumbnail: null,
      description: 'Quick tutorial on React Hooks with practical examples.',
      author: 'code_master',
      isPremium: true
    },
    {
      id: 10,
      title: 'CSS Animation Magic',
      type: 'Reel',
      category: 'Frontend Development',
      subCategory: 'CSS',
      tags: ['css', 'animation', 'effects', 'frontend'],
      views: 1987,
      likes: 189,
      comments: 45,
      status: 'published',
      createdAt: '2025-06-26',
      thumbnail: null,
      description: 'Amazing CSS animations you can create in minutes.',
      author: 'design_ninja',
      isPremium: false
    },
    // Additional reels with template-specific content
    {
      id: 11,
      title: 'Code Review Best Practices',
      type: 'Reel',
      category: 'Programming',
      subCategory: 'Best Practices',
      tags: ['codereviews', 'bestpractices', 'programming'],
      views: 1456,
      likes: 98,
      comments: 28,
      status: 'published',
      createdAt: '2025-06-25',
      thumbnail: null,
      description: 'How to conduct effective code reviews.',
      author: 'tech_lead',
      isPremium: false
    },
    {
      id: 12,
      title: 'Latest in AI Development',
      type: 'Reel',
      category: 'Machine Learning',
      subCategory: 'AI',
      tags: ['ai', 'technews', 'machinelearning'],
      views: 3245,
      likes: 287,
      comments: 89,
      status: 'published',
      createdAt: '2025-06-24',
      thumbnail: null,
      description: 'Breaking news in AI and machine learning.',
      author: 'ai_expert',
      isPremium: true
    },
    {
      id: 13,
      title: 'Live Coding Session: Building a Todo App',
      type: 'Reel',
      category: 'Frontend Development',
      subCategory: 'React',
      tags: ['livecoding', 'react', 'tutorial'],
      views: 2134,
      likes: 156,
      comments: 45,
      status: 'published',
      createdAt: '2025-06-23',
      thumbnail: null,
      description: 'Watch me build a complete todo app from scratch.',
      author: 'pred',
      isPremium: false
    },
    {
      id: 14,
      title: 'Developer Interview: Senior Engineer Tips',
      type: 'Reel',
      category: 'Programming',
      subCategory: 'Career',
      tags: ['interviews', 'career', 'tips'],
      views: 1876,
      likes: 134,
      comments: 67,
      status: 'published',
      createdAt: '2025-06-22',
      thumbnail: null,
      description: 'Interview with a senior engineer about career growth.',
      author: 'career_coach',
      isPremium: false
    },
    {
      id: 15,
      title: 'My E-commerce Project Demo',
      type: 'Reel',
      category: 'Web Development',
      subCategory: 'Projects',
      tags: ['projectdemos', 'ecommerce', 'showcase'],
      views: 2567,
      likes: 198,
      comments: 78,
      status: 'published',
      createdAt: '2025-06-21',
      thumbnail: null,
      description: 'Showcasing my latest e-commerce project.',
      author: 'fullstack_dev',
      isPremium: true
    },
    {
      id: 16,
      title: 'Behind the Scenes: App Development Process',
      type: 'Reel',
      category: 'Mobile Development',
      subCategory: 'Process',
      tags: ['behindscenes', 'development', 'process'],
      views: 1234,
      likes: 89,
      comments: 34,
      status: 'published',
      createdAt: '2025-06-20',
      thumbnail: null,
      description: 'See how I develop mobile apps from idea to deployment.',
      author: 'mobile_dev',
      isPremium: false
    },
    {
      id: 17,
      title: 'Q&A: Common React Questions Answered',
      type: 'Reel',
      category: 'Frontend Development',
      subCategory: 'React',
      tags: ['qa', 'react', 'questions'],
      views: 1789,
      likes: 123,
      comments: 56,
      status: 'published',
      createdAt: '2025-06-19',
      thumbnail: null,
      description: 'Answering the most common React questions from the community.',
      author: 'pred',
      isPremium: false
    }
  ])

  const tabs = ['All Content', 'Premium', 'Free', 'My Content', 'Drafts']
  const categories = [
    'All Domains',
    'Frontend Development',
    'Backend Development',
    'Mobile Development',
    'Data Science',
    'Machine Learning',
    'DevOps',
    'UI/UX Design',
    'Programming',
    'Web Development'
  ]
  const contentTypes = [
    'All Types',
    'Blog',
    'Video',
    'Reel',
    'PDF',
    'Link',
    'GitHub Repo',
    'Image',
    'Podcast'
  ]

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files)
    setSelectedFiles(files)
    console.log('📁 Selected files:', files)
  }

  const handleUpload = async () => {
    // Validate form
    if (!contentForm.title.trim()) {
      showNotificationMessage('Please enter a title for your content', 'error')
      return
    }

    if (!contentForm.description.trim()) {
      showNotificationMessage('Please enter a description for your content', 'error')
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    try {
      // Simulate upload progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 200))
        setUploadProgress(i)
      }

      // Create new content item
      const newContent = {
        id: Date.now(),
        title: contentForm.title,
        type: contentForm.contentType,
        category: contentForm.category,
        subCategory: contentForm.subCategory || 'General',
        tags: contentForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        views: 0,
        likes: 0,
        comments: 0,
        status: 'published',
        createdAt: new Date().toISOString().split('T')[0],
        thumbnail: null,
        description: contentForm.description,
        author: 'pred',
        isPremium: contentForm.contentAccess === 'premium'
      }

      // Add to content items
      setContentItems(prev => [newContent, ...prev])

      // Reset form
      setContentForm({
        title: '',
        category: 'Frontend Development',
        subCategory: '',
        description: '',
        tags: '',
        visibility: 'public',
        contentAccess: 'free',
        contentType: 'Blog'
      })

      setSelectedFiles([])
      setShowCreateModal(false)
      showNotificationMessage(`"${newContent.title}" has been published successfully! 🎉`, 'success')

    } catch (error) {
      showNotificationMessage('Failed to publish content. Please try again.', 'error')
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  const handleCreateContent = () => {
    setShowCreateModal(true)
  }

  const handleSaveAsDraft = () => {
    // Validate minimum required fields
    if (!contentForm.title.trim()) {
      showNotificationMessage('Please enter a title to save as draft', 'error')
      return
    }

    // Create draft content item
    const draftContent = {
      id: Date.now(),
      title: contentForm.title,
      type: contentForm.contentType,
      category: contentForm.category,
      subCategory: contentForm.subCategory || 'General',
      tags: contentForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      views: 0,
      likes: 0,
      comments: 0,
      status: 'draft',
      createdAt: new Date().toISOString().split('T')[0],
      thumbnail: null,
      description: contentForm.description || 'Draft content - description pending',
      author: 'pred',
      isPremium: contentForm.contentAccess === 'premium'
    }

    // Add to content items
    setContentItems(prev => [draftContent, ...prev])

    // Reset form
    setContentForm({
      title: '',
      category: 'Frontend Development',
      subCategory: '',
      description: '',
      tags: '',
      visibility: 'public',
      contentAccess: 'free',
      contentType: 'Blog'
    })

    setSelectedFiles([])
    setShowCreateModal(false)
    showNotificationMessage(`"${draftContent.title}" has been saved as draft 📝`, 'success')
  }

  // Notification system
  const showNotificationMessage = (message, type = 'success') => {
    const notification = {
      id: Date.now(),
      message,
      type
    }
    setNotifications(prev => [...prev, notification])
    setShowNotification(true)

    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id))
      if (notifications.length <= 1) {
        setShowNotification(false)
      }
    }, 3000)
  }

  const handleLike = (contentId) => {
    const isLiked = likedContent.has(contentId)

    if (isLiked) {
      // Unlike
      setLikedContent(prev => {
        const newSet = new Set(prev)
        newSet.delete(contentId)
        return newSet
      })
      setContentItems(prev => prev.map(item =>
        item.id === contentId
          ? { ...item, likes: Math.max(0, item.likes - 1) }
          : item
      ))
      showNotificationMessage('Content unliked', 'info')
    } else {
      // Like
      setLikedContent(prev => new Set([...prev, contentId]))
      setContentItems(prev => prev.map(item =>
        item.id === contentId
          ? { ...item, likes: item.likes + 1 }
          : item
      ))
      showNotificationMessage('Content liked!', 'success')
    }
  }

  const handleShare = async (contentId) => {
    const content = contentItems.find(item => item.id === contentId)
    const shareUrl = `${window.location.origin}/content/${contentId}`
    const shareText = `Check out this amazing content: ${content.title} by @${content.author}`

    try {
      if (navigator.share) {
        // Use native share API if available
        await navigator.share({
          title: content.title,
          text: shareText,
          url: shareUrl
        })
        showNotificationMessage('Content shared successfully! 🔗', 'success')
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`)
        showNotificationMessage('Share link copied to clipboard! 📋', 'success')
      }
    } catch (error) {
      console.error('Error sharing:', error)
      showNotificationMessage('Failed to share content', 'error')
    }
  }

  const handleDelete = (contentId) => {
    const content = contentItems.find(item => item.id === contentId)
    if (window.confirm(`Are you sure you want to delete "${content.title}"? This action cannot be undone.`)) {
      setContentItems(prev => prev.filter(item => item.id !== contentId))
      // Remove from liked content if it was liked
      setLikedContent(prev => {
        const newSet = new Set(prev)
        newSet.delete(contentId)
        return newSet
      })
      showNotificationMessage(`"${content.title}" has been deleted`, 'info')
    }
  }

  const handleAccept = (contentId) => {
    const content = contentItems.find(item => item.id === contentId)
    setContentItems(prev => prev.map(item =>
      item.id === contentId
        ? { ...item, status: 'published' }
        : item
    ))
    showNotificationMessage(`"${content.title}" has been accepted and published! ✅`, 'success')
  }

  const handleDecline = (contentId) => {
    const content = contentItems.find(item => item.id === contentId)
    setContentItems(prev => prev.map(item =>
      item.id === contentId
        ? { ...item, status: 'declined' }
        : item
    ))
    showNotificationMessage(`"${content.title}" has been declined`, 'error')
  }

  const handleViewDetails = (contentId) => {
    const content = contentItems.find(item => item.id === contentId)
    // Increment view count
    setContentItems(prev => prev.map(item =>
      item.id === contentId
        ? { ...item, views: item.views + 1 }
        : item
    ))

    // Create a detailed view (in a real app, this would open a modal or navigate to a detail page)
    const detailsWindow = window.open('', '_blank', 'width=600,height=800')
    detailsWindow.document.write(`
      <html>
        <head>
          <title>${content.title} - Content Details</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; background: #f5f5f5; }
            .container { max-width: 500px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
            .header { border-bottom: 2px solid #eee; padding-bottom: 15px; margin-bottom: 20px; }
            .title { color: #333; margin: 0 0 10px 0; }
            .meta { color: #666; font-size: 14px; }
            .section { margin: 15px 0; }
            .label { font-weight: bold; color: #555; }
            .tags { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 5px; }
            .tag { background: #e3f2fd; color: #1976d2; padding: 3px 8px; border-radius: 12px; font-size: 12px; }
            .stats { display: flex; gap: 20px; background: #f8f9fa; padding: 15px; border-radius: 8px; }
            .stat { text-align: center; }
            .stat-number { font-size: 18px; font-weight: bold; color: #333; }
            .stat-label { font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 class="title">${content.title}</h1>
              <div class="meta">By @${content.author} • ${content.createdAt}</div>
            </div>

            <div class="section">
              <div class="label">Description:</div>
              <p>${content.description}</p>
            </div>

            <div class="section">
              <div class="label">Category:</div>
              <p>${content.category} > ${content.subCategory}</p>
            </div>

            <div class="section">
              <div class="label">Content Type:</div>
              <p>${content.type}</p>
            </div>

            <div class="section">
              <div class="label">Status:</div>
              <p>${content.status.charAt(0).toUpperCase() + content.status.slice(1)}</p>
            </div>

            <div class="section">
              <div class="label">Access:</div>
              <p>${content.isPremium ? 'Premium' : 'Free'}</p>
            </div>

            <div class="section">
              <div class="label">Tags:</div>
              <div class="tags">
                ${content.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
              </div>
            </div>

            <div class="stats">
              <div class="stat">
                <div class="stat-number">${content.views.toLocaleString()}</div>
                <div class="stat-label">Views</div>
              </div>
              <div class="stat">
                <div class="stat-number">${content.likes}</div>
                <div class="stat-label">Likes</div>
              </div>
              <div class="stat">
                <div class="stat-number">${content.comments}</div>
                <div class="stat-label">Comments</div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `)
    detailsWindow.document.close()

    showNotificationMessage(`Viewing details for "${content.title}"`, 'info')
  }

  const filteredContent = contentItems.filter(item => {
    const matchesTab = activeTab === 'All Content' ||
                     (activeTab === 'My Content' && item.author === 'pred') ||
                     (activeTab === 'Drafts' && item.status === 'draft') ||
                     (activeTab === 'Premium' && item.isPremium === true) ||
                     (activeTab === 'Free' && item.isPremium === false)

    const matchesCategory = selectedCategory === 'All Domains' || item.category === selectedCategory
    const matchesType = selectedContentType === 'All Types' || item.type === selectedContentType
    const matchesSearch = searchQuery === '' ||
                         item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    // Template filtering for reels
    const matchesTemplate = selectedTemplate === 'All' ||
                           item.type !== 'Reel' ||
                           (item.type === 'Reel' && (
                             item.title.toLowerCase().includes(selectedTemplate.toLowerCase()) ||
                             item.tags.some(tag => tag.toLowerCase().includes(selectedTemplate.toLowerCase().replace(' ', '')))
                           ))

    return matchesTab && matchesCategory && matchesType && matchesSearch && matchesTemplate
  })

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode ? 'bg-[#00001a]' : 'bg-white'
    }`}>
      {/* Notification System */}
      {showNotification && notifications.length > 0 && (
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`px-4 py-3 rounded-lg shadow-lg backdrop-blur-sm border transition-all duration-300 ${
                notification.type === 'success'
                  ? darkMode
                    ? 'bg-white/20 text-white border-white/30'
                    : 'bg-[#00001a]/10 text-[#00001a] border-[#00001a]/30'
                  : notification.type === 'error'
                  ? darkMode
                    ? 'bg-white/20 text-white border-white/30'
                    : 'bg-[#00001a]/10 text-[#00001a] border-[#00001a]/30'
                  : darkMode
                    ? 'bg-white/20 text-white border-white/30'
                    : 'bg-[#00001a]/10 text-[#00001a] border-[#00001a]/30'
              }`}
            >
              {notification.message}
            </div>
          ))}
        </div>
      )}
      {/* Header */}
      <div className="p-4 pb-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
              Educational Content
            </h1>
            <p className={`text-sm mt-1 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
              Browse tutorials, articles, and videos created by problem solvers
            </p>
          </div>

          <button
            onClick={handleCreateContent}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-500 ${
              darkMode
                ? 'bg-white/10 text-white backdrop-blur-md border border-white/20 hover:bg-white/20 hover:border-white/30 hover:shadow-2xl shadow-lg'
                : 'bg-white text-[#00001a] border border-[#00001a]/30 hover:bg-[#00001a]/5'
            }`}
            style={darkMode ? {
              boxShadow: '0 4px 20px rgba(255, 255, 255, 0.1)',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
            } : {}}
            onMouseEnter={(e) => {
              if (darkMode) {
                e.currentTarget.style.boxShadow = '0 0 15px rgba(59, 130, 246, 0.15), 0 4px 15px rgba(0, 0, 0, 0.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (darkMode) {
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(255, 255, 255, 0.1)';
              }
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create Content
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-3">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 border ${
                activeTab === tab
                  ? darkMode
                    ? 'bg-white text-[#00001a] border-white hover:bg-white/90 hover:border-white/90'
                    : 'bg-[#00001a] text-white border-[#00001a] hover:bg-[#00001a]/90 hover:border-[#00001a]/90'
                  : darkMode
                    ? 'bg-white/10 text-white/70 border-white/20 hover:bg-white/20 hover:text-white hover:border-white/30'
                    : 'bg-[#00001a]/10 text-[#00001a]/70 border-[#00001a]/20 hover:bg-[#00001a]/20 hover:text-[#00001a] hover:border-[#00001a]/30'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Filters Section */}
        <div className={`group p-5 backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden ${
          darkMode
            ? 'rounded-lg bg-white/3 border-white/20 hover:bg-white/8 hover:border-white/30'
            : 'rounded-2xl bg-white border-[#00001a]/20'
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
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                Filters
              </h3>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`text-sm font-medium transition-colors duration-300 ${
                darkMode ? 'text-white/70 hover:text-white' : 'text-[#00001a]/70 hover:text-[#00001a]'
              }`}
            >
              {showFilters ? 'Hide' : 'Show'}
            </button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                  Search
                </label>
                <div className="relative">
                  <svg className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search content..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 rounded-lg border transition-all duration-300 ${
                      darkMode
                        ? 'bg-white/5 border-white/20 text-white placeholder-white/50 focus:border-white/40 focus:bg-white/10'
                        : 'bg-white border-[#00001a]/30 text-[#00001a] placeholder-[#00001a]/50 focus:border-[#00001a]/50 focus:bg-[#00001a]/5'
                    }`}
                  />
                </div>
              </div>

              {/* Domain Filter */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                  Domain
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border transition-all duration-300 ${
                    darkMode
                      ? 'bg-white/5 border-white/20 text-white focus:border-white/40 focus:bg-white/10'
                      : 'bg-white border-[#00001a]/30 text-[#00001a] focus:border-[#00001a]/50 focus:bg-[#00001a]/5'
                  }`}
                >
                  {categories.map(category => (
                    <option key={category} value={category} className={darkMode ? 'bg-[#00001a] text-white' : 'bg-white text-[#00001a]'}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Content Type Filter */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                  Content Type
                </label>
                <select
                  value={selectedContentType}
                  onChange={(e) => setSelectedContentType(e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border transition-all duration-300 ${
                    darkMode
                      ? 'bg-white/5 border-white/20 text-white focus:border-white/40 focus:bg-white/10'
                      : 'bg-white border-[#00001a]/30 text-[#00001a] focus:border-[#00001a]/50 focus:bg-[#00001a]/5'
                  }`}
                >
                  {contentTypes.map(type => (
                    <option key={type} value={type} className={darkMode ? 'bg-[#00001a] text-white' : 'bg-white text-[#00001a]'}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Reset Filters Button */}
          {(searchQuery || selectedCategory !== 'All Domains' || selectedContentType !== 'All Types') && (
            <div className="mt-4 pt-4 border-t border-white/10">
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('All Domains')
                  setSelectedContentType('All Types')
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  darkMode
                    ? 'bg-white/10 text-white hover:bg-white/20'
                    : 'bg-[#00001a]/10 text-[#00001a] hover:bg-[#00001a]/20'
                }`}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Content Grid */}
        {filteredContent.length === 0 ? (
          <div className={`group p-8 backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden text-center ${
            darkMode
              ? 'rounded-lg bg-white/3 border-white/20'
              : 'rounded-2xl bg-white border-[#00001a]/20'
          }`}
          style={darkMode ? {
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)'
          } : {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
          }}>
            <div className={`mb-4 ${darkMode ? 'text-white/30' : 'text-[#00001a]/30'}`}>
              <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
              </svg>
            </div>
            <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
              No content found
            </h3>
            <p className={`${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
              No content available in this category
            </p>
          </div>
        ) : (
          <>
            {/* Reels Section - Instagram Style */}
            {filteredContent.some(content => content.type === 'Reel') && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Reels
                  </h2>
                  <button
                    onClick={handleCreateContent}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      darkMode
                        ? 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30'
                        : 'bg-[#00001a]/10 text-[#00001a] hover:bg-[#00001a]/20'
                    }`}
                  >
                    Create Reel
                  </button>
                </div>

                {/* Template Categories */}
                <div className="mb-6">
                  <h3 className={`text-sm font-medium mb-3 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                    Browse Templates
                  </h3>

                  {/* Template Pills - Horizontal Scroll */}
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {reelTemplates.map((template) => (
                      <button
                        key={template.name}
                        onClick={() => setSelectedTemplate(template.name)}
                        className={`flex-shrink-0 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 border ${
                          selectedTemplate === template.name
                            ? darkMode
                              ? 'bg-blue-500/20 text-blue-300 border-blue-500/30 shadow-lg'
                              : 'bg-[#00001a]/10 text-[#00001a] border-[#00001a]/30 shadow-md'
                            : darkMode
                              ? 'bg-blue-500/10 text-blue-200 border-blue-500/20 hover:bg-blue-500/20 hover:text-blue-300 hover:border-blue-500/30'
                              : 'bg-[#00001a]/10 text-[#00001a]/70 border-[#00001a]/20 hover:bg-[#00001a]/20 hover:text-[#00001a] hover:border-[#00001a]/30'
                        }`}
                      >
                        <span className="whitespace-nowrap">{template.name}</span>
                      </button>
                    ))}
                  </div>

                  {/* Selected Template Description */}
                  {selectedTemplate !== 'All' && (
                    <div className={`text-xs mt-2 ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`}>
                      {reelTemplates.find(t => t.name === selectedTemplate)?.description}
                    </div>
                  )}
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4">
                  {filteredContent.filter(content => content.type === 'Reel').map((reel) => (
                    <div
                      key={reel.id}
                      className={`flex-shrink-0 w-64 h-96 rounded-2xl overflow-hidden relative cursor-pointer group transition-all duration-300 border ${
                        darkMode
                          ? 'bg-gradient-to-b from-white/10 to-white/5 border-white/20 hover:border-white/30'
                          : 'bg-gradient-to-b from-white to-white border-[#00001a]/20 hover:border-[#00001a]/30'
                      }`}
                      style={{
                        aspectRatio: '9/16',
                        boxShadow: darkMode
                          ? '0 12px 40px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                          : '0 10px 35px rgba(0, 0, 0, 0.15)'
                      }}
                    >
                      {/* Reel Background/Thumbnail */}
                      <div className={`absolute inset-0 ${
                        darkMode
                          ? 'bg-gradient-to-b from-white/20 to-white/40'
                          : 'bg-gradient-to-b from-[#00001a]/5 to-[#00001a]/10'
                      }`}>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                            darkMode ? 'bg-white/10 text-white/60' : 'bg-[#00001a]/10 text-[#00001a]/60'
                          }`}>
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className={`w-18 h-18 rounded-full backdrop-blur-md flex items-center justify-center border ${
                          darkMode
                            ? 'bg-white/25 border-white/40 text-white hover:bg-white/35 hover:border-white/50'
                            : 'bg-white/95 border-white/60 text-[#00001a] hover:bg-white hover:border-white/80'
                        } transition-all duration-300`}
                        style={{
                          boxShadow: darkMode
                            ? '0 8px 32px rgba(255, 255, 255, 0.15)'
                            : '0 8px 32px rgba(0, 0, 0, 0.2)'
                        }}>
                          <svg className="w-10 h-10 ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>

                      {/* Reel Info Overlay */}
                      <div className={`absolute bottom-0 left-0 right-0 p-4 ${
                        darkMode
                          ? 'bg-gradient-to-t from-[#00001a]/95 via-[#00001a]/60 to-transparent'
                          : 'bg-gradient-to-t from-[#00001a]/85 via-[#00001a]/40 to-transparent'
                      }`}>
                        <h3 className={`font-semibold text-sm mb-1 line-clamp-2 ${
                          darkMode ? 'text-white' : 'text-white'
                        }`}>
                          {reel.title}
                        </h3>
                        <p className={`text-xs mb-2 line-clamp-1 ${
                          darkMode ? 'text-white/80' : 'text-white/90'
                        }`}>
                          @{reel.author}
                        </p>

                        {/* Reel Stats */}
                        <div className={`flex items-center gap-3 text-xs ${
                          darkMode ? 'text-white/70' : 'text-white/80'
                        }`}>
                          <span className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" />
                            </svg>
                            {reel.views.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
                            </svg>
                            {reel.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9,22A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H13.9L10.2,21.71C10,21.9 9.75,22 9.5,22V22H9Z" />
                            </svg>
                            {reel.comments}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons for Reels */}
                      <div className="absolute right-3 bottom-20 flex flex-col gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLike(reel.id);
                          }}
                          className={`w-12 h-12 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-300 border ${
                            likedContent.has(reel.id)
                              ? darkMode
                                ? 'bg-white/40 border-white/60 text-white hover:bg-white/50'
                                : 'bg-[#00001a]/30 border-[#00001a]/50 text-[#00001a] hover:bg-[#00001a]/40'
                              : darkMode
                                ? 'bg-white/25 border-white/40 text-white hover:bg-white/35 hover:border-white/50'
                                : 'bg-white/95 border-white/60 text-[#00001a] hover:bg-white hover:border-white/80'
                          }`}
                          style={{
                            boxShadow: likedContent.has(reel.id)
                              ? '0 4px 20px rgba(239, 68, 68, 0.3)'
                              : darkMode
                                ? '0 4px 20px rgba(255, 255, 255, 0.1)'
                                : '0 4px 20px rgba(0, 0, 0, 0.15)'
                          }}>
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d={likedContent.has(reel.id)
                              ? "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                              : "M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"
                            }/>
                          </svg>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShare(reel.id);
                          }}
                          className={`w-12 h-12 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-300 border ${
                            darkMode
                              ? 'bg-white/25 border-white/40 text-white hover:bg-white/35 hover:border-white/50'
                              : 'bg-white/95 border-white/60 text-[#00001a] hover:bg-white hover:border-white/80'
                          }`}
                          style={{
                            boxShadow: darkMode
                              ? '0 4px 20px rgba(255, 255, 255, 0.1)'
                              : '0 4px 20px rgba(0, 0, 0, 0.15)'
                          }}>
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                          </svg>
                        </button>
                        {reel.author === 'pred' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(reel.id);
                            }}
                            className={`w-12 h-12 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-300 border ${
                              darkMode
                                ? 'bg-white/30 border-white/50 text-white hover:bg-white/40 hover:border-white/60'
                                : 'bg-[#00001a]/10 border-[#00001a]/20 text-[#00001a] hover:bg-[#00001a]/20 hover:border-[#00001a]/30'
                            }`}
                            style={{
                              boxShadow: '0 4px 20px rgba(239, 68, 68, 0.2)'
                            }}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>

                      {/* Premium Badge for Reels */}
                      {reel.isPremium && (
                        <div className="absolute top-3 left-3">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm border ${
                            darkMode
                              ? 'bg-amber-600/20 text-amber-300 border-amber-500/30'
                              : 'bg-amber-100/90 text-amber-700 border-amber-300/60'
                          }`}>
                            👑 Premium
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Regular Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredContent.filter(content => content.type !== 'Reel').map((content) => (
              <div
                key={content.id}
                className={`group p-5 backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden cursor-pointer ${
                  darkMode
                    ? 'rounded-lg bg-white/3 border-white/20 hover:bg-white/8 hover:border-white/30'
                    : 'rounded-2xl bg-white border-[#00001a]/20'
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
                {/* Content Type Badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      darkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-[#00001a]/10 text-[#00001a]'
                    }`}>
                      {content.type}
                    </span>
                    {content.isPremium && (
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        darkMode ? 'bg-yellow-500/20 text-yellow-300' : 'bg-[#00001a]/10 text-[#00001a]'
                      }`}>
                        Premium
                      </span>
                    )}
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    content.status === 'published'
                      ? darkMode ? 'bg-green-500/20 text-green-300' : 'bg-[#00001a]/10 text-[#00001a]'
                      : darkMode ? 'bg-orange-500/20 text-orange-300' : 'bg-[#00001a]/10 text-[#00001a]'
                  }`}>
                    {content.status === 'published' ? 'Published' : 'Draft'}
                  </span>
                </div>

                {/* Content Title */}
                <h3 className={`text-lg font-semibold mb-2 line-clamp-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  {content.title}
                </h3>

                {/* Content Description */}
                <p className={`text-sm mb-3 line-clamp-2 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                  {content.description}
                </p>

                {/* Category & Tags */}
                <div className="mb-3">
                  <div className={`text-xs font-medium mb-1 ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                    {content.category} • {content.subCategory}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {content.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className={`inline-flex items-center px-2 py-1 rounded text-xs ${
                          darkMode ? 'bg-blue-500/10 text-blue-200' : 'bg-[#00001a]/5 text-[#00001a]/80'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                    {content.tags.length > 3 && (
                      <span className={`text-xs ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                        +{content.tags.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4 text-sm">
                    <span className={`flex items-center gap-1 ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" />
                      </svg>
                      {content.views.toLocaleString()}
                    </span>
                    <span className={`flex items-center gap-1 ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
                      </svg>
                      {content.likes}
                    </span>
                    <span className={`flex items-center gap-1 ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9,22A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H13.9L10.2,21.71C10,21.9 9.75,22 9.5,22V22H9Z" />
                      </svg>
                      {content.comments}
                    </span>
                  </div>
                  <span className={`text-xs ${darkMode ? 'text-white/50' : 'text-[#00001a]/50'}`}>
                    {content.createdAt}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleLike(content.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium transition-all duration-300 border ${
                      likedContent.has(content.id)
                        ? darkMode
                          ? 'bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30'
                          : 'bg-white text-[#00001a] border-[#00001a]/60 hover:bg-gray-50 hover:border-[#00001a] shadow-sm'
                        : darkMode
                          ? 'bg-blue-500/10 text-blue-200 border-blue-500/20 hover:bg-blue-500/20 hover:border-blue-500/30'
                          : 'bg-white text-[#00001a] border-[#00001a]/60 hover:bg-gray-50 hover:border-[#00001a] shadow-sm'
                    }`}
                  >
                    {likedContent.has(content.id) ? 'Liked' : 'Like'}
                  </button>
                  <button
                    onClick={() => handleShare(content.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium transition-all duration-300 border ${
                      darkMode
                        ? 'bg-green-500/20 text-green-300 border-green-500/30 hover:bg-green-500/30 hover:border-green-500/40'
                        : 'bg-[#00001a] text-white border-[#00001a] hover:bg-[#00001a]/90 hover:shadow-md'
                    }`}
                  >
                    Share
                  </button>
                  {content.author === 'pred' && (
                    <button
                      onClick={() => handleDelete(content.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium transition-all duration-300 border ${
                        darkMode
                          ? 'bg-red-500/20 text-red-300 border-red-500/30 hover:bg-red-500/30 hover:border-red-500/40'
                          : 'bg-white text-[#00001a] border-[#00001a]/60 hover:bg-gray-50 hover:border-[#00001a] shadow-sm'
                      }`}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          </>
        )}

        {/* Creator Tools Section */}
        <div className={`group p-5 backdrop-blur-xl border transition-all duration-500 shadow-xl relative overflow-hidden ${
          darkMode
            ? 'rounded-lg bg-white/3 border-white/20 hover:bg-white/8 hover:border-white/30'
            : 'rounded-2xl bg-white border-[#00001a]/20'
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
          <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
            Creator Tools
          </h3>
          <p className={`text-sm mb-4 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
            Share your knowledge and earn from premium content
          </p>
          <button
            onClick={handleCreateContent}
            className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 backdrop-blur-sm border ${
              darkMode
                ? 'bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30 hover:shadow-lg'
                : 'bg-[#00001a] text-white border-[#00001a]/20 hover:bg-[#00001a]/90'
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
            }}
          >
            Create New Content
          </button>
        </div>
      </div>

      {/* Create Content Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border shadow-2xl ${
            darkMode
              ? 'bg-[#00001a]/95 border-white/20'
              : 'bg-white border-[#00001a]/20'
          }`}
          style={{
            backdropFilter: 'blur(20px)',
            boxShadow: darkMode
              ? '0 25px 50px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)'
              : '0 25px 50px rgba(0, 0, 0, 0.25)'
          }}>
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Create New Content
                </h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    darkMode
                      ? 'hover:bg-white/10 text-white/70 hover:text-white'
                      : 'hover:bg-[#00001a]/10 text-[#00001a]/70 hover:text-[#00001a]'
                  }`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Content Type Selection */}
              <div className="mb-6">
                <label className={`block text-sm font-medium mb-3 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                  Content Type
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {contentTypes.slice(1).map((type) => (
                    <button
                      key={type}
                      onClick={() => setContentForm(prev => ({ ...prev, contentType: type }))}
                      className={`p-3 rounded-lg border text-sm font-medium transition-all duration-300 ${
                        contentForm.contentType === type
                          ? darkMode
                            ? 'border-blue-500/50 bg-blue-500/20 text-blue-300'
                            : 'border-[#00001a]/50 bg-[#00001a]/20 text-[#00001a]'
                          : darkMode
                            ? 'border-blue-500/20 hover:border-blue-500/40 hover:bg-blue-500/10 text-blue-200'
                            : 'border-[#00001a]/20 hover:border-[#00001a]/30 hover:bg-[#00001a]/5 text-[#00001a]'
                      }`}
                    >
                      <div className="text-lg mb-1">
                        {type}
                      </div>
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* File Upload */}
              <div className="mb-6">
                <label className={`block text-sm font-medium mb-3 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                  Upload Files
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300 ${
                    darkMode
                      ? 'border-white/20 hover:border-white/40 hover:bg-white/5'
                      : 'border-[#00001a]/30 hover:border-[#00001a]/50 hover:bg-[#00001a]/5'
                  }`}
                >
                  <div className={`text-4xl mb-4 ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                    <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                    </svg>
                  </div>
                  <p className={`text-lg font-medium mb-2 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                    Drop files here or click to browse
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                    Supports: Videos, Images, PDFs, Documents
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="video/*,image/*,.pdf,.doc,.docx,.txt"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>

                {selectedFiles.length > 0 && (
                  <div className="mt-4">
                    <h4 className={`text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                      Selected Files ({selectedFiles.length})
                    </h4>
                    <div className="space-y-2">
                      {selectedFiles.map((file, index) => (
                        <div key={index} className={`flex items-center justify-between p-2 rounded border ${
                          darkMode ? 'border-white/10 bg-white/5' : 'border-[#00001a]/20 bg-[#00001a]/5'
                        }`}>
                          <span className={`text-sm ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                            {file.name}
                          </span>
                          <span className={`text-xs ${darkMode ? 'text-white/60' : 'text-[#00001a]/60'}`}>
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Content Details Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Title */}
                <div className="md:col-span-2">
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter content title..."
                    value={contentForm.title}
                    onChange={(e) => setContentForm(prev => ({ ...prev, title: e.target.value }))}
                    className={`w-full px-4 py-2 rounded-lg border transition-all duration-300 ${
                      darkMode
                        ? 'bg-white/5 border-white/20 text-white placeholder-white/50 focus:border-white/40 focus:bg-white/10'
                        : 'bg-white border-[#00001a]/30 text-[#00001a] placeholder-[#00001a]/50 focus:border-[#00001a]/50 focus:bg-[#00001a]/5'
                    }`}
                  />
                </div>

                {/* Category */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                    Category
                  </label>
                  <select
                    value={contentForm.category}
                    onChange={(e) => setContentForm(prev => ({ ...prev, category: e.target.value }))}
                    className={`w-full px-4 py-2 rounded-lg border transition-all duration-300 ${
                      darkMode
                        ? 'bg-white/5 border-white/20 text-white focus:border-white/40 focus:bg-white/10'
                        : 'bg-white border-[#00001a]/30 text-[#00001a] focus:border-[#00001a]/50 focus:bg-[#00001a]/5'
                    }`}>
                    {categories.slice(1).map(category => (
                      <option key={category} value={category} className={darkMode ? 'bg-[#00001a] text-white' : 'bg-white text-[#00001a]'}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sub-Category */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                    Sub-Category
                  </label>
                  <input
                    type="text"
                    placeholder="Enter sub-category..."
                    value={contentForm.subCategory}
                    onChange={(e) => setContentForm(prev => ({ ...prev, subCategory: e.target.value }))}
                    className={`w-full px-4 py-2 rounded-lg border transition-all duration-300 ${
                      darkMode
                        ? 'bg-white/5 border-white/20 text-white placeholder-white/50 focus:border-white/40 focus:bg-white/10'
                        : 'bg-white border-[#00001a]/30 text-[#00001a] placeholder-[#00001a]/50 focus:border-[#00001a]/50 focus:bg-[#00001a]/5'
                    }`}
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                    Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe your content..."
                    value={contentForm.description}
                    onChange={(e) => setContentForm(prev => ({ ...prev, description: e.target.value }))}
                    className={`w-full px-4 py-2 rounded-lg border transition-all duration-300 resize-none ${
                      darkMode
                        ? 'bg-white/5 border-white/20 text-white placeholder-white/50 focus:border-white/40 focus:bg-white/10'
                        : 'bg-white border-[#00001a]/30 text-[#00001a] placeholder-[#00001a]/50 focus:border-[#00001a]/50 focus:bg-[#00001a]/5'
                    }`}
                  />
                </div>

                {/* Tags */}
                <div className="md:col-span-2">
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                    Tags (Hashtags)
                  </label>
                  <input
                    type="text"
                    placeholder="Enter tags separated by commas..."
                    value={contentForm.tags}
                    onChange={(e) => setContentForm(prev => ({ ...prev, tags: e.target.value }))}
                    className={`w-full px-4 py-2 rounded-lg border transition-all duration-300 ${
                      darkMode
                        ? 'bg-white/5 border-white/20 text-white placeholder-white/50 focus:border-white/40 focus:bg-white/10'
                        : 'bg-white border-[#00001a]/30 text-[#00001a] placeholder-[#00001a]/50 focus:border-[#00001a]/50 focus:bg-[#00001a]/5'
                    }`}
                  />
                </div>
              </div>

              {/* Content Settings */}
              <div className="mb-6">
                <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                  Content Settings
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Visibility */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                      Visibility
                    </label>
                    <select
                      value={contentForm.visibility}
                      onChange={(e) => setContentForm(prev => ({ ...prev, visibility: e.target.value }))}
                      className={`w-full px-4 py-2 rounded-lg border transition-all duration-300 ${
                        darkMode
                          ? 'bg-white/5 border-white/20 text-white focus:border-white/40 focus:bg-white/10'
                          : 'bg-white border-[#00001a]/30 text-[#00001a] focus:border-[#00001a]/50 focus:bg-[#00001a]/5'
                      }`}>
                      <option value="public" className={darkMode ? 'bg-[#00001a] text-white' : 'bg-white text-[#00001a]'}>Public</option>
                      <option value="premium" className={darkMode ? 'bg-[#00001a] text-white' : 'bg-white text-[#00001a]'}>Premium</option>
                      <option value="private" className={darkMode ? 'bg-[#00001a] text-white' : 'bg-white text-[#00001a]'}>Private</option>
                    </select>
                  </div>

                  {/* Content Type */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                      Content Access
                    </label>
                    <select
                      value={contentForm.contentAccess}
                      onChange={(e) => setContentForm(prev => ({ ...prev, contentAccess: e.target.value }))}
                      className={`w-full px-4 py-2 rounded-lg border transition-all duration-300 ${
                        darkMode
                          ? 'bg-white/5 border-white/20 text-white focus:border-white/40 focus:bg-white/10'
                          : 'bg-white border-[#00001a]/30 text-[#00001a] focus:border-[#00001a]/50 focus:bg-[#00001a]/5'
                      }`}>
                      <option value="free" className={darkMode ? 'bg-[#00001a] text-white' : 'bg-white text-[#00001a]'}>Free</option>
                      <option value="premium" className={darkMode ? 'bg-[#00001a] text-white' : 'bg-white text-[#00001a]'}>Premium</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Upload Progress */}
              {isUploading && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-[#00001a]'}`}>
                      Uploading...
                    </span>
                    <span className={`text-sm ${darkMode ? 'text-white/70' : 'text-[#00001a]/70'}`}>
                      {uploadProgress}%
                    </span>
                  </div>
                  <div className={`w-full rounded-full h-2 ${darkMode ? 'bg-white/10' : 'bg-[#00001a]/20'}`}>
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        darkMode ? 'bg-white' : 'bg-[#00001a]'
                      }`}
                      style={{width: `${uploadProgress}%`}}
                    ></div>
                  </div>
                </div>
              )}

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    darkMode
                      ? 'text-white/70 hover:bg-white/5 hover:text-white'
                      : 'text-[#00001a]/70 hover:bg-[#00001a]/10 hover:text-[#00001a]'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveAsDraft}
                  className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    darkMode
                      ? 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30'
                      : 'bg-[#00001a]/10 text-[#00001a] hover:bg-[#00001a]/20'
                  }`}
                >
                  Save as Draft
                </button>
                <button
                  onClick={handleUpload}
                  disabled={isUploading}
                  className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 backdrop-blur-sm border disabled:opacity-50 disabled:cursor-not-allowed ${
                    darkMode
                      ? 'bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30 hover:shadow-lg'
                      : 'bg-[#00001a] text-white border-[#00001a]/20 hover:bg-[#00001a]/90'
                  }`}
                  style={darkMode ? {
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                  } : {}}
                  onMouseEnter={(e) => {
                    if (darkMode && !isUploading) {
                      e.currentTarget.style.boxShadow = '0 0 15px rgba(59, 130, 246, 0.15), 0 4px 15px rgba(0, 0, 0, 0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (darkMode && !isUploading) {
                      e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
                    }
                  }}
                >
                  {isUploading ? 'Publishing...' : 'Publish Content'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Content
