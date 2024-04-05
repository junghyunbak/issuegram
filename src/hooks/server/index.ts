import config from "@/config";

// TODO: api 에러 예외처리

export const useFetchIssues = async (): Promise<Issues> => {
  const issues = (await fetch(
    `https://api.github.com/repos/${config.github.owner}/${config.github.repo}/issues?state=open&per_page=100`,
  ).then((value) => value.json())) as Issues;

  issues.sort((a: Issues[number], b: Issues[number]) => {
    if (a.assignee && !b.assignee) {
      return -1;
    } else if (!a.assignee && b.assignee) {
      return 1;
    } else {
      return new Date(a.created_at) > new Date(b.created_at) ? -1 : 1;
    }
  });

  return issues;
};

export const useFetchAnIssue = async (
  issueNumber: string,
): Promise<Issues[number]> => {
  const issue = (await fetch(
    `https://api.github.com/repos/${config.github.owner}/${config.github.repo}/issues/${issueNumber}`,
  ).then((value) => value.json())) as Issues[number];

  return issue;
};

export const useFetchUserInfo = async (): Promise<User> => {
  const user = (await fetch(
    `https://api.github.com/users/${config.github.owner}`,
  ).then((value) => value.json())) as User;

  return user;
};

export const useFetchReadme = async () => {
  const readme = await fetch(
    `https://api.github.com/repos/${config.github.owner}/${config.github.repo}/readme`,
  ).then((value) => value.json());

  return readme;
};
