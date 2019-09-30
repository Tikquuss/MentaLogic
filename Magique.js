function Magique(util = new Util(), interim = new Interim()) {
    this.u = util;
    this.interim = interim;
    //public static gameStable getGame(int taille, Data S, char operateur)
    this.getGame = function (taille, S, operateur) {
        var max = 2 * taille - 1, i, j, k;
        var T = this.u.bidimention(max, max);
        var m = new MagicClass(),
            obj;
        if (operateur === '+')
            obj = localStorage.getItem('magicClass_MagicAddition_'+taille+'_'+S.getNumerateur());
        if (operateur === '*')
            obj = localStorage.getItem('magicClass_MagicMultiplication_'+taille+'_'+S.getNumerateur());
        if (obj !== null) { //tester si on a trouvé un objet
            var magicClass = JSON.parse(obj);
            m = new MagicClass(magicClass.taille, new Data(magicClass.stable.numerateur, magicClass.stable.denominateur), new Operateur(magicClass.operateur.operateur), magicClass.magictable);
            var NbElement = m.magictable.length; // 
            i = parseInt(this.u.alea(0, NbElement - 1, true));
            //console.log("NbElement : "+NbElement);
            var Haut = this.u.bidimention(taille, taille);
            Haut = m.magictable[i];
            //console.log(i+"_Haut : "+Haut);
            var Bas = this.u.bidimention(taille, taille);
            j = i - 1;
            k = i + 1;
            while (j >= 0 && k < NbElement) {
                if ((m.magictable[j])[0][0] === Haut[taille - 1][taille - 1]) {
                    Bas = m.magictable[j];
                    //console.log(j+"_Bas : "+Bas);
                    break;
                }
                if ((m.magictable[k])[0][0] === Haut[taille - 1][taille - 1]) {
                    Bas = m.magictable[k];
                    //console.log(k+"_Bas : "+Bas);
                    break;
                }
                j--;
                k++;
            }
            if (j < 0) {
                while (k < NbElement) {
                    if ((m.magictable[k])[0][0] === Haut[taille - 1][taille - 1]) {
                        Bas = m.magictable[k];
                        //console.log(k+"_Bas : "+Bas);
                        break;
                    }
                    k++;
                }
            }
            if (k >= NbElement) {
                while (j >= 0) {
                    if ((m.magictable[j])[0][0] === Haut[taille - 1][taille - 1]) {
                        Bas = m.magictable[j];
                        //console.log(j+"_Bas : "+Bas);
                        break;
                    }
                    j--;
                }
            }
            //console.log("j="+j+":k="+k);
            if (j < 0 && k>NbElement) {
                Bas = this.interim.symetrie(Haut, taille); // On gere juste le meme element
                //console.log(i+"_Bas : "+Bas);
            }
            //this.u.afficheTab(this.u.getTableDataByTableInt(Haut, taille, taille), taille, taille);
            for (i = 0; i < taille; i++) {
                for (j = 0; j < taille; j++) {
                    T[i][j] = new Data(Haut[i][j]);
                }
            }

            //this.u.afficheTab(this.u.getTableDataByTableInt(Bas, taille, taille), taille, taille);
            for (i = taille - 1; i < max; i++) {
                for (j = taille - 1; j < max; j++) {
                    T[i][j] = new Data(Bas[i - taille + 1][j - taille + 1]);
                }
            }
            
            for (i = 0; i < taille - 1; i++) {
                for (j = taille; j < max; j++) {
                    T[i][j] = new Data();
                    T[j][i] = new Data();
                }
            }

            if (S.getDenominateur() !== 1) {
                for (i = 0; i < max; i++) {
                    for (j = 0; j < max; j++) {
                        T[i][j].setDenominateur(S.getDenominateur());
                    }
                }
            }

            for (i = 0; i < max; i++) {
                for (j = 0; j < max; j++) {
                    T[i][j] = this.u.reduction(T[i][j]);
                }
            }

            S = new Data(operateur === '+' ? 0 : 1);
            var op = new Operateur(operateur);
            for (i = 0; i < taille ; i++) {
                S = op.add(S, T[i][0]);
            }
            var s = S.addition(1);
            for (i = 0; i < taille - 1; i++) {
                for (j = taille; j < max; j++) {
                    T[i][j] = s;
                    T[j][i] = s;
                }
            }
            return new gameStable(S, T);
        } else {
            return this.Secour(taille, S, operateur);
        }
    };

// Secouriste----------------------------------------------------
    //public static gameStable Secour(int t, Data S, char operateur)
    this.Secour = function (t, S, operateur) {
        var max = 2 * t - 1, i, j;
        var TEMP = this.u.bidimention(max, max);
        var H = this.u.bidimention(t, t), 
            B = this.u.bidimention(t, t);
        if (operateur === '+') {
            // On choisi une version au hasard entre les versions 1, 21, 22, 3.
            //var version = parseInt(this.u.alea(2, 3, true));
            var version = parseInt(this.u.alea(2, 4, true)); //la version 3 plante
            if (version === 2)
                version = 21;
            if (version === 3)
                version = 22;
            if (version === 4)
                version = 3;
            // On choisi un angle de rotation au hasard entre 0, 1, 2, 3.
            var rotation = parseInt(this.u.alea(0, 2, true));
            H = this.interim.carre_magique(t, version, rotation);

            var que_choisir = parseInt(this.u.alea(0, 1, true));
            B = this.interim.rotation(H, t, 2, version);
            if (que_choisir === 0)
                B = this.interim.transposer(B, t, t);

            //console.log("version : " + version);
            //console.log("rotation : " + rotation);
            //console.log("que_choisir :" + que_choisir);
        }
        if (operateur === '*') {
            for (i = 0; i < t; i++) {
                for (j = 0; j < t; j++) {
                    H[i][j] = B[i][j] = 1;
                }
            }
        }
        //this.u.afficheTab(this.u.getTableDataByTableInt(H, t, t), t, t);
        for (i = 0; i < t; i++) {
            for (j = 0; j < t; j++) {
                TEMP[i][j] = new Data(H[i][j]);
            }
        }

        //this.u.afficheTab(this.u.getTableDataByTableInt(B, t, t), t, t);
        for (i = t - 1; i < max; i++) {
            for (j = t - 1; j < max; j++) {
                TEMP[i][j] = new Data(B[i - t + 1][j - t + 1]);
            }
        }

        for (i = 0; i < t - 1; i++) {
            for (j = t; j < max; j++) {
                TEMP[i][j] = new Data();
                TEMP[j][i] = new Data();
            }
        }

        if (S.getDenominateur() !== 1) {
            for (i = 0; i < max; i++) {
                for (j = 0; j < max; j++) {
                    TEMP[i][j].setDenominateur(S.getDenominateur());
                }
            }
        }

        for (i = 0; i < max; i++) {
            for (j = 0; j < max; j++) {
                TEMP[i][j] = this.u.reduction(TEMP[i][j]);
            }
        }
        
        S = new Data(operateur === '+' ? 0 : 1);
        var op = new Operateur(operateur);
        for (i = 0; i < t ; i++) {
            S = op.add(S, TEMP[i][0]);
        }
        var s = S.addition(1);
        for (i = 0; i < t - 1; i++) {
            for (j = t; j < max; j++) {
                TEMP[i][j] = s;
                TEMP[j][i] = s;
            }
        }
        return new gameStable(S, TEMP);
    };

    this.ancien3 = function (max_stable, level) {
        var stable;
        /*
        //On génère aléatoirement le nombre stable tel que '6 <= stable <= max_stable'.
        if (level === 10)
            stable = 3 * this.u.alea(1000, max_stable + 1000, true) / 3;
        if (level === 9)
            stable = 3 * this.u.lea(750, max_stable + 750, true) / 3;
        if (level === 8)
            stable = 3 * this.u.alea(500, max_stable + 500, true) / 3;
        if (level === 7)
            stable = 3 * this.u.alea(300, max_stable + 300, true) / 3;
        if (level === 6)
            stable = 3 * this.u.alea(250, max_stable + 250, true) / 3;
        if (level === 5)
            stable = 3 * this.u.alea(200, max_stable + 200, true) / 3;
        if (level === 4)
            stable = 3 * this.u.alea(150, max_stable + 150, true) / 3;
        if (level === 3)
            stable = 3 * this.u.alea(100, max_stable + 100, true) / 3;
        if (level === 2)
            stable = 3 * this.u.alea(50, max_stable + 50, true) / 3;
        if (level === 1)
        //*/
        stable = parseInt(3*(this.u.alea(6, max_stable, true) / 3));
        var tb_jeux = this.u.bidimention(5, 5, new Data());
        // On simule ainsi un tableau tb_jeux vérifiant la condition principale du jeux (voc doc.java).
        // alert(stable);
        do {
            tb_jeux[2][2] = new Data(this.u.alea(parseInt(stable/3), parseInt(stable/2), true));
            tb_jeux[3][4] = new Data(this.u.alea(1, parseInt(5 * stable / 6), true));
            tb_jeux[2][1] = new Data(0);
            tb_jeux[0][0] = new Data(parseInt(2*stable/3) - tb_jeux[2][2].getNumerateur());
            tb_jeux[0][1] = new Data(parseInt(2*stable/3));
            tb_jeux[0][2] = new Data(-parseInt(stable/3) + tb_jeux[2][2].getNumerateur());
            tb_jeux[1][0] = new Data(-parseInt(2*stable/3) + 2 * tb_jeux[2][2].getNumerateur() + tb_jeux[2][1].getNumerateur());
            tb_jeux[1][1] = new Data(parseInt(stable/3));
            tb_jeux[1][2] = new Data(parseInt(4*stable/3) - 2*tb_jeux[2][2].getNumerateur() - tb_jeux[2][1].getNumerateur());
            tb_jeux[2][0] = new Data(stable - tb_jeux[2][2].getNumerateur() - tb_jeux[2][1].getNumerateur());
            tb_jeux[2][3] = new Data(parseInt(2*stable/3) - 2*tb_jeux[2][2].getNumerateur() + tb_jeux[3][4].getNumerateur());
            tb_jeux[2][4] = new Data(parseInt(stable/3) + tb_jeux[2][2].getNumerateur() - tb_jeux[3][4].getNumerateur());
            tb_jeux[3][2] = new Data(parseInt(2*stable/3) - tb_jeux[3][4].getNumerateur());
            tb_jeux[3][3] = new Data(parseInt(stable/3));
            tb_jeux[4][2] = new Data(parseInt(stable/3) - tb_jeux[2][2].getNumerateur() + tb_jeux[3][4].getNumerateur());
            tb_jeux[4][3] = new Data(2*tb_jeux[2][2].getNumerateur() - tb_jeux[3][4].getNumerateur());
            tb_jeux[4][4] = new Data(parseInt(2*stable/3) - tb_jeux[2][2].getNumerateur());
        } while (this.u.isNegative3(tb_jeux, 5, 5));
        var s = new Data(stable).addition(1);
        for(var i = 0; i <= 1; i++){  
            for(var j = 3; j <= 4; j++){
                tb_jeux[i][j] = s;
                tb_jeux[j][i] = s;
            }
        }
        console.log("ancien3");
        return new gameStable(new Data(stable), tb_jeux);
    };
}

/*
var m = new Magique();
m.u.afficheTab(m.getGame(3, new Data(10), '+').getTable(), 5, 5);
//console.log(m.getGame(3, new Data(10), '+').getTable());
//alert(m.ancien3(100, 1));
//*/
