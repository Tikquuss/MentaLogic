function Jeux(taille = 3, level = 1, operateur = new Operateur('+'), affiche_den = false) {
    this.taille = taille;
    this.level = level; // de 1 à 10
    this.operateur = operateur;
    this.affiche_den = affiche_den;
    var max = 2 * taille - 1, u = new Util();
    this.stable = u.getStableByLevelAndSize(level, taille, affiche_den);
    this.tb_jeux = u.bidimention(max, max); // Jeux pret, Data[][]
    this.dd_jeux = u.bidimention(max, max); // Jeux non complet, Data[][]
    this.nc_jeux = u.bidimention(max, max); // Jeux vide, Data[][]
    this.vd_jeux = u.bidimention(max, max);  // Jeux désordonnée, Data[][]
    var i, j;
    // tb_jeux
    var gs;
    if(this.taille === 3 && u.alea(0, 1, true) === 1 && !affiche_den){
        gs = new Magique().ancien3(2*this.stable.getNumerateur(), level);
    }else{
        gs = new Magique().getGame(this.taille, this.stable, this.operateur.getOperateur());
    }
    this.tb_jeux = gs.getTable();
    //alert("first : "+this.tb_jeux);
    this.stable = gs.getS();
    console.log("stable : "+this.stable);
    var s = this.stable.addition(1); // Pour combler les vides
    
    //alert("second : "+this.tb_jeux);
    // Je desordonne le tableau pret et je le met dans le tableau désordonné dd_jeux.
    var test = u.bidimention(max, max);
    for (i = 0; i < max; i++) {
        for (j = 0; j < max; j++) {
            test[i][j] = this.tb_jeux[i][j];
        }
    }
    this.dd_jeux = u.desordonner(test, this.taille, this.stable);
    //alert("third : "+this.tb_jeux);
    // On initialise le tableau vide et (à priori) le tableau non complet: vd_jeux[i][j] = nc_jeux[i][j] = stable + 1, quelque soit i,j = 0(1)5.
    for (i = 0; i < max; i++) {
        for (j = 0; j < max; j++) {
            this.nc_jeux[i][j] = s;
            this.vd_jeux[i][j] = s;
        }
    }
    //On a nc_jeux[i][j] = stable + 1, quelque soit i,j = 0(1)5 ==> nc_jeux = vide.
    //On initialise (à posteriori) le tableau non complet. On choisi aléatoirement des couples d'indices (le nombre de couple est fonction du level) dans la zone utile 
    //dudit tableau, et on remplace les cases coorespondants par leures vraies valeurs venant de tb_jeux.

    if (this.level > 10)
        this.level = 10;
    // On fixe d'abord taille-2 élement avant de gerer le niveau
    var le = this.taille - 2;
    while (le > 0) {
        do {
            i = parseInt(u.alea(0, max - 1, true));
            if (i <= this.taille - 2)
                j = parseInt(u.alea(0, this.taille - 1, true));
            else if (i === taille - 1)
                j = parseInt(u.alea(0, max - 1, true));
            else
                j = parseInt(u.alea(taille - 1, max - 1, true));
        } while (!this.nc_jeux[i][j].equals(s));
        this.nc_jeux[i][j] = this.tb_jeux[i][j];
        le--;
    }

    // Et on gere les autres elements en fonction du level
    le = 10 - this.level;
    while (le > 0) {
        do {
            i = parseInt(u.alea(0, max - 1, true));
            if (i <= this.taille - 2)
                j = parseInt(u.alea(0, this.taille - 1, true));
            else if (i === taille - 1)
                j = parseInt(u.alea(0, max - 1, true));
            else
                j = parseInt(u.alea(taille - 1, max - 1, true));
        } while (!this.nc_jeux[i][j].equals(s));
        this.nc_jeux[i][j] = this.tb_jeux[i][j];
        le--;
    }

    // Cette methode teste si la colonne de tete indicée par [i][j] de nc_jeux est prete, avec (i, j) € {(0,0)...(0, taille-1), (taille-1,taille-1), ...}.
    this.colonneNc_jeuxPret = function (i, j) {
        var s = new Data();
        for (var k = 0; k <= this.taille - 1; k++) {
            s = this.getOperateur().add(s, this.nc_jeux[i + k][j]);
        }
        return s.equals(this.stable);
    };

    // Cette methode teste si la ligne de tete indicée par [i][j] de nc_jeux est prete, avec (i, j) € {(0,0)...(taille-1,0), (taille-1,taille-1), (taille,taille-1), (max-1,taille-1)}.
    this.ligneNc_jeuxPret = function (i, j) {
        var s = new Data();
        for (var k = 0; k <= this.taille - 1; k++) {
            s = this.getOperateur().add(s, this.nc_jeux[i][j + k]);
        }
        return s.equals(this.stable);
    };

    // Cette methode teste si la diagonale de tete indicée par [i][j] de nc_jeux est prete, avec (i, j) € {(0,0), (0,taille-1), (taille-1,taille-1), (taille-1,max-1)}.
    this.diagonaleNc_jeuxPret = function (i, j) {
        var s = new Data();
        if (i === 0) {
            if (j === 0) {
                for (var k = 0; k <= this.taille - 1; k++) {
                    s = this.getOperateur().add(s, this.nc_jeux[i + k][j + k]);
                }
                return s.equals(this.stable);
            }
            if (j === this.taille - 1) {
                for (var k = 0; k <= this.taille - 1; k++) {
                    s = this.getOperateur().add(s, this.nc_jeux[i + k][j - k]);
                }
                return s.equals(this.stable);
            }
        }
        if (i === this.taille - 1) {
            if (j === this.taille - 1) {
                for (var k = 0; k <= this.taille - 1; k++) {
                    s = this.getOperateur().add(s, this.nc_jeux[i + k][j + k]);
                }
                return s.equals(this.stable);
            }
            if (j === 2 * this.taille - 2) {
                for (var k = 0; k <= this.taille - 1; k++) {
                    s = this.getOperateur().add(s, this.nc_jeux[i + k][j - k]);
                }
                return s.equals(this.stable);
            }
        }
        return false;
    };

    // Cette méthode vérifie si le jeu est terminé, ie si tb_jeux = nc_jeux.
    this.jeuTerminer = function () {
        var b = true;
        var i = 0, j = 0;
        while (i <= taille - 1 && b) {
            while (j <= taille - 1 && b) {
                if (!this.nc_jeux[i][j].equals(this.tb_jeux[i][j]))
                    b = false;
                j++;
            }
            i++;
        }

        i = taille - 1;
        while (i < 2 * taille - 1 && b) {
            j = taille - 1;
            while (j < 2 * taille - 1 && b) {
                if (!this.nc_jeux[i][j].equals(this.tb_jeux[i][j]))
                    b = false;
                j++;
            }
            i++;
        }
        return b;
    };

    // Vérifie si la case nc_jeux[i][j] est à sa bonne place.
    this.caseNc_jeuxPret = function (i, j) {
        return this.nc_jeux[i][j].equals(this.tb_jeux[i][j]);
    };

    // pour verifier si les cases sont vides
    this.estVideDd_jeux = function (i, j) {
        return dd_jeux[i][j].equals(this.stable.addition(1));
    };

    this.estVideNc_jeux = function (i, j) {
        return nc_jeux[i][j].equals(this.stable.addition(1));
    };

    // Rétourne tb_jeux[i][j]
    this.getCaseTb_jeux = function (i, j) {
        if (0 <= i && i <= 2 * taille - 2 && 0 <= j && j <= 2 * taille - 2)
            return this.tb_jeux[i][j];
        else
            return this.stable.addition(1);
    };

    // Rétourne dd_jeux[i][j]
    this.getCaseDd_jeux = function (i, j) {
        if (0 <= i && i <= 2 * taille - 2 && 0 <= j && j <= 2 * taille - 2)
            return this.dd_jeux[i][j];
        else
            return this.stable.addition(1);
    };

    // Rétourne nc_jeux[i][j]
    this.getCaseNc_jeux = function (i, j) {
        if (0 <= i && i <= 2 * taille - 2 && 0 <= j && j <= 2 * taille - 2)
            return this.nc_jeux[i][j];
        else
            return this.stable.addition(1);
    };

    // nc_jeux[i][j] = val
    this.setCaseNc_jeux = function (val, i, j) {
        this.nc_jeux[i][j] = val;
    };

    this.getTaille = function () {
        return this.taille;
    };

    this.setTaille = function (taille) {
        this.taille = taille;
    };

    this.getStable = function () {
        return this.stable;
    };

    this.setStable = function (stable) {
        this.stable = stable;
    };

    this.getLevel = function () {
        return this.level;
    };

    this.setLevel = function (level) {
        this.level = level;
    };

    this.getOperateur = function () {
        return this.operateur;
    };

    this.setOperateur = function (operateur) {
        this.operateur = operateur;
    };

    this.getTb_jeux = function () {
        return this.tb_jeux;
    };

    this.setTb_jeux = function (tb_jeux) {
        this.tb_jeux = tb_jeux;
    };

    this.getNc_jeux = function () {
        return this.nc_jeux;
    };

    this.setNc_jeux = function (nc_jeux) {
        this.nc_jeux = nc_jeux;
    };

    this.getVd_jeux = function () {
        return this.vd_jeux;
    };

    this.setVd_jeux = function (vd_jeux) {
        this.vd_jeux = vd_jeux;
    };

    this.getDd_jeux = function () {
        return this.dd_jeux;
    };

    this.setDd_jeux = function (dd_jeux) {
        this.dd_jeux = dd_jeux;
    };

    this.toString = function () {
        return "taille : " + this.taille +
                "\n level :" + this.level +
                "\n operateur :" + this.operateur +
                "\n affiche_den :" + this.affiche_den +
                "\n stable :" + this.stable +
                "\n tb_jeux :" + this.tb_jeux +
                "\n dd_jeux :" + this.dd_jeux +
                "\n nc_jeux :" + this.nc_jeux +
                "\n vd_jeux :" + this.vd_jeux;
    };
}

var taille = 3;
var j = new Jeux(taille, 1, new Operateur('+'), false);
var u = new Util(), max = 2 * taille - 1;
//u.afficheTab(j.getTb_jeux(), max, max);
//u.afficheTab(j.getDd_jeux(), max, max);
//u.afficheTab(j.getNc_jeux(), max, max);
u.afficheTab(j.getVd_jeux(), max, max);
//console.log(j);
//alert(j);