import * as React from "react";
import { useContext , FC } from "react";
import styled,{ThemeContext}  from "styled-components";
import { StdNumberBox } from "../../parts/numberBox";
import { StdButton } from "../../parts/button";

import { useAppDispatch , useAppSelector } from "../../../app/hooks";
import { setValue , ReizeValueType } from "../../../features/resize/resizeSlice";
import { ArtBoard , loadBoards } from "../../../features/artBoard/artboardSlice";

import { writeDebugData } from "../../../../fileSystem/init";
import { TurnFormNumber } from "../../../features/unit/unitSlice";
import {  ArgObject , SendHostScript } from "../../../../fileSystem/connectJSX";

type ArgBoards = {
    artBoards:ArtBoard[],
    resizeValues:ReizeValueType
}

const ReiszeFormWrapper = styled.div`
    width: 100%;
    height: 100%;
`;

const NumberListWrapper = styled.ul`
    list-style: none;
    padding: 0;
    margin-bottom: 30px;
    & > li{
        margin-bottom: 15px;
    }
`;

const ButtonWrapper = styled.ul`
    list-style: none;
    padding: 0;
    & > li{
        margin-bottom: 10px;
    }
`;

const ResizeFormCompo = () =>{
    const dispatch = useAppDispatch();
    const artBoards = useAppSelector(state=>state.artBoards.boards);
    const resizeValues = useAppSelector(state=>state.resize.values);
    const unitValue = useAppSelector(state=>state.unit.value);
    const numberForms = Object.entries(resizeValues).map(([key,value]:[keyof ReizeValueType,number],i)=>{
        return(
            <li key={key}>
                <StdNumberBox 
                    name={key}
                    value={value}
                    min={-100000}
                    max={100000}
                    step="any"
                    func={(e,name)=>dispatch(setValue({prop:key,value:parseFloat(e.target.value)}))}
                />
            </li>
        )
    });
    const resizeBoard = async() =>{
        
        const arg:ArgObject<ArgBoards> = {
            type:"resizeBoards",
            args:{
                resizeValues:{
                    width:TurnFormNumber[unitValue](resizeValues.width),
                    height:TurnFormNumber[unitValue](resizeValues.height),
                },
                artBoards
            }
        }
        console.log(TurnFormNumber[unitValue](resizeValues.width));
        //await writeDebugData(arg);
        const connect = new SendHostScript();
        const r = await connect.callHostScript(arg);
        console.log(r);
        if(typeof r === "boolean")return;
        dispatch(loadBoards(JSON.parse(r)));
    }
    const adjustSize = async() =>{
        const arg:ArgObject<ArgBoards> = {
            type:"adjustBoards",
            args:{
                resizeValues:{
                    width:TurnFormNumber[unitValue](resizeValues.width),
                    height:TurnFormNumber[unitValue](resizeValues.height),
                },
                artBoards
            }
        }
        //await writeDebugData(arg);
        const connect = new SendHostScript();
        const r = await connect.callHostScript(arg);
        console.log(r);
        if(typeof r === "boolean")return;
        dispatch(loadBoards(JSON.parse(r)));
    }
    return(
        <ReiszeFormWrapper>
            <NumberListWrapper>
                {numberForms}
            </NumberListWrapper>
            <ButtonWrapper>
                <li>
                    <StdButton name="resize" func={resizeBoard} />
                </li>
                <li>
                    <StdButton name="adjust" func={adjustSize}/>
                </li>
            </ButtonWrapper>
        </ReiszeFormWrapper>
    )
}

export default ResizeFormCompo;