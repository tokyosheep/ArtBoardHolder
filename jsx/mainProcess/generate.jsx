

/*
type GenerateOrigin = {
    form:boolean,
    group:boolean,
    pathItem:boolean
}
*/


/*
#include "../parts/isSmaeBoards.jsx";

var obj = {
    "type": "generate",
    "args": {
        "point": "group",
        "size": {
            "width": 1300,
            "height":1500,
            "number": 12
        }
    }
}



createArtBoads(obj.args);
*/

function createArtBoads(args){
    if(args.point === "form"){
        generateArtboards(args);
    }else{
        generateFromItem(args);
    }
    
}

function getItemType(point){
    if(point === "group")return "GroupItem";
    if(point === "pathItem")return "PathItem";
    return null;
}

function createArtBoardsFromItem(array){
        for(var n=0; n<array.length;n++){
            try{
                var newBoard = app.activeDocument.artboards.add(app.selection[n].controlBounds);
            }catch(e){
                alert(e);
            }
        }
    }

function getItems(itemType/*"GroupItem" "PathItem"*/){
    var array = [];
    for(var i = 0;i<activeDocument.selection.length;i++){
        if(activeDocument.selection[i].typename === itemType){
            array[i] = activeDocument.selection[i];
        }    
    }
    if(array.length === 0){
        return false;
    }
    return array;
}

function removeAllBoards(){
    if(app.activeDocument.artboards.length<2)return app.activeDocument.artboards[0];
    for(var j=0;j<app.activeDocument.artboards.length;j++){
        try{
            app.activeDocument.artboards[j].remove();
        }catch(e){
            alert(e);
        }
    }
    return app.activeDocument.artboards[0];
}


function generateFromItem(args){
    var doc = app.activeDocument;
    var selects =doc.selection;
    if(selects.length < 1){
        alert("any item isn't selected yet");
        return false;
    }
    
    //var initialBord = removeAllBoards();
    doc.rulerOrigin = [0, doc.height];//座標の原点をアートボードの左上に設定
    var itemType = getItemType(args.point);
    if(itemType===null)return false;
    var versions = getItems(itemType);
    if(!versions){
        alert("you haven't selected any group item");
        return;
    }
    createArtBoardsFromItem(versions);
    //initialBord.remove();
}


function generateBoards(args){
    var x = 0;
    var y = 0;
    var limitX = 6000;
    var limitY = -6000;
    var gap = 20;
    for(var i=0;i<args.size.number;i++){
        app.activeDocument.artboards.add([
            x,
            y,
            x+args.size.width,
            y-args.size.height
        ]);
        if(x + gap +args.size.width > limitX){
            x = 0;
            y = - (args.size.height +gap);
        }else if(x + gap + args.size.width > limitX && y - (args.size.height+gap) < limitY){
            alert("too much boards or too big board");
            return false;
        }else{
            x += args.size.width + gap;
        }
    }
}
function generateArtboards(args){
    var doc = app.activeDocument;
    try{
        generateBoards(args);
    }catch(e){
        alert(e);
        return false;
    }
}

function getCanvasLimit(){
     var doc = app.activeDocument; //ドキュメント
    var board = doc.artboards; //アートボード

    var index = board.getActiveArtboardIndex(); //アートボードのインデックス
    //Retrieves the index position of the active artboard in the document's list. Returns the 0-based index.
    var boardRect = doc.artboards[index].artboardRect; //アートボードの座標
    //artboardRect:→Size and position of the artboard.

    //▼座標取得
    var X1 = boardRect[0]; //左上のX座標
    var Y1 = boardRect[1]; //左上のY座標
    var X2 = boardRect[2]; //右下のX座標
    var Y2 = boardRect[3]; //右下のY座標

    //▼アートボードの幅と高さを取得
    var boardW = X2 - X1; //アートボードの横幅
    var boardH = Y2 - Y1; //アートボードの高さ

    //▼キャンバスサイズの最大値を取得
    var canvasLimit = ((16383 - boardW) / 2 + 0.5) + boardW; //キャンバスの左右幅の最大値
    var bottomLimit = ((16383 - boardH) / 2 + 0.5 + boardH); //キャンバスの天地幅の最大
    //$.writeln(canvasLimit);
    //$.writeln(bottomLimit);
    //$.writeln(doc.rulerOrigin);
    doc.rulerOrigin = [100,100];
    doc.artboards.add([0,0,1009,-1000]);
}