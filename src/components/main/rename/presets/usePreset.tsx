import * as React from "react";
import { useCallback , useState } from "react";
import { useAppDispatch , useAppSelector } from "../../../../app/hooks";
import { setPreset , RenameValueType } from "../../../../features/rename/renameSlice";

export type PresetType = RenameValueType & {name:string}

const presets:PresetType[]= [
    {
        values:{
            regExp:"\d+",
            replace:"",
            addText:""
        },
        switches:{
            addText:false,
            addSequence:true,
            global:true,
            ignore:true
        },
        name:"gotNumber"
    },
    {
        values:{
            regExp:".*",
            replace:"",
            addText:""
        },
        switches:{
            addText:false,
            addSequence:true,
            global:true,
            ignore:true
        },
        name:"all replace"
    },
    {
        values:{
            regExp:"\w",
            replace:"",
            addText:""
        },
        switches:{
            addText:false,
            addSequence:true,
            global:true,
            ignore:true
        },
        name:"all alphabets"
    }
]

const usePresets = () =>{
    const dispatch = useAppDispatch();
    const regData = useAppSelector(state=>state.rename);
    const [regPresets] = useState<PresetType[]>(presets); 
    const loadPreset = useCallback((index:number)=>{
        const { name , ...p } = regPresets[index];
        dispatch(setPreset(p));
    },[regData]);
    return { regPresets ,loadPreset };
}

export default usePresets;