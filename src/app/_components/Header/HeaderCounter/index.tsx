import Link from "next/link";

import "./index.css";

interface HeaderCounterProps {
  postCount: number;
  followerCount: number;
  followingCount: number;
}

export function HeaderCounter({
  postCount,
  followerCount,
  followingCount,
}: HeaderCounterProps) {
  return (
    <ul className="counter">
      <li>
        <p>
          게시물 <span>{postCount}</span>
        </p>
      </li>

      <li>
        <Link className="active:opacity-50" href="/followers">
          팔로워 <span>{followerCount}</span>
        </Link>
      </li>

      <li>
        <Link className="active:opacity-50" href="/following">
          팔로우 <span>{followingCount}</span>
        </Link>
      </li>
    </ul>
  );
}
