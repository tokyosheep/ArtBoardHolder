/*
#include "../parts/isSmaeBoards.jsx";
*/
/*
var obj = {
    "type": "saveBpards",
    "arg": {
        "format": {
            "PDF": true,
            "PNG": true,
            "JPG": true,
            "GIF": false
        },
        "presets": {
            "usePreset": true,
            "preset": "junko"
        },
        "jpegOption": 100,
        "saveOptions": {
            "useBoardName": true,
            "export": false,
            "savePath": ""
        }
    }
};

exportArtBoards(obj.arg);
*/
function exportArtBoards(arg){
    if(!app.activeDocument.saved){
        if(!confirm("the document isn't saved are you sure to export ?")){
            return;
        }
    }
    var format = arg.format;
    var boards = app.activeDocument.artboards;
    for(var i=0;i<boards.length;i++){
        try{
            boards.setActiveArtboardIndex(i);
            var filePath = makePath(arg.saveOptions.useBoardName,boards[i].name,i+1);
            $.writeln(filePath);
            if(format.PNG)savePNG(filePath);
            if(format.GIF)saveGif(filePath);
            if(format.JPG)saveJpeg(filePath,arg.jpegOption);
            if(format.PDF)savePDF(filePath,i+1,arg.presets.usePreset,arg.presets.preset);
        }catch(e){
            alert(e);
        }
    }
}

function makePath(useBoardName,boardName,index){
    if(!useBoardName){
        return decodeURI(app.activeDocument.path+"/"+app.activeDocument.name+i);
    }
    return decodeURI(app.activeDocument.path+"/"+boardName);
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
    exportOptions.artBoardClipping = true;
    var type = ExportType.JPEG;
    var fileSpec = new File(path);

    app.activeDocument.exportFile(fileSpec, type, exportOptions);
}

function saveGif(path){
    var exportOptions = new ExportOptionsGIF();
    exportOptions.antiAliasing = false;
    exportOptions.colorCount = 64;
    exportOptions.colorDither = ColorDitherMethod.DIFFUSION;

    var type = ExportType.GIF;
    var fileSpec = new File(path);

    app.activeDocument.exportFile(fileSpec, type, exportOptions);
}

function savePNG(path){
    var exportOptions = new ExportOptionsPNG24();
    exportOptions.antiAliasing = false;
    exportOptions.transparency = false;
    exportOptions.saveAsHTML = true;

    var type = ExportType.PNG24;
    var fileSpec = new File(path);

    app.activeDocument.exportFile(fileSpec, type, exportOptions);
}
