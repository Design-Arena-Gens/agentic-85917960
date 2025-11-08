import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mumbai Google LeadGen',
  description: 'Generate and qualify business leads for Google services/products in Mumbai',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <header className="header">
            <h1>Mumbai Google LeadGen</h1>
            <p>Generate and qualify business leads for Google solutions in Mumbai.</p>
          </header>
          <main>{children}</main>
          <footer className="footer">Built for fast Vercel deployment</footer>
        </div>
      </body>
    </html>
  );
}
