console.log('[Eduardo Alves] Flappy Bird');

let frames = 0;

const sprites = new Image();
sprites.src = 'sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

//background 
const planoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 92,
    x: 0,
    y: canvas.height - 204,
    draw() {
        contexto.fillStyle = '#70c5ce';
        contexto.fillRect(0, 0, canvas.width, canvas.height)

        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY,
            planoDeFundo.largura, planoDeFundo.altura,
            planoDeFundo.x, planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura
        );

        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY,
            planoDeFundo.largura, planoDeFundo.altura,
            (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura
        );
    },
};

//chão
function criaChao() {
    const chao = {
        spriteX: 0,
        spriteY: 610,
        largura: 224,
        altura: 112,
        x: 0,
        y: canvas.height - 112,
        update() {
            const movimentoDoChao = 1;

            chao.x = chao.x - movimentoDoChao;
            const repeteEm = chao.largura / 2;
            const movimentacao = chao.x - movimentoDoChao;

            chao.x = movimentacao % repeteEm;
        },
        draw() {
            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY,
                chao.largura, chao.altura,
                chao.x, chao.y,
                chao.largura, chao.altura
            );

            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY,
                chao.largura, chao.altura,
                (chao.x + chao.largura), chao.y,
                chao.largura, chao.altura
            );
        }
    }
    return chao;
}


function colision(flappyBird, chao) {
    const flappyBirdY = flappyBird.y + flappyBird.altura;
    const chaoY = chao.y;

    if (flappyBirdY >= chaoY) {
        return true;
    }
    return false;
};

function criaFlappyBird() {
    const flappyBird = {
        spriteX: 0,
        spriteY: 0,
        largura: 33,
        altura: 24,
        x: 10,
        y: 50,
        jumping: 4.6,
        jump() {
            flappyBird.velocidade = - flappyBird.jumping;
        },
        gravidade: 0.25,
        velocidade: 0,
        update() {
            if (colision(flappyBird, globais.chao)) {
                console.log('fez colisão');
                changeScreen(telas.GAMEOVER);
                return;
            }

            flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
            flappyBird.y = flappyBird.y + flappyBird.velocidade;
        },

        movimentos: [
            { spriteX: 0, spriteY: 0, }, //asa pra cima
            { spriteX: 0, spriteY: 26, }, //asa no meio
            { spriteX: 0, spriteY: 52, }, //asa pra baixo 
        ],
        frameAtual: 0,
        atualizaFrameAtual() {
            const intervaloDeFrames = 5;
            const passouIntervalo = frames % intervaloDeFrames === 0;
            if (passouIntervalo) {
                const baseIncremento = 1;
                const incremento = baseIncremento + flappyBird.frameAtual;
                const baseRepeticao = flappyBird.movimentos.length;
                flappyBird.frameAtual = incremento % baseRepeticao
                //console.log(frames);
            }
        },
        draw() {
            flappyBird.atualizaFrameAtual();
            const { spriteX, spriteY } = flappyBird.movimentos[flappyBird.frameAtual];

            contexto.drawImage(
                sprites,
                spriteX, spriteY, // Sprite X, Sprite Y
                flappyBird.largura, flappyBird.altura, //Tamanho do recorte da Sprite
                flappyBird.x, flappyBird.y,
                flappyBird.largura, flappyBird.altura
            );
        }
    }
    return flappyBird;
};

//mensagem GetReady
const mensagemGetReady = {
    sX: 134,
    sY: 0,
    w: 174,
    h: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,
    draw() {
        contexto.drawImage(
            sprites,
            mensagemGetReady.sX, mensagemGetReady.sY,
            mensagemGetReady.w, mensagemGetReady.h,
            mensagemGetReady.x, mensagemGetReady.y,
            mensagemGetReady.w, mensagemGetReady.h
        );
    },
};

//mensagem Game Over
const mensagemGameOver = {
    sX: 134,
    sY: 153,
    w: 226,
    h: 200 ,
    x: (canvas.width / 2) - 226 / 2,
    y: 50,
    draw() {
        contexto.drawImage(
            sprites,
            mensagemGameOver.sX, mensagemGameOver.sY,
            mensagemGameOver.w, mensagemGameOver.h,
            mensagemGameOver.x, mensagemGameOver.y,
            mensagemGameOver.w, mensagemGameOver.h
        );
    },
};

