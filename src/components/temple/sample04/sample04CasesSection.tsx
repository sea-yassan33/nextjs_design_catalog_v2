"use client";
import { useState } from "react";
import Image from "next/image";
const IMG = "/sample_img.svg";
export default function Sample04CasesSection() {
  const [offset, setOffset] = useState(0);
  const cases = [
    {
      title: "データ対応ダッシュボードの導入",
      desc: "複数系統データをリアルタイムで可視化するダッシュボードを導入。経営陣の意思決定を加速しました。",
    },
    {
      title: "カスタマーサポート業務のAI化",
      desc: "問い合わせ対応にAIチャットボットを導入し、対応時間の短縮と顧客満足度の向上を実現しました。",
    },
    {
      title: "営業レポート作成フローの自動化",
      desc: "Excel・CRMからの自動集計で週次レポート作成を90%短縮。営業チームの戦略時間を創出しました。",
    },
    {
      title: "社内ナレッジの構築",
      desc: "散在していた業務ナレッジをAI検索可能な社内Wikiとして統合。オンボーディング期間を半減しました。",
    },
  ];

  const cardW = 240;
  const maxOffset = cases.length - 1;

  return (
    <section id="実績紹介" className="py-20 bg-white">
      <div className="max-w-[1040px] mx-auto px-6">
        <p className="text-xs text-gray-400 tracking-widest uppercase mb-2">
          Our Work
        </p>
        <h2 className="text-2xl font-bold text-black mb-8">実績紹介</h2>
        <div className="overflow-hidden">
          <div
            className="flex gap-4 transition-transform duration-300"
            style={{ transform: `translateX(-${offset * (cardW + 16)}px)` }}
          >
            {cases.map((c, i) => (
              <div key={i} className="flex-shrink-0 w-60">
                <div className="relative w-full aspect-[4/3] mb-3 overflow-hidden rounded">
                  <Image
                    src={IMG}
                    alt={c.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-sm font-bold text-black mb-1 leading-snug">
                  {c.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-2 mt-6">
          <button
            onClick={() => setOffset(Math.max(0, offset - 1))}
            className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-sm hover:bg-gray-100 transition-colors disabled:opacity-30"
            disabled={offset === 0}
          >
            ←
          </button>
          <button
            onClick={() => setOffset(Math.min(maxOffset, offset + 1))}
            className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-sm hover:bg-gray-100 transition-colors disabled:opacity-30"
            disabled={offset === maxOffset}
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
