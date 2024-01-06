import "./globals.css";
import { Inter } from "next/font/google";
import ProviderWrapper from "./ProviderWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "310 Soft",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex justify-center items-center  bg-gray-300 `}
      >
        <ProviderWrapper>{children}</ProviderWrapper>
      </body>
    </html>
  );
}
