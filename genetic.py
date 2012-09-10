import random
import re

LENGTH            = 32
AMOUNT            = 10000
PERCENTCROSS      = 0.7
SIZELIB           = 4
REGULAREXPRESSION = '^([\+\-]?)(\d+([\+\*\-\/]?))+\d$'
LIBRARY           = {'[0, 0, 0, 0]': '0',
                     '[0, 0, 0, 1]': '1',
                     '[0, 0, 1, 0]': '2',
                     '[0, 0, 1, 1]': '3',
                     '[0, 1, 0, 0]': '4',
                     '[0, 1, 0, 1]': '5',
                     '[0, 1, 1, 0]': '6',
                     '[0, 1, 1, 1]': '7',
                     '[1, 0, 0, 0]': '8',
                     '[1, 0, 0, 1]': '9',
                     '[1, 0, 1, 0]': '/',
                     '[1, 0, 1, 1]': '*',
                     '[1, 1, 0, 0]': '-',
                     '[1, 1, 0, 1]': '+'}

def createPopulation():
    return [[random.randrange(2) for x in range(0,LENGTH)] for y in range(0,AMOUNT)]

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
    for x in range(0, LENGTH, SIZELIB):
        equation += str(LIBRARY.get(str(chromosome[x:x+SIZELIB])))

    return equation

def validate (equation):
    if re.match(REGULAREXPRESSION, equation):
        return true
    else
        return false
