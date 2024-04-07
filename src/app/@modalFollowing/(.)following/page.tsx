import { FollowModal } from "@/components/layouts/FollowModal";
import { RouteModal } from "@/components/layouts/RouteModal";
import { FollowList } from "@/components/widgets/FollowList";
import { server } from "@/hooks";

export default async function ModalFollowing() {
  const following = await server.useFetchFollowing();

  return (
    <RouteModal hiddenCloseButton disableEsc>
      <FollowModal title="팔로잉">
        <FollowList users={following} />
      </FollowModal>
    </RouteModal>
  );
}
