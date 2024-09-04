import { FollowModal } from "@/components/layouts/FollowModal";
import { FollowList } from "@/components/widgets/FollowList";

import { getUserFollowing } from "@/api";

export default async function Following() {
  const { following } = await getUserFollowing();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black">
      <FollowModal title="팔로잉">
        <FollowList users={following} />
      </FollowModal>
    </div>
  );
}
