import * as React from "react";
import styled from "styled-components";
import { useAppDispatch , useAppSelector } from "../../app/hooks";
import { switchVisible } from "../../features/saveOptions/optionWIndowSlice";

import { StdButton } from "../../components/parts/button";

import PresetListCompo from "./pdfPresets/presetList";
import JpegOptionCompo from "./jpegOptions/jpegOptions";
import SavePathCompo from "./savePath/savePath";

import { SettingContainer } from "../../styles/container";
const { Container } = SettingContainer;
const { CommonContainer } = SettingContainer;

export const SubTitle = styled.h3`
    font-size: 15px;
    color: #fff;
    font-weight: 300;
    margin: 10px 0px;
`;



const SettingMain = () =>{
    const dispatch = useAppDispatch();
    const visible = useAppSelector(state=>state.windowVisible.visible);
    return(
        <Container checked={visible}>
            <PresetListCompo />
            <JpegOptionCompo />
            <SavePathCompo />
            <CommonContainer>
                <StdButton name="back to main" func={()=>{
                    dispatch(switchVisible({visible:false}));
                }
                } widthSize="100px" margin="10px 0px"/>
            </CommonContainer>
        </Container>
    )
}

export default SettingMain;