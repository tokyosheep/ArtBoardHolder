import * as React from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

import { StdButton } from "../../parts/button";
import { ArtBoard , loadBoards } from "../../../features/artBoard/artboardSlice";
import {  ArgObject , SendHostScript } from "../../../../fileSystem/connectJSX";
import { writeDebugData } from "../../../../fileSystem/init";

const OtherButtonsWrapper = styled.ul`
    list-style: none;
    padding: 10px;
    & > li{
        margin: 10px 0px;
    }
`;

type Args = ArgObject<ArtBoard[]>;
type KeyofType = "centerPoint"|"crossHairs"|"safeArea"|"fitInsideItems";
const getArg:(key:KeyofType,boards:ArtBoard[])=>Args = (key,boards) => ({type:key,args:boards});

const OtherForm = () =>{
    const dispatch = useAppDispatch();
    const boards = useAppSelector(state=>state.artBoards.boards);
    const switchCenterPoint = async()=>{
        const arg:Args = getArg("centerPoint",boards);
        //await writeDebugData(arg);
        const connect = new SendHostScript();
        const r = await connect.callHostScript(arg);
        console.log(r);
    }
    const switchCrossHairs = async() =>{
        const arg:Args = getArg("crossHairs",boards);
        const connect = new SendHostScript();
        const r = await connect.callHostScript(arg);
        console.log(r);
    }
    const switchSafeArea = async() =>{
        const arg:Args = getArg("safeArea",boards);
        const connect = new SendHostScript();
        const r = await connect.callHostScript(arg);
        console.log(r);
    }
    const fitInsideItems = async() =>{
        const arg:Args = getArg("fitInsideItems",boards);
        const connect = new SendHostScript();
        const r = await connect.callHostScript(arg);
        console.log(r);
        if(typeof r === "boolean")return;
        dispatch(loadBoards(JSON.parse(r)));
    }
    return(
        <OtherButtonsWrapper>
            <li>
                <StdButton name="center" func={switchCenterPoint}/>
            </li>
            <li>
                <StdButton name="cross hair" func={switchCrossHairs} />
            </li>
            <li>
                <StdButton name="safe area"  func={switchSafeArea} />
            </li>
            <li>
                <StdButton name="fit items" func={fitInsideItems} />
            </li>
        </OtherButtonsWrapper>
    )
}

export default OtherForm;