function criaCanos() {
    const canos = {
        largura: 52,
        altura: 400,
        chao: {
            spriteX: 0,
            spriteY: 169,
        },
        ceu: {
            spriteX: 52,
            spriteY: 169,
        },
        espaco: 80,
        draw() {
            canos.pares.forEach(function (par) {
                const yRandom = par.y;
                const espacamentoEntreCanos = 100;

                const canoCeuX = par.x;
                const canoCeuY = yRandom;

                // Cano do Céu
                contexto.drawImage(
                    sprites,
                    canos.ceu.spriteX, canos.ceu.spriteY,
                    canos.largura, canos.altura,
                    canoCeuX, canoCeuY,
                    canos.largura, canos.altura,
                )

                // Cano do chão
                const canoChaoX = par.x;
                const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom;
                contexto.drawImage(
                    sprites,
                    canos.chao.spriteX, canos.chao.spriteY,
                    canos.largura, canos.altura,
                    canoChaoX, canoChaoY,
                    canos.largura, canos.altura
                )

                par.canoCeu = {
                    x: canoCeuX,
                    y: canos.altura + canoCeuY
                }
                par.canoChao = {
                    x: canoChaoX,
                    y: canoChaoY 
                }
            })

        },  

        flappyBirdColision(par) {
            const flappyBirdHead = globais.flappyBird.y;
            const flappyBirdFoot = globais.flappyBird.y + globais.flappyBird.altura;

            if(globais.flappyBird.x  + globais.flappyBird.largura >= par.x) {
                if(flappyBirdHead <= par.canoCeu.y) {
                    return true;
                }
                if(flappyBirdFoot >= par.canoChao.y) {
                    return true;
                }
            }
            
            return false;
        },
        pares: [],
        update() {
            const passou100Frames = frames % 100 === 0;
            if (passou100Frames) {
                //console.log('passou')
                canos.pares.push({
                    x: canvas.width,
                    y: -150 * (Math.random() + 1)
                });
            }
            canos.pares.forEach(function (par) {
                par.x = par.x - 2;

                if(canos.flappyBirdColision(par)) {
                    console.log('Você perdeu')
                    changeScreen(telas.GAMEOVER);
                }

                if (par.x + canos.largura <= 0) {
                    canos.pares.shift();
                }
            });
        }
    }

    return canos;
}

function criaPlacar() {
    const placar = {
        score: 0,
        draw() {
            contexto.font = '35px "VT323"';
            contexto.fillStyle = 'white';
            contexto.textAlign = 'right';
            contexto.fillText(`${placar.score}`, canvas.width - 10, 35);
        },
        update(){
            const intervaloDeFrames = 20;
            const passouIntervalo = frames % intervaloDeFrames === 0;
            
            if(passouIntervalo) {
            placar.score = placar.score + 1;
        }
        }
    }
    return placar;
}
//Telas
const globais = {};
let telaAtiva = {};
function changeScreen(newScreen) {
    telaAtiva = newScreen;

    if (telaAtiva.inicializa) {
        telaAtiva.inicializa();
    }
}
const telas = {
    INICIO: {
        inicializa() {
            globais.flappyBird = criaFlappyBird();
            globais.chao = criaChao();
            globais.canos = criaCanos();
        },
        draw() {
            planoDeFundo.draw();
            globais.flappyBird.draw();
            globais.canos.draw();
            globais.chao.draw();
            mensagemGetReady.draw();
        },
        click() {
            changeScreen(telas.JOGO);
        },

        update() {
            globais.chao.update();
        }
    }
};

telas.JOGO = {
    inicializa() {
        globais.placar = criaPlacar();
    },
    draw() {
        planoDeFundo.draw();
        globais.canos.draw();
        globais.chao.draw();
        globais.flappyBird.draw();
        globais.placar.draw();
    },
    click() {
        globais.flappyBird.jump();
    },
    update() {
        globais.canos.update();
        globais.chao.update();
        globais.flappyBird.update();
        globais.placar.update();
    }
};

telas.GAMEOVER = {
    draw() {
        mensagemGameOver.draw();
    },
    update() {
        
    },
    click() {
        changeScreen(telas.INICIO)
    }
}

function loop() {
    telaAtiva.draw();
    telaAtiva.update();

    frames = frames + 1;

    requestAnimationFrame(loop);
};

window.addEventListener('click', function () {
    if (telaAtiva.click) {
        telaAtiva.click();
    }
});
changeScreen(telas.INICIO);

loop();