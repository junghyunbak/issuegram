import { type Endpoints } from "@octokit/types";

declare global {
  type Issues =
    Endpoints["GET /repos/{owner}/{repo}/issues"]["response"]["data"];

  type User = Endpoints["GET /users/{username}"]["response"]["data"];
}
