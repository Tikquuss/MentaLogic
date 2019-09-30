//copie un tableau de taille L*C dans un autre
copie = function (T, L, C) {
    var tmp = this.bidimention(L, C);
    //*
    for (var i = 0; i < L; i++) {
        for (var j = 0; j < C; j++)
            tmp[i][j] = T[i][j];
    }
    //*/
    
    return tmp;
};

//initialise un tableau bidimentionnel
bidimention = function (L, C) {
    var TMP = new Array(L);
    for (var i = 0; i < L; i++) {
        TMP[i] = new Array(C);
    }
    return TMP;
};

/*
var A = [[1, 1, 1], [1, 1, 1], [1, 1, 1]];
alert(A); //1,1,1,1,1,1,1,1,1
var B = copie(A); 
B[0][0] = 2;
alert(A); //2,1,1,1,1,1,1,1,1

//A[0][0] = 1;
//var C = bidimention(3, 3);// = u.copie(A, 3, 3);
//for (var i = 0; i < 3; i++) {
  //  for (var j = 0; j < 3; j++)
    //    C[i][j] = A[i][j];
//}
//C[0][0] = 2;
//alert(A);
//*/