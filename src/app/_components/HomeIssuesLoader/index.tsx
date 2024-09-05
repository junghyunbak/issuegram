"use client";

import { useFetchIssuesInfinity } from "@/hooks/useFetchIssues";

import { GridIssues } from "@/components/widgets/GridIssues";

import Spinner from "@/assets/svgs/spinner.svg";

import "./index.css";

interface HomeIssuesLoaderProps {}

export function HomeIssuesLoader({}: HomeIssuesLoaderProps) {
  const { issues, endRef, isLoading, isRefetching, isEnd } =
    useFetchIssuesInfinity();

  return (
    <>
      <GridIssues issues={issues} />

      {(isLoading || isRefetching) && (
        <div className="mt-[40px] flex h-[48px] items-center justify-center">
          <Spinner className="spinner fill-[#555555]" />
        </div>
      )}

      {!isEnd && <div ref={endRef} />}
    </>
  );
}
