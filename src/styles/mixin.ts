import styled,{css} from "styled-components";
import { rgba , darken } from "polished";

export const CenterPlace = css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
`;

export const YAxe = css`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
`;

export const XAxe = css`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
`;