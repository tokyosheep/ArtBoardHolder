import { createSlice , PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

interface PDFPresetList{
    preset:{
        list:string[],
        selected:string,
        usePreset:boolean
    }
}

const initialState:PDFPresetList = {
    preset:{
        list:[],
        selected:"",
        usePreset:true
    }
}


export const pdfPreset = createSlice({
    name:"pdfPreset",
    initialState,
    reducers:{
        loadPreset:(state,action:PayloadAction<{presets:string[]}>)=>{
            state.preset.list = action.payload.presets;
            state.preset.selected = action.payload.presets[0];
        },
        selectPreset:(state,action:PayloadAction<{selected:string}>)=>{
            state.preset.selected = action.payload.selected;
        },
        setUsePreset:(state,action:PayloadAction<{usePreset:boolean}>)=>{
            state.preset.usePreset = action.payload.usePreset;
        }
    }
});

export const { loadPreset , selectPreset , setUsePreset } = pdfPreset.actions;

export const pdfPresetList = (state:RootState) => state.pdfPresetList.preset;

export default pdfPreset.reducer;