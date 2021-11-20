import { createSlice , PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

interface SwitchEvent{
    isDocEvent:boolean
}

const initialState:SwitchEvent = {
    isDocEvent:false
}

export const docEventSlice = createSlice({
    name:"isDocEvent",
    initialState,
    reducers:{
        switchEvent:(state,action:PayloadAction<{check:boolean}>)=>{
            state.isDocEvent = action.payload.check;
        }
    }
})

export const { switchEvent } = docEventSlice.actions;

export const isDocEvent = (state:RootState)=>state.isDocEvent;

export default docEventSlice.reducer;