import { render, screen } from "@testing-library/react";
import { IssueBanner } from ".";
import { issue } from "@/mockData";

const thumbnailTomlString = [
  "+++",
  'thumbnail = "https://fake.url"',
  "+++",
  "",
].join("\n");

it("썸네일 주소가 있을경우, img 태그를 렌더링한다.", () => {
  const { container } = render(
    <IssueBanner
      issue={{
        ...issue,
        body: thumbnailTomlString + issue.body,
      }}
    />,
  );

  expect(container).toMatchSnapshot();
});

it("썸네일 주소가 없을경우, 이슈 제목이 적힌 p 태그를 렌더링한다.", () => {
  render(<IssueBanner issue={issue} />);

  const p = screen.getByText(issue.title);

  expect(p.textContent).toBe(issue.title);
});
