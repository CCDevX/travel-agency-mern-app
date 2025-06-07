import type { FiltersParams } from "../utils/filter-params";
import type { Trip } from "../entities/trip";

export type ResearchLoaderType = {
  data: Trip[] | null;
  params: FiltersParams;
};
