import type { FiltersParams } from "../filter-params";
import type { Trip } from "../entities/trip";

export type ResearchLoaderType = {
  data: Trip[] | null;
  params: FiltersParams;
};
