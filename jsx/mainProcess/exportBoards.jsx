/*
#include "../parts/isSmaeBoards.jsx";

var obj = {
    "type": "saveBoards",
    "args": {
        "format": {
            "PDF": false,
            "PNG": true,
            "JPG": true,
            "GIF": true
        },
        "presets": {
            "usePreset": true,
            "preset": ""
        },
        "jpegOption": 100,
        "saveOptions": {
            "useBoardName": true,
            "export": true,
            "savePath": "/Users/kawanoshuji/Desktop/artboard/"
        },
        "boards": [
            {
                "name": "アートボード 1",
                "height": 1024,
                "width": 1024,
                "x": 0,
                "y": 0,
                "initIndex": 0,
                "check": true
            },
            {
                "name": "アートボード 2",
                "height": 1024,
                "width": 1024,
                "x": 1044,
                "y": 0,
                "initIndex": 1,
                "check": false
            },
            {
                "name": "アートボード 3",
                "height": 1024,
                "width": 1024,
                "x": 2088,
                "y": 0,
                "initIndex": 2,
                "check": true
            }
        ]
    }
}

exportArtBoards(obj.args);
*/
function exportArtBoards(arg){
    var boards = app.activeDocument.artboards;
    if(!isSameBoards(arg.boards,boards))return;
    if(!app.activeDocument.saved){
        if(!confirm("the document isn't saved are you sure to export ?")){
            return;
        }
    }
    var format = arg.format;
    for(var i=0;i<boards.length;i++){
        try{
            if(!arg.boards[i].check)continue;
            boards.setActiveArtboardIndex(i);
            var filePath = makePath(
                arg.saveOptions.useBoardName,
                boards[i].name,
                i+1,
                arg.saveOptions.export,
                arg.saveOptions.savePath
                );
            if(format.PNG)savePNG(filePath);
            if(format.GIF)saveGif(filePath);
            if(format.JPG)saveJpeg(filePath,arg.jpegOption);
            if(format.PDF)savePDF(filePath,i+1,arg.presets.usePreset,arg.presets.preset);
        }catch(e){
            alert(e);
        }
    }
    alert("exported");
}

function makePath(useBoardName,boardName,index,isExport,savePath){
    var root = isExport ? savePath : app.activeDocument.path + "/";
    var docName = useBoardName ? boardName : 
        app.activeDocument.name.substr(0,app.activeDocument.name.lastIndexOf(".")) 
        + index;
    return decodeURI(root +docName);
}

function savePDF(path,index,usePreset,preset,ver){
    path = path === undefined ? app.activeDocument.fullName : path;
    var savePath = new File(path);
    var option = new PDFSaveOptions();
    option.compatibility = ver === undefined ? PDFCompatibility.ACROBAT7 : ver;
    option.artboardRange = index+"-"+index;
    option.pDFPreset = preset;
    activeDocument.saveAs(savePath,option);
}

function saveJpeg(path,quality){
    var exportOptions = new ExportOptionsJPEG();
    exportOptions.antiAliasing = false;
    exportOptions.qualitySetting = quality;
    exportOptions.artBoardClipping = true;//書き出し範囲をアートボードの範囲に紐付ける
    var type = ExportType.JPEG;
    var fileSpec = new File(path);

    app.activeDocument.exportFile(fileSpec, type, exportOptions);
}

function saveGif(path){
    var exportOptions = new ExportOptionsGIF();
    exportOptions.antiAliasing = false;
    exportOptions.colorCount = 64;
    exportOptions.colorDither = ColorDitherMethod.DIFFUSION;
    exportOptions.artBoardClipping = true;//書き出し範囲をアートボードの範囲に紐付ける

    var type = ExportType.GIF;
    var fileSpec = new File(path);

    app.activeDocument.exportFile(fileSpec, type, exportOptions);
}

function savePNG(path){
    var exportOptions = new ExportOptionsPNG24();
    exportOptions.antiAliasing = false;
    exportOptions.transparency = false;
    exportOptions.saveAsHTML = true;
    exportOptions.artBoardClipping = true;
    var type = ExportType.PNG24;
    var fileSpec = new File(path);

    app.activeDocument.exportFile(fileSpec, type, exportOptions);
}
