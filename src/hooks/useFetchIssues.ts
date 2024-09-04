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
    if (!inView) {
      return;
    }

    fetchNextPage();
  }, [inView, fetchNextPage]);

  const issues = !data
    ? []
    : data.pages.reduce((a, c) => [...a, ...c.data.items], [] as Issues);

  return { issues, endRef, isLoading, isRefetching };
};
