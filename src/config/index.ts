type FooterLink = { link: string; value: string };

const config: {
  domain: string;
  port: number;
  github: {
    owner: string;
    repo: string;
    accessToken: string | undefined;
    readmePath: string;
  };
  footerLinks: FooterLink[];
} = {
  domain: "lightpavilion.site",
  port: 3000,
  github: {
    owner: "junghyunbak",
    repo: "junghyunbak",
    accessToken: process.env.GITHUB_ACCESS_TOKEN,
    readmePath: "/intro",
  },
  footerLinks: [
    { link: "https://github.com/junghyunbak", value: "Github" },
    { link: "https://www.instagram.com/__cxxlxxhxxn/", value: "Instagram" },
    { link: "https://www.acmicpc.net/user/jeong5728", value: "Baekjoon" },
    { link: "https://ipwag.tistory.com/", value: "Tistory" },
    { link: "mailto:jeong5728@gmail.com", value: "Gmail" },
  ],
};

export default config;
