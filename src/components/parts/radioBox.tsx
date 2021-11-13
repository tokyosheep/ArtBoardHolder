import { darken } from "polished";
import * as React from "react";
import { useContext , FC } from "react";
import styled,{ThemeContext}  from "styled-components";

import { CenterPlace } from "../../styles/mixin";

export type RadioProps = {
    checked:boolean,
    name:string,
    func:(e:React.ChangeEvent<HTMLInputElement>,name:string)=>void
}

const StdRadioWrapper = styled.label<{bg:string,checked:boolean}>`
    width: 100px;
    height: 30px;
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 5px;
    box-sizing: border-box;
    border-radius: 10px;
    background: ${props=>props.checked ? props.bg: darken(0.2,props.bg)};
    transition: .3s linear;
    cursor: pointer;
    & > input{
        display: none;
    }
`;

const StdRadioHole = styled.div`
    width: 20px;
    height: 20px;
    background: #000;
    border-radius: 50%;
    position: relative;
`;

const StdRadioBtn = styled.div<{bg:string,checked:boolean}>`
    ${CenterPlace};
    width: 90%;
    height: 90%;
    border-radius: 50%;
    background: ${props=>props.bg};
    transform: translate(-50%,-50%)${props=>props.checked ? "scale(1)" : "scale(0.2)"} ;
    transition: .3s linear;
`;

const StdRadioTitle = styled.div<{textColor:string,checked:boolean}>`
    font-size: 11px;
    font-weight: 300;
    color: ${props=>props.checked ? props.textColor : darken(0.2,props.textColor)};
    transition: .3s linear;
`;

export const StdRadioButton:FC<RadioProps> = ({func,name,checked}) =>{
    const theme = useContext(ThemeContext);
    return(
        <StdRadioWrapper bg={theme.darkGray} checked={checked}>
            <input type="checkbox" onChange={(e)=>func(e,name)} checked={checked} />
            <StdRadioHole>
                <StdRadioBtn bg={theme.light} checked={checked} ></StdRadioBtn>
            </StdRadioHole>
            <StdRadioTitle textColor={theme.light} checked={checked} >{name}</StdRadioTitle>
        </StdRadioWrapper>
    )
}