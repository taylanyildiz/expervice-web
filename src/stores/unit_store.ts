import Unit from "@Models/units/unit";
import UnitFilter from "@Models/units/unit_filter";
import { createSlice } from "@reduxjs/toolkit";

/// Unit store props
interface Props {
    layzLoading: boolean;
    filter: UnitFilter | null;
    units: { rows: Unit[], count: number },
    unit: Unit | null;
    unitId: number | null;
}

/// Unit initial states
const initialState: Props = {
    layzLoading: true,
    filter: { limit: 10, offset: 0 },
    units: { rows: [], count: 0 },
    unit: null,
    unitId: null,
}

/// Unit slice
const unit = createSlice({
    name: "unit",
    initialState,
    reducers: {
        setUnitLayz: (state, { payload }) => {
            state.layzLoading = payload;
        },
        setUnitFilter: (state, { payload }) => {
            state.filter = payload;
        },
        setUnits: (state, { payload }) => {
            state.units = payload;
        },
        setUnit: (state, { payload }) => {
            state.unit = payload;
        },
        setUnitId: (state, { payload }) => {
            state.unitId = payload;
        }
    }
});

export default unit.reducer;
export const { setUnitLayz, setUnitFilter, setUnits, setUnit, setUnitId } = unit.actions;