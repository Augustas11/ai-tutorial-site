import Link from 'next/link'
import { Zap, Mail, Twitter, Github, Linkedin } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  const footerLinks = {
    learn: [
      { name: t('nav.tutorials'), href: '/tutorials' },
      { name: t('nav.tools'), href: '/tools' },
      { name: 'Resources', href: '/resources' },
      { name: t('nav.community'), href: '/community' },
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Status', href: '/status' },
    ],
    company: [
      { name: 'About', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Careers', href: '/careers' },
      { name: 'Privacy', href: '/privacy' },
    ],
  }

  const socialLinks = [
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'GitHub', href: '#', icon: Github },
    { name: 'LinkedIn', href: '#', icon: Linkedin },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Zap className="h-8 w-8 text-primary-400" />
              <span className="text-xl font-bold">AI Tutorial Hub</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Master artificial intelligence through practical tutorials, powerful tools, 
              and a supportive community. Start your AI journey today.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Learn */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.learn')}</h3>
            <ul className="space-y-2">
              {footerLinks.learn.map((link) => (
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

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.support')}</h3>
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

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.company')}</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
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
              {t('footer.copyright')}
            </p>
            <div className="flex items-center space-x-1 text-gray-400 text-sm mt-4 md:mt-0">
              <Mail className="h-4 w-4" />
              <span>{t('footer.email')}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}