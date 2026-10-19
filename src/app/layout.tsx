import type { Metadata } from 'next';
import { Cormorant_Garamond, Playfair_Display, Inter, Poppins } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
// import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SmoothScrollProvider } from '@/components/common/SmoothScrollProvider';
import { SareeLoader } from '@/components/common/SareeLoader';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MONARCH — A Legacy Woven in Elegance | Luxury Indian Ethnic Wear',
  description:
    'Step into MONARCH, a luxury Indian fashion house combining royal Indian heritage, 24k gold zari handlooms, bespoke bridal lehengas, and imperial sherwanis.',
  keywords: [
    'Indian luxury ethnic wear',
    'Bridal Lehengas',
    'Royal Sherwanis',
    'Banarasi Sarees',
    'Indian haute couture',
    'Zardozi embroidery',
    'MONARCH',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${playfair.variable} ${inter.variable} ${poppins.variable} antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preload" href="/images/saree-pattern.jpg" as="image" fetchPriority="high" />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen flex flex-col bg-monarch-ivory text-monarch-charcoal selection:bg-monarch-maroon selection:text-monarch-gold-light"
      >
        <CartProvider>
          <WishlistProvider>
            {/* <AnnouncementBar /> */}
            <Header />
            <SmoothScrollProvider>
              <SareeLoader />
              <main className="flex-1">{children}</main>
            </SmoothScrollProvider>
            <Footer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
