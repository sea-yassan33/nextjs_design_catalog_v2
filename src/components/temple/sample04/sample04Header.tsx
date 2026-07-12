import Link from "next/link";
export default function Sample04Header() {
    const navLinks = ["私たちについて", "事業内容", "実績紹介", "お知らせ", "会社概要"];
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
            <div className="max-w-[1040px] mx-auto px-6 h-14 flex items-center justify-between">
                <span className="font-bold text-lg tracking-tight text-black">Sample</span>
                <nav className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link}
                            href={`#${link}`}
                            className="text-sm text-gray-700 hover:text-black transition-colors"
                        >
                            {link}
                        </Link>
                    ))}
                </nav>
                <button className="bg-black text-white text-sm px-4 py-2 rounded hover:bg-gray-800 transition-colors">
                    お問い合わせ ↗
                </button>
            </div>
        </header>
    );
}