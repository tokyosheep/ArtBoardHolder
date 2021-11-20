import * as React from "react";
import { useMemo , useState} from "react";

import SettingMain from "./pages/setting/settingMain";
import MainPage from "./pages/main/mainPage";


import { loadBoards } from "./features/artBoard/artboardSlice";
import { SendHostScript } from "../fileSystem/connectJSX";
import { init , prevent_drag_event , csInterface } from "../fileSystem/init";
import { switchEvent } from "./features/event/switchEvent";
import { useAppSelector , useAppDispatch } from "./app/hooks";

const object = {
    cs:csInterface,
    registerFunc:function(func){
        this.func = func;
    },
    event:function(isEvent){
        this.cs.removeEventListener("documentAfterActivate",this.func);
        if(isEvent)this.cs.addEventListener("documentAfterActivate",this.func);
    }
}

const Layout = () =>{
    const dispatch = useAppDispatch();
    const isEvent = useAppSelector(state=>state.isDocEvent.isDocEvent);
    const [trigger] = useState(object);
    csInterface.isEvent = isEvent;
    const setDocumentBoards = async()=>{
        //csInterface.removeEventListener("documentAfterActivate",setDocumentBoards);
        if(!csInterface.isEvent)return;
        /*
        無理やりだがイベントの変数スコープが全く効かず、removeeventListnerでうまく関数外でイベントの削除もできなければ
        関数外の変数もうまく参照してくれないのでcsInterfaceインスタンスのプロパティにイベントのON OFFの値を
        代入している
        */
        const connect = new SendHostScript("getArtBoards.jsx");
        const b = await connect.callJsx();
        if(!b)return false;
        dispatch(loadBoards(JSON.parse(b)));
    };
    trigger.registerFunc(setDocumentBoards);
    useMemo(()=>{
        init();
        prevent_drag_event();
        csInterface.addEventListener("documentAfterActivate",setDocumentBoards);
        csInterface.addEventListener("com.adobe.csxs.events.WindowVisibilityChanged",(e)=>{
            if(!e.data){
                csInterface.removeEventListener("documentAfterActivate",setDocumentBoards);
                dispatch(switchEvent({check:false}));
            }
        });
    },[]);
    /*
    useMemo(()=>{
        if(isEvent)csInterface.addEventListener("documentAfterActivate",setDocumentBoards);
    },[isEvent]);
    */

    return(
        <>
            <SettingMain />
            <MainPage />
        </>
    )
}

export default Layout;