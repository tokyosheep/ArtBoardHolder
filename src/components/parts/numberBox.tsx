import * as React from "react";
import { useContext , FC } from "react";
import styled,{ThemeContext}  from "styled-components";

import { darken } from "polished";

export type NumberProp = {
    value:number,
    func:(e:React.ChangeEvent<HTMLInputElement>,name:string)=>void,
    name:string,
    min:number,
    max:number,
    step:number|"any",
    disabled?:boolean
}

export const StdNumberWrapper = styled.label<{long:boolean}>`
    display: block;
    width: ${props=>props.long ? "300px"  : "70px"};
    height: 35px;
`;

export const StdNumberText = styled.span<{textColor:string}>`
    font-size: 6px;
    font-weight: 300;
    color: ${props=>props.textColor};
`;

export const StdNumberInput = styled.input<{bd:string,textColor,bg:string}>`
    background: ${props=>props.bg};
    border-radius: 3px;
    width: 100%;
    height: 20px;
    border: 1px solid ${props=>props.bd};
    color: ${props=>props.textColor};
    transition: .3s linear;
    &:disabled{
        color: ${props=>darken(0.2,props.textColor)};
        border-color: ${props=>darken(0.2,props.bd)};
    }
`;

export const StdNumberBox:FC<NumberProp> = ({name,value,min,max,func,step,disabled=false}) =>{
    const theme = useContext(ThemeContext);
    return(
        <StdNumberWrapper long={false} >
            <StdNumberText textColor={theme.white}>{name}</StdNumberText>
            <StdNumberInput 
                bg={theme.darkGray}
                bd={theme.lightGray}
                textColor={theme.white}
                type="number"
                value={value}
                step={step}
                onChange={(e)=>func(e,name)}
                max={max}
                min={min}
                disabled={disabled}
            >

            </StdNumberInput>
        </StdNumberWrapper>
    )
}