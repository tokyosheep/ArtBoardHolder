import { darken , lighten } from "polished";
import * as React from "react";
import { useState } from "react";
import { FC } from "react";
import styled from "styled-components";

import { CenterPlace } from "../../styles/mixin";

const StdBg = "#393939";

const ListTitle = styled.span`
    ${CenterPlace};
    display: block;
    color: #fff;
    font-size: 8px;
    font-weight: 300;
    width: 100%;
    text-align: center;
`;

const SelectedBox = styled.div`
    width: 200px;
    height: 20px;
    position: relative;
    background: ${StdBg};
    border: 1px solid #050505;
`;

const SelectList = styled.ul<{isVisible:boolean}>`
    list-style: none;
    padding: 0;
    position: absolute;
    top: 0;
    left: 200px;
    width: 150px;
    height: auto;
    background: ${StdBg};
    margin: 0;
    display: ${props=>props.isVisible ? "block" : "none"};
    transition: .3s linear;
    cursor: pointer;
    & > li{
        width: 100%;
        height: 20px;
        padding: 2px;
        border: 1px solid #000;
        position: relative;
        background: ${StdBg};
        cursor: pointer;
        overflow: hidden;
        &:hover{
            background: ${lighten(0.2,StdBg)};
        }
    }
`;

type SelectorProp = {
    list:string[],
    selected:string,
    func:(select:string)=>void,
}

export const ListSelector:FC<SelectorProp> = ({func,list,selected}) =>{
    const [isVisible,setVisible] = useState<boolean>(false);
    const selectorList = list.map((list,i)=>{
        return(
            <li 
                key={i} 
                onClick={()=>{
                    func(list);
                    setVisible(!isVisible);
                }}
            >
                <ListTitle>{list}</ListTitle>
            </li>
        )
    })
    return(
        <SelectedBox onClick={()=>setVisible(!isVisible)}>
            <ListTitle>{selected}</ListTitle>
            <SelectList isVisible={isVisible}>
                {selectorList}
            </SelectList>
        </SelectedBox>
    )
}