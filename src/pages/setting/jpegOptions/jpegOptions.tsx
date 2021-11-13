import * as React from "react";
import { useCallback } from "react";
import styled from "styled-components";
import { useAppDispatch , useAppSelector } from "../../../app/hooks";
import { setQuality } from "../../../features/saveOptions/jpegSlice";

import { StdNumberBox } from "../../../components/parts/numberBox";
import { SubTitle } from "../settingMain";

import { SettingContainer } from "../../../styles/container";
const { CommonContainer } = SettingContainer;

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
`;

const JPGTitle = styled.h3`
    font-size: 15px;
    color: #fff;
    font-weight: 300;
    margin: 0px;
    margin-right: 10px;
`;

const JpegOptionCompo = () =>{
    const dispatch = useAppDispatch();
    const jpegOptions = useAppSelector(state=>state.jpegOptions.options);
    const handleQuality = useCallback((e)=>{
        dispatch(setQuality({quality:parseFloat(e.target.value)}));
    },[])
    return(
        <CommonContainer>
            <Wrapper>
                <JPGTitle>Jpeg options</JPGTitle>
                <StdNumberBox 
                    func={handleQuality} 
                    name="quality"  
                    value={jpegOptions.quality}
                    min={0}
                    max={100}
                    step={1}
                />
            </Wrapper>
        </CommonContainer>
    )
}

export default JpegOptionCompo;