function MagicMultiplication() {
    this.getTableJeuByTailleAndS = function (n, S) {
        if (localStorage.getItem('magicClass_MagicMultiplication_'+n+'_'+S) === null) {
            if (!this.estPremier(S)) {
                var L = parseInt(S / 2), C = n * n;
                var Liste = new Array(L); // De 0 à S-2
                var u = new Util();
                var TEMP = u.bidimention(L, C);// Tableau permettant d'extraire toute les combinaisons possibles
                var position = new Array(C);  // Tableau permettant l'extraction des combinaisons 

                for (var i = 1; i <= L; i++)
                    Liste[i - 1] = i;
                for (var i = 0; i < C; i++)
                    position[i] = 0;
                for (var i = 0; i < L; i++) {
                    for (var j = 0; j < C; j++) {
                        TEMP[i][j] = Liste[(i + j) % L]; // Juste unpeu de logique methematique
                    }
                }
                
                var J = new Array(); //ArrayList<int[][]>
                var mgu = new MagicUtil();
                for (var i = 0, max = parseInt(Math.pow(L, C)); i < max; i++) {
                    var T = mgu.getTableByListe(mgu.waffo(TEMP, position, C), n, n);
                    if (this.is_magique(T, n, S).isBool()) {
                        //console.log(n+'_'+S+'_ : '+T);
                        J.push(T);
                    }
                    // On saute un certain nombre d'element
                    //position = incremente(position, C, L, (n-(lb.getLine()+1)*n));
                    position = mgu.incremente(position, C, L);
                }
                if (J.length !== 0) {
                    console.log(n + '_' + S + '_ : size = ' + J.length);
                    localStorage.setItem('magicClass_MagicMultiplication_' + n + '_' + S, JSON.stringify(new MagicClass(n, new Data(S), new Operateur('*'), J)));
                }
            }
        }
    };

    // Cette methode teste si un n*n-tableau en S pour la multiplication
    this.is_magique = function (T, n, P) {
        var produit1 = 1;
        var produit2 = 1;
        var quelLigne = 0;
        var quelColonne = 0;
        for (var i = 0; i < n; i++) {
            if (this.produit_ligne(T, n, i) !== P)
                return new LineColBool(quelLigne, quelColonne, false);
            quelLigne++;
            if (this.produit_colonne(T, n, i) !== P)
                return new LineColBool(quelLigne, quelColonne, false);
            quelColonne++;
            // Au fur et à mesure qu'on avance on multiplit également les éléments sur les diagonales.
            produit1 *= T[i][i]; // Diagonale principale.
            produit2 *= T[i][n - i - 1]; // Diagonale secondaire.
        }
        // On arrive à cette ligne si et seulement toutes les lignes et les colonnes verifient la condition magique.
        return new LineColBool(quelLigne, quelColonne, (produit1 === P) && (produit2 === P)); // Il faut donc que les deux diagonales la verifie aussi.
    };

    // Cette méthode renvoit le produit des élements de la ligne i de T.
    this.produit_ligne = function (T, n, i) {
        var produit = 1;
        for (var j = 0; j < n; j++) {
            produit *= T[i][j];
        }
        return produit;
    };

    // Cette méthode renvoit le produit des élements de la colonne j de T.
    this.produit_colonne = function (T, n, j) {
        var produit = 1;
        for (var i = 0; i < n; i++) {
            produit *= T[i][j];
        }
        return produit;
    };

    this.estPremier = function (n) {
        switch (n) {
            case 1:
                return false;
            case 0:
                return false;
            case 2:
                return true;
            default:
                return !(n % 2 === 0 || n % 3 === 0 || n % 5 === 0 || n % 7 === 0);
        }
    };
}
