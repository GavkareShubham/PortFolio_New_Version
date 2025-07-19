import { Outfit, Ovo } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],weight:["400","500","600","700"]
});

const ovo = Ovo({
  subsets: ["latin"],weight:["400"]
});

export const metadata = {
  title: "Shubham Gavkare - Portfolio",
  description: "This is Shubham's portfolio website showcasing my work and skills.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth ">
      <body
        className={`${outfit.className} ${ovo.className} antialiased  leading-1 overflow-x-hidden `}   // dark:bg-darkTheme dark:text-white
      >
        {children}
      </body>
    </html>
  );
}
