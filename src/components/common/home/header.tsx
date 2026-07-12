"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
//ヘッダーリンク
const headerLinks = [
  { label: "ホーム", href: "/" },
  { label: "テンプレート", href: "/design" },
];
export default function Header() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);
  return (
    <header className="sticky px-4 top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/icon.png" alt="logo" width={50} height={50} />
            <h1 className="text-xl font-semibold text-blue-900">
              デザイン★カタログ
            </h1>
          </Link>
          <nav
            className="hidden md:flex items-center gap-6"
            aria-label="メインメニュー"
          >
            {headerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm hover:text-blue-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="outline" className="hidden md:inline-flex">
              デザイン★カタログについて
            </Button>
          </Link>
          {/* <Button className="hidden bg-gray-900 text-white hover:bg-gray-800 md:inline-flex">
            問い合わせ
          </Button> */}
          {/* ハンバーガーボタン */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-controls="mobile-menu"
            aria-expanded={open}
            aria-label="メニューを開閉"
            onClick={() => setOpen((v) => !v)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
      {/* SP_ハンバーガーメニュー */}
      {open && (
        <div
          id="mobile-menu"
          className="md:hidden border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        >
          <nav
            className="container py-4 flex flex-col gap-3"
            aria-label="モバイルメニュー"
          >
            {headerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm py-2 hover:text-blue-600 transition-colors"
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 flex flex-col gap-2">
              <Link href="/">
                <Button variant="outline" onClick={closeMenu}>
                  デザイン★カタログについて
                </Button>
              </Link>
              {/* <Button
                className="bg-gray-900 text-white hover:bg-gray-800"
                onClick={closeMenu}
              >
                問い合わせ
              </Button> */}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
