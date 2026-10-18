import type { Metadata } from "next";
import urlConfig from "@/config/propaties";
import { GithubRepoUrl } from "@/components/common/parts/gitRepoUrl";
import MainTop from "@/components/temple/sample05/mainTop";
// メタデータ設定
export const metadata: Metadata = {
  title: "NDC|サンプル05",
  description: "デザインカタログ|喫茶店用トップ画面",
};
// gitHubリポジトリURL
const sampleno = "05";
const gitHubRepoUrl = `${urlConfig.githubUrl}design/sample${sampleno}/page.tsx`;
export default function Sample05() {
  return (
    <>
      <main>
        <MainTop />
      </main>
      {gitHubRepoUrl ? (
        <GithubRepoUrl gitRepo={{ url: gitHubRepoUrl }} />
      ) : null}
    </>
  );
}
