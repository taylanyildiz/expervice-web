import UnitProcess from "./unit_process";

export type UnitUpdate = Omit<UnitProcess, "customer_id" | "status"> & { id?: number }