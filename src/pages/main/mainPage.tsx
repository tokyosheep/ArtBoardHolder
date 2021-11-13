import * as React from "react";

import { MainContainer } from "../../styles/container";
const { Container } = MainContainer;

import useMode from "../windowMode/useMode";

import OptionBase from "../../components/main/common/asideOptionBase/asideOption";
import HeaderCompo from "../../components/main/common/header/header";
import ArtBoardCompo from "../../components/main/common/boardArea/boardArea";
import EventAsideArea from "../../components/main/common/eventAside/eventAside";
import FooterCompo from "../../components/main/common/footer/footer";

const MainPage = () =>{
    const [mode,setMode,SetOptionCompo] = useMode();
    return(
        <Container>
            <HeaderCompo mode={mode} setMode={setMode} />
            <OptionBase Elm={SetOptionCompo(mode)} />
            <ArtBoardCompo />
            <EventAsideArea />
            <FooterCompo />
        </Container>
    )
}

export default MainPage;