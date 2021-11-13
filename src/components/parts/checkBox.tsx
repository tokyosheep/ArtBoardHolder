import * as React from "react";
import { useContext , FC } from "react";
import styled,{ThemeContext}  from "styled-components";
import { lighten , darken } from "polished";

import { CenterPlace } from "../../styles/mixin";

export type CheckBoxProps ={
    checked:boolean,
    func:(e:React.ChangeEvent<HTMLInputElement>,name:string)=>void,
    name:string,
}

const BoardCheckBoxWrapper = styled.label<{bg:string,checked:boolean}>`
    width: 50px;
    height: 20px;
    border-radius: 10px;
    display: block;
    background: ${props=>props.checked ? darken(0.2,props.bg) : props.bg};
    position: relative;
    cursor: pointer;
    & > input{
        display: none;
    }
    &:active{
        background: ${props=> darken(0.4,props.bg)};
    }
`;

const BoardBoxText = styled.div<{textColor:string}>`
    font-size: 12px;
    font-weight: 300;
    color: ${props=>props.textColor};
    ${CenterPlace};
`;

export const BoardCheckBox:FC<CheckBoxProps> = ({checked,func,name}) =>{
    const theme = useContext(ThemeContext);
    return(
        <BoardCheckBoxWrapper 
            bg={theme.lightGray} 
            checked={checked}
        >
            <input type="checkbox" 
                checked={checked}
                onChange={(e)=>func(e,name)}
            />
            <BoardBoxText textColor={theme.black}>
                {name}
            </BoardBoxText>
        </BoardCheckBoxWrapper>
    )
}

const StdWidth = 70;

const StdCheckBoxWrapper = styled.label`
    display: block;
    width: ${StdWidth}px;
    height: 30px;
    border-radius: 10px;
    position: relative;
    cursor: pointer;
    & > input{
        display: none;
    }
`;

const StdCheckBoxTitle = styled.div<{textColor:string}>`
    font-size: 6px;
    font-weight: 300;
    color: ${props=>props.textColor};
`;

const StdCheckBoxHole = styled.div<{bg:string,checked:boolean}>`
    position: relative;
    width: 100%;
    height: 20px;
    border-radius: 10px;
    background: ${props=> props.checked ? props.bg : lighten(0.1,props.bg) };
    transition: .3s linear;
`;

const StdCheckBoxBall = styled.div<{checked:boolean}>`
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #fff;
    position: absolute;
    top: 50%;
    left: ${props=> props.checked ? (StdWidth-20)+"px" : "0px" };
    transform: translateY(-50%);
    transition: .3s linear;
`;

export const StdCheckBox:FC<CheckBoxProps> = ({name,checked,func}) =>{
    const theme = useContext(ThemeContext);
    return(
        <StdCheckBoxWrapper>
            <input type="checkbox" checked={checked} onChange={(e)=>func(e,name)} />
            <StdCheckBoxTitle textColor={theme.light}>
                {name}
            </StdCheckBoxTitle>
            <StdCheckBoxHole bg={theme.darkGray} checked={checked}>
                <StdCheckBoxBall checked={checked}></StdCheckBoxBall>
            </StdCheckBoxHole>
        </StdCheckBoxWrapper>
    )
}