import * as React from "react";
import { useCallback } from "react";
import styled  from "styled-components";

import { FormWrapper } from "../exportForm";
import { StdRadioButton } from "../../../parts/radioBox";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";

import { setFormat } from "../../../../features/export/formatSlice";

const FormatWrapper = () =>{
    const dispatch = useAppDispatch();
    const formats = useAppSelector(state=>state.formats.formats);
    const handleRadioButton = useCallback((e,name)=>{
        dispatch(setFormat({prop:name,checked:e.target.checked}));
    },[formats]);
    const formatList = Object.entries(formats).map(([key,value],i)=>{
        return(
            <li key={key}>
                <StdRadioButton
                    name={key}
                    checked={value}
                    func={handleRadioButton}
                />
            </li>
        )
    });
    return(
        <FormWrapper>
            {formatList}
        </FormWrapper>
    )
}

export default FormatWrapper;