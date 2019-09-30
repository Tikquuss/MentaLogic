function Storage(){
    this.save = function(cle, object){
        localStorage.setItem(cle, JSON.stringify(object));
    };
    this.unsave = function(cle){
        var valeur = localStorage.getItem(cle);
        return valeur && JSON.parse(valeur);
    };
    this.toString = function(){ 
        return "storage";
    };
}

//var lcb = new LineColBool();
//console.log(lcb);
//var s = new Storage();
//alert(s);
//s.save("lcb", lcb);
//alert(s.unsave("lcb"));
