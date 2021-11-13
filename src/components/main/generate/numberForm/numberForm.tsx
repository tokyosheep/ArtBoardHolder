import * as React from "react";
import { useContext , FC , useCallback } from "react";
import { useAppDispatch , useAppSelector } from "../../../../app/hooks";
import { setSize } from "../../../../features/generate/generateSlice";

import { StdNumberBox } from "../../../parts/numberBox";
import { GenerateForm } from "../asideForm";

const NumberForm:FC<{disabled:boolean}> = ({disabled}) =>{
    const dispatch = useAppDispatch();
    const generateNum = useAppSelector(state=>state.generate.generate.size);
    const handleNumberBox = useCallback((e,name)=>{
        dispatch(setSize({prop:name,value:parseFloat(e.target.value)}))
    },[generateNum]);
    const numberList = Object.entries(generateNum).map(([key,value],i)=>{
        return(
            <li key={i}>
                <StdNumberBox 
                    value={value}
                    name={key}
                    func={handleNumberBox}
                    min={1}
                    max={ key === "number" ? 100 : 100000}
                    step="any"
                    disabled={disabled}
                />
            </li>
        )
    });
    return(
        <GenerateForm>
            {numberList}
        </GenerateForm>
    )
}

export default NumberForm;