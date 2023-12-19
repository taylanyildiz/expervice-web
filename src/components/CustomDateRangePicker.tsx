import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import { useState } from "react";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";
import { useUser } from "@Features/summary/company/helper/company_helper";
import { getLastMonth } from "@Utils/functions";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface CustomDateRangePickerProps {
  startDate?: Date | null;
  endDate?: Date | null;
  onChanged: (start: Value, end: Value) => void;
}

function CustomDateRangePicker(props: CustomDateRangePickerProps) {
  const { startDate, endDate, onChanged } = props;
  const [value, onChange] = useState<Value>([
    startDate ?? getLastMonth(),
    endDate ?? new Date(),
  ]);

  /// User store
  const { language } = useUser();
  const lng = language?.language_code ?? "en";

  return (
    <div>
      <DateRangePicker
        className={"date-range-picker"}
        rangeDivider={<ArrowRightAltIcon />}
        locale={lng}
        maxDate={new Date()}
        calendarIcon={null}
        clearIcon={null}
        onChange={(value) => {
          onChange(value);
          const x = value as Date[];
          onChanged(x[0], x[1]);
        }}
        value={value}
      />
    </div>
  );
}

export default CustomDateRangePicker;
