// store/slices/appSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    jsonInput: "",
    templateSrc: "",
    reportType: "bi-weekly",
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setJsonInput(state, action) {
            state.jsonInput = action.payload;
        },
        setTemplateSrc(state, action) {
            state.templateSrc = action.payload;
        },
        setReportType(state, action) {
            state.reportType = action.payload;
        }
    },
});

export const {
    setJsonInput,
    setTemplateSrc,
    setReportType,
} = appSlice.actions;

export default appSlice.reducer;
