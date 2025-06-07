import type { Trip } from "./trip";

export type Order = {
  _id: string;
  trip: Trip;
  quantity: number;
  kids: number;
  adults: number;
  firstname: string;
  familyname: string;
  email: string;
  phone: string;
  address: string;
  zip: string;
  town: string;
  country: string;
  title: string;
};
