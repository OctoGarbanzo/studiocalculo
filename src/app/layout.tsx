
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from '@/hooks/use-language';

export const metadata: Metadata = {
  title: 'Calculus Cove',
  description: 'An interactive platform for learning calculus.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" integrity="sha384-n8MVd4RsNIU0KOVEMVIgtUIk/dpYNcNZCDenw5BXhEV8MNEP/m+SrOTUSOJNANS2" crossOrigin="anonymous" />
      </head>
      <body className="font-body antialiased">
        <LanguageProvider>
            {children}
        </LanguageProvider>
        <Toaster />
      </body>
    </html>
  );
}
