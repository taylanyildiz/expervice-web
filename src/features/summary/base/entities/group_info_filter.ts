import { ECustomDate } from "@Models/enums";

interface GroupInfoFilter {
    dateType: ECustomDate,
    start_date?: Date,
    end_date?: Date
}

export default GroupInfoFilter;