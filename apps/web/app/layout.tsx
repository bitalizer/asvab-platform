import type { Metadata } from 'next';
import { Instrument_Serif, Inter, Inter_Tight, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const interTight = Inter_Tight({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter-tight',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  variable: '--font-instrument-serif',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  title: 'MissionReady',
  description: 'Pass the ASVAB. Pick the job you actually want.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // data-theme is hardcoded to "light"; a theme switcher lands in a later plan that adds the Appearance settings tab.
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${inter.variable} ${interTight.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
