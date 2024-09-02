import uniqolor from "uniqolor";

interface TextThumbnailProps {
  text: string;
  /**
   * 테두리에 쓰일 색상을 만드는데 필요한 고유한 문자열
   */
  textForColor?: string;
  type?: "banner" | "feed";
}

export function TextThumbnail({
  text,
  type = "feed",
  textForColor = "",
}: TextThumbnailProps) {
  return (
    <div
      className={[
        "flex size-full items-center justify-center",
        type === "feed" ? "mobile:p-2 p-3" : "mobile:p-3 p-4",
      ].join(" ")}
      style={{
        backgroundColor: uniqolor(textForColor).color,
      }}
    >
      <div
        className={[
          "flex size-full items-center justify-center overflow-hidden rounded-md bg-white",
          type === "feed" ? "p-2" : "p-3",
        ].join(" ")}
      >
        <p
          className={[
            "break-all font-euljiro text-black",
            type === "feed" ? "mobile:text-xl text-3xl" : "text-4xl",
          ].join(" ")}
        >
          {text}
        </p>
      </div>
    </div>
  );
}
