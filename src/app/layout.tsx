import "../globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { siteContent } from "../data/content";

export const metadata = {
  title: siteContent.meta.title,
  description: siteContent.meta.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased text-gray-900 bg-gradient-to-br from-orange-100 via-rose-100 to-pink-200 flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
