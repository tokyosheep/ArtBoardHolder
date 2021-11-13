import * as React from "react";
import { useContext , FC } from "react";
import styled,{ ThemeContext } from "styled-components";

import { MainContainer } from "../../../../styles/container";
const { AsideOptionsContainer } = MainContainer;

const AsideBase = styled.div<{bg:string}>`
    width: 100%;
    height: 100%;
    border-radius: 5px;
    padding: 5px;
    background:${props=>props.bg};
`;

const OptionBase:FC<{Elm:JSX.Element}> = ({Elm}) =>{
    const theme = useContext(ThemeContext);
    return(
        <AsideOptionsContainer>
            <AsideBase bg={theme.gray}>
                {Elm}
            </AsideBase>
        </AsideOptionsContainer>
    )
}

export default OptionBase;