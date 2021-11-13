import * as React from "react";
import { useCallback } from "react";
import styled from "styled-components";
import { useAppDispatch , useAppSelector } from "../../../app/hooks";

import { StdButton } from "../../../components/parts/button";
import { StdCheckBox } from "../../../components/parts/checkBox";
import { ListSelector } from "../../../components/parts/selector";
import { SubTitle } from "../settingMain";

import { loadPreset , selectPreset , setUsePreset } from "../../../features/saveOptions/presetSlice";

import { SettingContainer } from "../../../styles/container";
const { CommonContainer } = SettingContainer;

import { SendHostScript } from "../../../../fileSystem/connectJSX";

const Wrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    width: 100%;
    height: auto;
    padding: 5px;
    & > label{
        margin-right: 20px;
        margin-top: -10px;
    }
`;



const PresetListCompo = () =>{
    const dispatch = useAppDispatch();
    const presetList = useAppSelector(state=>state.pdfPresetList);
    const loadPresetFromAI = useCallback(()=>{
        (async()=>{
            const connect = new SendHostScript("getPDFPresets.jsx");
            const r = await connect.callJsx();
            console.log(r);
            if(typeof r !== "string")return;
            console.log(JSON.parse(r));
            dispatch(loadPreset({presets:JSON.parse(r)}));
        })();
    },[presetList]);
    const handleSetUsePreset = useCallback((e)=>dispatch(setUsePreset({usePreset:e.target.checked})),[presetList]);
    const handleSelectPreset = useCallback((name)=>{
        dispatch(selectPreset({selected:name}));
    },[presetList]);
    return(
        <CommonContainer>
            <Wrapper>
                <SubTitle>PDF presets</SubTitle>
                <StdButton func={loadPresetFromAI} name="load preset" widthSize="100px" margin="10px 20px" />
            </Wrapper>
            <Wrapper>
                <StdCheckBox 
                    func={handleSetUsePreset} 
                    name="use preset" 
                    checked={presetList.preset.usePreset} 
                />
                <ListSelector 
                    list={presetList.preset.list} 
                    selected={presetList.preset.selected}
                    func={handleSelectPreset}
                />
            </Wrapper>
        </CommonContainer>
    )
}

export default PresetListCompo;