class Fosso {
    fosso;
    corBorda;
    corCampo;
    corPeca;
    constructor(rows, columns, corBorda, corCampo) {
        this.rows = rows;
        this.columns = columns
        this.corBorda = corBorda;
        this.corCampo = corCampo;
        this.corPeca = "red darken-4";
        this.perdeuJogo = false;
        this.init();
    }

    init() {
        let linha = new Array(this.columns - 2).fill(this.corCampo);
        linha = [this.corBorda, ...linha, this.corBorda];
        this.grid = new Array(this.rows - 1)
            .fill('').map(() => [...linha]);
        linha.fill(this.corBorda);
        this.grid.push(linha);
    }

    perdeu() {
        this.perdeuJogo = true;
        let linha = new Array(this.columns).fill(this.corPeca);
        this.grid = new Array(this.rows)
            .fill('').map(() => [...linha]);
    }

    colisao(linha, coluna, piece) {
        let pieceAtual = piece.piecePattern[piece.currentPosition];

        let aux = pieceAtual
            .map(([a, b]) => this.grid[a + linha][b + coluna])
            .filter((cor) => cor != this.corCampo);
        return aux.length > 0;
    }

    colisaoRotacao(linha, coluna, piece, posicao) {
        let pieceAtual = piece.piecePattern[posicao];

        let aux = pieceAtual
            .map(([a, b]) => this.grid[a + linha][b + coluna])
            .filter((cor) => cor != this.corCampo);
        return aux.length > 0;
    }

    fixar(linha, coluna, piece) {
        let pieceAtual = piece.piecePattern[piece.currentPosition];

        let aux = pieceAtual.map(([a, b]) => [a + linha, b + coluna]);
        aux.forEach(([a, b]) => this.grid[a][b] = this.corPeca);
    }

    linhaCompleta(linha) {
        let aux = this.grid[linha]
            .filter((cor) => cor == this.corPeca);

        return aux.length > 9;
    }

    eliminaLinha(linha) {
        let linhaNova = new Array(this.columns - 2).fill(this.corCampo);
        linhaNova = [this.corBorda, ...linhaNova, this.corBorda];
        this.grid.splice(linha, 1);
        this.grid.unshift(linhaNova);
    }
}