import Link from 'next/link'
import { Zap, Mail, Facebook } from 'lucide-react'

interface FooterStaticProps {
  lang: string
}

export default function FooterStatic({ lang }: FooterStaticProps) {
  const isVietnamese = lang === 'vn'
  
  const brandName = isVietnamese ? 'Trường Sáng Tạo AI' : 'AI Creator School'
  const copyrightText = isVietnamese 
    ? '© 2025 Trường Sáng Tạo AI. Tất cả quyền được bảo lưu.'
    : '© 2025 AI Creator School. All rights reserved.'

  const footerLinks = {
    learn: [
      { 
        name: isVietnamese ? 'Hướng dẫn' : 'Tutorials', 
        href: '#tutorials' 
      },
      { 
        name: isVietnamese ? 'Công cụ AI' : 'AI Tools', 
        href: '#tools' 
      },
      { 
        name: isVietnamese ? 'Cộng đồng' : 'Community', 
        href: 'https://www.facebook.com/share/g/1Ak4MKnUBB/?mibextid=NSMWBT' 
      },
    ],
    support: [
      { 
        name: isVietnamese ? 'Liên hệ' : 'Contact Us', 
        href: `/${lang}/contact` 
      },
      { 
        name: 'FAQ', 
        href: `/${lang}/faq` 
      },
    ],
  }

  const socialLinks = [
    { 
      name: 'Facebook Community', 
      href: 'https://www.facebook.com/share/g/1Ak4MKnUBB/?mibextid=NSMWBT', 
      icon: Facebook 
    },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href={`/${lang}`} className="flex items-center space-x-2 mb-4">
              <Zap className="h-8 w-8 text-primary-400" />
              <span className="text-xl font-bold">{brandName}</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              {isVietnamese 
                ? 'Thành thạo trí tuệ nhân tạo thông qua các hướng dẫn thực hành, công cụ mạnh mẽ và cộng đồng hỗ trợ. Bắt đầu hành trình AI của bạn ngay hôm nay.'
                : 'Master artificial intelligence through practical tutorials, powerful tools, and a supportive community. Start your AI journey today.'
              }
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                const isExternal = social.href.startsWith('http')
                
                if (isExternal) {
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                      aria-label={social.name}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  )
                }
                
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Learn */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {isVietnamese ? 'Học' : 'Learn'}
            </h3>
            <ul className="space-y-2">
              {footerLinks.learn.map((link) => {
                const isAnchor = link.href.startsWith('#')
                const isExternal = link.href.startsWith('http')
                
                if (isAnchor) {
                  return (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  )
                }
                
                if (isExternal) {
                  return (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  )
                }
                
                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {isVietnamese ? 'Hỗ trợ' : 'Support'}
            </h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              {copyrightText}
            </p>
            <div className="flex items-center space-x-1 text-gray-400 text-sm mt-4 md:mt-0">
              <Mail className="h-4 w-4" />
              <span>hello@aitutorialhub.com</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
