function LineColBool(line = 0, colonne = 0, bool = true) {
    this.line = line;
    this.colonne = colonne;
    this.bool = bool;
    
    this.getLine = function(){return this.line;};
    this.getColonne = function(){return this.colonne;};    
    this.isBool = function(){return this.bool;};
    this.toString = function(){ 
        return this.line + " : " + this.colonne + " : " + this.bool;
    };

    this.toString = function(){
        return this.line +" : "+this.colonne+" : "+this.bool;
    };

    let store = {
        line : this.line, colonne : this.colonne, bool : this.bool
    };
    return store;   
} 
//localStorage.setItem('test', JSON.stringify(new LineColBool()));
//obj = JSON.parse(localStorage.getItem('test'));
//alert(obj.bool);
//alert("vv");

