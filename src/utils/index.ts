type LabelType = "normal" | "saved" | "portfolio";

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
    const issueLabels = issue.labels.map((label) =>
      typeof label === "string" ? label : label.name,
    );

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
  const issueLabels = issue.labels.map((label) =>
    typeof label === "string" ? label : label.name,
  );

  if (issueLabels.includes(labelTypes.saved)) {
    return labelTypes.saved;
  }

  if (issueLabels.includes(labelTypes.portfolio)) {
    return labelTypes.portfolio;
  }

  return labelTypes.normal;
};
