function MagicUtil(util = new Util()) {
    this.u = util;
    //Remplir un L*C-tableau avec les elements d'un tableau lineaire Liste ayant C*L élements
    //public static int[][] getTableByListe(int[] Liste, int L, int C){
    this.getTableByListe = function(Liste, L, C){ //La liste doit donc contenir L*C élements
        var table = this.u.bidimention(L, C);
        var k = 0;
        for(var i = 0; i < L; i++){
            for(var j = 0; j < C; j++){
                table[i][j] = Liste[k];
                k++;
            }
        }
        return table;
    };
    
    // Marche : rapide
    // A partir du L*C-tableau T et du tableau des positions, on genere un tableau lineaire aux positions correspondantes
    //public static int[] waffo(int[][] T, int[] position, int C){
    this.waffo = function(T, position, C){
        var tmp = new Array(C);
        for(var i = 0; i < C; i++){
            tmp[i] = T[position[i]][i];
        }
        return tmp;
    };
    
    // Marche
    // Incremente un tableau dans une base donnée
    this.incremente = function(T, taille, base){
        var temp = this.u.copie(T, taille),
            i = taille - 1;
        while(0 <= i){
            if(T[i] === base-1){
                temp[i] = 0;
            }else{
                temp[i] = temp[i] + 1;
                break;
            }
            i--;
        }
        return temp;
    };
    
    // 0 <= increment <= L-1
    /*
    this.incremente = function(T, taille, base, increment){
        
        if(increment === 0){
            return T; 
        }else{
            var temp = this.u.copie(T, taille);
            for(var i = 1; i <= increment; i++){
                temp = this.incremente(temp, taille, base);
            }
            return temp;
        }
    };
    //*/
}

/*
var mu = new MagicUtil();
var T = [0,0,0,0], base = 2;
var taille = T.length;
console.log(mu.incremente(T, taille, base));
console.log(mu.incremente(mu.incremente(T, taille, base), taille, base));
var temp = new Array(taille);
for (var i = 0; i < taille; i++) {
    temp[i] =T[i];
}
var i = taille - 1;
while(0 <= i){
    if(T[i] === base-1){
        temp[i] = 0;
    }else{
        temp[i] = temp[i] + 1;
        break;
    }
    i--;
}        
console.log(temp);
//*/