import type { Metadata } from "next";
import urlConfig from "@/config/propaties";
import { GithubRepoUrl } from "@/components/common/parts/gitRepoUrl";
import { IconFire } from "@/components/common/icons/icons";
import Sample03Menu from "@/components/temple/sample03/sample03Menu";

// メタデータ設定
export const metadata: Metadata = {
  title: "NDC|サンプル03",
  description: "デザインカタログ|ダッシュボードデザイン",
};
// gitHubリポジトリURL
const sampleno = '01';
const gitHubRepoUrl = `${urlConfig.githubUrl}design/sample${sampleno}/page.tsx`;
export default function Sample03Page() {
  const today = new Date();
  const dateStr = today.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
  return (
    <main>
      <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
          <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-red-500">
              <IconFire />
              <span className="font-black text-base tracking-tight text-gray-900">
                本日のTRAINING
              </span>
            </div>
            <span className="text-xs text-gray-400">{dateStr}</span>
          </div>
        </div>
        {/* メニュー */}
        <Sample03Menu />
      </div>
      {gitHubRepoUrl ? <GithubRepoUrl gitRepo={{ url: gitHubRepoUrl }} /> : null}
    </main>
  );
}