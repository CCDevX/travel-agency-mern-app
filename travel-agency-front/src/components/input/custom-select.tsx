import type { CustomSelectProps } from "@/types/utils/custom-select-props";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const CustomSelect = ({
  name,
  label,
  defaultValue,
  options,
}: CustomSelectProps) => {
  return (
    <div className="w-full min-w-[200px]">
      <Label
        htmlFor={name}
        className="capitalize block mb-1 text-sm font-semibold text-[color:var(--color-primary)]"
      >
        {label || name}
      </Label>
      <Select defaultValue={defaultValue} name={name}>
        <SelectTrigger
          className="w-full rounded-md border border-[color:var(--color-border)] bg-white px-4 py-2 text-[color:var(--color-primary)] shadow-sm transition hover:border-[color:var(--color-secondary-hover)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent)]"
          id={name}
        >
          <SelectValue placeholder="Select..." />
        </SelectTrigger>
        <SelectContent className="z-50 rounded-md border border-[color:var(--color-border)] bg-white shadow-lg animate-in fade-in slide-in-from-top-2">
          {options.map(({ name, code }) => (
            <SelectItem
              key={code}
              value={code.toString()}
              className="px-4 py-2 text-[color:var(--color-primary)] hover:bg-[color:var(--color-background)] cursor-pointer"
            >
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CustomSelect;
