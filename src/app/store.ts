import { configureStore } from "@reduxjs/toolkit";
import unitReducer from "../features/unit/unitSlice";
import artBoardsReducer from "../features/artBoard/artboardSlice";
import resizeReducer from "../features/resize/resizeSlice";
import renameReducer from "../features/rename/renameSlice";
import generateReducer from "../features/generate/generateSlice";
import formatReducer from "../features/export/formatSlice";
import pdfPresetReducer from "../features/saveOptions/presetSlice";
import savePathReducer from "../features/saveOptions/savePath";
import jpegOptionReducer from "../features/saveOptions/jpegSlice";
import windowVisibleReducer from "../features/saveOptions/optionWIndowSlice";

export const store = configureStore({
    reducer:{
        artBoards:artBoardsReducer,
        unit:unitReducer,
        resize:resizeReducer,
        rename:renameReducer,
        generate:generateReducer,
        formats:formatReducer,
        pdfPresetList:pdfPresetReducer,
        savePath:savePathReducer,
        jpegOptions:jpegOptionReducer,
        windowVisible:windowVisibleReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;