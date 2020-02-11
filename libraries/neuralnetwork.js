function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

function dsigmoid(y) {
    //return sigmoid(y) * (1 - sigmoid(y));
    return y * (1 - y);
}

class Neuralnetwork {
    constructor(input, hidden, output) {
        if (input instanceof Neuralnetwork) {
            let a = input;
            this.input_layer = a.input_layer;
            this.hidden_layer = a.hidden_layer;
            this.output_layer = a.output_layer;

            this.weight_ih = a.weight_ih.copy();
            this.weight_ho = a.weight_ho.copy();
            this.bias_ih = a.bias_ih.copy();
            this.bias_ho = a.bias_ho.copy();
            this.learning_rate = 0.05;
        } else {

            this.input_layer = input;
            this.hidden_layer = hidden;
            this.output_layer = output;
            this.weight_ih = new Matrix(this.hidden_layer, this.input_layer);
            this.weight_ho = new Matrix(this.output_layer, this.hidden_layer);
            this.weight_ho.randomize();
            this.weight_ih.randomize();
            this.bias_ih = new Matrix(this.hidden_layer, 1);
            this.bias_ho = new Matrix(this.output_layer, 1);
            this.bias_ih.randomize();
            this.bias_ho.randomize();
            this.learning_rate = 0.05;
        }

    }


    feedforward(input) {
        input = Matrix.fromArray(input);
        let hidden = Matrix.multiply(this.weight_ih, input);
        hidden.add(hidden, this.bias_ih);
        hidden.map(sigmoid);
        let output = Matrix.multiply(this.weight_ho, hidden);
        output.add(this.bias_ho);
        output.map(sigmoid);
        return output.toArray();
    }

    train(inputs, targets) {
        let input = Matrix.fromArray(inputs);
        let hidden = Matrix.multiply(this.weight_ih, input);
        hidden.add(hidden, this.bias_ih);
        hidden.map(sigmoid);
        let output = Matrix.multiply(this.weight_ho, hidden);
        output.add(this.bias_ho);
        output.map(sigmoid);
        let target = Matrix.fromArray(targets);
        let output_error = Matrix.substract(target, output);
        let weight_hidden_transpose = Matrix.transpose(this.weight_ho);
        let hidden_error = Matrix.multiply(weight_hidden_transpose, output_error);

        let gradiento = Matrix.map(output, dsigmoid);
        gradiento.multiply(output_error);
        gradiento.multiply(this.learning_rate);

        let hidden_transpose = Matrix.transpose(hidden);
        let weight_ho_delta = Matrix.multiply(gradiento, hidden_transpose);
        this.weight_ho.add(weight_ho_delta);
        this.bias_ho.add(gradiento);


        let gradienti = Matrix.map(hidden, dsigmoid);
        gradienti.multiply(this.learning_rate);
        gradienti.multiply(hidden_error);
        let input_transpose = Matrix.transpose(input);
        let weight_ih_delta = Matrix.multiply(gradienti, input_transpose);
        this.weight_ih.add(weight_ih_delta);
        this.bias_ih.add(gradienti);

    }
    mutate(mutate) {
        this.weight_ih.map(mutate);
        this.weight_ho.map(mutate);
        this.bias_ho.map(mutate);
        this.bias_ih.map(mutate);

    }
    copy() {
        return new Neuralnetwork(this);
    }



}