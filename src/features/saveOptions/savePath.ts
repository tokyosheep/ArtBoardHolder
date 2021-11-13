import { createSlice , PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";


export interface SaveDirectory{
    options:{
        useBoardName:boolean,
        export:boolean,
        savePath:string
    }
}

const initialState:SaveDirectory = {
    options:{
        useBoardName:true,
        export:false,
        savePath:""
    }
}



export const saveDirectory = createSlice({
    name:"saveDirectory",
    initialState,
    reducers:{
        setValue:(state,action:PayloadAction<{prop:"useBoardName"|"export",checked:boolean}>)=>{
            state.options[action.payload.prop] = action.payload.checked;
        },
        setPath:(state,action:PayloadAction<{value:string}>)=>{
            state.options.savePath = action.payload.value;
        }
    }
});

export const { setValue , setPath } = saveDirectory.actions;

export const savePathOptions = (state:RootState) => state.savePath.options;

export default saveDirectory.reducer;