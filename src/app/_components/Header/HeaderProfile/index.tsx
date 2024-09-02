interface HeaderProfileProps {
  userInfo: User;
}

export function HeaderProfile({ userInfo }: HeaderProfileProps) {
  return (
    <div className="flex h-[181px] items-center">
      <img
        src={userInfo.avatar_url}
        className="mobile:h-[77px] mobile:w-[77px] h-[150px] w-[150px] rounded-full"
      />
    </div>
  );
}
