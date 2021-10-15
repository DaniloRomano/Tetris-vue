class PieceI extends Pieces {
    constructor() {
        super();
        this.qtdPositions = 2;
        this.piecePattern = [
            [
                [0, 1],
                [1, 1],
                [2, 1],
                [3, 1]
            ],
            [
                [1, 0],
                [1, 1],
                [1, 2],
                [1, 3]
            ]
        ];
    }
}