/*
#include "../parts/isSmaeBoards.jsx";

var obj = {
    "type": "resizeBoards",
    "args": {
        "resizeValues": {
            "width": 500,
            "height": 500
        },
        "artBoards": [
            {
                "name": "アートボード 1",
                "height": 974,
                "width": 974,
                "x": 25,
                "y": 25,
                "initIndex": 0,
                "check": true
            },
            {
                "name": "アートボード 2",
                "height": 974,
                "width": 974,
                "x": 1069,
                "y": 25,
                "initIndex": 1,
                "check": true
            },
            {
                "name": "アートボード 3",
                "height": 974,
                "width": 974,
                "x": 2113,
                "y": 25,
                "initIndex": 2,
                "check": true
            }
        ]
    }
}

resizeBoards(obj.args,obj.type);
*/
function setSize(rect,width,height){
    return [
        rect[0],
        rect[1],
        rect[0] + height,
        rect[1] - width
    ];
}

function adjustSize(rect,width,height){
    return [
        rect[0] - height/2,
        rect[1] + width/2,
        rect[2] + height/2,
        rect[3] - width/2
    ]
}

function resizeSize(rect,width,height){
    return [
        rect[0],
        rect[1],
        rect[0] + Math.abs(height),
        rect[1] - Math.abs(width)
    ]
}


function resizeBoards(args,type){
    var boards = app.activeDocument.artboards;
    if(!isSameBoards(args.artBoards,boards))return;
    for(var i=0;i<boards.length;i++){
        try{
            if(args.artBoards[i].check){
                boards[i].artboardRect = type === "resizeBoards" 
                    ?
                resizeSize(
                    boards[i].artboardRect,
                    args.resizeValues.width,
                    args.resizeValues.height
                )
                    :
                adjustSize(
                    boards[i].artboardRect,
                    args.resizeValues.width,
                    args.resizeValues.height
                );
            }
        }catch(e){
            alert(e);
            continue;
        }
    }
}

/*
function showRects(rect){
    for(var n=0;n<rect.length;n++){
        $.writeln(rect[n]+" :"+n)
    }
}
*/