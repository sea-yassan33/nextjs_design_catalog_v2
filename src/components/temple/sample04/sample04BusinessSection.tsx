import Image from "next/image";
const IMG = "/sample_img.svg";

export default function Sample04BusinessSection() {
  const services = [
    {
      title: "AIアシスタント導入支援",
      desc: "社内向けにAIを活用した業務を整備することを得意とし、社内で蓄積したナレッジや文書の整理、データ管理、日々の業務との連携をサポートします。DXの推進を着実なスタートで支えます。",
    },
    {
      title: "業務自動化ソリューション",
      desc: "繰り返し発生する定型業務を効率化します。ワークフローの自動化ツールを用いた設計・開発・実装を担い、事業作業時間のコストの削減化、人的ミスの軽減化を目指します。",
    },
    {
      title: "データ活用・分析支援",
      desc: "貴社が保有するデータを事業価値へと転換します。分析基盤の構築から定期レポートの自動化、ダッシュボードの提供まで、より一体の判断を意思決定できる環境を整えます。",
    },
  ];
  return (
    <section id="事業内容" className="py-20 bg-gray-50">
      <div className="max-w-[1040px] mx-auto px-6">
        <p className="text-xs text-gray-400 tracking-widest uppercase mb-2">
          What We Do
        </p>
        <h2 className="text-2xl font-bold text-black mb-4">事業内容</h2>
        <p className="text-sm text-gray-600 leading-relaxed max-w-xl mb-3">
          AIコンサルティング事業を主軸に、データ可視化・業務効率化の支援など、企業の競争力を高めるスタートアップ型の事業を展開しています。
        </p>
        <p className="text-sm text-gray-600 leading-relaxed max-w-xl mb-10">
          定型業務の効率化、情報共有の仕組みづくり、業務プロセスのスマート化を目指し、課題対応のスピード感を大切に、チームが各ステークホルダーと最善な価値が最大化できる環境を整備します。
        </p>
        {/* Large feature image */}
        <div className="relative w-full aspect-[16/7] mb-12 overflow-hidden rounded">
          <Image src={IMG} alt="business-main" fill className="object-cover" />
        </div>
        {/* Service list */}
        <div className="space-y-0">
          {services.map((s, i) => (
            <div
              key={i}
              className="flex gap-5 py-6 border-t border-gray-200 last:border-b"
            >
              <div className="relative w-28 h-20 flex-shrink-0 overflow-hidden rounded">
                <Image src={IMG} alt={s.title} fill className="object-cover" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-black mb-2">{s.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
