import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";

export const useFetchIssuesInfinity = (labels: string = "") => {
  const { ref: endRef, inView } = useInView();

  const { data, fetchNextPage, isLoading, isRefetching } = useInfiniteQuery({
    queryKey: ["infinite-issues", labels],
    queryFn: async ({ pageParam = 1 }) => {
      const serachParams = new URLSearchParams({
        page: `${pageParam}`,
        labels,
      });

      const data = (await fetch(`/api/issues?${serachParams.toString()}`).then(
        (value) => value.json(),
      )) as ResponseTemplate<{ items: Issues; isLastPage: boolean }>;

      return data;
    },
    getNextPageParam: (lastPage, pages) => {
      return lastPage.data.isLastPage ? undefined : pages.length + 1;
    },
  });

  useEffect(() => {
    /**
     * fetching 이후에도 inView가 계속 true일 때를 연쇄적으로 처리해주기 위해
     *
     * 로딩 상태를 의존성으로 추가함.
     */
    if (isLoading || isRefetching) {
      return;
    }

    if (!inView) {
      return;
    }

    fetchNextPage();
  }, [inView, fetchNextPage, isLoading, isRefetching]);

  const issues = !data
    ? []
    : data.pages.reduce((a, c) => [...a, ...c.data.items], [] as Issues);

  return { issues, endRef, isLoading, isRefetching };
};
