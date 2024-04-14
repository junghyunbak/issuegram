interface ProfileIconProps {
  url: string;
  isActive: boolean;
}

export function ProfileIcon({ url, isActive }: ProfileIconProps) {
  return (
    <img
      src={url}
      className={`aspect-square w-[26px] rounded-full ${isActive ? "border-2 border-black" : ""}`}
    />
  );
}
