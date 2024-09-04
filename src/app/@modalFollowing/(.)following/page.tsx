import { FollowModal } from "@/components/layouts/FollowModal";
import { RouteModal } from "@/components/layouts/RouteModal";
import { FollowList } from "@/components/widgets/FollowList";

import { getUserFollowing } from "@/api";

export default async function ModalFollowing() {
  const { following } = await getUserFollowing();

  return (
    <RouteModal hiddenCloseButton disableEsc>
      <FollowModal title="팔로잉">
        <FollowList users={following} />
      </FollowModal>
    </RouteModal>
  );
}
