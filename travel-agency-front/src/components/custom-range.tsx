import { formatAsEuros } from "@/utils/format-as-euros";
import { Slider } from "./ui/slider";
import type { CustomRangeProps } from "@/types/utils/custom-range-props";
import { useState } from "react";

const CustomRange = ({ name, defaultValue }: CustomRangeProps) => {
  const maxPrice = 30000;
  const step = 1000;
  const defaultPrice = defaultValue ? Number(defaultValue) : maxPrice;
  const [selectedPrice, setSelectedPrice] = useState(defaultPrice);

  return (
    <div className="w-[200px] flex flex-col gap-3">
      <p className="text-center text-md">
        Max price/pers : {formatAsEuros(selectedPrice)}
      </p>
      <Slider
        id={name}
        name={name}
        step={step}
        max={maxPrice}
        value={[selectedPrice]}
        onValueChange={(value) => setSelectedPrice(value[0])}
      />
    </div>
  );
};

export default CustomRange;
