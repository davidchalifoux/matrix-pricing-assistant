import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	variable: "--font-sans",
});

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Matrix Pricing Assistant | Generate eCommerce SKU Variants & Pricing",
	description:
		"Build product variant matrices, generate SKU combinations, calculate option-based cost and price modifiers, and export listings as CSV.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`dark ${jetbrainsMono.variable}`}>
			<body className={`${geistSans.variable} antialiased`}>
				{children}
				<Analytics />
			</body>
		</html>
	);
}
