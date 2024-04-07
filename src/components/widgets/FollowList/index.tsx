interface FollowListProps {
  users: Followers | Following;
}

export function FollowList({ users }: FollowListProps) {
  return (
    <ul className="w-full">
      {users.map((user) => {
        return (
          <li key={user.id}>
            <a className="flex" href={user.html_url} target="_blank">
              <div className="mr-[2px] p-[10px]">
                <img
                  className="h-[44px] w-[44px] rounded-full border"
                  src={user.avatar_url}
                />
              </div>

              <div className="flex flex-1 flex-col justify-center overflow-x-hidden">
                <p className="text-sm font-semibold">{user.login}</p>
              </div>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
