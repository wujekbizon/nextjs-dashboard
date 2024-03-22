import '@/app/ui/global.css';
import { inter, anaheim } from '@/app/ui/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${anaheim.className} antialiased`}>{children}</body>
    </html>
  );
}
