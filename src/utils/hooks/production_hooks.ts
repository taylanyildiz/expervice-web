import Production from "@Models/products/production";
import { createSlice } from "@reduxjs/toolkit";

/// Production props
interface ProductionProps {
    production: Production | undefined;
}

/// Production Initial state
const initialState: ProductionProps = {
    production: undefined,
}

/// Production slice
const production = createSlice({
    name: "production",
    initialState,
    reducers: {
        setProduct: (state, { payload }) => {
            state.production = payload;
        }
    }
});

export default production.reducer;
export const { setProduct } = production.actions;