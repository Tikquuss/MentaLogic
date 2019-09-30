function Interim() {
    this.alea = function (a, b) {
        return parseInt((Math.random() * (b - a) + a));
    };

    this.carre_magique = function (taille, version, angle) {
        var n = taille;
        var u = new Util();
        var T = u.bidimention(n, n, 0);
        if (taille % 2 !== 0) { // carre magique d'ordre impaire
            if(version === 0 && taille === 3){ //ma version
                
            }
            if (version === 1) { // Version ou les sommes peuvent donner des valeurs trop petit : division euclidienne
                for (var i = 1; i <= n; i++) {
                    for (var j = 1; j <= n; j++) {
                        T[i - 1][j - 1] = n * (i + j + (n - 1) / 2 - 1) % n + (i + 2 * j - 2) % n;
                    }
                }
            }
            // méthodes Bachet : 21 et 22
            if (version === 21) {
                var TEMP = u.bidimention(2 * n - 1, 2 * n - 1);
                var p = (n - 1) / 2;
                var x = 0, y = n - 1;
                var i = x, j = y;
                var compteur_diag = 1, compteur_tout = 1;

                while (0 <= y) {
                    TEMP[i][j] = compteur_tout;
                    i++;
                    j++;
                    compteur_tout++;
                    if (compteur_diag === n) {
                        x++;
                        y--;
                        i = x;
                        j = y;
                        compteur_diag = 1;
                    } else {
                        compteur_diag++;
                    }
                }

                // moité du haut
                x = 0;
                y = n - 1;
                while (n - 1 - p <= y) {
                    for (j = y; j <= y + 2 * x; j += 2) {
                        TEMP[x + n][j] = TEMP[x][j];
                    }
                    y--;
                    x++;
                }
                // moité du bas
                x = 2 * n - 2;
                y = n - 1;
                while (n - 1 - p <= y) {
                    for (j = y; j <= y + 2 * (2 * n - 2 - x); j += 2) {
                        TEMP[x - n][j] = TEMP[x][j];
                    }
                    y--;
                    x--;
                }
                // moité de gauche
                x = n - 1;
                y = 0;
                while (n - 1 - p <= x) {
                    for (i = x; i <= x + 2 * y; i += 2) {
                        TEMP[i][y + n] = TEMP[i][y];
                    }
                    y++;
                    x--;
                }
                // moité de droite
                x = n - 1;
                y = 2 * n - 2;
                while (n - 1 - p <= x) {
                    for (i = x; i <= x + 2 * (2 * n - 2 - y); i += 2) {
                        TEMP[i][y - n] = TEMP[i][y];
                    }
                    y--;
                    x--;
                }
                T = this.copie(TEMP, p, p, n, n);
            }
            if (version === 22) {
                var TEMP = u.bidimention(2 * n - 1, 2 * n - 1);
                var p = (n - 1) / 2;
                var x = 0, y = n - 1;
                var i = x, j = y;
                var compteur_diag = 1, compteur_tout = n * n;

                while (y < 2 * n - 1) {
                    TEMP[i][j] = compteur_tout;
                    i++;
                    j--;
                    compteur_tout--;
                    if (compteur_diag === n) {
                        x++;
                        y++;
                        i = x;
                        j = y;
                        compteur_diag = 1;
                    } else {
                        compteur_diag++;
                    }
                }

                // moité du haut
                x = 0;
                y = n - 1;
                while (n - 1 - p <= y) {
                    for (j = y; j <= y + 2 * x; j += 2) {
                        TEMP[x + n][j] = TEMP[x][j];
                    }
                    y--;
                    x++;
                }
                // moité du bas
                x = 2 * n - 2;
                y = n - 1;
                while (n - 1 - p <= y) {
                    for (j = y; j <= y + 2 * (2 * n - 2 - x); j += 2) {
                        TEMP[x - n][j] = TEMP[x][j];
                    }
                    y--;
                    x--;
                }
                // moité de gauche
                x = n - 1;
                y = 0;
                while (n - 1 - p <= x) {
                    for (i = x; i <= x + 2 * y; i += 2) {
                        TEMP[i][y + n] = TEMP[i][y];
                    }
                    y++;
                    x--;
                }
                // moité de droite
                x = n - 1;
                y = 2 * n - 2;
                while (n - 1 - p <= x) {
                    for (i = x; i <= x + 2 * (2 * n - 2 - y); i += 2) {
                        TEMP[i][y - n] = TEMP[i][y];
                    }
                    y--;
                    x--;
                }
                T = this.copie(TEMP, p, p, n, n);
                //affiche(TEMP, 2*n-1, 2*n-1);
                //affiche(T, n, n);
            }
            // méthode siamoise
            if (version === 3) {
                var i = 0, j = (n - 1) / 2;
                var compteur_tout = 1;
                T[i][j] = 1;
                while (compteur_tout !== n * n) {
                    var ii = (i > 0) ? i - 1 : n - 1; // Suivant de i
                    var jj = (j < n - 1) ? j + 1 : 0; // Suivant de j
                    // Si on est au sommet haut-droit ou si le suivant est occupé : on descend d'une case
                    if ((i === 0 && j === n - 1) || T[ii][jj] !== 0) {
                        T[i + 1][j] = compteur_tout + 1;
                        i++;
                    }
                    if (T[ii][jj] === 0) { // Sinon on passe au suivant
                        T[ii][jj] = compteur_tout + 1;
                        i = ii;
                        j = jj;
                    }
                    compteur_tout++;
                }
            }
        } else {
            if (taille === 4) {
                var k = 1, i;
                for (i = 0; i < 4; i++) {
                    for (var j = 0; j < 4; j++) {
                        T[i][j] = k;
                        k++;
                    }
                }
                var tmp;
                for (i = 0; i <= 1; i++) {
                    tmp = T[i][i];
                    T[i][i] = T[3 - i][3 - i];
                    T[3 - i][3 - i] = tmp;

                    tmp = T[i][3 - i];
                    T[i][3 - i] = T[3 - i][i];
                    T[3 - i][i] = tmp;
                }
            }
        }
        return this.rotation(T, n, angle, version);
    };

    this.copie = function (T, x, y, L, C) {
        var TEMP = new Util().bidimention(L, C);
        for (var i = 0; i < L; i++) {
            for (var j = 0; j < C; j++) {
                TEMP[i][j] = T[x + i][y + j];
            }
        }
        return TEMP;
    };

    this.rotation = function (T, n, angle, version) {
        switch (angle % 4) {
            case 0: // identité
                return T;
            case 1: // R1
                return this.R1(T, n);
            case 2: // R1 rond R1
                return this.symetrie(T, n);
            default: //  angle%4 == 3
                return this.symetrie(this.R1(T, n), n); // R1 rond R1 rond R1
        }
    };

    this.transposer = function (T, L, C) {
        var TEMP = new Util().bidimention(C, L);
        for (var i = 0; i < L; i++) {
            for (var j = 0; j < C; j++) {
                TEMP[i][j] = T[j][i];
            }
        }
        return TEMP;
    };

    // R1 rond R1 
    this.symetrie = function (T, n) {
        var TEMP = new new Util().bidimention(n, n);
        for (var i = 0; i < n; i++) {
            for (var j = 0; j < n; j++) {
                TEMP[i][j] = T[n - 1 - i][n - 1 - j];
            }
        }
        return TEMP;
    };

    this.R1 = function (T, n) {
        var TEMP = new Util().bidimention(n, n);
        for (var i = 0; i < n; i++) {
            for (var j = 0; j < n; j++) {
                TEMP[i][j] = T[j][n - 1 - i];
            }
        }
        return TEMP;
    };
}

//var i = Interim();
//alert(i.alea(1, 2));