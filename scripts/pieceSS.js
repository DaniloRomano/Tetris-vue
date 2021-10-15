class PieceSS extends Pieces {
    constructor() {
        super();
        this.qtdPositions = 2;
        this.piecePattern = [
            [
                [0, 0],
                [1, 0],
                [1, 1],
                [2, 1]
            ],
            [
                [0, 1],
                [0, 2],
                [1, 0],
                [1, 1]
            ]
        ];
    }
}