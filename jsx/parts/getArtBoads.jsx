function getArtBoards(initBoards){
    /*
        type ArtBoard = {
            name:string,
            width:number,
            height:number,
            x:number,
            y:number,
            initIndex:number,
            check:boolean
        }
    */

    if(!hasAnyDocument())return false;
    function getSize(rect){
        return {
            width:Math.abs(rect[0]-rect[2]),
            height:Math.abs(rect[1]-rect[3])
        }
    }
    var artBoards = app.activeDocument.artboards;
    var boards = [];

    for(var i=0;i<artBoards.length;i++){
        var size = getSize(artBoards[i].artboardRect);
        var artBoardData = {
            name:artBoards[i].name,
            height:size.height,
            width:size.width,
            x:artBoards[i].artboardRect[0],
            y:artBoards[i].artboardRect[1]*-1,
            initIndex:i,
            check: initBoards !== undefined ? initBoards[i].check : false
        }
        boards.push(artBoardData);
    }
    return boards;
}