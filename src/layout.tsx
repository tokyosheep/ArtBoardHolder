import * as React from "react";
import { useMemo } from "react";

import SettingMain from "./pages/setting/settingMain";
import MainPage from "./pages/main/mainPage";

import { init , prevent_drag_event } from "../fileSystem/init";


const Layout = () =>{
    useMemo(()=>{
        init();
        prevent_drag_event();
        //csInterface.removeEventListener("documentAfterSave",()=>useEvent());
        //if(saveEvent)csInterface.addEventListener("documentAfterSave",()=>useEvent());
    },[]);
    return(
        <>
            <SettingMain />
            <MainPage />
        </>
    )
}

export default Layout;