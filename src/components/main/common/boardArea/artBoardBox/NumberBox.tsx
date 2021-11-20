import * as React from "react";
import { FC } from "react";
import { useContext } from "react";
import styled,{ ThemeContext } from "styled-components";

const BoxWidth = 80;

const NumberBox = styled.div<{text:string}>`
    width: ${BoxWidth}px;
    height: 100%;
    color: ${props=>props.text};
    font-size: 10px;
    font-weight: 300;
    display: flex;
    justify-content: space-between;
`;

const NumberTitle = styled.div`
    width: 35px;
    height: 100%;
`;

const NumberAmount = styled.div`
    width: ${BoxWidth-10}px;
    height: 100%;
`;

export type NumberBoxProps = {
    title:string,
    number:string|number,
}

const ArtBoardNumberBox:FC<NumberBoxProps>= ({title,number}) =>{
    const theme = useContext(ThemeContext);
    return(
        <NumberBox text={theme.white}>
            <NumberTitle>{title}</NumberTitle>
            <NumberAmount>{number}</NumberAmount>
        </NumberBox>
    )
}

export default ArtBoardNumberBox;