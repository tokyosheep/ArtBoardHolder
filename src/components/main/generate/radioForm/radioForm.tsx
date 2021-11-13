import * as React from "react";
import { useContext , FC , useCallback } from "react";
import { useAppDispatch , useAppSelector } from "../../../../app/hooks";

import { setOrigin } from "../../../../features/generate/generateSlice";

import { StdRadioButton } from "../../../parts/radioBox";
import { GenerateForm } from "../asideForm";

const RadioForm = () =>{
    const dispatch = useAppDispatch();
    const generatePoints = useAppSelector(state=>state.generate.generate.origin);
    const handleRadioButton = useCallback((e,name)=>{
        dispatch(setOrigin({prop:name,value:e.target.checked}));
    },[generatePoints]);
    const pointsList = Object.entries(generatePoints).map(([key,value],i)=>{
        return(
            <li key={i}>
                <StdRadioButton func={handleRadioButton} name={key} checked={value}  />
            </li>
        )
    })
    return(
        <GenerateForm>
            {pointsList}
        </GenerateForm>
    )
}

export default RadioForm;