import config from "@/config";

// TODO: api 에러 예외처리
// TODO: 100 이상의 데이터를 가져오도록 수정

export const useFetchIssues = async (): Promise<Issues> => {
  const issues = (await fetch(
    `https://api.github.com/repos/${config.github.owner}/${config.github.repo}/issues?state=open&per_page=100`,
    {
      headers: { Authorization: `Bearer ${config.github.accessToken}` },
      next: {
        tags: ["issues"],
      },
    },
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
    {
      headers: { Authorization: `Bearer ${config.github.accessToken}` },
      next: {
        tags: [`issue-${issueNumber}`],
      },
    },
  ).then((value) => value.json())) as Issues[number];

  return issue;
};

export const useFetchUserInfo = async (): Promise<User> => {
  const user = (await fetch(
    `https://api.github.com/users/${config.github.owner}`,
    {
      headers: { Authorization: `Bearer ${config.github.accessToken}` },
    },
  ).then((value) => value.json())) as User;

  return user;
};

export const useFetchReadme = async () => {
  const readme = await fetch(
    `https://api.github.com/repos/${config.github.owner}/${config.github.repo}/readme`,
    {
      headers: { Authorization: `Bearer ${config.github.accessToken}` },
    },
  ).then((value) => value.json());

  return readme;
};

export const useFetchIssueComments = async (
  issueNumber: string,
): Promise<Comments> => {
  const comments = (await fetch(
    `https://api.github.com/repos/${config.github.owner}/${config.github.repo}/issues/${issueNumber}/comments?per_page=100`,
    {
      headers: { Authorization: `Bearer ${config.github.accessToken}` },
      next: {
        tags: [`issue-${issueNumber}-comments`],
      },
    },
  ).then((value) => value.json())) as Comments;

  return comments;
};

// TODO: 팔로워가 변할경우 반영되지 못할 경우를 대비 (예 - 캐시 사용하지 않도록 처리)

export const useFetchFollowers = async () => {
  const followers = await fetch(
    `https://api.github.com/users/${config.github.owner}/followers?per_page=100`,
    {
      headers: { Authorization: `Bearer ${config.github.accessToken}` },
    },
  ).then((value) => value.json());

  return followers;
};

export const useFetchFollowing = async () => {
  const following = await fetch(
    `https://api.github.com/users/${config.github.owner}/following?per_page=100`,
    {
      headers: { Authorization: `Bearer ${config.github.accessToken}` },
    },
  ).then((value) => value.json());

  return following;
};
