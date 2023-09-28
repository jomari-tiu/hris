import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import { cookies } from "next/headers";

import Layout from "@/components/Layout";
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
      <Head>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/logo/logo.png"
        />
      </Head>
      <body className={inter.className}>
        <QueryProvider>
          <Layout>{children}</Layout>
        </QueryProvider>
        {/* {token ? <Layout>{children}</Layout> : <Login />} */}
      </body>
    </html>
  );
}
export default RootLayout;
