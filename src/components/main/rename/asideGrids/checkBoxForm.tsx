import * as React from "react";
import { useCallback } from "react";
import { useAppDispatch , useAppSelector } from "../../../../app/hooks";
import { checkSwitch } from "../../../../features/rename/renameSlice";

import { CheckBoxFormWrapper } from "../asideForm";
import { StdCheckBox } from "../../../parts/checkBox";

const CheckBoxForm = () =>{
    const dispatch = useAppDispatch();
    const switches = useAppSelector(state=>state.rename.switches);
    const handleCheckBox = useCallback((e,name)=>{
        dispatch(checkSwitch({prop:name,check:e.target.checked}));
    },[switches]);
    const switchList = Object.entries(switches).map(([key,value])=>{
        return(
            <li key={key}>
                <StdCheckBox checked={value} name={key} func={handleCheckBox} />
            </li>   
        )   
    })
    return(
        <CheckBoxFormWrapper>
            {switchList}
        </CheckBoxFormWrapper>
    )
}

export default CheckBoxForm;