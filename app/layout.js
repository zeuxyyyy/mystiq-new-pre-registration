// app/layout.js
import { Inter } from 'next/font/google';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'MystiQ - Anonymous College Chat Waitlist',
  description: 'Join the waitlist for MystiQ, the first anonymous chat app exclusively for college students.',
  keywords: 'college chat, anonymous chat, student app, campus community',
  openGraph: {
    title: 'MystiQ - Anonymous College Chat',
    description: 'The first anonymous chat app for college students',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MystiQ - Anonymous College Chat',
    description: 'Join the waitlist for early access',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}