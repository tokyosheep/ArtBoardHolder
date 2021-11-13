import { createSlice , PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

interface WindowVisible{
    visible:boolean
};

const initialState:WindowVisible = {
    visible:false
};

export const windowVisible = createSlice({
    name:"windowVisible",
    initialState,
    reducers:{
        switchVisible:(state,action:PayloadAction<{visible:boolean}>)=>{
            state.visible = action.payload.visible;
        }
    }
});

export const { switchVisible } = windowVisible.actions;

export const saveWindowVisible = (state:RootState) => state.windowVisible;

export default windowVisible.reducer;