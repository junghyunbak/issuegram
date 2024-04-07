import { server } from "@/hooks";
import { FollowModal } from "@/components/layouts/FollowModal";
import { FollowList } from "@/components/widgets/FollowList";

export default async function Following() {
  const following = await server.useFetchFollowing();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black">
      <FollowModal title="팔로잉">
        <FollowList users={following} />
      </FollowModal>
    </div>
  );
}
