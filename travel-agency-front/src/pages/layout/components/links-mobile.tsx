import { AlignLeft } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { NavLink, useLocation } from "react-router-dom";
import { links } from "@/utils/navbar-data";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

const LinksMobile = () => {
  const location = useLocation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="lg:hidden">
        <Button variant="outline" size="icon">
          <AlignLeft className="text-[color:var(--color-primary)]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="flex flex-col gap-1 p-2 lg:hidden border border-[color:var(--color-border)] rounded-md shadow-md bg-white"
        align="start"
        sideOffset={10}
      >
        {links.map(({ ref, label }) => {
          const isActive = location.pathname + location.search === ref;
          return (
            <DropdownMenuItem key={label} className="p-0">
              <NavLink
                to={ref}
                className={`dropdown-item block w-full px-2 py-1 rounded-md ${
                  isActive ? "font-semibold" : ""
                }`}
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
