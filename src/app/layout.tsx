import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VoxMidnight — Private On-Chain Governance & Voting on Midnight Network",
  description: "Level-3 Compliant Decentralized Anonymous Governance Protocol powered by Midnight Network, Compact Smart Contracts and Zero-Knowledge Proofs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen antialiased bg-obsidian-950 text-slate-100 selection:bg-lunar-teal/30 selection:text-lunar-teal">
        {children}
      </body>
    </html>
  );
}
