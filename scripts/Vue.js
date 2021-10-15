var vm = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: () => ({
        piece: [],
        nextPiece: [],
        menus: [{
                icon: "mdi-plus",
                text: "Novo Jogo",
                action: "novo",
            },
            {
                icon: "mdi-check-outline",
                text: "Iniciar",
                action: "iniciar"
            },
            {
                icon: "mdi-restart",
                text: "Reiniciar",
                action: "reiniciar"
            },
            {
                icon: "mdi-pause",
                text: "Parar jogo",
                action: "parar"
            },
            {
                icon: "mdi-help",
                text: "Como Jogar",
                action: "ajuda"
            }
        ],
        linhas: 22,
        colunas: 12,
        fosso: new Fosso(22, 12, "grey darken-4", "grey lighten-3"),
        pieceFactory: new PieceT(),
        currentPieceFactory: new PieceT("#069205"),
        qtdPieces: 2,
        size: 20,
        gameSpeed: 1000,
        currentPiece: 0,
        linhaAtual: 0,
        colunaAtual: 6,
        valTop: 0,
        pontos: 0,
        show: false,
        id: 0,
        aceleracao: 500,
        overlay: true
    }),
    methods: {
        cair() {
            let colidiu = this.fosso.colisao(this.linhaAtual + 1, this.colunaAtual, this.currentPieceFactory);
            if (colidiu) {
                clearInterval(this.id);
                this.fosso.fixar(this.linhaAtual, this.colunaAtual, this.currentPieceFactory);
                this.verificaPontos(this.linhaAtual);
                this.linhaAtual = 0;
                this.colunaAtual = 6;
                this.gameSpeed = this.gameSpeed * this.aceleracao;
                this.geraNovaPiece();
                this.id = setInterval(this.verificaDerrota, this.gameSpeed);
            } else {
                this.linhaAtual++;
            }
        },
        geraNovaPiece() {
            this.currentPiece = (Math.round(Math.random() * 7));
            this.currentPieceFactory = this.pieceFactory;
            switch (this.currentPiece) {
                case 1:
                    this.pieceFactory = new PieceL(this.fosso.corPeca);
                    break;
                case 2:
                    this.pieceFactory = new PieceI(this.fosso.corPeca);
                    break;
                case 3:
                    this.pieceFactory = new PieceSS(this.fosso.corPeca);
                    break;
                case 4:
                    this.pieceFactory = new PieceZ(this.fosso.corPeca);
                    break;
                case 5:
                    this.pieceFactory = new PieceJ(this.fosso.corPeca);
                    break;
                case 6:
                    this.pieceFactory = new PieceT(this.fosso.corPeca);
                    break;
                case 7:
                    this.pieceFactory = new PieceQuadrado(this.fosso.corPeca);
                    break;
            }

        },
        verificaPontos(atual) {
            for (let i = atual; i < 21; i++) {
                if (this.fosso.linhaCompleta(i)) {
                    this.fosso.eliminaLinha(i);
                    this.pontos += 100;
                }
            }
        },
        showInfo() {
            this.show = !this.show;
        },
        iniciar() {
            if (!this.overlay)
                this.id = setInterval(
                    this.verificaDerrota, this.gameSpeed);
        },
        verificaDerrota() {
            if (this.linhaAtual == 0 && this.fosso.colisao(this.linhaAtual + 1, this.colunaAtual, this.currentPieceFactory)) {
                this.fosso.perdeu();
            } else {
                this.cair();
            }
        },
        reiniciar() {
            this.geraNovaPiece();
            this.fosso.init();
            this.pontos = 0;
            this.linhaAtual = 0;
            this.fosso.perdeuJogo = false;
            this.gameSpeed = this.gameSpeed * this.aceleracao;
        },
        listClick(action) {
            switch (action) {
                case "novo":
                    this.geraNovaPiece();
                    this.overlay = false;
                    break;
                case "parar":
                    clearInterval(this.id);
                    this.overlay = true;
                    break;
                case "iniciar":
                    this.iniciar();
                    break;
                case "ajuda":
                    this.showInfo();
                    break;
                case "reiniciar":
                    this.reiniciar();
                    break;
            }
        }
    },
    created() {
        document.addEventListener('keypress', (event) => {
            let tecla = event.code;
            switch (tecla) {
                case 'KeyA':
                    if (!(this.fosso.colisao(this.linhaAtual, this.colunaAtual - 1, this.currentPieceFactory)))
                        this.colunaAtual--;
                    break;
                case 'KeyD':
                    if (!(this.fosso.colisao(this.linhaAtual, this.colunaAtual + 1, this.currentPieceFactory)))
                        this.colunaAtual++;
                    break;
                case 'KeyS':
                    clearInterval(this.id);
                    this.gameSpeed = this.gameSpeed / this.aceleracao;
                    this.id = setInterval(this.verificaDerrota, this.gameSpeed);
                    break;
                case 'Space':
                    if (!(this.fosso.colisaoRotacao(this.linhaAtual, this.colunaAtual, this.currentPieceFactory, this.currentPieceFactory.verificaRotacao()))) {
                        this.currentPieceFactory.rotate();
                        this.piece = this.currentPieceFactory.createPiece();
                    }
                    break;
            }
        });
    },
    computed: {
        pieceStyle() {
            return {
                top: this.linhaAtual * (this.size + 2) + "px",
                left: this.colunaAtual * (this.size + 2) + "px"
            }
        },
        visibleGame() {
            return {
                display: (this.overlay) ? "none" : ""
            }
        }
    },
    watch: {
        pieceFactory() {
            this.piece = this.currentPieceFactory.createPiece();
            this.nextPiece = this.pieceFactory.createPiece();
        }
    }
})