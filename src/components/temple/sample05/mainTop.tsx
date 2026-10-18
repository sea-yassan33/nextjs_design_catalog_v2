import Image from "next/image";
import Link from "next/link";
import { Shippori_Mincho, Zen_Kaku_Gothic_New } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const mincho = Shippori_Mincho({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-mincho",
});
const gothic = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-gothic",
});

const IMG = "/sample_img.svg";

/* palette: 潮白 #F5F6F3 / 夜の海 #1E2B31 / 流木 #8C7B66 / 海硝子 #8FB3AE / 泡 #E4EBE8 */

const nav = [
  { href: "#about", label: "店について" },
  { href: "#menu", label: "お品書き" },
  { href: "#goods", label: "物販" },
  { href: "#access", label: "お店の場所" },
];

const tides = [
  { label: "満潮", time: "05:42", note: "窓際の席まで波音が届く時間" },
  { label: "干潮", time: "11:58", note: "浜に下りて珈琲を持ち出せます" },
  { label: "満潮", time: "18:15", note: "夕凪。深煎りがよく合います" },
];

const drinks = [
  {
    name: "Sampleブレンド",
    price: "¥580",
    desc: "深煎り。苦味のあとに潮風のような軽さ",
  },
  {
    name: "浜昼顔ラテ",
    price: "¥650",
    desc: "中煎りのエスプレッソとやわらかなミルク",
  },
  {
    name: "水出し珈琲",
    price: "¥620",
    desc: "十二時間かけて落とした一杯。夏季のみ",
  },
  {
    name: "柑橘ソーダ",
    price: "¥550",
    desc: "地元の夏みかんを搾ったシロップで",
  },
];

const foods = [
  { name: "しらすとチーズのトースト", price: "¥880" },
  { name: "鯵フライのサンド", price: "¥1,100" },
  { name: "焼きプリン", price: "¥520" },
  { name: "季節の果実タルト", price: "¥640" },
];

const goods = [
  { name: "Sampleブレンド 200g", price: "¥1,600" },
  { name: "ドリップバッグ 5袋", price: "¥900" },
  { name: "流木のコースター", price: "¥1,200" },
  { name: "店名入りマグ", price: "¥2,800" },
];

function Vertical({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`font-[family-name:var(--font-mincho)] text-[#1E2B31] [writing-mode:vertical-rl] tracking-[0.3em] ${className}`}
    >
      {children}
    </h2>
  );
}

/* 署名要素：セクションの境目を「潮位線」で区切る */
function TideLine() {
  return (
    <svg
      viewBox="0 0 1200 40"
      preserveAspectRatio="none"
      aria-hidden
      className="h-6 w-full text-[#8FB3AE]"
    >
      <path
        d="M0 20 Q 75 4 150 20 T 300 20 T 450 20 T 600 20 T 750 20 T 900 20 T 1050 20 T 1200 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M0 28 Q 100 16 200 28 T 400 28 T 600 28 T 800 28 T 1000 28 T 1200 28"
        fill="none"
        stroke="currentColor"
        strokeOpacity=".45"
        strokeWidth="1"
      />
    </svg>
  );
}

