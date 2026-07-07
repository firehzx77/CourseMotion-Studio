import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CourseMotion Studio",
  description: "课程大纲后处理工作流平台"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
