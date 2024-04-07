import { FollowModal } from "@/components/layouts/FollowModal";
import { RouteModal } from "@/components/layouts/RouteModal";
import { FollowList } from "@/components/widgets/FollowList";
import { server } from "@/hooks";

export default async function ModalFollowers() {
  const followers = await server.useFetchFollowers();

  return (
    <RouteModal hiddenCloseButton disableEsc>
      <FollowModal title="팔로워">
        <FollowList users={followers} />
      </FollowModal>
    </RouteModal>
  );
}
