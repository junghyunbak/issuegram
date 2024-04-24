import { ShowMobileLayout } from "@/components/layouts/ShowMobileLayout";
import config from "@/config";

export function NavMobile() {
  return (
    <ShowMobileLayout>
      <div className="flex h-11 w-full items-center justify-center border-b border-igElevatedSeparator dark:border-igElevatedSeparatorDark">
        <p>{config.github.owner}</p>
      </div>
    </ShowMobileLayout>
  );
}
