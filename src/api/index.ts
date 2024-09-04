import config from "@/config";

export const getIssues = async (): Promise<{ issues: Issues }> => {
  const {
    data: { items },
  } = (await fetch(`http://localhost:${config.port}/api/issues/all`).then(
    (value) => value.json(),
  )) as ResponseTemplate<{ items: Issues }>;

  return { issues: items };
};

export const getAnIssue = async (number: string) => {
  const {
    data: { issue, prevIssue, nextIssue },
  } = (await fetch(`http://localhost:${config.port}/api/issues/${number}`).then(
    (value) => value.json(),
  )) as ResponseTemplate<{
    issue: Issues[number];
    prevIssue?: Issues[number];
    nextIssue?: Issues[number];
  }>;

  return { issue, prevIssue, nextIssue };
};

export const getIssueComments = async (number: string) => {
  const comments = (await fetch(
    `https://api.github.com/repos/${config.github.owner}/${config.github.repo}/issues/${number}/comments?per_page=100`,
    {
      headers: { Authorization: `Bearer ${config.github.accessToken}` },
      next: {
        tags: [`issue-${number}-comments`],
      },
      cache: "force-cache",
    },
  ).then((value) => value.json())) as Comments;

  return { comments };
};

export const getIssueReactions = async (number: string) => {
  const reactions = (await fetch(
    `https://api.github.com/repos/${config.github.owner}/${config.github.repo}/issues/${number}/reactions`,
    {
      headers: { Authorization: `Bearer ${config.github.accessToken}` },
      next: {
        tags: [`issue-${number}-reactions`],
      },
      cache: "force-cache",
    },
  ).then((value) => value.json())) as Reactions;

  return { reactions };
};

export const getUserInfo = async () => {
  const user = (await fetch(
    `https://api.github.com/users/${config.github.owner}`,
    {
      headers: { Authorization: `Bearer ${config.github.accessToken}` },
    },
  ).then((value) => value.json())) as User;

  return { user };
};

export const getUserFollowers = async () => {
  const followers = await fetch(
    `https://api.github.com/users/${config.github.owner}/followers?per_page=100`,
    {
      headers: { Authorization: `Bearer ${config.github.accessToken}` },
      cache: "no-cache",
    },
  ).then((value) => value.json());

  return { followers };
};

export const getUserFollowing = async () => {
  const following = await fetch(
    `https://api.github.com/users/${config.github.owner}/following?per_page=100`,
    {
      headers: { Authorization: `Bearer ${config.github.accessToken}` },
      cache: "no-cache",
    },
  ).then((value) => value.json());

  return { following };
};

export const getProfileReadme = async () => {
  const readmePath = config.github.readmePath.startsWith("/")
    ? config.github.readmePath.slice(1)
    : config.github.readmePath;

  const readme = (await fetch(
    `https://api.github.com/repos/${config.github.owner}/${config.github.repo}/readme/${readmePath}`,
    {
      headers: { Authorization: `Bearer ${config.github.accessToken}` },
      next: {
        tags: ["intro-readme"],
      },
    },
  ).then((value) => value.json())) as Readme;

  return { readme };
};
