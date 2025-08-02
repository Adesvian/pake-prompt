import { MenuItem, HoveredLink } from "@/components/ui/navbar-menu";
import PlatformItems from "./platforms";
import { Separator } from "@/components/ui/separator";
import { NavbarMenuItemsProps } from "@/types/navbar";

export default function NavbarMenuItems({
  active,
  setActive,
}: NavbarMenuItemsProps) {
  return (
    <>
      <MenuItem setActive={setActive} active={active} item="Platforms">
        <div className="grid grid-cols-2 gap-6 p-4 text-sm">
          <PlatformItems />
        </div>
        <Separator className="my-2" />
        <div className="flex justify-end px-4">
          <HoveredLink href="/platforms" className="text-sm">
            See all AI Tools
          </HoveredLink>
        </div>
      </MenuItem>

      <MenuItem setActive={setActive} active={active} item="For Creators">
        <div className="flex flex-col space-y-4 text-sm">
          <HoveredLink href="/web-dev">Leaderboards</HoveredLink>
          <HoveredLink href="/interface-design">
            Learn to Make Prompt
          </HoveredLink>
        </div>
      </MenuItem>

      <MenuItem setActive={setActive} active={active} item="Resources">
        <div className="grid gap-6 md:grid-cols-2 text-sm">
          <div className="flex flex-col gap-2">
            <span className="mb-1 font-semibold text-neutral-500">Event</span>
            <HoveredLink href="/event">Event</HoveredLink>
            <HoveredLink href="/prompt-battle">Prompt Battle</HoveredLink>
          </div>
          <div className="flex flex-col gap-2">
            <span className="mb-1 font-semibold text-neutral-500">Learn</span>
            <HoveredLink href="/blog">Blog</HoveredLink>
            <HoveredLink href="/resource">Resource</HoveredLink>
            <HoveredLink href="/platform-docs">
              Platform Documentation
            </HoveredLink>
          </div>
        </div>
      </MenuItem>
    </>
  );
}
