import * as React from "react";
import { useState , useMemo , useContext } from "react";
import styled,{ ThemeContext } from "styled-components";

import { loadBoards } from "../../../../features/artBoard/artboardSlice";
import { MainContainer } from "../../../../styles/container";
const { EventButtonContainer } = MainContainer;

import { NoticeableButton } from "../../../parts/button";

import { SendHostScript } from "../../../../../fileSystem/connectJSX";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { switchEvent } from "../../../../features/event/switchEvent";

const ButtonWrapper = styled.div<{bg:string}>`
    width: 100%;
    height: 100%;
    display: flex;
    padding: 5px;
    box-sizing: border-box;
    justify-content: space-around;
    background: ${props=>props.bg};
    border-radius: 5px;
`;

const EventAsideArea = () =>{
    const dispatch = useAppDispatch();
    const isEvent = useAppSelector(state=>state.isDocEvent.isDocEvent);
    const theme = useContext(ThemeContext);
    const connect = new SendHostScript("getArtBoards.jsx");
    const setDocumentBoards = async()=>{
        const b = await connect.callJsx();
        if(!b)return false;
        dispatch(loadBoards(JSON.parse(b)));
    };
    const setSwitchEvent = (e,flag)=>dispatch(switchEvent({check:!flag}));
    return(
        <EventButtonContainer>
            <ButtonWrapper bg={theme.gray}>
                <NoticeableButton name="load artboard" func={setDocumentBoards}/>
                <NoticeableButton 
                    name={isEvent ? "ON" : "OFF"}
                    func={setSwitchEvent}
                    arg={isEvent}
                />
            </ButtonWrapper>
        </EventButtonContainer>
    )
}

export default EventAsideArea;