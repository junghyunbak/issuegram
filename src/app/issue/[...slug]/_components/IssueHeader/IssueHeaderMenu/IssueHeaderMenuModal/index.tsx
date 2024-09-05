"use client";

import type { Dispatch, SetStateAction } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { useShallow } from "zustand/react/shallow";

import config from "@/config";

import useStore from "@/store";

import "./index.css";

interface IssueHeaderMenuModalProps {
  issue: Issues[number];
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export function IssueHeaderMenuModal({
  issue,
  setIsModalOpen,
}: IssueHeaderMenuModalProps) {
  const [fireCopiedSnackbar] = useStore(
    useShallow((s) => [s.fireCopiedSnackbar]),
  );

  const handleDimmedClick = () => {
    setIsModalOpen(false);
  };

  const handleCopyButtonClick = () => {
    setIsModalOpen(false);
    fireCopiedSnackbar();
  };

  return (
    <div className="issue-header-modal">
      <div
        className="absolute size-full bg-black/65"
        onClick={handleDimmedClick}
      />

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
              text={`https://${config.domain}/issue/${issue.number}`}
            >
              <div
                className="flex size-full items-center justify-center"
                onClick={handleCopyButtonClick}
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
  );
}
