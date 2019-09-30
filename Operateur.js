function Operateur(operateur = '+'){
    this.operateur = operateur; // addition ou multiplication
    
    this.add = function(d1, d2){
        var d = new Data();
        if(this.getOperateur() === '+'){
            d.setNumerateur(d1.getNumerateur()*d2.getDenominateur() + d1.getDenominateur()*d2.getNumerateur());
            d.setDenominateur(d1.getDenominateur()*d2.getDenominateur());
        }
        if(this.getOperateur() === '*'){
            d.setNumerateur(d1.getNumerateur()*d2.getNumerateur());
            d.setDenominateur(d1.getDenominateur()*d2.getDenominateur());
        }
        return d;
    };

    this.getOperateur = function() {
        return this.operateur;
    };

    this.setOperateur = function(operateur) {
        this.operateur = operateur;
    };  
    
    this.toString = function(){ 
        return this.operateur;
    };
    
    /*
    let store = {
        operateur : this.operateur
    };
    return store;
    //*/
}
