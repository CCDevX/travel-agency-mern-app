import type { Order } from "./entities/order";
import type { Profile } from "./profile";

export type ProfilePageLoaderType = Profile & { orders: Order[] };
