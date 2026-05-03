import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Be_Vietnam_Pro } from "next/font/google";
import { Toaster } from "sonner";
import { QueryProvider } from "@/lib/providers";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dawlance Travel - AI-Powered Travel Planning",
  description:
    "Plan your perfect trip with AI-powered recommendations and personalized itineraries",
  keywords: ["travel", "AI", "itinerary", "vacation planning", "trip planner"],
  authors: [{ name: "Dawlance Travel" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#2A7BFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${beVietnamPro.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="bg-background text-foreground flex min-h-full flex-col"
      >
        <QueryProvider>{children}</QueryProvider>
        <Toaster position="bottom-right" richColors closeButton />
      </body>
    </html>
  );
}

// Made with Bob
