import * as React from "react";
import { useState } from "react";

import ResizeFormCompo from "../../components/main/resize/asideForm";
import RenameFormCompo from "../../components/main/rename/asideForm";
import GenerateAsideCompo from "../../components/main/generate/asideForm";
import OtherForm from "../../components/main/other/otherForm";
import ExportForm from "../../components/main/export/exportForm";

export type ModeKeys = "Resize"|"Rename"|"Generate"|"Other"|"Export";
export const modeKeys:ModeKeys[] = ["Resize","Rename","Generate","Other","Export"];

const SetOptionCompo:(mode:ModeKeys)=>JSX.Element = mode =>{
    switch(mode){
        case "Resize":
            return <ResizeFormCompo />;

        case "Rename":
            return <RenameFormCompo />;

        case "Generate":
            return <GenerateAsideCompo />;

        case "Other":
            return <OtherForm />;

        case "Export":
            return <ExportForm  />;

        default:
            return <ResizeFormCompo />;
    }
}

const useMode:()=>[ModeKeys,React.Dispatch<React.SetStateAction<ModeKeys>>,(mode:ModeKeys)=>JSX.Element] = () =>{
    const [mode,setMode] = useState<ModeKeys>("Resize");
    return [mode,setMode,SetOptionCompo];
}

export default useMode;