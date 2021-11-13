import { createSlice , PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export type ArtBoard = {
    name:string,
    width:number,
    height:number,
    x:number,
    y:number,
    initIndex:number,
    check:boolean
}

interface ArtBoardsState {
    boards:ArtBoard[]
}

const initialState:ArtBoardsState = {
    boards:[]
}

export const artBoadsSlice = createSlice({
    name:"artBoads",
    initialState,
    reducers:{
        loadBoards:(state,action:PayloadAction<ArtBoard[]>)=>{
            state.boards = action.payload;
        },
        checkBoard:(state,action:PayloadAction<{check:boolean,index:number}>)=>{
            state.boards[action.payload.index].check = action.payload.check; 
        }
    }
});

export const { loadBoards , checkBoard } = artBoadsSlice.actions;

export const artBoards = (state:RootState) => state.artBoards.boards;

export default artBoadsSlice.reducer;