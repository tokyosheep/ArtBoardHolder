import * as React from "react";
import { useCallback } from "react";
import { useAppDispatch , useAppSelector } from "../../../../app/hooks";
import { setValues } from "../../../../features/rename/renameSlice";
import { TextFormWrapper } from "../asideForm";

import { StdTextBox } from "../../../parts/textBox";

const TextForm = () =>{
    const dispatch = useAppDispatch();
    const renameValues = useAppSelector((state=>state.rename.values));
    const handleTextForm = useCallback((e,name)=>{
        dispatch(setValues({prop:name,value:e.target.value}));
    },[renameValues]);
    const textForms = Object.entries(renameValues).map(([key,value])=>{
        return(
            <li key={key}>
                <StdTextBox value={value} name={key} func={handleTextForm} />
            </li>
        )
    })
    return(
        <TextFormWrapper>
            {textForms}
        </TextFormWrapper>
    )
}

export default TextForm;