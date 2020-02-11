class Matrix {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.data = [];
        for (let i = 0; i < this.rows; i++) {
            this.data[i] = [];
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] = 0;
            }
        }
    }
    copy() {
        let m = new Matrix(this.rows, this.cols);
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                m.data[i][j] = this.data[i][j];
            }
        }
        return m;
    }

    static substract(m, n) {
        let result = new Matrix(m.rows, m.cols);
        for (let i = 0; i < m.rows; i++) {
            for (let j = 0; j < m.cols; j++) {
                result.data[i][j] = m.data[i][j] - n.data[i][j];
            }
        }
        return result;
    }
    static multiply(m, n) {
        let result = new Matrix(m.rows, n.cols);
        for (let i = 0; i < m.rows; i++) {
            let sum = 0;
            for (let j = 0; j < n.cols; j++) {
                for (let k = 0; k < n.rows; k++) {
                    sum += m.data[i][k] * n.data[k][j];
                }
                result.data[i][j] = sum;
            }

        }
        return result

    }
    toArray() {
        let arr = [];
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                arr.push(this.data[i][j]);
            }
        }
        return arr;
    }
    static fromArray(arr) {
        let m = new Matrix(arr.length, 1);
        for (let i = 0; i < arr.length; i++) {
            m.data[i][0] = arr[i];
        }
        return m;
    }

    multiply(n) {
        if (n instanceof Matrix) {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.data[i][j] *= n.data[i][j];
                }
            }
        } else {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.data[i][j] *= n;
                }
            }
        }
    }

    randomize() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] = Math.floor(Math.random() * 2 - 1);
            }
        }

    }
    add(n) {
        if (n instanceof Matrix) {

            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.data[i][j] += n.data[i][j];
                }
            }
        } else {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.data[i][j] += n;
                }
            }

        }
    }
    static transpose(mat) {
        let m = new Matrix(mat.cols, mat.rows);
        for (let i = 0; i < mat.rows; i++) {
            for (let j = 0; j < mat.cols; j++) {
                m.data[j][i] = mat.data[i][j];
            }
        }
        return m;
    }
    map(func) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let value = this.data[i][j];
                this.data[i][j] = func(value);

            }
        }

    }
    static map(matrix, func) {
        let result = new Matrix(matrix.rows, matrix.cols);
        for (let i = 0; i < matrix.rows; i++) {
            for (let j = 0; j < matrix.cols; j++) {
                let value = matrix.data[i][j];
                result.data[i][j] = func(value);

            }
        }
        return result;

    }

}