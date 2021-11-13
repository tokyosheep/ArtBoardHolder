import * as React from "react";
import styled from "styled-components";

import RadioForm from "./radioForm/radioForm";
import NumberForm from "./numberForm/numberForm";

import { StdButton } from "../../parts/button";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

import { GenerateArg , getProp } from "../../../features/generate/generateSlice";
import { unitsNum } from "../../../features/unit/unitSlice";
import { loadBoards } from "../../../features/artBoard/artboardSlice";
import { writeDebugData } from "../../../../fileSystem/init";
import {  SendHostScript } from "../../../../fileSystem/connectJSX";

const GenerateWrapper = styled.div`
    padding: 10px;
`;

export const GenerateForm = styled.ul`
    padding: 0;
    list-style: none;
    width: 100%;
    height: auto;
    margin-top: 0px;
    margin-bottom: 25px;
    & > li{
        margin: 5px 0px;
    }
`;



const GenerateAsideCompo = () =>{
    const dispatch = useAppDispatch();
    const unit = useAppSelector(state=>state.unit.value);
    const generateValues = useAppSelector(state=>state.generate.generate);
    const generateBords = async() =>{
        const point = getProp(generateValues.origin);
        const arg:GenerateArg = {
            type:"generate",
            args:{
                point,
                size:{
                    width:unitsNum[unit](generateValues.size.width),
                    height:unitsNum[unit](generateValues.size.height),
                    number:generateValues.size.number
                }
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
        <GenerateWrapper>
            <NumberForm disabled={getProp(generateValues.origin) !== "form"} />
            <RadioForm />
            <StdButton func={generateBords} name="generate" />
        </GenerateWrapper>
    )
}

export default GenerateAsideCompo;