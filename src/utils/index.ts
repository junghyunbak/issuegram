export const pickIssuesWithLabel = (issues: Issues, label: string): Issues => {
  return issues.filter((issue) =>
    issue.labels
      .map((_label) => (typeof _label === "string" ? _label : _label.name))
      .includes(label),
  );
};

export const omitIssuesWithLabel = (issues: Issues, label: string): Issues => {
  return issues.filter(
    (issue) =>
      !issue.labels
        .map((_label) => (typeof _label === "string" ? _label : _label.name))
        .includes(label),
  );
};

export const hasSpecificLabelToIssue = (
  issues: Issues[number],
  label: string,
) => {
  return issues.labels
    .map((_label) => (typeof _label === "string" ? _label : _label.name))
    .includes(label);
};
