"use client";

import Kebab from "@/assets/svgs/kebab.svg";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./index.css";

interface IssueHeaderMenuProps {
  issue: Issues[number];
}

// TODO: 블로그 주소 하드코딩 된 부분 개선

export function IssueHeaderMenu({ issue }: IssueHeaderMenuProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-center">
        <div
          className="cursor-pointer p-[8px]"
          onClick={() => setIsModalOpen(true)}
        >
          <Kebab />
        </div>
      </div>

      {isModalOpen && (
        <div className="issue-header-modal">
          <div className="absolute size-full bg-black/65" />

          <div className="absolute w-[calc(100dvw-88px)] max-w-[400px] overflow-hidden rounded-xl bg-white">
            <ul className="issue-header-modal-list">
              <li>
                <a
                  className="flex size-full items-center justify-center"
                  href={issue.html_url}
                >
                  수정
                </a>
              </li>

              <li>
                <a
                  className="flex size-full items-center justify-center"
                  href={`/issue/${issue.number}`}
                >
                  게시물로 이동
                </a>
              </li>

              <li>
                <CopyToClipboard
                  text={`https://lightpavilion.site/issue/${issue.number}`}
                >
                  <div
                    className="flex size-full items-center justify-center"
                    onClick={() => setIsModalOpen(false)}
                  >
                    <p>링크 복사</p>
                  </div>
                </CopyToClipboard>
              </li>

              <li>
                <div
                  className="flex size-full items-center justify-center"
                  onClick={() => setIsModalOpen(false)}
                >
                  <p>취소</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
