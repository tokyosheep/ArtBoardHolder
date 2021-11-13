import * as React from "react";
import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks"; 
import { useContext , useCallback } from "react";
import styled,{ ThemeContext } from "styled-components";

import { checkBoard } from "../../../../../features/artBoard/artboardSlice";
import ArtBoardNumberBox,{ NumberBoxProps } from "./NumberBox";
import { BoardCheckBox } from "../../../../parts/checkBox";

import { ArtBoard } from "../../../../../features/artBoard/artboardSlice";
import { unitsNum } from "../../../../../features/unit/unitSlice";

const ArtBoxWrapper = styled.div<{bd:string}>`
    width: 160px;
    height: 110px;
    padding: 5px;
    border-radius: 5px;
    box-sizing:border;
    border: 1px solid ${props=>props.bd};
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 1fr 2fr 3fr 4fr;
    grid-template-areas: 
        "titleArea"
        "sizeArea"
        "positionArea"
        "checkBoxArea"
    ;
`;

const ArtNameArea = styled.div`
    grid-area: titleArea;
    & > span{
        color: #fff;
        font-size: 12px;
        font-weight: 300;
        display: block;
    }
`;


const SizeArea = styled.div`
    grid-area:sizeArea;
    display: flex;
    justify-content: space-between;
`;

const PositionArea = styled(SizeArea)`
    grid-area: positionArea;
`;

const CheckBoxArea = styled.div`
    grid-area: checkBoxArea;
`;

//type BoardProp = Omit<ArtBoard,"check">;

import { renameTitle , getSequenceNum } from "../../../../../features/rename/renameSlice";

const BoardBox:FC<ArtBoard&{index:number}> = (prop) =>{
    const theme = useContext(ThemeContext);
    const dispatch = useAppDispatch();
    const regExp = useAppSelector(state=>state.rename);
    const units = useAppSelector(state=>state.unit);
    const renamed = renameTitle(prop.name,regExp,getSequenceNum(prop.index));
    const func = unitsNum[units.value];
    const handleCheckBox = useCallback((e:React.ChangeEvent<HTMLInputElement>,name:string)=>{
        console.log(e.target.checked);
        dispatch(checkBoard({check:e.target.checked,index:prop.index}));
    },[prop.check]);
    return(
        <ArtBoxWrapper bd={theme.lightGray}>
            <ArtNameArea>
                <span>{prop.name}</span>
                <span>{renamed}</span>
            </ArtNameArea>
            <SizeArea>
                <ArtBoardNumberBox title="width" number={func(prop.width)} />
                <ArtBoardNumberBox title="height" number={func(prop.height)} />
            </SizeArea>
            <PositionArea>
                <ArtBoardNumberBox title="X" number={func(prop.x).toFixed(2)} />
                <ArtBoardNumberBox title="Y" number={func(prop.y).toFixed(2)} />
            </PositionArea>
            <CheckBoxArea>
                <BoardCheckBox checked={prop.check} name="check" func={handleCheckBox} />
            </CheckBoxArea>
        </ArtBoxWrapper>
    )
}

export default BoardBox;