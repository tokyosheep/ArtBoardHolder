import * as React from "react";
import { useContext } from "react";
import styled,{ ThemeContext } from "styled-components";

import { MainContainer } from "../../../../styles/container";
const { EventButtonContainer } = MainContainer;

import { NoticeableButton } from "../../../parts/button";

import  useEvent from "./eventValues/useEvent";

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
    const theme = useContext(ThemeContext);
    const {setDocumentBoards,setSwitchEvent,isEventOn} = useEvent();
    return(
        <EventButtonContainer>
            <ButtonWrapper bg={theme.gray}>
                <NoticeableButton name="load artboard" func={setDocumentBoards}/>
                <NoticeableButton 
                    name={isEventOn ? "ON" : "OFF"}
                    func={setSwitchEvent}
                    arg={isEventOn}
                />
            </ButtonWrapper>
        </EventButtonContainer>
    )
}

export default EventAsideArea;