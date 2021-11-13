/*
#include "../parts/isSmaeBoards.jsx";

var obj = {
    "type": "rename",
    "args": {
        "artBoards": [
            {
                "name": "アートボード 1",
                "height": 1024,
                "width": 1024,
                "x": 0,
                "y": 0,
                "initIndex": 0,
                "check": true,
                "renamed": "01_artBoard"
            },
            {
                "name": "アートボード 2",
                "height": 1024,
                "width": 1024,
                "x": 1044,
                "y": 0,
                "initIndex": 1,
                "check": true,
                "renamed": "02_artBoard"
            },
            {
                "name": "アートボード 1",
                "height": 1024,
                "width": 1024,
                "x": 2088,
                "y": 0,
                "initIndex": 2,
                "check": false,
                "renamed": "03_artBoard"
            }
        ]
    }
}

renameBoards(obj.args);
*/

function renameBoards(args){
    var boards = app.activeDocument.artboards;
    if(!isSameBoards(args.artBoards,boards))return;
    for(var i=0;i<boards.length;i++){
        try{
            if(args.artBoards[i].check){
                boards[i].name = args.artBoards[i].renamed;
            }
        }catch(e){
            alert(e);
            continue;
        }
    }
}