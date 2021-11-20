import { createSlice , PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export const unitKeys = ["cm","mm","px","inch"];
export type UnitKeys = "cm"|"mm"|"px"|"inch";


const fixDecimalPoint = n => Math.round(n*100)/100;

export const TurnFormNumber:Record<UnitKeys,(v:number)=>number> = {
    mm:(v)=>fixDecimalPoint(v*2.834645),
    cm:(v)=>fixDecimalPoint(v*28.34645),
    inch:(v)=>fixDecimalPoint(v*2.834645)*25.4,
    px:(v)=>fixDecimalPoint(v)
} as const;

export const unitsNum:Record<UnitKeys,(v:number)=>number> = {
    mm:(v)=>fixDecimalPoint(v*3.52778)/10,
    cm:(v)=>fixDecimalPoint(v*3.52778)/100,
    inch:(v)=>fixDecimalPoint(v*3.52778)/254,
    px:(v)=>fixDecimalPoint(v)
} as const;


interface UnitState {
    value:UnitKeys
}

const initialState:UnitState = {
    value:"px",
}

export const unitSlice = createSlice({
    name:"unit",
    initialState,
    reducers:{
        setUnit:(state,action:PayloadAction<UnitKeys>)=>{
            state.value = action.payload;
        }
    }
})

export const { setUnit } = unitSlice.actions;

export const unit = (state:RootState)=>state.unit.value;

export default unitSlice.reducer;