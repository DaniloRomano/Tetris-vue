class Pieces {
    piecePattern;
    qtdPositions;
    currentPosition;

    constructor() {
        this.currentPosition = 0;
    }

    rotate() {
        if (this.currentPosition < (this.qtdPositions - 1)) {
            this.currentPosition++;
        } else {
            this.currentPosition = 0;
        }
    }

    verificaRotacao() {
        let posicao = 0;
        if (this.currentPosition < (this.qtdPositions - 1)) {
            posicao = this.currentPosition + 1;
        }
        return posicao;
    }

    createPiece() {
        let linha = new Array(4).fill("transparent");

        let pieceReturn = new Array(4).fill("")
            .map(() => [...linha]);

        let pieceDesign = this.piecePattern[this.currentPosition];
        pieceDesign.forEach(([a, b]) => pieceReturn[a][b] = "red darken-2");

        return pieceReturn;
    }
}