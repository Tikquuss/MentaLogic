//public class MagicClass implements Serializable{
function MagicClass(taille = 3, stable = new Data(), operateur = new Operateur('+'),  J = new Array()){
    this.taille = taille;
    this.stable = stable;
    this.operateur = operateur;
    this.magictable = J; //ArrayList<int[][]> devient Array()

    this.getMagictable = function() {
        return this.magictable;
    };

    this.setMagictable = function(magictable) {
        this.magictable = magictable;
    };
    
    this.toString = function(){ 
        return this.taille + " : " + this.stable + " : " + this.operateur + " : " + this.magictable;
    };
    
    let store = {
        taille : this.taille, 
        stable : this.stable, 
        operateur : this.operateur,
        magictable : this.magictable
    };
    return store;
}
/*
var J = new Util().bidimention(2, 3);
J[0][0] = J[0][1] = J[1][0] = J[1][1] = 100; 
var mc = new MagicClass(3, new Data(1, 2), new Operateur('+'), J);
localStorage.setItem('mc5', JSON.stringify(mc));
obj = JSON.parse(localStorage.getItem('mc5'));
console.log(obj);
//alert(obj);
var mc1 = new MagicClass(obj.taille, new Data(obj.stable.numerateur, obj.stable.denominateur), new Operateur(obj.operateur.operateur), obj.magictable);
alert(mc1.taille);
alert(mc1.stable);
alert(mc1.operateur);
alert(mc1.magictable);
console.log(mc1);
localStorage.removeItem('mc5');
//*/
//obj = JSON.parse(localStorage.getItem('mc5'));
//al(obj);