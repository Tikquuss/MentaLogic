function Data(numerateur = 0, denominateur = 1) { 
    this.numerateur = numerateur;
    this.denominateur = denominateur; // Pour les entiers
    
    this.addition = function(d){
        if(Number.isInteger(d)){ // Ajout d'un entier à une fraction
            return new Data(this.numerateur+d*this.denominateur, this.denominateur);
        }else if (d instanceof Data){ //Addition de deux fractions
            return new Data(this.numerateur*d.getDenominateur()+this.denominateur*d.getNumerateur(), this.denominateur*d.getDenominateur());
        }else{
            //todo : exception
        }    
    };
 
    // Muliplication d'un entier par une fraction
    this.multiplication = function(d){
        if(Number.isInteger(d)){ // Muliplication d'un entier par une fraction
            return new Data(d*this.numerateur, this.denominateur);
        }else if (d instanceof Data){ // Muliplication de deux fractions
            return new Data(this.numerateur*d.getNumerateur(), this.denominateur*d.getDenominateur());
        }else{
            //todo : exception
        } 
    };
    
    // Operateur de comparaison
    this.equals = function(obj){
        var u = new Util();
        var d1 = u.reduction(this);
        var d2 = u.reduction(obj);
        return d1.getNumerateur() === d2.getNumerateur() &&
               d1.getDenominateur() === d2.getDenominateur();
    };

    // On affiche le denominateur que s'il est different de 1
    this.toString = function(){ 
        return this.numerateur +  (this.denominateur !== 1 ? "/" + this.denominateur : "");
    };
    
    this.getNumerateur = function() {
        return this.numerateur;
    };

    this.setNumerateur = function(numerateur) {
        this.numerateur = numerateur;
    };

    this.getDenominateur = function() {
        return this.denominateur;
    };

    this.setDenominateur = function(denominateur) {
        this.denominateur = denominateur;
    };
    /*
    let store = {
        numerateur : this.numerateur, 
        denominateur : this.denominateur
    };
    return store;
    //*/
}
//var d1 = new Data(5);
//var d2 = new Data(10, 2);
//alert(d1);
//alert(d2);
//alert(d2.addition(d1));
//alert(d2.addition(1));
