'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

export type Language = 'en' | 'vn'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translation data
const translations = {
  en: {
    // Navigation
    'nav.tutorials': 'Tutorials',
    'nav.tools': 'Tools',
    'nav.community': 'Community',
    'nav.newsletter': 'Newsletter',
    'nav.getStarted': 'Get Started',
    
    // Hero section
        'hero.badge': 'Join 100+ AI learners',
    'hero.title': 'Master AI with',
    'hero.titleHighlight': 'Practical Examples',
    'hero.description': 'Learn artificial intelligence through hands-on tutorials, ready-to-use prompts, and powerful automation tools. From beginner to expert, we\'ve got you covered.',
    'hero.startLearning': 'Start Learning',
    'hero.watchDemo': 'Watch Demo',
    'hero.tutorials': 'Tutorials',
    'hero.tools': 'AI Tools',
    'hero.students': 'Students',
    'hero.chatTitle': 'Master AI with - Practical Examples',
    'hero.chatPlaceholder': 'Ask anything',
    
    // Stats section
    'stats.learners': 'Active Learners',
    'stats.learnersDesc': 'Join our growing community',
    'stats.tutorials': 'Tutorials',
    'stats.tutorialsDesc': 'Comprehensive AI guides',
    'stats.tools': 'AI Tools',
    'stats.toolsDesc': 'Ready-to-use resources',
    'stats.success': 'Success Rate',
    'stats.successDesc': 'Students land AI jobs',
    
    // Featured tutorials
    'tutorials.title': 'Featured Tutorials',
    'tutorials.description': 'Start your AI journey with our most popular tutorials, designed for all skill levels.',
    'tutorials.beginner': 'Beginner',
    'tutorials.intermediate': 'Intermediate',
    'tutorials.advanced': 'Advanced',
    'tutorials.readMore': 'Read More',
    'tutorials.viewAll': 'View All Tutorials',
    'tutorials.chatgpt.title': 'Getting Started with ChatGPT',
    'tutorials.chatgpt.desc': 'Learn the fundamentals of prompt engineering and how to get the best results from ChatGPT.',
    'tutorials.webapps.title': 'Building AI-Powered Web Apps',
    'tutorials.webapps.desc': 'Create interactive web applications using AI APIs and modern frameworks.',
    'tutorials.prompts.title': 'Advanced Prompt Engineering',
    'tutorials.prompts.desc': 'Master advanced techniques for creating complex, multi-step AI prompts.',
    
    // Tools section
    'tools.title': 'AI Tools & Resources',
    'tools.description': 'Access powerful AI tools and resources to accelerate your learning and productivity.',
    'tools.promptBuilder.title': 'AI Prompt Builder',
    'tools.promptBuilder.desc': 'Create perfect prompts for any AI model with our interactive builder.',
    'tools.imageGen.title': 'Image Generator',
    'tools.imageGen.desc': 'Generate stunning images using AI with our easy-to-use tool.',
    'tools.codeAssistant.title': 'Code Assistant',
    'tools.codeAssistant.desc': 'Get AI-powered code suggestions and debugging help.',
    'tools.automation.title': 'Automation Hub',
    'tools.automation.desc': 'Discover and use pre-built AI automation workflows.',
    'tools.tryNow': 'Try Now',
    'tools.exploreAll': 'Explore All Tools',
    
    // Newsletter
    'newsletter.title': 'Stay Updated with AI',
    'newsletter.description': 'Get weekly tutorials, AI news, and exclusive resources delivered to your inbox.',
    'newsletter.placeholder': 'Enter your email',
    'newsletter.subscribe': 'Subscribe',
        'newsletter.disclaimer': 'Join 100+ AI enthusiasts. No spam, unsubscribe anytime.',
    
    // Footer
    'footer.learn': 'Learn',
    'footer.support': 'Support',
    'footer.company': 'Company',
    'footer.copyright': '© 2024 AI Tutorial Hub. All rights reserved.',
    'footer.email': 'hello@aitutorialhub.com',
    
    // Common
    'common.minRead': 'min read',
    'common.author': 'AI Expert',
    'common.devTeam': 'Dev Team',
    'common.brandName': 'AI Creator School'
  },
  vn: {
    // Navigation
    'nav.tutorials': 'Hướng dẫn',
    'nav.tools': 'Công cụ',
    'nav.community': 'Cộng đồng',
    'nav.newsletter': 'Bản tin',
    'nav.getStarted': 'Bắt đầu',
    
    // Hero section
        'hero.badge': 'Tham gia 100+ người học AI',
    'hero.title': 'Thành thạo AI với',
    'hero.titleHighlight': 'Ví dụ thực tế',
    'hero.description': 'Học trí tuệ nhân tạo thông qua các hướng dẫn thực hành, gợi ý sẵn sàng sử dụng và các công cụ tự động hóa mạnh mẽ. Từ người mới bắt đầu đến chuyên gia, chúng tôi có đầy đủ.',
    'hero.startLearning': 'Bắt đầu học',
    'hero.watchDemo': 'Xem Demo',
    'hero.tutorials': 'Hướng dẫn',
    'hero.tools': 'Công cụ AI',
    'hero.students': 'Học viên',
    'hero.chatTitle': 'Thành thạo AI với - Ví dụ thực tế',
    'hero.chatPlaceholder': 'Hỏi bất cứ điều gì',
    
    // Stats section
    'stats.learners': 'Người học tích cực',
    'stats.learnersDesc': 'Tham gia cộng đồng đang phát triển của chúng tôi',
    'stats.tutorials': 'Hướng dẫn',
    'stats.tutorialsDesc': 'Hướng dẫn AI toàn diện',
    'stats.tools': 'Công cụ AI',
    'stats.toolsDesc': 'Tài nguyên sẵn sàng sử dụng',
    'stats.success': 'Tỷ lệ thành công',
    'stats.successDesc': 'Học viên có việc làm AI',
    
    // Featured tutorials
    'tutorials.title': 'Hướng dẫn nổi bật',
    'tutorials.description': 'Bắt đầu hành trình AI của bạn với các hướng dẫn phổ biến nhất, được thiết kế cho mọi cấp độ kỹ năng.',
    'tutorials.beginner': 'Người mới bắt đầu',
    'tutorials.intermediate': 'Trung cấp',
    'tutorials.advanced': 'Nâng cao',
    'tutorials.readMore': 'Đọc thêm',
    'tutorials.viewAll': 'Xem tất cả hướng dẫn',
    'tutorials.chatgpt.title': 'Bắt đầu với ChatGPT',
    'tutorials.chatgpt.desc': 'Học những điều cơ bản về kỹ thuật prompt và cách có được kết quả tốt nhất từ ChatGPT.',
    'tutorials.webapps.title': 'Xây dựng ứng dụng web AI',
    'tutorials.webapps.desc': 'Tạo các ứng dụng web tương tác sử dụng AI APIs và các framework hiện đại.',
    'tutorials.prompts.title': 'Kỹ thuật Prompt nâng cao',
    'tutorials.prompts.desc': 'Thành thạo các kỹ thuật nâng cao để tạo ra các prompt AI phức tạp, nhiều bước.',
    
    // Tools section
    'tools.title': 'Công cụ & Tài nguyên AI',
    'tools.description': 'Truy cập các công cụ và tài nguyên AI mạnh mẽ để tăng tốc việc học và năng suất của bạn.',
    'tools.promptBuilder.title': 'Trình tạo Prompt AI',
    'tools.promptBuilder.desc': 'Tạo prompt hoàn hảo cho bất kỳ mô hình AI nào với trình tạo tương tác của chúng tôi.',
    'tools.imageGen.title': 'Trình tạo hình ảnh',
    'tools.imageGen.desc': 'Tạo hình ảnh tuyệt đẹp bằng AI với công cụ dễ sử dụng của chúng tôi.',
    'tools.codeAssistant.title': 'Trợ lý mã',
    'tools.codeAssistant.desc': 'Nhận gợi ý mã và trợ giúp debug được hỗ trợ bởi AI.',
    'tools.automation.title': 'Trung tâm tự động hóa',
    'tools.automation.desc': 'Khám phá và sử dụng các quy trình tự động hóa AI có sẵn.',
    'tools.tryNow': 'Thử ngay',
    'tools.exploreAll': 'Khám phá tất cả công cụ',
    
    // Newsletter
    'newsletter.title': 'Cập nhật với AI',
    'newsletter.description': 'Nhận hướng dẫn hàng tuần, tin tức AI và tài nguyên độc quyền được gửi trực tiếp vào hộp thư của bạn.',
    'newsletter.placeholder': 'Nhập email của bạn',
    'newsletter.subscribe': 'Đăng ký',
        'newsletter.disclaimer': 'Tham gia 100+ người đam mê AI. Không spam, hủy đăng ký bất cứ lúc nào.',
    
    // Footer
    'footer.learn': 'Học',
    'footer.support': 'Hỗ trợ',
    'footer.company': 'Công ty',
    'footer.copyright': '© 2024 AI Tutorial Hub. Tất cả quyền được bảo lưu.',
    'footer.email': 'hello@aitutorialhub.com',
    
    // Common
    'common.minRead': 'phút đọc',
    'common.author': 'Chuyên gia AI',
    'common.devTeam': 'Đội phát triển',
    'common.brandName': 'Trường Sáng Tạo AI'
  }
}

export function LanguageProvider({ 
  children, 
  initialLanguage = 'en' 
}: { 
  children: ReactNode
  initialLanguage?: Language 
}) {
  const [language, setLanguage] = useState<Language>(initialLanguage)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load language from localStorage after mounting, but only if not set via URL
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'vn')) {
      setLanguage(savedLanguage)
    }
  }, [])

  const t = (key: string): string => {
    if (!mounted) {
      // Return English translations during SSR
      return translations.en[key as keyof typeof translations.en] || key
    }
    return translations[language][key as keyof typeof translations[typeof language]] || key
  }

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang)
    }
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    // Return default values during SSR to prevent hydration errors
    return {
      language: 'en' as Language,
      setLanguage: () => {},
      t: (key: string) => translations.en[key as keyof typeof translations.en] || key
    }
  }
  return context
}