import * as React from "react";
import { useContext , FC } from "react";
import styled,{ ThemeContext } from "styled-components";
import { modeKeys , ModeKeys } from "../../../../pages/windowMode/useMode";
import { CenterPlace } from "../../../../styles/mixin";

import { MainContainer } from "../../../../styles/container";
const { HeadContainer } = MainContainer;

const HeadButton = styled.li<{bg:string}>`
    width: 90px;
    height: 30px;
    background: ${props=>props.bg};
    position: relative;
`;

const TabText = styled.div`
    color: #fff;
    font-size: 10px;
    font-weight: 200;
    ${CenterPlace};
`;

const ButtonWrapper = styled.ul`
    list-style: none;
    padding: 10px;
    display: flex;
    justify-content: flex-start;
    gap:5px;
    margin: 0px;
`;

export type HeadProps = {
    mode:ModeKeys,
    setMode:(mode:ModeKeys)=>void
}

const HeaderCompo:FC<HeadProps> = ({mode,setMode}) =>{
    const theme = useContext(ThemeContext);
    const buttonList = modeKeys.map((m,i)=>{
        return(
            <HeadButton 
                bg={ m===mode ? theme.lightGray : theme.gray} 
                key={m}
                onClick={()=>setMode(m)}
            >
                <TabText>
                {m}
                </TabText>
            </HeadButton>
        )
    })
    return(
        <HeadContainer>
            <ButtonWrapper>
                {buttonList}
            </ButtonWrapper>
        </HeadContainer>
    )
}

export default HeaderCompo;