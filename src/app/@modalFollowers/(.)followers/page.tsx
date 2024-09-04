import { FollowModal } from "@/components/layouts/FollowModal";
import { RouteModal } from "@/components/layouts/RouteModal";
import { FollowList } from "@/components/widgets/FollowList";

import { getUserFollowers } from "@/api";

export default async function ModalFollowers() {
  const { followers } = await getUserFollowers();

  return (
    <RouteModal hiddenCloseButton disableEsc>
      <FollowModal title="팔로워">
        <FollowList users={followers} />
      </FollowModal>
    </RouteModal>
  );
}
