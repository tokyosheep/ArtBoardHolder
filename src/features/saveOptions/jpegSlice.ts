import { createSlice , PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

interface JPEGOptions{
    options:{
        quality:number
    }
}

const initialState:JPEGOptions = {
    options:{
        quality:100
    }
}

export const jpegOptionSlice = createSlice({
    name:"jpegOptions",
    initialState,
    reducers:{
        setQuality:(state,action:PayloadAction<{quality:number}>)=>{
            state.options.quality = action.payload.quality;
        }
    }
});

export const { setQuality } = jpegOptionSlice.actions;

export const jpegOptions = (state:RootState) => state.jpegOptions;

export default jpegOptionSlice.reducer;