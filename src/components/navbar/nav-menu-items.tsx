import { MenuItem, HoveredLink } from "@/components/ui/navbar-menu";
import { PlatformItems, PlatformItemsList } from "./platforms";
import { Separator } from "@/components/ui/separator";
import { NavbarMenuItemsProps } from "@/types/navbar";
import { Badge } from "../ui/badge";
import {} from "@radix-ui/react-dropdown-menu";
import { MenuIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import LoginDialog from "./login-dialog";

function NavbarMenuItemsDesktop({ active, setActive }: NavbarMenuItemsProps) {
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
          <HoveredLink href="/">
            Leaderboards <Badge>Soon</Badge>
          </HoveredLink>
          <HoveredLink href="/">
            Learn to Make Prompt <Badge>Soon</Badge>
          </HoveredLink>
        </div>
      </MenuItem>

      <MenuItem setActive={setActive} active={active} item="Resources">
        <div className="grid gap-6 md:grid-cols-2 text-sm">
          <div className="flex flex-col gap-2">
            <span className="mb-1 font-semibold text-neutral-500">Event</span>
            <HoveredLink href="/">
              Event <Badge>Soon</Badge>
            </HoveredLink>
            <HoveredLink href="/">
              Prompt Battle <Badge>Soon</Badge>
            </HoveredLink>
          </div>
          <div className="flex flex-col gap-2">
            <span className="mb-1 font-semibold text-neutral-500">Learn</span>
            <HoveredLink href="/">
              Blog <Badge>Soon</Badge>
            </HoveredLink>
            <HoveredLink href="/">
              Resource <Badge>Soon</Badge>
            </HoveredLink>
            <HoveredLink href="/">
              Platform Documentation <Badge>Soon</Badge>
            </HoveredLink>
          </div>
        </div>
      </MenuItem>
    </>
  );
}

function NavbarMenuItemsMobile() {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <MenuIcon className="cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="relative lg:hidden w-[95vw] mx-2 top-5 border border-white/10 bg-white/10 dark:bg-black/10 backdrop-blur-md shadow-lg"
          align="end"
        >
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="font-normal">
                  Platforms
                </AccordionTrigger>
                <AccordionContent className="flex flex-col space-y-2 translate-x-2">
                  <PlatformItemsList />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="font-normal">
                  For Creators
                </AccordionTrigger>
                <AccordionContent className="flex flex-col space-y-2 translate-x-2">
                  <HoveredLink href="/">
                    Leaderboards <Badge>Soon</Badge>
                  </HoveredLink>
                  <HoveredLink href="/">
                    Learn to Make Prompt <Badge>Soon</Badge>
                  </HoveredLink>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="font-normal">
                  Resources
                </AccordionTrigger>
                <AccordionContent className="flex flex-col space-y-2 translate-x-2">
                  <span className="mb-3 font-semibold text-neutral-500">
                    Event
                  </span>
                  <HoveredLink href="/">
                    Event <Badge>Soon</Badge>
                  </HoveredLink>
                  <HoveredLink href="/">
                    Prompt Battle <Badge>Soon</Badge>
                  </HoveredLink>
                  <span className="mb-3 font-semibold text-neutral-500">
                    Learn
                  </span>
                  <HoveredLink href="/">
                    Blog <Badge>Soon</Badge>
                  </HoveredLink>
                  <HoveredLink href="/">
                    Resource <Badge>Soon</Badge>
                  </HoveredLink>
                  <HoveredLink href="/">
                    Platform Documentation <Badge>Soon</Badge>
                  </HoveredLink>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <LoginDialog />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export { NavbarMenuItemsDesktop, NavbarMenuItemsMobile };
