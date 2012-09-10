import random
import re

LENGTH            = 40
AMOUNT            = 1000
PERCENTCROSS      = 0.7
SIZELIB           = 4
RESULT            = 280
REGULAREXPRESSION = '^([\+\-]?)(\d+([\+\*\-\/]?))+\d$'
LIBRARY           = {'0000': '0',
                     '0001': '1',
                     '0010': '2',
                     '0011': '3',
                     '0100': '4',
                     '0101': '5',
                     '0110': '6',
                     '0111': '7',
                     '1000': '8',
                     '1001': '9',
                     '1010': '/',
                     '1011': '*',
                     '1100': '-',
                     '1101': '+'}

def createPopulation():
    return [''.join(['%s' % random.randrange(2) for x in xrange(LENGTH)]) for y in xrange(AMOUNT)]

def crossOverChild(crossDad, crossMom):
    crossSize = random.randrange(LENGTH)
    index = random.randrange(LENGTH)

    return crossMom[0:index] + crossDad[index: index+crossSize] + crossMom[index+crossSize: LENGTH]

def mutation (chromosome):
    index = random.randrange(LENGTH)

    if chromosome[index]:
        chromosome[index] = 0
    else:
        chromosome[index] = 1

    return chromosome

def translator (chromosome):
    equation = ''
    for x in xrange(0, LENGTH, SIZELIB):
        equation += str(LIBRARY.get(str(chromosome[x:x+SIZELIB])))

    return equation

def validate (equation):
    if re.match(REGULAREXPRESSION, equation):
        return 1
    else:
        return 0

def program ():
    popu = createPopulation()
    error = 0
    while 1:
        child = crossOverChild(random.choice(popu), random.choice(popu))
        popu.append(child)
        equation = translator(child)
        if validate(equation):
            equation = re.sub(r'\b0+(?!\b)', '', equation)
            try:
                resultGot = eval(equation)
                if resultGot == RESULT:
                    print translator(child),'---', resultGot,'---', error, '----', len(popu)
                    break
            except Exception, e:
                error +=1   

program()         

        
































