function gameStable(s, table){
    this.s = s; // Data
    this.table = table; // Data[][]
    
    this.getS = function(){
        return this.s;
    };
    
    this.getTable = function() {
        return this.table;
    };
    
    this.toString = function(){ 
        return this.s +" : "+ this.table;
    };
}

//var gs = new gameStable(new Data(2, 3), null);
//alert(gs.getS());
//alert(gs.getTable());