import { Menu } from "./_components/Menu";
import { Header } from "./_components/Header";
import { server } from "@/hooks";
import { GridIssues } from "./_components/GridIssues";
import { filterIssues } from "@/utils";
import { Metadata } from "next";
import { MainLayout } from "@/components/layouts/MainLayout";
import { Nav } from "./_components/Nav";

export async function generateMetadata(): Promise<Metadata> {
  const user = await server.useFetchUserInfo();

  return {
    title: `${user.name}(@${user.login}) • Issuegram 게시물`,
  };
}

export default async function Home() {
  const issues = await server.useFetchIssues();

  return (
    <div className="flex size-full">
      <Nav activeItem="프로필" />

      <MainLayout>
        <Header />

        <Menu type="normal" />

        <GridIssues issues={filterIssues(issues, "normal")} />
      </MainLayout>
    </div>
  );
}
