import { AlignLeft } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
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
          <AlignLeft className="text-blue-900" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="gap-y-2 p-2 lg:hidden border border-blue-900 rounded-md shadow-md"
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
                  return `capitalize p-1 tracking-wide text-blue-900 hover:text-blue-500 ${
                    isActive ? "font-bold" : ""
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
