import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";
import Nav from "@/components/Nav";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
});

export const metadata: Metadata = {
  title: {
    default: "اتجاه القبلة ومواقيت الصلاة",
    template: "%s | القبلة",
  },
  description:
    "اعرف اتجاه القبلة بدقة من موقعك، ومواقيت الصلاة اليومية. صدقة جارية.",
  applicationName: "القبلة",
  appleWebApp: {
    capable: true,
    title: "القبلة",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b3d2e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Nav />
        <main className="flex-1 w-full max-w-md mx-auto px-4 py-6">
          {children}
        </main>
        <footer className="py-6 text-center text-sm text-emerald-100/70">
          صدقة جارية، لا تنسونا من صالح دعائكم
        </footer>
      </body>
    </html>
  );
}
