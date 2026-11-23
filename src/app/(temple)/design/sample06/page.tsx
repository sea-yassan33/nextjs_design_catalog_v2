import type { Metadata } from "next";
import urlConfig from "@/config/propaties";
import { GithubRepoUrl } from "@/components/common/parts/gitRepoUrl";
import { IBM_Plex_Sans_JP } from "next/font/google";
import ContentFormAndList from "@/components/temple/sample06/contentFormAndList";
const plex = IBM_Plex_Sans_JP({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});
// メタデータ設定
export const metadata: Metadata = {
  title: "NDC|サンプル04",
  description: "デザインカタログ|コーポレートサイトトップ画面",
};
// gitHubリポジトリURL
const sampleno = "06";
const gitHubRepoUrl = `${urlConfig.githubUrl}design/sample${sampleno}/page.tsx`;
export default function Sample06() {
  return (
    <>
      <main>
        <div
          className={`${plex.className} min-h-screen bg-[#EDF0F2] text-[#1F2A33]`}
        >
          {/* ヘッダー */}
          <header className="border-b border-[#CBD3DA] bg-white">
            <div className="mx-auto flex max-w-5xl items-baseline justify-between px-4 py-4 sm:px-6">
              <h1 className="text-lg font-bold tracking-wide">
                コンテンツ管理
              </h1>
            </div>
          </header>
          <div className="mx-auto max-w-5xl space-y-10 px-4 py-8 sm:px-6">
            {/*  登録フォーム・一覧 */}
            <ContentFormAndList />
          </div>
        </div>
      </main>
      {gitHubRepoUrl ? (
        <GithubRepoUrl gitRepo={{ url: gitHubRepoUrl }} />
      ) : null}
    </>
  );
}
