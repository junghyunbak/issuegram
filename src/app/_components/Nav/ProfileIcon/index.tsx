// [ ]: 현재 url에 따라 프로필 아이콘 선택처리(border) 하도록 구현

interface ProfileIconProps {
  url: string;
}

export function ProfileIcon({ url }: ProfileIconProps) {
  return (
    <img
      src={url}
      className="aspect-square w-[26px] rounded-full border-2 border-black "
    />
  );
}
