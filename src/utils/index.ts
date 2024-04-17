import remarkFrontmatter from "remark-frontmatter";
import remarkParse from "remark-parse";
import remarkExtractFrontmatter from "remark-extract-frontmatter";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import sharp from "sharp";
const toml = require("toml").parse;

const labelTypes: { [P in LabelType]: P } = {
  normal: "normal",
  saved: "saved",
  portfolio: "portfolio",
};

export const filterIssues = (
  issues: Issues,
  type: LabelType = "normal",
): Issues => {
  const group: { [key in LabelType]: Issues } = {
    normal: [],
    saved: [],
    portfolio: [],
  };

  for (const issue of issues) {
    const issueLabels = getIssueLabels(issue);

    if (issueLabels.includes(labelTypes.saved)) {
      group[labelTypes.saved].push(issue);

      continue;
    }

    if (issueLabels.includes(labelTypes.portfolio)) {
      group[labelTypes.portfolio].push(issue);

      continue;
    }

    group[labelTypes.normal].push(issue);

    if (issueLabels.includes(type)) {
      group[type].push(issue);
    }
  }

  return group[type];
};

export const getIssueLabelType = (issue: Issues[number]): LabelType => {
  const issueLabels = getIssueLabels(issue);

  if (issueLabels.includes(labelTypes.saved)) {
    return labelTypes.saved;
  }

  if (issueLabels.includes(labelTypes.portfolio)) {
    return labelTypes.portfolio;
  }

  return labelTypes.normal;
};

/**
 * issue.labels가 { string | object } 타입이기 때문에 편의를 위해 만든 유틸함수
 */
export const getIssueLabels = (issue: Issues[number]): string[] => {
  return issue.labels
    .map((label) => (typeof label === "string" ? label : label.name || ""))
    .filter((label) => label !== "");
};

export const getIssueThumbnail = (issue: Issues[number]): string | null => {
  const file = unified()
    .use(remarkParse)
    .use(remarkFrontmatter, ["toml"])
    .use(remarkExtractFrontmatter, { toml })
    .use(remarkStringify)
    .processSync(issue.body || "");

  const {
    data: { thumbnail },
  } = file;

  if (typeof thumbnail === "string") {
    return thumbnail;
  }

  return null;
};

export const getBase64Image = async (
  imageUrl: string,
): Promise<Base64Image | undefined> => {
  try {
    const response = await fetch(imageUrl);

    const arrayBuffer = await response.arrayBuffer();

    const image = sharp(Buffer.from(arrayBuffer));

    const previewImage = await image
      .toFormat("jpeg")
      .jpeg({ quality: 1 })
      .toBuffer({ resolveWithObject: true });

    const base64 = previewImage.data.toString("base64");

    return `data:image/jpeg;base64,${base64}`;
  } catch (e) {
    return undefined;
  }
};

export const getIssuesBase64Thumbnail = async (
  issues: Issues,
): Promise<Map<number, ThumbnailData>> => {
  const ret: Map<number, ThumbnailData> = new Map();

  for (const issue of issues) {
    const thumbnail = getIssueThumbnail(issue);

    if (!thumbnail) {
      continue;
    }

    ret.set(issue.number, {
      url: thumbnail,
      base64: await getBase64Image(thumbnail),
    });
  }

  return ret;
};
