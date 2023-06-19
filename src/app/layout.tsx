import "./globals.css";
import { Inter } from "next/font/google";
import ProviderWrapper from "./ProviderWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Auth",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-300  mx-auto p-4`}>
        <ProviderWrapper>{children}</ProviderWrapper>
      </body>
    </html>
  );
}
