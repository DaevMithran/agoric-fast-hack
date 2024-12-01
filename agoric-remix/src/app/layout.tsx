import { Inter } from 'next/font/google'
import { Terminal } from '@/components/terminal'
import { Sidebar } from '@/components/sidebar'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#1a1b1c] text-white`}>
        <div className="flex h-screen">
          <Sidebar />
          <main className="flex-1 overflow-hidden pb-48">
            {children}
          </main>
          <Terminal />
        </div>
      </body>
    </html>
  )
}

