var sourceLoader={
    sources:{},
    sourceNum:0,
    loadedNum:0,
    allLoaded:true,
    load:function(type,src,id){
        sourceLoader.sourceNum++;
        sourceLoader.allLoaded=false;
        var source;
        var loaded=function(){
            sourceLoader.loadedNum++;
            if(sourceLoader.loadedNum==sourceLoader.sourceNum){
                sourceLoader.allLoaded=true;
            }
        };//Code copy
        if (type=='img'){
            source=new Image();
            source.src=src;
            source.onload=loaded;
            sourceLoader.sources[id]=source;
        }
        if (type=='audio'){
            source=new Audio(src);
            source.addEventListener('canplaythrough',loaded,false);
            //source.oncanplaythrough=loaded;
            source.src=src;//Pose after listener to prevent fired early
            sourceLoader.sources[id]=source;
        }

    },
    allOnLoad:function(callback){
        if (sourceLoader.allLoaded) {
            callback();
        }
        else {
            //Show Load Process
            $('.LoadedBlock')[0].style.width=Math.round(100*this.loadedNum/this.sourceNum)+"%";
			//$('#GameLoading').html('Loaded:'+Math.round(100*this.loadedNum/this.sourceNum)+"%");

            setTimeout(function(){
                sourceLoader.allOnLoad(callback);
            },100);
        }
    }
};
