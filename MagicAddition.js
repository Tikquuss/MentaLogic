function MagicAddition() {
    this.getTableJeuByTailleAndS = function (n, S) {
        if (localStorage.getItem('magicClass_MagicAddition_'+n+'_'+S) === null) {
            var L = S - n,
                C = n * n;
            var Liste = new Array(L);
            var u = new Util();
            var TEMP = u.bidimention(L, C);
            var position = new Array(C);
            for (var i = 0; i <= L - 1; i++)
                Liste[i] = i;
            for (var i = 0; i < C; i++)
                position[i] = 0;
            for (var i = 0; i < L; i++) {
                for (var j = 0; j < C; j++) {
                    TEMP[i][j] = Liste[(i + j) % L];
                }
            }
            J = new Array(); //ArrayList<int[][]>
            var mgu = new MagicUtil();
            for (var i = 0, max = parseInt(Math.pow(L, C)); i < max; i++) {
                var T = mgu.getTableByListe(mgu.waffo(TEMP, position, C), n, n);
                if (this.is_magique(T, n, S).bool) {
                    console.log(n+'_'+S+'_'+i+'_: '+T);
                    J.push(T);
                }
                position = mgu.incremente(position, C, L);
            }
            if (J.length !== 0) {
                console.log(n + '_' + S + '_ : size = ' + J.length);
                localStorage.setItem('magicClass_MagicAddition_' + n + '_' + S, JSON.stringify(new MagicClass(n, new Data(S), new Operateur('+'), J)));
            }
        }else{
            console.log(n+'_'+S+ 'existe');
        }
    };

    this.is_magique = function (T, n, S) {
        var somme1 = 0;
        var somme2 = 0;
        var quelLigne = 0;
        var quelColonne = 0;
        for (var i = 0; i < n; i++) {
            if (this.somme_ligne(T, n, i) !== S) {
                return new LineColBool(quelLigne, quelColonne, false);
            }
            quelLigne++;
            if (this.somme_colonne(T, n, i) !== S) {
                return new LineColBool(quelLigne, quelColonne, false);
            }
            quelColonne++;
            somme1 += T[i][i];
            somme2 += T[i][n - i - 1];
        }
        //System.out.println("somme1 = " + somme1 + ", somme2 = " + somme2);
        // On arrive à cette ligne si et seulement toutes les lignes et les colonnes verifient la condition magique.
        return new LineColBool(quelLigne, quelColonne, (somme1 === S) && (somme2 === S)); // Il faut donc que les deux diagonales la verifie aussi.
    };

    // Cette méthode renvoit la somme des élements de la ligne i de T.
    this.somme_ligne = function (T, n, i) {
        var somme = 0;
        for (var j = 0; j < n; j++) {
            somme += T[i][j];
        }
        return somme;
    };

    // Cette méthode renvoit la somme des élements de la colonne j de T.
    this.somme_colonne = function (T, n, j) {
        var somme = 0;
        for (var i = 0; i < n; i++) {
            somme += T[i][j];
        }
        return somme;
    };
}

//var ma = new MagicAddition();
/*
var jeux = [[2, 4, 0],
    [0, 2, 4]
];
jeux.push([4, 0, 2]);
alert(ma.is_magique(jeux, 3, 6).bool);
//*/

