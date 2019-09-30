function Util() {
    this.getStableByLevelAndSize = function (level, taille, affiche_den) {
        if (affiche_den)
            return new Data(parseInt(this.alea(taille, 10 * taille * level, true)), parseInt(this.alea(2, 10, true)));
        else
            return new Data(parseInt(this.alea(taille, 10 * taille * level, true)));
    };

    //Cette méthode désordonne un tableau jeux deja pret (éviter d'appeler cette fonction plusieurs fois car elle rétourne 
    //deux tableaux non complet différents pour deux appels différents).
    //Data[][]
    this.desordonner = function (jeux, taille, stable) {
        var i, j, k, l, max = 2 * taille - 1;
        var TMP = this.bidimention(max, max, new Data());
        var TMP2 = this.copie(jeux, max, max); // Eviter de cloner
        var position = new Array(2);
        for (i = 0; i < max; i++) {
            for (j = 0; j < max; j++) {
                TMP[i][j] = stable.addition(1);
            }
        }
        for (i = 0; i <= taille - 1; i++) {
            for (j = 0; j <= taille - 1; j++) {
                position = this.positionNonPri(TMP2, taille, stable);
                k = position[0];
                l = position[1];
                TMP[i][j] = TMP2[k][l];
                TMP2[k][l] = stable.addition(1);
            }
        }
        i = taille - 1;
        for (j = taille; j <= 2 * taille - 2; j++) {
            position = this.positionNonPri(TMP2, taille, stable);
            k = position[0];
            l = position[1];
            TMP[i][j] = TMP2[k][l];
            TMP2[k][l] = stable.addition(1);
        }

        for (i = taille; i <= 2 * taille - 2; i++) {
            for (j = taille - 1; j <= 2 * taille - 2; j++) {
                position = this.positionNonPri(TMP2, taille, stable);
                k = position[0];
                l = position[1];
                TMP[i][j] = TMP2[k][l];
                TMP2[k][l] = stable.addition(1);
            }
        }
        //console.log("second");
        //console.log(TMP);
        return TMP;
    };

    // Renvoi un couple d'indices aléatoire (i, j) de T telle que T[i][j] != stable.
    this.positionNonPri = function (T, taille, stable) {
        var i = 0, j = 0;
        //console.log(T[i][j]);
        var TMP = new Array(2);
        do {
            i = parseInt(this.alea(0, 2 * taille - 2, true));
            if (i <= taille - 2)
                j = parseInt(this.alea(0, taille - 1, true));
            else if (i === taille - 1)
                j = parseInt(this.alea(0, 2 * taille - 2, true));
            else
                j = parseInt(this.alea(taille - 1, 2 * taille - 2, true));
        } while (T[i][j].equals(stable.addition(1)));
        TMP[0] = i;
        TMP[1] = j;
        return TMP;
    };

    // Cette méthode rétourne un nombre aléatoire entre min et max, entier si isInteger = true et réel sinon.
    this.alea = function (min, max, isInteger) {
        if (!isInteger)
            return Math.random() * (max - min) + min;
        else
            return parseInt(Math.floor(Math.random() * (max - min + 1) + min));
    };

    // Marche : Permet de passer d'un tableau de int en un tableau de Data
    this.getTableDataByTableInt = function (T, L, C) {
        var d = this.bidimention(L, C);
        for (var i = 0; i < L; i++) {
            for (var j = 0; j < L; j++) {
                d[i][j] = new Data(T[i][j]);
            }
        }
        return d;
    };

    this.copie = function (T, L, C) {
        var tmp = this.bidimention(L, C);
        for (var i = 0; i < L; i++) {
            for (var j = 0; j < C; j++)
                tmp[i][j] = T[i][j];
        }
        return tmp;
    };

    this.copie = function (T, taille) {
        var tmp = new Array(taille);
        for (var i = 0; i < taille; i++)
            tmp[i] = T[i];
        return tmp;
    };

    this.reduction = function (d) {
        if (d.getDenominateur() === 1 || d.getNumerateur() === 0) {
            return d;
        } else {
            var cd = this.pgcd(d.getDenominateur(), d.getNumerateur());
            return new Data(d.getNumerateur() / cd, d.getDenominateur() / cd);
        }
    };

    this.pgcd = function (a, b) {
        if (a === 0 && b === 0) {
            return -1;
        }
        if (b === 0) {
            return a;
        } else {
            return this.pgcd(b, a % b);
        }
    };

    this.afficheTab = function (T, L, C) {
        var s = "";
        for (var i = 0; i < L; i++) {
            for (var j = 0; j < C; j++)
                s = s + " | " + T[i][j];
            console.log(s+'|');
            s = "";
        }
        console.log('\n');
    };

    //v
    this.bidimention = function (L, C, default_value) {
        var TMP = new Array(L);
        for (var i = 0; i < L; i++) {
            TMP[i] = new Array(C);
        }
        if(default_value !== undefined){
            for (var i = 0; i < L; i++) {
                for (var j = 0; j < C; j++) {
                    TMP[i][j] = default_value;
                }
            }
        }
        return TMP;
    };
    
    this.isNegative3 = function(T, l, c){
    	var b = false;
    	var i = 0, j = 0;
    	while(i <= 2 && !b){
            while(j <= 2 && !b){
    		if(T[i][j].getNumerateur() <= 0 && i!== 2 && j!== 1){
                    b = true;
    		}
    		j++;
            }		
            i++;
    	}
    	i = 2;
    	while(i < 5 && !b){	
            j = 2;
            while(j < 5 && !b){
    		if(T[i][j].getNumerateur() <= 0){
                    b = true;
    		}
    		j++;
            }
            i++;
    	}
    	return b;
    };
    
      
 // Cette méthode rétourne vrai si un tableau contient un nombre nul et faux sinon.
    this.isNull3 = function(T){
    	var b = false;
    	var i = 0, j = 0;
    	while(i <= 2 && !b){
            while(j <= 2 && !b){
    		if(T[i][j].getNumerateur() === 0 && i!== 2 && j!== 1){
                    b = true;
    		}
    		j++;
            }		
            i++;
    	}
    	i = 2;
    	while(i < 5 && !b){	
            j = 2;
            while(j < 5 && !b){
    		if(T[i][j].getNumerateur() === 0){
                    b = true;
    		}
    		j++;
            }
            i++;
    	}
    	return b;
    };
}

//var u = new Util();
//alert(u.getStableByLevelAndSize(1, 3, true));
//alert(u.pgcd(100, 75));
//var tab = u.bidimention(2, 2);
//tab[0][0] = tab[1][0] = tab[0][1] = tab[1][1] = 2;
//alert(tab);

/*
var u = new Util();
var A = [[1, 1, 1], [1, 1, 1], [1, 1, 1]];

var B = u.copie(A, 3, 3);
B[0][0] = 2;
alert("avec Util : "+A);

A[0][0] = 1;
var C = u.bidimention(3, 3);// = u.copie(A, 3, 3);
for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++)
        C[i][j] = A[i][j];
}
C[0][0] = 2;
alert("simple : "+A);
//*/
/*
var u = new Util();
var jeux = [[new Data(2), new Data(4), new Data(0), new Data(7), new Data(7)],
            [new Data(0), new Data(2), new Data(4), new Data(7), new Data(7)],
            [new Data(4), new Data(0), new Data(2), new Data(0), new Data(4)],
            [new Data(7), new Data(7), new Data(4), new Data(2), new Data(0)],
            [new Data(7), new Data(7), new Data(0), new Data(4), new Data(2)]
           ];
      
//alert(u.desordonner(jeux, 3, new Data(6)));
//*/