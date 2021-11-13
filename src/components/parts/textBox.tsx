import * as React from "react";
import { useContext , FC } from "react";
import styled,{ThemeContext} from "styled-components";
import { StdNumberWrapper , StdNumberText , StdNumberInput } from "./numberBox";

export type TextProps = {
    name:string,
    value:string,
    func:(e:React.ChangeEvent<HTMLInputElement>,name:string)=>void,
    long?:boolean
} 

export const StdTextBox:FC<TextProps> = ({name,func,value,long=false}) =>{
    const theme = useContext(ThemeContext);
    return(
        <StdNumberWrapper long={long}>
            <StdNumberText textColor={theme.light}>{name}</StdNumberText>
            <StdNumberInput 
                bg={theme.gray}
                type="text" 
                value={value} 
                onChange={(e)=>func(e,name)}
                bd={theme.lightGray}
                textColor={theme.light}
            >

            </StdNumberInput>
        </StdNumberWrapper>
    )
}

