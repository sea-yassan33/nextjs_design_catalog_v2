import type { Metadata } from "next";
import urlConfig from "@/config/propaties";
import { GithubRepoUrl } from "@/components/common/parts/gitRepoUrl";
import Sample04Header from "@/components/temple/sample04/sample04Header";
import Sample04HeroSection from "@/components/temple/sample04/sample04HeroSection";
import Sample04AboutSection from "@/components/temple/sample04/sample04AboutSection";
import Sample04BusinessSection from "@/components/temple/sample04/sample04BusinessSection";
import Sample04CasesSection from "@/components/temple/sample04/sample04CasesSection";
import Sample04NewsSection from "@/components/temple/sample04/smple04NewsSection";
import Sample04CompanySection from "@/components/temple/sample04/sample04CompanySection";
import Sample04ContactSection from "@/components/temple/sample04/sample04ContactSection";
import Sample04Footer from "@/components/temple/sample04/sample04Footer";
// メタデータ設定
export const metadata: Metadata = {
  title: "NDC|サンプル04",
  description: "デザインカタログ|コーポレートサイトトップ画面",
};
// gitHubリポジトリURL
const sampleno = "04";
const gitHubRepoUrl = `${urlConfig.githubUrl}design/sample${sampleno}/page.tsx`;
export default function Sample04() {
  return (
    <>
      <Sample04Header />
      <main>
        <Sample04HeroSection />
        <Sample04AboutSection />
        <Sample04BusinessSection />
        <Sample04CasesSection />
        <Sample04NewsSection />
        <Sample04CompanySection />
        <Sample04ContactSection />
      </main>
      <Sample04Footer />
      {gitHubRepoUrl ? (
        <GithubRepoUrl gitRepo={{ url: gitHubRepoUrl }} />
      ) : null}
    </>
  );
}
