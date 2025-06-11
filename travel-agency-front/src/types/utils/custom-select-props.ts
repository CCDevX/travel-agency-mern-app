import type { StringMapCodes } from "./string-map-codes";

export type CustomSelectProps = {
  name: string;
  label?: string;
  defaultValue?: string;
  options: StringMapCodes;
};
