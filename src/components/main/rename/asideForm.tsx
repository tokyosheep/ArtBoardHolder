import * as React from "react";
import { useContext , FC } from "react";
import styled,{ThemeContext}  from "styled-components";
import { useAppDispatch , useAppSelector } from "../../../app/hooks";

import TextForm from "./asideGrids/textForm";
import CheckBoxForm from "./asideGrids/checkBoxForm";
import PresetForm from "./presets/presetForm";

import { StdButton } from "../../parts/button";

import { RenameStrings , RenameSwitchs ,  RenameValueType } from "../../../features/rename/renameSlice";
import { ArtBoard , loadBoards } from "../../../features/artBoard/artboardSlice";
import { writeDebugData } from "../../../../fileSystem/init";
import {  ArgObject , SendHostScript } from "../../../../fileSystem/connectJSX";

type RenamedBoards = ArtBoard&{renamed:string};

type RenameArgProp = {
    artBoards:RenamedBoards[],
}

const FormWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 130px 170px 30px 1fr ;
    grid-template-areas: 
        "numberForm"
        "checkForm"
        "btnForm"
        "presetForm"
    ;
`;

export const TextFormWrapper = styled.ul`
    grid-area:numberForm;
    padding: 5px;
    box-sizing:border-box;
    margin-top: 0px;
    margin-bottom: 20px;
    & > li{
        margin: 5px 0px;
    }
`;

export const CheckBoxFormWrapper = styled(TextFormWrapper)`
    grid-area:checkForm;
`;

const ButtonWrapper = styled.div`
    grid-area:btnForm;
`;

export const PresetWrapper = styled.div`
    grid-area:presetForm;
    padding: 5px;
    box-sizing:border-box;
`;

import { renameTitle , getSequenceNum } from "../../../features/rename/renameSlice";

const RenameFormCompo = () =>{
    const dispatch = useAppDispatch();
    const regExp = useAppSelector(state=>state.rename);
    const artBoards = useAppSelector(state=>state.artBoards.boards);
    const renameArtBoard = async() =>{
        const arg:ArgObject<RenameArgProp> = {
            type:"rename",
            args:{
                artBoards:artBoards.map((a,i)=> ({...a,renamed:renameTitle(a.name,regExp,getSequenceNum(i))}))
            }
        }
        //await writeDebugData(args);
        const connect = new SendHostScript();
        const r = await connect.callHostScript(arg);
        console.log(r);
        if(typeof r === "boolean")return;
        dispatch(loadBoards(JSON.parse(r)));
    };
    return(
        <FormWrapper>
            <TextForm />
            <CheckBoxForm />
            <ButtonWrapper>
                <StdButton name="rename" func={renameArtBoard}/>
            </ButtonWrapper>    
            <PresetForm />
        </FormWrapper>
    )
}

export default RenameFormCompo;