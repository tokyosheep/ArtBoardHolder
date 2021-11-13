import * as React from "react";
import { useContext } from "react";
import styled,{ ThemeContext } from "styled-components";
import { unitKeys , UnitKeys } from "../../../../features/unit/unitSlice";

import { CenterPlace } from "../../../../styles/mixin";

import { MainContainer } from "../../../../styles/container";
const { FooterContainer } = MainContainer;

import { useAppSelector , useAppDispatch } from "../../../../app/hooks";
import { setUnit } from "../../../../features/unit/unitSlice";

const UnitWrapper = styled.ul`
    height: 100%;
    width: 70%;
    display: flex;
    justify-content: flex-start;
    list-style: none;
    padding: 0;
`;

const UnitButton = styled.li<{bg:string,checkedColor:string,checked:boolean}>`
    width: 80px;
    height: 100%;
    position: relative;
    background: ${props=>props.checked ? props.checkedColor : props.bg};
    cursor: pointer;
`;

const UnitText = styled.div<{textC:string}>`
    font-size: 12px;
    font-weight: 300;
    color: ${props=>props.textC};
    ${CenterPlace};
`;

const FooterCompo = () =>{
    const dispatch = useAppDispatch();
    const presentUnit = useAppSelector(state=>state.unit.value);
    const theme = useContext(ThemeContext);
    const unitList = unitKeys.map((unit:UnitKeys,i)=>{
        return (
            <UnitButton 
                checkedColor={theme.lightGray} 
                bg={theme.darkGray} 
                key={unit}
                checked={presentUnit===unit}
                onClick={()=>dispatch(setUnit(unit))}
            >
                <UnitText textC={theme.white}>
                    {unit}
                </UnitText>
            </UnitButton>
        )
    })
    return(
        <FooterContainer>
            <UnitWrapper>
                {unitList}
            </UnitWrapper>
        </FooterContainer>
    )
}

export default FooterCompo;