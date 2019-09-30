function MagicMain(maxTaille = 5){
    
    this.maxTaille = maxTaille;
    
    this.maxStableAddition = function(taille){
        return taille*10; // A revoir
    };
    
    this.maxStableMultiplication = function(taille){
        return taille*100; // A revoir
    };
    
    //main
    this.main = function(){
        //localStorage.clear();
        for(var taille = 3; taille <= this.maxTaille; taille++){
            //*
            var ma = new MagicAddition();
            for(var stable = taille, maxStable = this.maxStableAddition(taille); stable <= maxStable ; stable++){
                ma.getTableJeuByTailleAndS(taille, stable);
                //console.log("bon");
            }
            //*/
            //*
            var mm = new MagicMultiplication();
            for(var stable = parseInt(Math.pow(2, (taille-1)/taille)), maxStable = this.maxStableMultiplication(taille); stable <= maxStable ; stable++){
                //mm.getTableJeuByTailleAndS(taille, stable);
                //console.log("bon");
            }
            //*/
        }
    };
}

//var m = new MagicMain(3);
//m.main();
//alert(m.maxTaille);