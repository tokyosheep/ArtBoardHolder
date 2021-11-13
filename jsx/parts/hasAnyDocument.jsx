function hasAnyDocument(){
    if(app.documents.length===0){
        alert("nothing any opened document");
        return false;
    }
    return true;
}