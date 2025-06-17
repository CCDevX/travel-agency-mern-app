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
    <div className="w-[200px]">
      <Label htmlFor={name} className="capitalize w-full py-2">
        {label || name}
      </Label>
      <Select defaultValue={defaultValue} name={name}>
        <SelectTrigger className="w-full" id={name}>
          <SelectValue></SelectValue>
        </SelectTrigger>
        <SelectContent>
          {options.map(({ name, code }) => (
            <SelectItem key={name} value={code.toString()}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CustomSelect;
