import Link from "next/link";

export function Error() {
  return (
    <div>
      <p className=" text-center text-2xl font-bold">
        죄송합니다. 페이지를 사용할 수 없습니다.
      </p>

      <p className="mb-[20px] mt-[40px] text-center">
        클릭하신 링크가 잘못되었거나 페이지가 삭제되었습니다.{" "}
        <Link className="text-igLink dark:text-igLinkDark" href="/">
          Issuegram으로 돌아가기.
        </Link>
      </p>
    </div>
  );
}
