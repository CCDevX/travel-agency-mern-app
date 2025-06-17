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
    <div className={`w-[200px] ${classname}`}>
      {!nolabel && (
        <Label className="capitalize w-full py-2" htmlFor={name}>
          {label || name}
        </Label>
      )}
      <Input
        name={name}
        id={name}
        type={type}
        defaultValue={defaultValue}
        className="w-full"
        disabled={disabled}
        required={required}
        placeholder={placeholder}
      />
    </div>
  );
};

export default CustomInput;
