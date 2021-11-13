import * as React from "react";
import { useState , useEffect } from "react";
import styled,{ ThemeContext } from "styled-components";
import { useContext } from "react";
import { useAppDispatch , useAppSelector } from "../../../../app/hooks";
import usePresets from "./usePreset";

import { CenterPlace } from "../../../../styles/mixin";
import { darken , lighten } from "polished";

import { PresetWrapper } from "../asideForm";

const PresetBox = styled.li<{bg:string}>`
    position: relative;
    width: 100%;
    height: 20px;
    border: 1px solid #000;
    box-sizing:border-box;
    background: ${props=>props.bg};
    &:hover{
        background: ${props=> lighten(0.2,props.bg)};
    }
    &:active{
        background: ${props=>darken(0.3,props.bg)};
    }
    & > div{
        ${CenterPlace};
        color: #fff;
        font-size: 10px;
        font-weight: 300;
    }
`;

const PresetBoxWrapper = styled.ul<{visible:boolean}>`
    position: absolute;
    top: -100px;
    left: 50px;
    list-style: none;
    padding: 0;
    width: 150px;
    height: 85%;
    display: ${props=>props.visible ? "block" : "none" };
    transition: .3s linear;
`;

const PresetButton = styled.div<{bg:string}>`
    position: relative;
    width: 90%;
    height: 20px;
    border: 1px solid #000;
    box-sizing:border-box;
    background: ${props=>props.bg};
    cursor: pointer;
    & > div{
        ${CenterPlace};
        color: #fff;
        font-size: 10px;
        font-weight: 300;
    }
`;

const PresetForm = () =>{
    const theme = useContext(ThemeContext);
    const { regPresets ,loadPreset } = usePresets();
    const [ visible , setVisible ] = useState<boolean>(false);
    useEffect(()=>{
        window.addEventListener("click",()=>{
            if(visible)setVisible(false);
            console.log("click");
        });
    },[]);
    const presetList = regPresets.map((v,i)=>{
        return(
            <PresetBox bg={theme.darkGray} 
            onClick={(e)=>{
                e.stopPropagation();
                setVisible(false);
                loadPreset(i);
            }}
                key={i}>
                <div>{v.name}</div>
            </PresetBox>
        )
    });
    return(
        <PresetWrapper>
            <PresetButton bg={theme.darkGray} onClick={()=>setVisible(true)}>
                <div>presets</div>
                <PresetBoxWrapper visible={visible}>
                    {presetList}
                </PresetBoxWrapper>
            </PresetButton>
        </PresetWrapper>
    )
}

export default PresetForm;