interface HeaderProfileProps {
  userInfo: User;
}

export function HeaderProfile({ userInfo }: HeaderProfileProps) {
  return (
    <div className="flex h-[181px] items-center">
      <img
        src={userInfo.avatar_url}
        className="h-[150px] w-[150px] rounded-full max-md:h-[77px] max-md:w-[77px]"
      />
    </div>
  );
}
