import { formatAsEuros } from "@/utils/format-as-euros";
import { Slider } from "../ui/slider";
import type { CustomRangeProps } from "@/types/utils/custom-range-props";
import { useState } from "react";

const CustomRange = ({ name, defaultValue }: CustomRangeProps) => {
  const maxPrice = 100000;
  const step = 1000;
  const defaultPrice = defaultValue ? Number(defaultValue) : maxPrice;
  const [selectedPrice, setSelectedPrice] = useState(defaultPrice);

  return (
    <div className="w-full min-w-[200px] flex flex-col gap-1">
      {/* Label comme les autres */}
      <label
        htmlFor={name}
        className="text-sm font-semibold text-[color:var(--color-primary)] leading-tight"
      >
        Max price/pers
      </label>

      {/* Valeur affichée en dessous */}
      <span className="text-sm text-[color:var(--color-primary)] font-medium mb-1">
        {formatAsEuros(selectedPrice)}
      </span>

      {/* Slider */}
      <Slider
        id={name}
        name={name}
        step={step}
        max={maxPrice}
        value={[selectedPrice]}
        onValueChange={(value) => setSelectedPrice(value[0])}
        className="slider-style"
      />
    </div>
  );
};

export default CustomRange;
