import { AlignLeft } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { NavLink, useLocation } from "react-router-dom";
import { links } from "@/utils/navbar-data";
import type { Link } from "@/types/ui/link";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

const LinksMobile = () => {
  const location = useLocation();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="lg:hidden">
        <Button variant="outline" size="icon">
          <AlignLeft></AlignLeft>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="gap-y-2 p-2 lg:hidden"
        align="start"
        sideOffset={10}
      >
        {links.map((link) => {
          const { ref, label } = link as Link;
          const isActive = location.pathname + location.search === ref;
          return (
            <DropdownMenuItem key={label}>
              <NavLink
                to={ref}
                key={label}
                className={() => {
                  return `capitalize p-1 tracking-wide text-black hover:text-[#e23d30] ${
                    isActive ? "underline" : ""
                  }`;
                }}
              >
                {label}
              </NavLink>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LinksMobile;
