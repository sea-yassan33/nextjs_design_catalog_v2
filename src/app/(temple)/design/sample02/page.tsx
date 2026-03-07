import type { Metadata } from "next";
import urlConfig from "@/config/propaties";
import { GithubRepoUrl } from "@/components/common/parts/gitRepoUrl";
import { SidebarInset, SidebarProvider, } from '@/components/ui/sidebar'
import { Sample02AppSidebar } from "@/components/temple/sample02/appSidebar";
import { SiteHeader } from "@/components/temple/sample02/siteHeader";
import { SectionCards } from "@/components/temple/sample02/sectionCart";

// メタデータ設定
export const metadata: Metadata = {
  title: "NDC|サンプル02",
  description: "デザインカタログ|ダッシュボードデザイン",
};
// gitHubリポジトリURL
const sampleno = '01';
const gitHubRepoUrl = `${urlConfig.githubUrl}design/sample${sampleno}/page.tsx`;
export default function Sample02Page() {
  return (
    <main>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <Sample02AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <div>Sample02</div>
                <SectionCards />
                <SectionCards />
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
      {gitHubRepoUrl ? <GithubRepoUrl gitRepo={{ url: gitHubRepoUrl }} /> : null}
    </main>
  );
}