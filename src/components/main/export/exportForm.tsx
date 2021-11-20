import * as React from "react";
import fs from "fs";
import { useContext , FC } from "react";
import styled,{ThemeContext}  from "styled-components";
import { FormatObj } from "../../../features/export/formatSlice";
import { ArtBoard } from "../../../features/artBoard/artboardSlice";
import { switchVisible } from "../../../features/saveOptions/optionWIndowSlice";
import { SaveDirectory } from "../../../features/saveOptions/savePath";

import FormatWrapper from "./formatCompo/formatCompo";
import { StdButton } from "../../parts/button";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

import { writeDebugData , alertFromJSX } from "../../../../fileSystem/init";
import {  ArgObject , SendHostScript } from "../../../../fileSystem/connectJSX";

export const FormWrapper = styled.ul`
    list-style: none;
    padding: 0;
    width:100%;
    height: auto;
    margin-bottom: 10px;
    & > li{
        margin: 5px 0px;
    }
`;

const ExportWrapper = styled.div`
    padding: 10px;
`;

const ButtonWrapper = styled.ul`
    list-style: none;
    padding: 0;
    width:100%;
    margin: 10px 0px;
    & > li{
        margin: 10px 0px;
    }
`;

type Preset = {
    format:FormatObj,
    presets:{
        usePreset:boolean,
        preset:string
    },
    jpegOption:number,
    saveOptions:SaveDirectory["options"],
    boards:ArtBoard[]
}

const isFilePath = async filePath =>{
    try{
        const r = await fs.promises.stat(filePath);
        return r.isDirectory();
    }catch(e){
        alert(e);
        return false;
    }
}

const ExportForm = () =>{
    const dispatch = useAppDispatch();
    const boards = useAppSelector(state=>state.artBoards.boards);
    const presets = useAppSelector(state=>state.pdfPresetList.preset);
    const saveOptions = useAppSelector(state=>state.savePath.options);
    const jpegOptions = useAppSelector(state=>state.jpegOptions.options);
    const format = useAppSelector(state=>state.formats.formats);
    const exportBoards = async() =>{
        console.log(saveOptions);
        if(format.JPG&&(jpegOptions.quality < 0 || jpegOptions.quality > 100)){
            alertFromJSX("number of jpeg quality  is invlid");
            return;
        }
        if(saveOptions.export&&!isFilePath(saveOptions.savePath)){
            alertFromJSX("it's invlid directory");
            return;
        }
        const arg:ArgObject<Preset> = {
            type:"saveBoards",
            args:{
                format:format,
                presets:{
                    usePreset:presets.usePreset,
                    preset:presets.selected
                },
                jpegOption:jpegOptions.quality,
                saveOptions,
                boards
            }
        }
        await writeDebugData(arg);
        const connect = new SendHostScript();
        const r = await connect.callHostScript(arg);
        console.log(r);
    }
    return(
        <ExportWrapper>
            <FormatWrapper />
            <ButtonWrapper>
                <li>
                    <StdButton name="export" func={exportBoards} />
                </li>
                <li>
                    <StdButton name="options" func={()=>dispatch(switchVisible({visible:true}))} />
                </li>
            </ButtonWrapper>
        </ExportWrapper>
    )
}

export default ExportForm;