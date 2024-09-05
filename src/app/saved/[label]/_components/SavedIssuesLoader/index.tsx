"use client";

import { GridIssues } from "@/components/widgets/GridIssues";

import { useFetchIssuesInfinity } from "@/hooks/useFetchIssues";

import Spinner from "@/assets/svgs/spinner.svg";

import "./index.css";

interface SavedIssuesLoaderProps {
  labels: string;
}

export function SavedIssuesLoader({ labels }: SavedIssuesLoaderProps) {
  const { issues, endRef, isLoading, isRefetching, isEnd } =
    useFetchIssuesInfinity(labels);

  return (
    <>
      <GridIssues issues={issues} labels={labels} />

      {(isLoading || isRefetching) && (
        <div className="mt-[40px] flex h-[48px] items-center justify-center">
          <Spinner className="spinner fill-[#555555]" />
        </div>
      )}

      {!isEnd && <div ref={endRef} />}
    </>
  );
}
