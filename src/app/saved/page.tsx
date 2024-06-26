import { Menu } from "../_components/Menu";
import { Header } from "../_components/Header";
import { server } from "@/hooks";
import { type Metadata } from "next";
import { GridIssues } from "../_components/GridIssues";
import { filterIssues } from "@/utils";
import { HiddenMobileLayout } from "@/components/layouts/HiddenMobileLayout";
import { ShowMobileLayout } from "@/components/layouts/ShowMobileLayout";

export async function generateMetadata(): Promise<Metadata> {
  const user = await server.useFetchUserInfo();

  return {
    title: `${user.name}(@${user.login}) • Issuegram 저장됨`,
  };
}

export default async function Saved() {
  const issues = await server.useFetchIssues();

  const filteredIssues = filterIssues(issues, "saved");

  return (
    <div>
      <Header />

      <Menu type="saved" />

      <HiddenMobileLayout>
        <GridIssues issues={filteredIssues} lineCount={4} />
      </HiddenMobileLayout>

      <ShowMobileLayout>
        <GridIssues issues={filteredIssues} />
      </ShowMobileLayout>
    </div>
  );
}
