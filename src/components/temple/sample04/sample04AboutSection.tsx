import Image from "next/image";
const IMG = "/sample_img.svg";

export default function Sample04AboutSection() {
  return (
    <section id="私たちについて" className="py-20 bg-white">
      <div className="max-w-[1040px] mx-auto px-6">
        <p className="text-center text-xs text-gray-400 tracking-widest uppercase mb-4">
          About
        </p>
        <h2 className="text-center text-2xl font-bold text-black mb-6">
          私たちについて
        </h2>
        <p className="text-center text-sm text-gray-600 leading-relaxed max-w-2xl mx-auto mb-4">
          【smple】は、AIデジタル技術を活用して企業の業務効率化を支援するテクノロジーパートナーです。
        </p>
        <p className="text-center text-sm text-gray-600 leading-relaxed max-w-2xl mx-auto mb-10">
          日々の業務に追われる現代のビジネス界で「AI活用」「カスタム開発」「戦略提案」「データ活用」「変革づくり」に向き合い、企業の成長を支える最大限のお役立ちができるよう努めています。
          <br />
          私たちは、テクノロジーを単なる技術的な方法だけでなく、より人が成功のために積極的に参加するための道具として提供できるよう取組んでいます。
        </p>
        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="relative aspect-[4/3] overflow-hidden rounded"
            >
              <Image
                src={IMG}
                alt={`about-${i}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
