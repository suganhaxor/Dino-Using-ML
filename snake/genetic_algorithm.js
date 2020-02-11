function newGeneration(array) {
    array = calculateFitness(array);
    let pop = [];
    for (let i = 0; i < total_population; i++) {
        pop[i] = pickOne(array);
    }
    savedDinos = [];
    savedSnakes = [];
    array = [];
    return pop;
}

function calculateFitness(array) {
    let sum = 0;

    for (let dino of array) {
        sum += dino.score;
    }

    for (let dino of array) {
        dino.fitness = dino.score / sum;

    }
    return array;
}

function pickOne(array) {
    let index = 0;
    let r = random(1);
    while (r > 0) {
        r = r - array[index].fitness;
        index += 1;
    }
    index -= 1;
    return array[index].copy();
}