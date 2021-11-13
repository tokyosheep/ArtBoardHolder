import { createSlice , PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export type FomartKeys = "PDF"|"PNG"|"JPG"|"GIF";


export type FormatObj = Record<FomartKeys,boolean>;

interface FormatList {
    formats:FormatObj
}

const initialState:FormatList = {
    formats:{
        PDF:true,
        PNG:false,
        JPG:false,
        GIF:false
    }
}

export const formatSlice = createSlice({
    name:"formats",
    initialState,
    reducers:{
        setFormat:(state,action:PayloadAction<{prop:FomartKeys,checked:boolean}>)=>{
            state.formats[action.payload.prop]= action.payload.checked;
        }
    }
});

export const { setFormat } = formatSlice.actions;

export const formats = (state:RootState) => state.formats;

export default formatSlice.reducer;