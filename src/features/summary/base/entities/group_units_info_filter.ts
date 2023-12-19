import { ECustomDate } from "@Models/enums";

export default interface GroupUnitsInfoFilter {
    dateType?: ECustomDate;
    start_date?: Date;
    end_date?: Date;
    sub_type_id?: number;
}