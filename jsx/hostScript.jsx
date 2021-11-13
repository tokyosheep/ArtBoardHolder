/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/

function hostScript(obj){
    if(app.documents.length===0){
        alert("nothing any opened document");
        return false;
    }
    switch(obj.type){
        case "saveBpards":
            exportArtBoards(obj.args);
            break;

        case "generate":
            createArtBoads(obj.args);
            return JSON.stringify(getArtBoards());
        
        case "centerPoint":
        case "crossHairs":
        case "safeArea":
            othersProperty(obj);
            break;
        case "fitInsideItems":
            othersProperty(obj);
            return JSON.stringify(getArtBoards(obj.args));

        case "rename":
            renameBoards(obj.args);
            return JSON.stringify(getArtBoards(obj.args.artBoards));
        
        case "resizeBoards":
        case "adjustBoards":
            resizeBoards(obj.args,obj.type);
            return JSON.stringify(getArtBoards(obj.args.artBoards));
    }

    return true;
}