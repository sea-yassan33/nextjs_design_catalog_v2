export default function Sample04CompanySection() {
  const rows = [
    { label: "会社名", value: "株式会社XXXX" },
    { label: "創立", value: "2026年07月04日" },
    { label: "所在地", value: "〒123-4567 沖縄県富山市南区XXX（○○ビル）" },
    { label: "代表者", value: "代表取締役 山田 太郎" },
    { label: "資本金", value: "XXX万円" },
    { label: "従業員", value: "XX名（20XX年末現在）" },
    {
      label: "事業内容",
      value: "AIに活用、業務自動化、データ分析・支援、UI/UX構築",
    },
  ];

  return (
    <section id="会社概要" className="py-20 bg-white">
      <div className="max-w-[1040px] mx-auto px-6">
        <p className="text-xs text-gray-400 tracking-widest uppercase mb-2">
          Company
        </p>
        <h2 className="text-2xl font-bold text-black mb-8">会社概要</h2>
        <table className="w-full text-sm border-t border-gray-200">
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-gray-200">
                <td className="py-3 pr-8 text-gray-500 w-32 align-top">
                  {r.label}
                </td>
                <td className="py-3 text-black">{r.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