export default function MainTop() {
  return (
    <div
      className={`${mincho.variable} ${gothic.variable} min-h-screen bg-[#F5F6F3] font-[family-name:var(--font-gothic)] text-[#1E2B31]`}
    >
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-[#E4EBE8] bg-[#F5F6F3]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-8">
          <Link
            href="/"
            className="font-[family-name:var(--font-mincho)] text-lg tracking-[0.25em]"
          >
            SAMPLE喫茶
          </Link>
          <nav
            aria-label="メインメニュー"
            className="hidden gap-8 text-sm md:flex"
          >
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="rounded-sm hover:text-[#8C7B66] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8FB3AE]"
              >
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero：アーチ窓から海を見る */}
      <section className="mx-auto grid max-w-6xl gap-10 px-4 pb-16 pt-12 md:grid-cols-[1fr_auto] md:px-8 md:pt-20">
        <div className="overflow-hidden rounded-t-[999px] bg-[#E4EBE8]">
          <Image
            src={IMG}
            alt="店内の窓から望む海"
            width={960}
            height={720}
            priority
            className="h-[60vh] w-full object-cover"
          />
        </div>
        <div className="flex justify-center gap-6 md:flex-col md:justify-start">
          <h1 className="font-[family-name:var(--font-mincho)] text-3xl leading-[2.2] tracking-[0.35em] [writing-mode:vertical-rl] md:text-4xl">
            波の音を、
            <br />
            一杯のそばに。
          </h1>
          <p className="text-xs tracking-[0.3em] text-[#8C7B66] [writing-mode:vertical-rl]">
            海まで徒歩三十秒の珈琲店
          </p>
        </div>
      </section>

      {/* 今日の潮 */}
      <section
        aria-labelledby="tide"
        className="mx-auto max-w-6xl px-4 md:px-8"
      >
        <TideLine />
        <div className="grid gap-6 py-10 md:grid-cols-[10rem_1fr]">
          <p
            id="tide"
            className="font-[family-name:var(--font-mincho)] text-sm tracking-[0.3em] text-[#8C7B66]"
          >
            今日の潮
          </p>
          <dl className="grid gap-6 sm:grid-cols-3">
            {tides.map((t) => (
              <div key={t.time} className="border-l border-[#8FB3AE] pl-4">
                <dt className="text-xs tracking-widest text-[#8C7B66]">
                  {t.label}
                </dt>
                <dd className="font-[family-name:var(--font-mincho)] text-3xl tabular-nums">
                  {t.time}
                </dd>
                <dd className="mt-1 text-xs leading-relaxed text-[#1E2B31]/70">
                  {t.note}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <TideLine />
      </section>

      {/* About */}
      <section
        id="about"
        className="mx-auto grid max-w-6xl scroll-mt-20 gap-10 px-4 py-24 md:grid-cols-[auto_1fr_1fr] md:px-8"
      >
        <Vertical className="text-2xl md:text-3xl">店について</Vertical>
        <div className="space-y-6 text-sm leading-[2.2]">
          <p>
            SampleTextサンプルテキストSampleTextサンプルテキストSampleTextサンプルテキスト。
          </p>
          <p>
            SampleTextサンプルテキストSampleTextサンプルテキストSampleTextサンプルテキストSampleTextサンプルテキスト。
          </p>
          <p>SampleTextサンプルテキストSampleTextサンプルテキスト。</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Image
            src={IMG}
            alt="焙煎機"
            width={400}
            height={520}
            className="aspect-[4/5] w-full object-cover"
          />
          <Image
            src={IMG}
            alt="カウンター席"
            width={400}
            height={520}
            className="mt-12 aspect-[4/5] w-full object-cover"
          />
        </div>
      </section>
      {/* Menu */}
      <section id="menu" className="scroll-mt-20 bg-[#E4EBE8]/60 py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 md:grid-cols-[auto_1fr] md:px-8">
          <Vertical className="text-2xl md:text-3xl">お品書き</Vertical>
          <div className="space-y-16">
            <div>
              <h3 className="mb-6 font-[family-name:var(--font-mincho)] tracking-[0.3em]">
                お飲み物
              </h3>
              <ul className="grid gap-8 sm:grid-cols-2">
                {drinks.map((d) => (
                  <li key={d.name} className="grid grid-cols-[6rem_1fr] gap-4">
                    <Image
                      src={IMG}
                      alt={d.name}
                      width={96}
                      height={96}
                      className="aspect-square rounded-full object-cover"
                    />
                    <div>
                      <p className="flex justify-between font-[family-name:var(--font-mincho)]">
                        <span>{d.name}</span>
                        <span className="tabular-nums">{d.price}</span>
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-[#1E2B31]/70">
                        {d.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <Separator className="bg-[#8FB3AE]/50" />
            <div>
              <h3 className="mb-6 font-[family-name:var(--font-mincho)] tracking-[0.3em]">
                お食事・甘味
              </h3>
              <ul className="grid gap-x-12 gap-y-4 sm:grid-cols-2">
                {foods.map((f) => (
                  <li
                    key={f.name}
                    className="flex items-baseline gap-3 text-sm"
                  >
                    <span>{f.name}</span>
                    <span
                      aria-hidden
                      className="flex-1 border-b border-dotted border-[#8C7B66]/50"
                    />
                    <span className="tabular-nums">{f.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* Goods */}
      <section
        id="goods"
        className="mx-auto max-w-6xl scroll-mt-20 px-4 py-24 md:px-8"
      >
        <div className="mb-10 flex items-end justify-between gap-4">
          <h2 className="font-[family-name:var(--font-mincho)] text-2xl tracking-[0.3em]">
            物販
          </h2>
          <p className="text-xs text-[#8C7B66]">店頭のみの取り扱いです</p>
        </div>
        <ul className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {goods.map((g) => (
            <li key={g.name}>
              <Image
                src={IMG}
                alt={g.name}
                width={300}
                height={300}
                className="aspect-square w-full bg-[#E4EBE8] object-cover"
              />
              <p className="mt-3 text-sm">{g.name}</p>
              <p className="text-xs tabular-nums text-[#8C7B66]">{g.price}</p>
            </li>
          ))}
        </ul>
      </section>
      {/* Access */}
      <section
        id="access"
        className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-24 md:px-8"
      >
        <TideLine />
        <div className="grid gap-10 pt-16 md:grid-cols-[auto_1fr_1fr]">
          <Vertical className="text-2xl md:text-3xl">お店の場所</Vertical>
          <Image
            src={IMG}
            alt="周辺地図"
            width={560}
            height={400}
            className="w-full border border-[#E4EBE8] object-cover"
          />
          <div className="space-y-6 text-sm leading-loose">
            <dl className="grid grid-cols-[5rem_1fr] gap-y-2">
              <dt className="text-[#8C7B66]">住所</dt>
              <dd>SAMPLE県ABCD町一丁目二番</dd>
              <dt className="text-[#8C7B66]">営業</dt>
              <dd>7:00 – 18:00（荒天時は早仕舞い）</dd>
              <dt className="text-[#8C7B66]">定休</dt>
              <dd>水曜日</dd>
              <dt className="text-[#8C7B66]">電話</dt>
              <dd>012-000-0000</dd>
            </dl>
            <Button
              asChild
              className="rounded-none bg-[#1E2B31] px-8 tracking-widest hover:bg-[#8C7B66]"
            >
              <div>地図アプリで開く</div>
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-[#1E2B31] py-12 text-center text-[#F5F6F3]">
        <p className="font-[family-name:var(--font-mincho)] text-lg tracking-[0.3em]">
          SAMPLE喫茶店
        </p>
        <p className="mt-4 text-xs text-[#F5F6F3]/60">© Sample Coffee</p>
      </footer>
    </div>
  );
}
