class PieceQuadrado extends Pieces {
    constructor() {
        super();
        this.qtdPositions = 1;
        this.piecePattern = [
            [
                [0, 0],
                [0, 1],
                [1, 0],
                [1, 1]
            ]
        ];
    }
}