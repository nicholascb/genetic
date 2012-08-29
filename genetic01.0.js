/*
Chromosomelength: length of the chomosome.
if the position got is the same at the chromosome length, so it will be executed again.
can't be the same because at this way there is no cross over
return an interger.
*/
positionCross = function(Chromosomelength){
    var position;

    position =  Math.round(Math.round(Chromosomelength*(Math.random())));
    
    if (position === Chromosomelength){
        return positionCross(Chromosomelength); 
    }
    return position;
}

/*
Chromosomelength: length of the chomosome.
PermutaionPercent: percent of string that can be change.
return an interger
*/
amountCross = function(Chromosomelength, PermutaionPercent){
    return Math.ceil((Math.ceil(Chromosomelength*(Math.random())))*PermutaionPercent)
}

/*
validation of a mathematical equation 
o: operator
n: number 
[]: optional
^x: one or more
[- or +] (n^x O n^x)^x
*/
valideExpression = function(expression){
    var regular ;
    regular = RegExp(/^([\+\-]?)(\d+([\+\*\-\/]?))+\d$/);
    if (regular.test(expression)){
        return true;
    }

    return false;
}

/*
crossDad and crossMom are used for create a new chromosome.
percent: percent of string that can be change.
*/
crossOverChild = function(crossDad, crossMom, percent) {
    length = crossDad.length;    
    position = positionCross(length);
    amount = amountCross(length, percent);

    crossSon = crossMom.substr(0, position) + crossDad.substr(position, amount) + crossMom.substr(position+amount, crossMom.length - (position+amount));

    return crossSon;
}

/*
if the string is 0, it will change to 1;
if the string is 1, it will change to 0;
There is a random to get the string that will be change.
return:
---------|-|--------
    0  to Postition | gene | (position + 1) to the end of chromosome 
*/
mutation = function (chromosome) {
    mutationPosition = chromosome.length*(Math.random());
    gene = chromosome.substr(mutationPosition, 1);
    if (gene==='0'){
        gene = '1';
    }else{
        gene = '0';
    }                
    return chromosome.substr(0,  mutationPosition) + gene + chromosome.substr(mutationPosition+1, chromosome.length)
}

convert = function(chromosomePart){
    library = new Object();
    library['0000'] = '0';
    library['0001'] = '1';
    library['0010'] = '2';
    library['0011'] = '3';
    library['0100'] = '4';
    library['0101'] = '5';
    library['0110'] = '6';
    library['0111'] = '7';
    library['1000'] = '8';
    library['1001'] = '9';
    library['1010'] = '/';
    library['1011'] = '*';
    library['1100'] = '-';
    library['1101'] = '+';
    
    return library[chromosomePart]!==undefined ? library[chromosomePart] : '';
    
}

/*
search at the library to convert the chromosome part.
the chromosome will cut according with size of each gene.
chromosomeCutSize: size of each gene.
*/
translator = function(chromosome, chromosomeCutSize) {

translator = function(chromosome ){
    var converted = '';
    if(chromosome){
        for(var i = 0; i <= chromosome.length; i+=4){
            converted += convert(chromosome.substr(i, 4));
        }
    }

    return converted;
}

/*
amount: quantity of the chromosomes that will be created.
length: length of each on chromosome created.
return an array of the string containing chromosomes.
*/
createPopulation = function(amount, length) {
    var chromosome = '';
        chromosomesArray = [];

    for (var i = 0; i < amount; i++) {
        chromosome = '';

        for (var j = 0; j < length; j++)    {
            chromosome += Math.round(1*(Math.random()));
        }
        chromosomesArray.push(chromosome);
    }
    return chromosomesArray;
}
/*
executes the expression
*/
calculator = function(expression){
    return eval(expression);
}


program = function(){

    cromossomos = createPopulation(10, 32);
    for(var i = 0; i<=cromossomos.length; i++){
        expression = translator(cromossomos[i]);        
        if(valideExpression(expression)){            
            if(calculator(expression) === 28){
                return expression;
            }
        }       

    }
    regra = 0;
   

    while (regra!==28){
        mom = cromossomos[Math.round(cromossomos.length*(Math.random()))];
        dad = cromossomos[Math.round(cromossomos.length*(Math.random()))];
        if(mom && dad !== undefined){
            son = crossOverChild(mom,dad,0.7);
            if(Math.random()<=0.15){
                son = mutation(son);
            }
            cromossomos.push(son);
            expression = translator(son);        
            if(valideExpression(expression)){            
                if(calculator(expression) === 28){                
                    regra = 28;        
                }
            }
        }
    }
       return expression;
              
}