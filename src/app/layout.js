import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata = {
  title: "TileVista — Discover Your Perfect Aesthetic",
  description:
    "Premium tile gallery showcasing ceramic, marble, mosaic and artisan tiles from around the world.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="tilegallery">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body bg-tile-light text-tile-charcoal antialiased">
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              fontFamily: "'DM Sans', sans-serif",
              background: "#2C2C2C",
              color: "#FAF8F5",
              border: "1px solid #8B6914",
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
