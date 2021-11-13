import { createSlice , PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export type GenerateSize = {
    width:number,
    height:number,
    number:number
}

export type GenerateOrigin = {
    form:boolean,
    group:boolean,
    pathItem:boolean
}

interface GenerateState{
    generate:{
        origin:GenerateOrigin,
        size:GenerateSize
    }
}


export type GenerateArg = {
    type:"generate",
    args:{
        point:keyof GenerateOrigin,
        size:GenerateSize;
    }
}

export const getProp:(obj:GenerateOrigin)=>keyof GenerateOrigin = obj =>{
    const checked:any = Object.entries(obj).find(([key,value]:[keyof GenerateOrigin,boolean])=> value);
    return checked[0];
} 

const initialState:GenerateState = {
    generate:{
        size:{
            width:100,
            height:100,
            number:1
        },
        origin:{
            form:true,
            group:false,
            pathItem:false
        }
    }
}


export const generateSlice = createSlice({
    name:"generate",
    initialState,
    reducers:{
        setSize:(state,action:PayloadAction<{prop:keyof GenerateSize,value:number}>)=>{
            state.generate.size[action.payload.prop] = action.payload.value;
        },
        setOrigin:(state,action:PayloadAction<{prop:keyof GenerateOrigin,value:boolean}>)=>{
            Object.keys(state.generate.origin).forEach(key=>state.generate.origin[key] = false);
            state.generate.origin[action.payload.prop] = action.payload.value
        }
    }
});

export const { setSize , setOrigin } = generateSlice.actions;

export const generate = (state:RootState) => state.generate.generate;

export default generateSlice.reducer;