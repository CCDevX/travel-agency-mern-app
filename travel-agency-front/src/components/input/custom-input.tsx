import type { CustomInputProps } from "@/types/utils/custom-inputs-props";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const CustomInput = ({
  label,
  name,
  type,
  defaultValue,
  classname,
  disabled,
  required,
  placeholder,
  nolabel,
}: CustomInputProps) => {
  return (
    <div className={`w-full min-w-[200px] ${classname}`}>
      {!nolabel && (
        <Label
          htmlFor={name}
          className="capitalize block mb-1 text-sm font-semibold text-[color:var(--color-primary)]"
        >
          {label || name}
        </Label>
      )}
      <Input
        name={name}
        id={name}
        type={type}
        defaultValue={defaultValue}
        className="w-full rounded-md border border-[color:var(--color-border)] bg-white px-4 py-2 text-[color:var(--color-primary)] placeholder:text-gray-400 shadow-sm transition hover:border-[color:var(--color-secondary-hover)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent)]"
        disabled={disabled}
        required={required}
        placeholder={placeholder || "Enter value..."}
      />
    </div>
  );
};

export default CustomInput;
