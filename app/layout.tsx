import type { Metadata } from 'next';
import { Figtree, Plaster } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import SupabaseProvider from '@/providers/SupabaseProvider';
import UserProvider from '@/providers/UserProvider';
import ModalProvider from '@/providers/ModalProvider';
import ToasterProvider from '@/providers/ToasterPorvider';
import getSongsByUserId from '@/action/getSongByUserId';
import Player from '@/components/Player';
import getActiveProductWithPrices from '@/action/getActiveProductWithPrices';

interface appProps {
  children: React.ReactNode;
}

const font = Figtree({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Spotify Clone',
  description: 'Listen to music!',
};

const RootLayout: React.FC<appProps> = async ({ children }) => {
  const userSongs = await getSongsByUserId();
  const products = await getActiveProductWithPrices();
  return (
    <html lang='en'>
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider products={products} />
            <Sidebar songs={userSongs}>{children}</Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
};

export default RootLayout;
