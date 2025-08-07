import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Diamond ZChain - Epic DeFi Gaming Protocol',
  description: 'Join the ultimate DeFi gaming experience. Farm legendary tokens, battle for $50K rewards, and ascend to immortal status.',
  generator: 'Diamond ZChain Gaming',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
