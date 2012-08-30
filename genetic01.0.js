resultExpect = 20;
arrayFitness = new Object();
arrayFitness['veryGood'] = [];
arrayFitness['good']     = [];
arrayFitness['medium']   = [];
arrayFitness['bad']      = [];
arrayFitness['veryBad']  = [];

positionCross = function(Chromosomelength){
    var position;

    position =  Math.round(Math.round(Chromosomelength*(Math.random())));
    
    if (position === Chromosomelength){
        return positionCross(Chromosomelength); 
    }
    return position;
}

amountCross = function(Chromosomelength, PermutaionPercent){
    return Math.ceil((Math.ceil(Chromosomelength*(Math.random())))*PermutaionPercent)
}

valideExpression = function(expression){
    var regular ;
    regular = RegExp(/^([\+\-]?)(\d+([\+\*\-\/]?))+\d$/);
    if (regular.test(expression)){
        return true;
    }

    return false;
}

crossOverChild = function(crossDad, crossMom, percent) {
    length = crossDad.length;    
    position = positionCross(length);
    amount = amountCross(length, percent);

    crossSon = crossMom.substr(0, position) + crossDad.substr(position, amount) + crossMom.substr(position+amount, crossMom.length - (position+amount));

    return crossSon;
}

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


translator = function(chromosome ){
    var converted = '';
    if(chromosome){
        for(var i = 0; i <= chromosome.length; i+=4){
            converted += convert(chromosome.substr(i, 4));
        }
    }

    return converted;
}

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

calculator = function(expression){
    return eval(expression);
}

fitness = function (resultGet, chromosome) {
    test = 1/(resultExpect - resultGet) //teve ser revisto

                       /*pegar o teste e verificar se o valor é 
                       muito bom(1) | bom(2)      | medio(3)    | ruim(4)    | muito ruim(5)
                          ----------|-------------|-------------|------------|--------------
valor da variavel test        90%   | 50% ate 89% | 20% ate 49% | 5% ate 19% | de 0% ate 4%
chance de ser sortiado        80%   | 12%         | 7%          | 0,9%       | 0,1%
   
          vao ser criados 5 vetores para armazenar os cromossomos de acordo com o especificado acima
          sera feito um random para sortiar o vetor
          a funçao deve aceitar um vetor, para o ser feito o fitness da populacao inicial, mas deve tratar caso receba apenas um individuo
       */
    if(test>=0.9){
         arrayFitness['veryGood'].push(chromosome);
    }else{
        if(test<0.9 && test>=0.5){
            arrayFitness['good'].push(chromosome);
        }else{
            if(test<0.5 && teste>=0.2){
                arrayFitness['medium'].push(chromosome);
            }else{
                if(test<0.2 && test>=0.05){
                    arrayFitness['bad'].push(chromosome);
                }else{
                    arrayFitness['veryBad'].push(chromosome);
                }
            }
        }
    }

}

roulette = function() {
    random = Math.random();

    if(test>=0.30){
        if(arrayFitness['veryGood'].length !== 0){
            arrayFitness['veryGood'][Math.round(arrayFitness['veryGood'].length*(Math.random()))];
        }     
    }else{
        if(test<0.29 && test>=0.15){
            if(arrayFitness['good'].length !== 0){
                arrayFitness['good'][Math.round(arrayFitness['good'].length*(Math.random()))];
            } 
        }else{
            if(test<0.14 && teste>=0.07){
                if(arrayFitness['medium'].length !== 0){
                    arrayFitness['medium'][Math.round(arrayFitness['medium'].length*(Math.random()))];
                } 
            }else{
                if(test<0.06 && test>=0.02){
                    if(arrayFitness['bad'].length !== 0){
                        arrayFitness['bad'][Math.round(arrayFitness['bad'].length*(Math.random()))];
                    } 
                }else{
                    if(arrayFitness['veryBad'].length !== 0){
                        arrayFitness['veryBad'][Math.round(arrayFitness['veryBad'].length*(Math.random()))];
                    } 
                }
            }
        }
    }


}

program = function(){

    cromossomos = createPopulation(100, 32);
    for(var i = 0; i<=cromossomos.length; i++){
        cromossomo = cromossomos[i];
        expression = translator(cromossomo);        
        if(valideExpression(expression)){
            value = calculator(expression);
            if(value === resultExpect){
                return expression;
            }else{
                fitness(value, cromossomo)
            }
        }       
 
    }
  
    regra = 0;
    while (regra!==resultExpect){
        mom = roulette();
        dad = roulette();

        if(mom && dad !== undefined){
            son = crossOverChild(mom,dad,0.7);
            if(Math.random()<=0.15){
                son = mutation(son);
            }
            cromossomos.push(son);
            expression = translator(son);        
            if(valideExpression(expression)){            
                if(calculator(expression) === resultExpect){                
                    regra = resultExpect;
                }
            }
        }

    }
       return expression;
              
}