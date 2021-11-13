import * as React from "react";
import { useContext } from "react";
import styled,{ ThemeContext } from "styled-components";

import { MainContainer } from "../../../../styles/container";
const { ArtBoardContainer } = MainContainer;
import BoardBox from "./artBoardBox/boardBox";

import { useAppSelector , useAppDispatch } from "../../../../app/hooks";

const BoardWrapper = styled.ul`
    width: 100%;
    height: 100%;
    padding: 10px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 10px;
    box-sizing:border-box;
    list-style: none;
    margin: 0;
    & > li{
        margin-bottom: 5px;
    }
`;

const ArtBoardCompo = () =>{
    const boards = useAppSelector(state=>state.artBoards.boards);
    const boardsList = boards.map((board,i)=>{
        return(
            <li key={i}>
                <BoardBox {...board} index={i}/>
            </li>
        )
    });
    return(
        <ArtBoardContainer>
            <BoardWrapper>
                {boardsList}
            </BoardWrapper>
        </ArtBoardContainer>
    )
}

export default ArtBoardCompo;