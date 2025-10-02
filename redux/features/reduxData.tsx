import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state interface
interface ReduxStateData {
  data: any;
  pagination: any;
  filterData: {},
}
// Define the initial state
const initialState: ReduxStateData = {
  data: {},
  pagination: {pageSize:10,pageIndex:1},
  filterData: {},
};

// Create the sign up slice
const reduxDataSlice = createSlice({
  name: 'reduxData',
  initialState,
  reducers: {
    // Action to add sign up data
    reduxSliceData: (
      state,
      action: PayloadAction<{ key: string; data: any; id?: any }>
    ) => {
      state.data[action.payload.key] = action.payload.data;
    },
    setFilterData: (state, action) => {
      state.filterData = action.payload;
    },
    clearAll: () => initialState,
    pagination: (state, action) => {
      state.pagination = action.payload;
    },
  },
});

// Export actions and reducer
export const {
  clearAll,
  reduxSliceData,
  pagination,
   setFilterData,
} = reduxDataSlice.actions;
export default reduxDataSlice.reducer;
