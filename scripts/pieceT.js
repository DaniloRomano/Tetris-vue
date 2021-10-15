class PieceT extends Pieces {
    constructor() {
        super();
        this.qtdPositions = 4;
        this.piecePattern = [
            [
                [0, 1],
                [1, 0],
                [1, 1],
                [1, 2]
            ],
            [
                [0, 1],
                [1, 0],
                [1, 1],
                [2, 1]
            ],
            [
                [1, 0],
                [1, 1],
                [1, 2],
                [2, 1]
            ],
            [
                [0, 1],
                [1, 1],
                [1, 2],
                [2, 1]
            ]
        ];
    }
}