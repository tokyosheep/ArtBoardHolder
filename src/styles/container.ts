import styled from "styled-components";

const WindowSize = {
    width:500,
    height:500
}

export const MainContainer = {
    Container:styled.div`
        position: relative;
        display: grid;
        grid-template-rows: 50px 340px 60px 20px;
        grid-template-columns: 140px 1fr;
        grid-template-areas: 
            "header header"
            "asideOptions artBoardArea"
            "asideOptions eventBtnArea"
            "footer footer"
        ;
    `,
    HeadContainer:styled.header`
        grid-area: header;
    `,
    AsideOptionsContainer:styled.aside`
        padding: 10px;
        grid-area:asideOptions;
    `,
    ArtBoardContainer:styled.main`
        grid-area: artBoardArea;
        overflow: scroll;
    `,
    EventButtonContainer:styled.aside`
        grid-area: eventBtnArea;
        padding: 10px;
        padding-bottom: 0px;
        box-sizing:border;
    `,
    FooterContainer:styled.footer`
        grid-area: footer;
    `
};

export const SettingContainer = {
    Container:styled.div<{checked:boolean}>`
        position: fixed;
        z-index: 20;
        top: 0%;
        left: ${props=>props.checked ? "0px" : "100%"};
        width: 100%;
        height: 100%;
        padding: 10px;
        background: #212121;
        box-sizing:border-box;
        transition: .3s linear;
        & > div{
            margin-bottom: 10px;
        }
    `,
    CommonContainer:styled.div`
        padding: 15px;
        border-radius: 10px;
        background: #5A5A5A;
        border: 1px solid #707070;
        width: 100%;
        height: auto;
        box-sizing:border-box;
    `
}

