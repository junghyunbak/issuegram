import { FollowModal } from "@/components/layouts/FollowModal";
import { FollowList } from "@/components/widgets/FollowList";

import { getUserFollowers } from "@/api";

export default async function Followers() {
  const { followers } = await getUserFollowers();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black">
      <FollowModal title="팔로워">
        <FollowList users={followers} />
      </FollowModal>
    </div>
  );
}
