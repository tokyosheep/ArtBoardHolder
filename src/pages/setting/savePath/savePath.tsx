import * as React from "react";
import { useCallback } from "react";
import styled from "styled-components";
import { useAppDispatch , useAppSelector } from "../../../app/hooks";
import { setPath, setValue } from "../../../features/saveOptions/savePath";

import { StdTextBox } from "../../../components/parts/textBox";
import { StdCheckBox } from "../../../components/parts/checkBox";
import { StdButton } from "../../../components/parts/button";

import { openFolderDialog } from "../../../../fileSystem/init";
import { SettingContainer } from "../../../styles/container";
const { CommonContainer } = SettingContainer;

const SubTitle = styled.h3`
    font-size: 15px;
    color: #fff;
    font-weight: 300;
    margin: 0px;
`;

const CheckBoxWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    gap: 10px;
    width: 100%;
    height: auto;
    padding: 15px 0px;
    & > label{
        margin-right: 20px;
    }
`;

const PathWrapper = styled.div`
    display: flex;
    justify-content: space-around;
`;

const SavePathCompo = () =>{
    const dispatch = useAppDispatch();
    const saveOptions = useAppSelector(state=>state.savePath.options);
    const handleCheckBox = useCallback((e,name)=>{
        console.log(e);
        console.log(name);
        dispatch(setValue(
            {
                prop:name,
                checked:e.target.checked
        }));
    },[saveOptions]);
    const savePath = useCallback(()=>{
        const folder:string|null|undefined = openFolderDialog();
        if(folder === null || folder === undefined)return;
        console.log(folder);
        dispatch(setPath({value:folder}));
    },[saveOptions]);
    const handleTextBox = useCallback((e,name)=>{
        dispatch(setPath({value:e.target.value}));
    },[saveOptions]);
    return(
        <CommonContainer>
            <SubTitle>save path</SubTitle>
            <CheckBoxWrapper>
                <StdCheckBox name="export" checked={saveOptions.export} func={handleCheckBox} />
                <StdCheckBox name="useBoardName" checked={saveOptions.useBoardName} func={handleCheckBox} />
            </CheckBoxWrapper>
            <PathWrapper>
                <StdTextBox  name="save path" func={handleTextBox} value={saveOptions.savePath} long={true}/>
                <StdButton name="call dialog" func={savePath} widthSize="130px" margin="20px" />
            </PathWrapper>
        </CommonContainer>
    )
}

export default SavePathCompo;