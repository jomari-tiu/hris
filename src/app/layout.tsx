import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import Layout from "@/components/Layout";
import Login from "@/components/Layout/Login";
import QueryProvider from "@/components/QueryProvider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "HRIS",
    template: "%s | HKIS",
  },
  description: "",
};

function RootLayout({
  children,
}: {
  children: React.ReactNode;
  message: string;
}) {
  const token = cookies()?.get("user")?.value;
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <Layout>{children}</Layout>
          {/* {token ? <Layout>{children}</Layout> : <Login />} */}
        </QueryProvider>
      </body>
    </html>
  );
}
export default RootLayout;
