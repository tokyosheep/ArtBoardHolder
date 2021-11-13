import * as React from "react";
import { useContext , FC } from "react";
import styled,{ThemeContext}  from "styled-components";
import { darken } from "polished";

export type ButtonProps = {
    name:string,
    func:(name:string,arg?:unknown)=>void,
    arg?:unknown
}

const StdButtonStyle = styled.button<{bg:string,textColor:string,widthSize:string,margin:string}>`
    border: none;
    display: block;
    background: ${props=>props.bg};
    color: ${props=>props.textColor};
    font-size: 12px;
    font-weight: 300;
    border-radius: 5px;
    width: ${props=>props.widthSize};
    height: 20px;
    margin: ${props=>props.margin};
    cursor: pointer;
    &:focus{
        outline: none;
    }
    &:active{
        background: ${props=> darken(0.2,props.textColor)};
    }
`;

export const StdButton:FC<ButtonProps&{widthSize?:string,margin?:string}> = ({name,func,widthSize="90%",margin="auto"}) =>{
    const theme = useContext(ThemeContext);
    return(
        <StdButtonStyle 
            bg={theme.lightGray} 
            textColor={theme.black}
            onClick={()=>func(name)}
            widthSize={widthSize}
            margin={margin}
        >
            {name}
        </StdButtonStyle>
    )
}

const NoticeBleStyle = styled.button<{bg:string,textColor:string}>`
    border: none;
    background: ${props=>props.bg};
    color: ${props=>props.textColor};
    font-size: 12px;
    font-weight: 300;
    width: 100px;
    height: 25px;
    &:focus{
        outline: none;
    }
    &:active{
        background: ${props=> darken(0.2,props.textColor)};
    }
`;

export const NoticeableButton:FC<ButtonProps> = ({name,func,arg}) =>{
    const theme = useContext(ThemeContext);
    return(
        <NoticeBleStyle 
            bg={theme.lightGray} 
            textColor={theme.black}
            onClick={()=>func(name,arg)}
        >
            {name}
        </NoticeBleStyle>
    )
}