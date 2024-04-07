import { type Endpoints } from "@octokit/types";

declare global {
  type Issues =
    Endpoints["GET /repos/{owner}/{repo}/issues"]["response"]["data"];

  type User = Endpoints["GET /users/{username}"]["response"]["data"];

  type Followers =
    Endpoints["GET /users/{username}/followers"]["response"]["data"];
  type Following =
    Endpoints["GET /users/{username}/following"]["response"]["data"];
}
