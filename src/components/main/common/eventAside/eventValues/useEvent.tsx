import * as React from "react";
import { useCallback , useState , useMemo } from "react";

import { useAppDispatch , useAppSelector } from "../../../../../app/hooks";
import { loadBoards } from "../../../../../features/artBoard/artboardSlice";

import { SendHostScript } from "../../../../../../fileSystem/connectJSX";

import { csInterface } from "../../../../../../fileSystem/init";

const useSwitchEvent = () =>{
    const [isEventOn,setEventFlag] = useState<boolean>(false);
    const boards = useAppSelector(state=>state.artBoards);
    const dispatch = useAppDispatch();
    const connect = new SendHostScript("getArtBoards.jsx");
    const setDocumentBoards = async()=>{
        const b = await connect.callJsx();
        if(!b)return false;
        dispatch(loadBoards(JSON.parse(b)));
    };

    const setSwitchEvent = (e,flag) =>{
        console.log(flag);
        if(flag){
            csInterface.removeEventListener("documentAfterActivate",()=>setDocumentBoards());
            setEventFlag(false);
        }else{
            csInterface.addEventListener("documentAfterActivate",()=>setDocumentBoards());
            setEventFlag(true);
        }
    }

    useMemo(()=>{
        csInterface.addEventListener("com.adobe.csxs.events.WindowVisibilityChanged",(e)=>{
            /* windowが閉じたらイベント停止 */
            if(!e.data){
                csInterface.removeEventListener("documentAfterActivate",setDocumentBoards);
                setEventFlag(false);
            }
        });
    },[]);

    return {setDocumentBoards,setSwitchEvent,isEventOn};
}

export default useSwitchEvent;