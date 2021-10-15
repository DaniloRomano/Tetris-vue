class PieceZ extends Pieces {
    constructor() {
        super();
        this.qtdPositions = 2;
        this.piecePattern = [
            [
                [0, 1],
                [1, 0],
                [1, 1],
                [2, 0]
            ],
            [
                [0, 0],
                [0, 1],
                [1, 1],
                [1, 2]
            ]
        ];
    }
}