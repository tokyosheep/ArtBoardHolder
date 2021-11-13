(function(){
    if(!hasAnyDocument()){
        alert("before load preset , open something document");
        return;
    }  
    try{
        var psts = app.PDFPresetsList;
        return JSON.stringify(psts);
    }catch(e){
        alert(e);
    }
})();