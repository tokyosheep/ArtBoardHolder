import { createSlice , PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export type ReizeValueType = {
    width:number,
    height:number
} 

interface ResizeValues{
    values:ReizeValueType
}

const initialState:ResizeValues = {
    values:{
        width:100,
        height:100
    }
}

export const resizeValueSlice = createSlice({
    name:"resize",
    initialState,
    reducers:{
        setValue:(state,action:PayloadAction<{prop:keyof ReizeValueType,value:number}>)=>{
            state.values[action.payload.prop] = action.payload.value;
        }
    }
});

export const { setValue } = resizeValueSlice.actions;

export const resizeValue = (state:RootState)=>state.resize.values;

export default resizeValueSlice.reducer;