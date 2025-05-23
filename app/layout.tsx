import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "@/src/providers/query-providers";
import { AuthProvider } from "@/src/contexts/auth_context";
import { SocketProvider } from "@/src/providers/socket-provider";


export const metadata: Metadata = {
  title: "ORBISQ",
  description: "ORBISQ RMS",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-white text-black antialiased`}
      >
        <AuthProvider>
          <ReactQueryProvider>
            <SocketProvider>
              {children}
            </SocketProvider>
          </ReactQueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
