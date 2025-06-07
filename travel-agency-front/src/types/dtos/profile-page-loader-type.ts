import type { Order } from "../entities/order";
import type { Profile } from "../entities/profile";

export type ProfilePageLoaderType = Profile & { orders: Order[] };
