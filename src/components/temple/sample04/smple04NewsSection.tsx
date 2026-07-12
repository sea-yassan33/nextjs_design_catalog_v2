export default function Sample04NewsSection() {
  const news = [
    {
      date: "2026/05/10",
      cat: "お知らせ",
      title: "コーポレートサイトをリニューアルしました",
    },
    {
      date: "2026/05/05",
      cat: "サービス",
      title: "AIアシスタント導入支援サービスを開始しました",
    },
    { date: "2026/05/01", cat: "お知らせ", title: "会社移転のお知らせ" },
    {
      date: "2026/04/20",
      cat: "お知らせ",
      title: "春採用のエントリーを受付開始しました",
    },
  ];

  return (
    <section id="お知らせ" className="py-20 bg-gray-50">
      <div className="max-w-[1040px] mx-auto px-6">
        <p className="text-xs text-gray-400 tracking-widest uppercase mb-2">
          News
        </p>
        <h2 className="text-2xl font-bold text-black mb-8">お知らせ</h2>
        <div className="space-y-0">
          {news.map((n, i) => (
            <div
              key={i}
              className="flex items-start gap-6 py-4 border-t border-gray-200 last:border-b"
            >
              <span className="text-xs text-gray-400 w-24 flex-shrink-0 pt-0.5">
                {n.date}
              </span>
              <span className="text-xs text-black bg-gray-200 px-2 py-0.5 rounded flex-shrink-0">
                {n.cat}
              </span>
              <a
                href="#"
                className="text-sm text-black hover:underline leading-snug"
              >
                {n.title}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
