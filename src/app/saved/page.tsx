import { Menu } from "../_components/Menu";
import { Header } from "../_components/Header";
import { server } from "@/hooks";
import { type Metadata } from "next";
import { GridIssues } from "../_components/GridIssues";
import { filterIssues } from "@/utils";

export async function generateMetadata(): Promise<Metadata> {
  const user = await server.useFetchUserInfo();

  return {
    title: `${user.name}(@${user.login}) • Issuegram 저장됨`,
  };
}

export default async function Saved() {
  const issues = await server.useFetchIssues();

  return (
    <div>
      <Header />

      <Menu type="saved" />

      <GridIssues issues={filterIssues(issues, "saved")} />
    </div>
  );
}
