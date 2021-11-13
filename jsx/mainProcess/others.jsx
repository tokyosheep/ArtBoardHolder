/*
type KeyofType = "centerPoint"|"crossHairs"|"safeArea"|"fitInsideItems";
*/
/*
#include "../parts/isSmaeBoards.jsx";

var obj = {
    "type": "fitInsideItems",
    "args": [
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
            "check": true
        },
        {
            "name": "アートボード 1",
            "height": 1024,
            "width": 1024,
            "x": 2088,
            "y": 0,
            "initIndex": 2,
            "check": true
        }
    ]
}


othersProperty(obj);
*/
function adjustArtBoardSize(args){
    for(var i=0;i<app.activeDocument.artboards.length;i++){
        if(args[i].check){
            fitArtBoard(i);
        }
    }
    function fitArtBoard(index){
        app.activeDocument.selection = null;
        app.activeDocument.artboards.setActiveArtboardIndex(index);//アクティブなアートボード選択
        app.executeMenuCommand("selectallinartboard");//アクティブなアートボード内にあるアイテム選択
        var flag = activeDocument.fitArtboardToSelectedArt(index);//アートボードをフィット
    }
}

function othersProperty(obj){
    var boards = app.activeDocument.artboards;
    if(!isSameBoards(obj.args,boards))return;
    var prop = "";
    switch(obj.type){
        case "centerPoint":
            prop = "showCenter";
            break;

        case "crossHairs":
            prop = "showCrossHairs";
            break;

        case "safeArea":
            prop = "showSafeAreas";
            break;

        case "fitInsideItems":
            adjustArtBoardSize(obj.args);
            return;

        default:
            return;

    }
    for(var i=0;i<boards.length;i++){
        if(obj.args[i].check){
            boards[i][prop] = !boards[i][prop];
        }
    }
}