import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import HeaderStatic from '@/components/HeaderStatic'
import FooterStatic from '@/components/FooterStatic'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params
  
  const titles = {
    en: 'AI Creator School - Learn AI with Practical Examples',
    vn: 'Trường Sáng Tạo AI - Học AI với Ví dụ Thực tế'
  }
  
  const descriptions = {
    en: 'Master AI with tutorials, prompts, and automation tools. Learn practical AI applications step by step.',
    vn: 'Thành thạo AI với các hướng dẫn, gợi ý và công cụ tự động hóa. Học các ứng dụng AI thực tế từng bước.'
  }

  return {
    title: titles[lang as keyof typeof titles] || titles.en,
    description: descriptions[lang as keyof typeof descriptions] || descriptions.en,
    keywords: 'AI, artificial intelligence, tutorials, prompts, automation, machine learning',
  }
}

export default function LanguageLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  const { lang } = params

  return (
    <html lang={lang}>
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <HeaderStatic lang={lang} />
          <main className="flex-grow">
            {children}
          </main>
          <FooterStatic lang={lang} />
        </div>
      </body>
    </html>
  )
}