import { createSlice , PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export type RenameStrings = {
    regExp:string,
    replace:string,
    addText:string,
}

export type RenameSwitchs = {
    addSequence:boolean,
    addText:boolean,
    global:boolean,
    ignore:boolean
}

export interface RenameValueType {
    values:RenameStrings,
    switches:RenameSwitchs
}

const initialState:RenameValueType = {
    values:{
        regExp:"",
        replace:"",
        addText:""
    },
    switches:{
        addText:false,
        addSequence:false,
        global:true,
        ignore:true
    }
}

export const renameTitle:(name:string,regExpValue:RenameValueType,num?:string)=>string = (name,regExpValue,num) =>{
    try{
        let options = "";
        if(regExpValue.switches.global)options += "g";
        if(regExpValue.switches.ignore)options += "i";
        const regExp = new RegExp(regExpValue.values.regExp,options);
        let newName = name.replace(regExp,regExpValue.values.replace);
        if(regExpValue.switches.addText)newName = regExpValue.values.addText + newName;
        if(regExpValue.switches.addSequence)newName = num+newName;
        return newName;
    }catch(e){
        console.log(e);
        return name;
    }
}

export const getSequenceNum:(num:number)=>string = num => (num+1).toString().padStart(2,"0");


export const renameSlice = createSlice({
    name:"rename",
    initialState,
    reducers:{
        setValues:(state,action:PayloadAction<{prop:keyof RenameStrings,value:string}>)=>{
            state.values[action.payload.prop] = action.payload.value;
        },
        checkSwitch:(state,action:PayloadAction<{prop:keyof RenameSwitchs,check:boolean}>)=>{
            state.switches[action.payload.prop] = action.payload.check;
        },
        setPreset:(state,action:PayloadAction<RenameValueType>)=>{
            state.values = action.payload.values;
            state.switches = action.payload.switches;
        }
    }
});

export const { setValues , checkSwitch , setPreset } = renameSlice.actions;

export const renameValue = (state:RootState)=> state.rename;

export default renameSlice.reducer;