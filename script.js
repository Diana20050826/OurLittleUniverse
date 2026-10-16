
/* ======================================
   OUR LITTLE UNIVERSE
   As primeiras magias ✨
====================================== */

document.addEventListener("DOMContentLoaded", () => {

    const entrada = document.getElementById("entrada");
    const universo = document.getElementById("universo");
    const botao = document.getElementById("abrirUniverso");
    const estrelas = document.getElementById("estrelas");
    const particulas = document.getElementById("particulas");

    // Criar estrelas aleatórias no fundo
    function criarEstrelas() {
        const quantidade = 85;

        for (let i = 0; i < quantidade; i++) {
            const estrela = document.createElement("span");
            estrela.className = "estrela";

            const tamanho = Math.random() * 2.5 + 1;

            estrela.style.width = `${tamanho}px`;
            estrela.style.height = `${tamanho}px`;
            estrela.style.left = `${Math.random() * 100}%`;
            estrela.style.top = `${Math.random() * 100}%`;

            estrela.style.setProperty(
                "--duracao",
                `${2 + Math.random() * 4}s`
            );

            estrela.style.setProperty(
                "--atraso",
                `${Math.random() * -5}s`
            );

            estrelas.appendChild(estrela);
        }
    }

    criarEstrelas();

    // Criar uma explosão de brilhos no ponto do clique
    function criarExplosao(x, y) {
        const simbolos = ["✦", "✧", "♡", "⋆", "✶"];
        const cores = ["#e8c47d", "#f2b8ca", "#fff4e8"];

        for (let i = 0; i < 48; i++) {
            const particula = document.createElement("span");
            particula.className = "particula-entrada";

            particula.textContent =
                simbolos[Math.floor(Math.random() * simbolos.length)];

            particula.style.color =
                cores[Math.floor(Math.random() * cores.length)];

            particula.style.left = `${x}px`;
            particula.style.top = `${y}px`;
            particula.style.fontSize = `${10 + Math.random() * 17}px`;

            const angulo = Math.random() * Math.PI * 2;
            const distancia = 70 + Math.random() * 260;

            particula.style.setProperty(
                "--dx",
                `${Math.cos(angulo) * distancia}px`
            );

            particula.style.setProperty(
                "--dy",
                `${Math.sin(angulo) * distancia}px`
            );

            particulas.appendChild(particula);

            particula.addEventListener("animationend", () => {
                particula.remove();
            }, { once: true });
        }
    }

    // Abrir o universo ao clicar no botão
    botao.addEventListener("click", () => {

        // Impedir cliques repetidos durante a transição
        if (document.body.classList.contains("a-abrir")) {
            return;
        }

        botao.disabled = true;

        const centroX = window.innerWidth / 2;
        const centroY = window.innerHeight / 2;

        criarExplosao(centroX, centroY);
// Ativar o portal mágico
let portal = document.querySelector(".portal-magico");

if (!portal) {
    portal = document.createElement("div");
    portal.className = "portal-magico";
    portal.setAttribute("aria-hidden", "true");
    document.body.appendChild(portal);
}

// Reiniciar a animação
portal.classList.remove("ativo");
void portal.offsetWidth;
portal.classList.add("ativo");
        document.body.classList.add("a-abrir");

        // Depois da animação, revelar a página principal
        window.setTimeout(() => {
            entrada.hidden = true;
            universo.hidden = false;

            document.body.classList.remove("a-abrir");

            // Levar a página suavemente para o início do universo
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }, 1100);

    });

    // Abrir e fechar a carta secreta
    const botaoCarta = document.getElementById("abrirCarta");
    const conteudoCarta = document.getElementById("conteudoCarta");

    botaoCarta.addEventListener("click", () => {
        const vaiAbrir = conteudoCarta.hidden;

        conteudoCarta.hidden = !vaiAbrir;
        botaoCarta.setAttribute("aria-expanded", String(vaiAbrir));

        if (vaiAbrir) {
            conteudoCarta.classList.remove("carta-aberta");

            // Reiniciar a animação ao abrir a carta
            void conteudoCarta.offsetWidth;

            conteudoCarta.classList.add("carta-aberta");
            botaoCarta.textContent = "Fechar a minha carta ♡";

            conteudoCarta.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });
        } else {
            botaoCarta.textContent = "Abrir a minha carta ♡";
        }
    });
   
    // Visualizador das fotografias da galeria
    const fotografias = document.querySelectorAll(".foto-memoria");
    const visualizador = document.getElementById("visualizadorFoto");
    const fotoAmpliada = document.getElementById("fotoAmpliada");
    const legendaAmpliada = document.getElementById("legendaAmpliada");
    const fecharFoto = document.getElementById("fecharFoto");

    let elementoAnterior = null;

    function abrirFotografia(botaoFoto) {
        const imagem = botaoFoto.querySelector("img");

        if (!imagem || !visualizador) return;

        elementoAnterior = botaoFoto;

        fotoAmpliada.src = imagem.src;
        fotoAmpliada.alt = imagem.alt;
        legendaAmpliada.textContent = botaoFoto.dataset.legenda || "";

        visualizador.hidden = false;
        document.body.style.overflow = "hidden";

        fecharFoto.focus();
    }

    function fecharVisualizador() {
        visualizador.hidden = true;
        document.body.style.overflow = "";

        if (elementoAnterior) {
            elementoAnterior.focus({ preventScroll: true });
        }
    }

    fotografias.forEach((botaoFoto) => {
        botaoFoto.addEventListener("click", (evento) => {
            evento.preventDefault();
            abrirFotografia(botaoFoto);
        });
    });

    fecharFoto.addEventListener("click", fecharVisualizador);

    visualizador.addEventListener("click", (evento) => {
        if (evento.target === visualizador) {
            fecharVisualizador();
        }
    });

    document.addEventListener("keydown", (evento) => {
        if (!visualizador.hidden && evento.key === "Escape") {
            fecharVisualizador();
        }
    });

    // ======================================
    // CORAÇÕES FLUTUANTES
    // ======================================

    function criarCoracaoFlutuante() {
        // Evitar criar elementos enquanto a página está escondida
        if (document.hidden) return;

        // Manter o número de corações limitado
        if (document.querySelectorAll(".coracao-flutuante").length >= 12) {
            return;
        }

        const coracao = document.createElement("span");
        coracao.className = "coracao-flutuante";

        const simbolos = ["♡", "♥", "✧", "❤"];
        const cores = ["#f2b8ca", "#e8c47d", "#fff4e8", "#d87998"];

        coracao.textContent =
            simbolos[Math.floor(Math.random() * simbolos.length)];

        coracao.style.setProperty(
            "--posicao",
            `${Math.random() * 100}%`
        );

        coracao.style.setProperty(
            "--coracao-cor",
            cores[Math.floor(Math.random() * cores.length)]
        );

        coracao.style.setProperty(
            "--coracao-tamanho",
            `${12 + Math.random() * 19}px`
        );

        coracao.style.setProperty(
            "--tempo",
            `${7 + Math.random() * 6}s`
        );

        coracao.style.setProperty(
            "--deriva",
            `${-70 + Math.random() * 140}px`
        );

        coracao.style.setProperty(
            "--rotacao",
            `${-50 + Math.random() * 100}deg`
        );

        document.body.appendChild(coracao);

        coracao.addEventListener("animationend", () => {
            coracao.remove();
        }, { once: true });
    }

    // Criar um coração de vez em quando
    const intervaloCoracoes = window.setInterval(
        criarCoracaoFlutuante,
        1400
    );

    // Limpar o intervalo se a página for encerrada
    window.addEventListener("pagehide", () => {
        window.clearInterval(intervaloCoracoes);
    }, { once: true });


    // ======================================
    // ANIMAÇÕES AO FAZER SCROLL
    // ======================================

    const elementosParaAnimar = document.querySelectorAll(
        ".cartao-memoria, .carta-surpresa, " +
        ".galeria-memorias, .texto-universo, " +
        ".mensagem-final"
    );

    if ("IntersectionObserver" in window) {
        const observador = new IntersectionObserver((entradas) => {
            entradas.forEach((entrada) => {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add("visivel");
                    observador.unobserve(entrada.target);
                }
            });
        }, {
            threshold: 0.12
        });

        elementosParaAnimar.forEach((elemento) => {
            elemento.classList.add("animar-ao-aparecer");
            observador.observe(elemento);
        });
    }

    // ======================================
    // MENSAGENS SECRETAS ALEATÓRIAS
    // ======================================

    const botaoSurpresa = document.getElementById("botaoSurpresa");
    const mensagemSecreta = document.getElementById("mensagemSecreta");
    const textoSurpresa = document.getElementById("textoSurpresa");

    const mensagensRomanticas = [
        "Se pudesse escolher um lugar para guardar os meus melhores momentos, escolheria aqueles em que estou contigo. ♡",
        "Lembra-te: mesmo nos dias mais simples, podemos criar memórias especiais.",
        "Entre tantas coisas bonitas no mundo, há momentos contigo que guardo com um carinho enorme.",
        "Este pequeno universo tem muitas páginas por escrever... e ainda quero preenchê-las com novas memórias nossas. ✨",
        "Surpresa! Se chegaste até aqui, encontraste mais um pedacinho deste universo feito para nós. 💗",
        "Às vezes, são os pequenos gestos que tornam uma história tão especial. Esta é uma das minhas formas de te mostrar carinho."
    ];

    let ultimaMensagem = -1;

    botaoSurpresa.addEventListener("click", () => {
        let indice;

        // Evitar repetir a mesma mensagem duas vezes seguidas
        do {
            indice = Math.floor(Math.random() * mensagensRomanticas.length);
        } while (
            mensagensRomanticas.length > 1 &&
            indice === ultimaMensagem
        );

        ultimaMensagem = indice;
        textoSurpresa.textContent = mensagensRomanticas[indice];

        mensagemSecreta.hidden = false;
        mensagemSecreta.classList.remove("aberta");

        // Reiniciar a animação
        void mensagemSecreta.offsetWidth;
        mensagemSecreta.classList.add("aberta");

        botaoSurpresa.textContent = "Descobrir outra mensagem ♡";
    });


    // ======================================
    // EXPLOSÃO DE CORAÇÕES
    // ======================================

    function criarCoraçõesNoPonto(x, y, quantidade = 12) {
        const cores = ["#f2b8ca", "#e8c47d", "#fff4e8", "#d87998"];
        const simbolos = ["♡", "♥", "✧"];

        for (let i = 0; i < quantidade; i++) {
            const coracao = document.createElement("span");
            coracao.className = "coracao-clique";

            coracao.textContent =
                simbolos[Math.floor(Math.random() * simbolos.length)];

            coracao.style.left = `${x}px`;
            coracao.style.top = `${y}px`;

            coracao.style.setProperty(
                "--coracao-cor",
                cores[Math.floor(Math.random() * cores.length)]
            );

            coracao.style.setProperty(
                "--tamanho-coracao",
                `${12 + Math.random() * 18}px`
            );

            coracao.style.setProperty(
                "--movimento-x",
                `${-100 + Math.random() * 200}px`
            );

            coracao.style.setProperty(
                "--movimento-y",
                `${-120 + Math.random() * 100}px`
            );

            document.body.appendChild(coracao);

            coracao.addEventListener("animationend", () => {
                coracao.remove();
            }, { once: true });
        }
    }

    // Corações ao clicar no botão especial
    const coracaoMagico = document.getElementById("coracaoMagico");
    const legendaMagica = document.getElementById("legendaMagica");

    const mensagensDoCoracao = [
        "Este coração guarda um bocadinho de carinho para ti. ♡",
        "Mais uma surpresa descoberta no nosso universo! ✨",
        "Missão cumprida: espalhar um bocadinho de amor. 💗",
        "Ainda há muitos momentos bonitos à nossa espera."
    ];

    let indiceCoracao = 0;

    coracaoMagico.addEventListener("click", (evento) => {
        criarCoraçõesNoPonto(
            evento.clientX,
            evento.clientY,
            30
        );

        legendaMagica.textContent =
            mensagensDoCoracao[
                indiceCoracao % mensagensDoCoracao.length
            ];

        indiceCoracao++;
    });


    // ======================================
    // CORAÇÕES AO CLICAR EM ESPAÇOS LIVRES
    // ======================================

    document.addEventListener("click", (evento) => {
        // Não interferir com botões, links, fotografias ou cartões
        if (
            evento.target.closest(
                "button, a, input, textarea, select, " +
                ".cartao-memoria, .carta-surpresa, " +
                ".foto-memoria, .visualizador-foto, " +
                ".cantinho-surpresas"
            )
        ) {
            return;
        }

        // Só reagir aos cliques no fundo ou em espaços vazios
        const elemento = evento.target;

        if (
            elemento === document.body ||
            elemento === document.querySelector("main") ||
            elemento.classList.contains("fundo-magico") ||
            elemento.id === "estrelas" ||
            elemento.id === "particulas" ||
            elemento.classList.contains("universo")
        ) {
            criarCoraçõesNoPonto(
                evento.clientX,
                evento.clientY,
                6
            );
        }
    });

});

/* CONTADOR DESDE O NOSSO PRIMEIRO BEIJO */

const dataPrimeiroBeijo = new Date(2025, 9, 1, 0, 0, 0);

function atualizarContadorAmor() {
    const agora = new Date();
    const diferenca = Math.max(0, agora.getTime() - dataPrimeiroBeijo.getTime());

    const segundosTotais = Math.floor(diferenca / 1000);

    const dias = Math.floor(segundosTotais / 86400);
    const horas = Math.floor((segundosTotais % 86400) / 3600);
    const minutos = Math.floor((segundosTotais % 3600) / 60);
    const segundos = segundosTotais % 60;

    document.getElementById("diasAmor").textContent = dias;
    document.getElementById("horasAmor").textContent =
        String(horas).padStart(2, "0");
    document.getElementById("minutosAmor").textContent =
        String(minutos).padStart(2, "0");
    document.getElementById("segundosAmor").textContent =
        String(segundos).padStart(2, "0");
}

atualizarContadorAmor();
setInterval(atualizarContadorAmor, 1000);

/* FRASCO MAGICO DAS MEMORIAS */

const botaoAbrirFrasco = document.getElementById("abrirFrasco");
const botaoOutraMemoria = document.getElementById("outraMemoria");
const textoMemoria = document.getElementById("textoMemoria");
const memoriaRevelada = document.getElementById("memoriaRevelada");
const frascoIlustracao = document.getElementById("frascoIlustracao");

const memoriasDoNossoFrasco = [
    "O dia 1 de outubro de 2025 tornou-se uma memória especial na nossa história. ❤️",
    "Às vezes, são os momentos mais simples que acabam por significar mais.",
    "Gosto da ideia de continuarmos a criar memórias que um dia vamos recordar com um sorriso.",
    "Cada fotografia guarda um pedacinho de uma história que é só nossa.",
    "Que nunca nos faltem motivos para rir, passear e descobrir coisas novas juntos.",
    "Há momentos que passam depressa, mas que ficam guardados no coração.",
    "O nosso primeiro beijo foi o começo de uma recordação que podemos guardar para sempre. 💋",
    "Ainda temos muitos lugares para conhecer e muitas histórias para viver.",
    "Um pequeno lembrete: não precisamos de um dia perfeito para criar uma memória bonita.",
    "O nosso universo é feito de todos aqueles pequenos momentos que escolhemos guardar. ✨"
];

let ultimaMemoria = -1;

function revelarMemoria() {
    if (!botaoAbrirFrasco || !textoMemoria || !memoriaRevelada) {
        return;
    }

    let indice;

    do {
        indice = Math.floor(Math.random() * memoriasDoNossoFrasco.length);
    } while (memoriasDoNossoFrasco.length > 1 && indice === ultimaMemoria);

    ultimaMemoria = indice;
    textoMemoria.textContent = memoriasDoNossoFrasco[indice];

    memoriaRevelada.hidden = false;

    if (frascoIlustracao) {
        frascoIlustracao.classList.remove("frasco-a-brilhar");

        void frascoIlustracao.offsetWidth;

        frascoIlustracao.classList.add("frasco-a-brilhar");
    }
}

if (botaoAbrirFrasco) {
    botaoAbrirFrasco.addEventListener("click", revelarMemoria);
}

if (botaoOutraMemoria) {
    botaoOutraMemoria.addEventListener("click", revelarMemoria);
}

/* O NOSSO CEU DE ESTRELAS INTERATIVO */

(() => {
    const ceu = document.getElementById("ceuMemorias");

    if (!ceu || ceu.dataset.inicializado === "true") {
        return;
    }

    ceu.dataset.inicializado = "true";

    const estrelas = ceu.querySelectorAll(".estrela-memoria");
    const detalhe = document.getElementById("detalheMemoriaCeu");
    const titulo = document.getElementById("tituloMemoriaCeu");
    const texto = document.getElementById("textoMemoriaCeu");
    const fotografia = document.getElementById("fotografiaMemoriaCeu");
    const botaoFechar = document.getElementById("fecharMemoriaCeu");

    if (!detalhe || !titulo || !texto || !fotografia || !botaoFechar) {
        return;
    }

    function abrirMemoria(estrela) {
        estrelas.forEach((item) => {
            item.classList.remove("estrela-ativa");
            item.removeAttribute("aria-pressed");
        });

        estrela.classList.add("estrela-ativa");
        estrela.setAttribute("aria-pressed", "true");

        titulo.textContent = estrela.dataset.titulo || "Uma memória nossa";
        texto.textContent = estrela.dataset.mensagem || "";

        const caminhoFotografia = estrela.dataset.fotografia;

        fotografia.hidden = true;
        fotografia.removeAttribute("src");

        if (caminhoFotografia) {
            fotografia.alt = estrela.dataset.titulo || "Fotografia de uma memória nossa";
            fotografia.src = caminhoFotografia;

            fotografia.onload = () => {
                fotografia.hidden = false;
            };

            fotografia.onerror = () => {
                fotografia.hidden = true;
            };
        }

        detalhe.hidden = false;
    }

    estrelas.forEach((estrela) => {
        estrela.setAttribute("aria-pressed", "false");

        estrela.addEventListener("click", () => {
            abrirMemoria(estrela);
        });
    });

    botaoFechar.addEventListener("click", () => {
        detalhe.hidden = true;

        estrelas.forEach((estrela) => {
            estrela.classList.remove("estrela-ativa");
            estrela.setAttribute("aria-pressed", "false");
        });
    });
})();

/* ==========================================
   OUR LITTLE UNIVERSE — MOTOR CINEMATOGRÁFICO
========================================== */

(() => {
    if (window.__ourLittleUniverseCinema) {
        return;
    }

    window.__ourLittleUniverseCinema = true;

    const reduzirMovimento = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    const ecrasGrandes = window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    );

    /* 1. Criar as camadas de efeitos */

    const luz = document.createElement("div");
    luz.className = "luz-cinematografica";
    luz.setAttribute("aria-hidden", "true");

    const camadaParticulas = document.createElement("div");
    camadaParticulas.className = "particulas-cinematograficas";
    camadaParticulas.setAttribute("aria-hidden", "true");

    document.body.append(luz, camadaParticulas);

    /* 2. Criar partículas douradas */

    function criarParticulas() {
        camadaParticulas.replaceChildren();

        if (reduzirMovimento.matches) {
            return;
        }

        const ecrasPequenos = window.matchMedia(
            "(max-width: 600px)"
        ).matches;

        const quantidade = ecrasPequenos ? 9 : 20;

        for (let i = 0; i < quantidade; i++) {
            const particula = document.createElement("span");

            particula.className = "particula-dourada";

            particula.style.setProperty(
                "--particula-x",
                `${Math.random() * 100}%`
            );

            particula.style.setProperty(
                "--particula-tamanho",
                `${2 + Math.random() * 3}px`
            );

            particula.style.setProperty(
                "--particula-duracao",
                `${12 + Math.random() * 15}s`
            );

            particula.style.setProperty(
                "--particula-atraso",
                `${-Math.random() * 25}s`
            );

            particula.style.setProperty(
                "--particula-desvio",
                `${-45 + Math.random() * 90}px`
            );

            particula.addEventListener("animationiteration", () => {
                particula.style.setProperty(
                    "--particula-x",
                    `${Math.random() * 100}%`
                );
            });

            camadaParticulas.appendChild(particula);
        }
    }

    criarParticulas();

    /* 3. Iluminação que acompanha o rato no computador */

    let quadroLuzAgendado = false;

    document.addEventListener("pointermove", (evento) => {
        if (
            !ecrasGrandes.matches ||
            reduzirMovimento.matches ||
            quadroLuzAgendado
        ) {
            return;
        }

        quadroLuzAgendado = true;

        requestAnimationFrame(() => {
            luz.style.setProperty("--luz-x", `${evento.clientX}px`);
            luz.style.setProperty("--luz-y", `${evento.clientY}px`);

            quadroLuzAgendado = false;
        });
    }, { passive: true });

    /* 4. Animações de entrada das novas secções */

    const elementosRevelar = document.querySelectorAll(
        ".contador-amor, .frasco-memorias, .ceu-memorias"
    );

    if (reduzirMovimento.matches || !("IntersectionObserver" in window)) {
        elementosRevelar.forEach((elemento) => {
            elemento.classList.add("cinema-visivel");
        });
    } else {
        const observadorCinema = new IntersectionObserver(
            (entradas, observador) => {
                entradas.forEach((entrada) => {
                    if (entrada.isIntersecting) {
                        entrada.target.classList.add("cinema-visivel");
                        observador.unobserve(entrada.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -35px 0px"
            }
        );

        elementosRevelar.forEach((elemento) => {
            elemento.classList.add("cinema-revelar");
            observadorCinema.observe(elemento);
        });
    }

    /* 5. Brilho subtil nos botões */

    document.querySelectorAll(
        ".botao-frasco, .botao-outra-memoria, " +
        ".fechar-memoria-ceu, .botao-surpresa, " +
        "#abrirUniverso, #abrirCarta"
    ).forEach((botao) => {
        botao.classList.add("botao-cinema-brilho");
    });

    /* 6. Pequenas explosões de luz nos cliques */

    document.addEventListener("click", (evento) => {
        if (
            reduzirMovimento.matches ||
            !ecrasGrandes.matches ||
            !(evento.target instanceof Element)
        ) {
            return;
        }

        const alvo = evento.target.closest("button, a");

        if (!alvo || alvo.disabled) {
            return;
        }

        const retangulo = alvo.getBoundingClientRect();

        if (
            retangulo.width === 0 ||
            retangulo.height === 0 ||
            retangulo.bottom < 0 ||
            retangulo.top > window.innerHeight
        ) {
            return;
        }

        const explosao = document.createElement("span");
        explosao.className = "explosao-cinema";
        explosao.setAttribute("aria-hidden", "true");

        explosao.style.left =
            `${Math.max(0, Math.min(window.innerWidth, evento.clientX))}px`;

        explosao.style.top =
            `${Math.max(0, Math.min(window.innerHeight, evento.clientY))}px`;

        for (let i = 0; i < 7; i++) {
            const particula = document.createElement("span");
            const angulo = (Math.PI * 2 * i) / 7;
            const distancia = 18 + Math.random() * 22;

            particula.className = "particula-clique";

            particula.style.setProperty(
                "--explosao-x",
                `${Math.cos(angulo) * distancia}px`
            );

            particula.style.setProperty(
                "--explosao-y",
                `${Math.sin(angulo) * distancia}px`
            );

            explosao.appendChild(particula);
        }

        document.body.appendChild(explosao);

        window.setTimeout(() => {
            explosao.remove();
        }, 800);
    });

    /* 7. Atualizar os efeitos se mudar a preferência do dispositivo */

    reduzirMovimento.addEventListener("change", () => {
        criarParticulas();

        if (reduzirMovimento.matches) {
            luz.style.display = "none";

            document.querySelectorAll(".cinema-revelar").forEach((elemento) => {
                elemento.classList.add("cinema-visivel");
            });
        } else {
            luz.style.display = "";
        }
    });
})();

/* ==========================================
   100 MOTIVOS PARA GOSTAR DE NÓS 💗
========================================== */

(() => {
    function iniciarCemMotivos() {
        const secao = document.getElementById("cemMotivos");

        if (!secao || secao.dataset.inicializado === "true") {
            return;
        }

        const botao = document.getElementById("tirarMotivo");
        const botaoOutro = document.getElementById("outroMotivo");
        const papel = document.getElementById("papelMotivo");
        const numero = document.getElementById("numeroMotivo");
        const texto = document.getElementById("textoMotivo");
        const progresso = document.getElementById("progressoMotivos");

        if (!botao || !botaoOutro || !papel || !numero || !texto || !progresso) {
            return;
        }

        secao.dataset.inicializado = "true";

        const motivos = [
            "Porque a nossa história tem pormenores que a tornam única.",
            "Porque gosto das memórias que vamos construindo.",
            "Porque há momentos simples que se tornam especiais contigo.",
            "Porque podemos descobrir coisas novas juntos.",
            "Porque gosto de recordar como tudo começou.",
            "Porque o nosso primeiro beijo faz parte da nossa história.",
            "Porque cada fotografia pode guardar uma recordação.",
            "Porque ainda temos muitas páginas por escrever.",
            "Porque gosto de imaginar os lugares que ainda vamos conhecer.",
            "Porque uma saída simples também pode ser uma boa memória.",
            "Porque gosto das nossas conversas.",
            "Porque há piadas que só nós entendemos.",
            "Porque rir juntos torna os dias mais leves.",
            "Porque gosto quando partilhamos novidades.",
            "Porque é bom ter alguém com quem conversar.",
            "Porque gosto de conhecer melhor os teus pensamentos.",
            "Porque podemos aprender coisas um com o outro.",
            "Porque gosto quando partilhamos os nossos interesses.",
            "Porque cada pessoa traz algo diferente a uma relação.",
            "Porque podemos continuar a crescer individualmente e juntos.",
            "Porque gosto dos pequenos gestos de carinho.",
            "Porque uma mensagem inesperada pode melhorar o meu dia.",
            "Porque perguntar como correu o dia também é importante.",
            "Porque gosto quando nos lembramos dos pormenores.",
            "Porque a atenção aos pequenos detalhes tem significado.",
            "Porque um abraço pode transmitir muito carinho.",
            "Porque gosto dos momentos em que estamos tranquilos.",
            "Porque nem todos os momentos especiais precisam de planos.",
            "Porque gosto de partilhar pequenas conquistas.",
            "Porque é bom celebrar as coisas boas, mesmo as pequeninas.",
            "Porque gosto quando me fazes sorrir.",
            "Porque uma gargalhada pode mudar o ambiente de um dia.",
            "Porque gosto das nossas brincadeiras.",
            "Porque podemos criar tradições só nossas.",
            "Porque até uma fotografia espontânea pode ser especial.",
            "Porque gosto de guardar recordações engraçadas.",
            "Porque há momentos que merecem ser lembrados.",
            "Porque gosto de revisitar fotografias antigas.",
            "Porque cada recordação conta uma parte da nossa história.",
            "Porque podemos transformar dias comuns em memórias bonitas.",
            "Porque gosto quando existe respeito entre nós.",
            "Porque ouvir um ao outro é uma forma de carinho.",
            "Porque podemos falar sobre aquilo que sentimos.",
            "Porque é importante respeitar os limites de cada um.",
            "Porque cada um pode ter o seu próprio espaço.",
            "Porque apoiar os objetivos um do outro faz diferença.",
            "Porque gosto quando celebramos as conquistas um do outro.",
            "Porque podemos aprender a resolver desacordos com calma.",
            "Porque pedir desculpa quando é preciso também importa.",
            "Porque a confiança se constrói com atitudes.",
            "Porque gosto de conhecer as tuas histórias.",
            "Porque cada um tem experiências que o tornam especial.",
            "Porque podemos trocar ideias diferentes.",
            "Porque gosto de aprender contigo.",
            "Porque também podemos ensinar coisas um ao outro.",
            "Porque é bom descobrir músicas novas para ouvir.",
            "Porque podemos recomendar filmes e séries.",
            "Porque gosto da ideia de experimentar atividades diferentes.",
            "Porque podemos inventar planos de última hora.",
            "Porque até um passeio pode dar uma boa história.",
            "Porque gosto de imaginar viagens futuras.",
            "Porque há lugares que seria bonito conhecer contigo.",
            "Porque podemos experimentar comidas diferentes.",
            "Porque podemos descobrir cafés e sítios acolhedores.",
            "Porque gosto de pensar em surpresas criativas.",
            "Porque uma surpresa não precisa de ser cara para ter valor.",
            "Porque uma carta escrita com carinho pode ser inesquecível.",
            "Porque gosto de preparar pequenos detalhes especiais.",
            "Porque podemos criar presentes feitos por nós.",
            "Porque o tempo e a dedicação também são presentes.",
            "Porque gosto de guardar mensagens bonitas.",
            "Porque uma palavra gentil pode fazer diferença.",
            "Porque gosto quando nos encorajamos mutuamente.",
            "Porque todos precisamos de dias menos bons.",
            "Porque podemos tentar compreender o que o outro sente.",
            "Porque demonstrar carinho pode acontecer de muitas formas.",
            "Porque gosto de aprender o que te faz sentir apreciado.",
            "Porque também quero que os meus sentimentos sejam ouvidos.",
            "Porque uma relação é construída pelos dois.",
            "Porque gosto quando partilhamos decisões.",
            "Porque podemos combinar planos que agradem a ambos.",
            "Porque é bonito apoiar sonhos diferentes.",
            "Porque cada um pode continuar a descobrir quem é.",
            "Porque gosto de ver as coisas que te entusiasmam.",
            "Porque é bom ter espaço para os nossos passatempos.",
            "Porque podemos partilhar novidades ao fim do dia.",
            "Porque gosto das pequenas rotinas que criamos.",
            "Porque podemos inventar uma tradição para cada aniversário.",
            "Porque cada mês pode trazer uma nova recordação.",
            "Porque gosto de assinalar datas que são importantes para nós.",
            "Porque podemos guardar bilhetes e pequenas lembranças.",
            "Porque podemos criar um álbum com as nossas fotografias.",
            "Porque gosto da ideia de acrescentar novas memórias a este site.",
            "Porque podemos voltar aqui e recordar estes momentos.",
            "Porque a nossa história não precisa de ser perfeita para ser especial.",
            "Porque podemos aprender com os dias mais difíceis.",
            "Porque os gestos sinceros valem mais do que grandes promessas.",
            "Porque gosto de imaginar as próximas aventuras.",
            "Porque ainda existem muitas coisas para descobrir.",
            "Porque cada dia é uma oportunidade para demonstrar carinho.",
            "Porque esta coleção é uma forma de celebrar a nossa história."
        ];

        // Criar uma ordem aleatória sem repetir motivos na mesma ronda.
        let ordem = [];
        let proximoIndice = 0;

        function baralharMotivos() {
            ordem = motivos.map((_, indice) => indice);

            for (let i = ordem.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [ordem[i], ordem[j]] = [ordem[j], ordem[i]];
            }

            proximoIndice = 0;
        }

        function atualizarProgresso() {
            const descobertos = proximoIndice;
            const restantes = motivos.length - descobertos;

            if (restantes > 0) {
                progresso.textContent =
                    `Já descobriste ${descobertos} de ${motivos.length} motivos. ` +
                    `Faltam ${restantes} por descobrir.`;
            } else {
                progresso.textContent =
                    "Descobriste os 100 motivos! Que esta coleção continue a crescer. ♡";
            }
        }

        function revelarProximoMotivo() {
            // Começar uma nova ronda depois de descobrir todos.
            if (proximoIndice >= motivos.length) {
                baralharMotivos();
            }

            const indiceMotivo = ordem[proximoIndice];
            proximoIndice++;

            numero.textContent = `Motivo ${proximoIndice} de ${motivos.length}`;
            texto.textContent = motivos[indiceMotivo];

            papel.hidden = false;
            papel.classList.remove("motivo-revelado");

            // Reiniciar a animação do papelinho.
            void papel.offsetWidth;
            papel.classList.add("motivo-revelado");

            botao.hidden = true;
            botaoOutro.hidden = false;

            botaoOutro.textContent =
                proximoIndice === motivos.length
                    ? "Começar uma nova ronda ♡"
                    : "Descobrir outro motivo ✨";

            atualizarProgresso();
        }

        botao.addEventListener("click", revelarProximoMotivo);
        botaoOutro.addEventListener("click", revelarProximoMotivo);

        baralharMotivos();
        atualizarProgresso();
    }

    // Funciona quer o script seja carregado antes ou depois do HTML.
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", iniciarCemMotivos, {
            once: true
        });
    } else {
        iniciarCemMotivos();
    }
})();

/* ==================================
   CAÇA AO TESOURO ROMÂNTICA
================================== */

(() => {
    function iniciarCacaTesouro() {
        const secao = document.getElementById("cacaTesouro");

        if (!secao || secao.dataset.inicializado === "true") {
            return;
        }

        secao.dataset.inicializado = "true";

        const botaoComecar = document.getElementById("comecarTesouro");
        const envelope = document.getElementById("tesouroEnvelope");
        const zonaPista = document.getElementById("tesouroPista");
        const numeroPista = document.getElementById("pistaNumero");
        const perguntaPista = document.getElementById("pistaPergunta");
        const dicaPista = document.getElementById("pistaDica");
        const formulario = document.getElementById("formularioPista");
        const resposta = document.getElementById("respostaPista");
        const feedback = document.getElementById("feedbackPista");
        const continuar = document.getElementById("continuarTesouro");
        const final = document.getElementById("tesouroFinal");
        const repetir = document.getElementById("repetirTesouro");

        if (
            !botaoComecar || !envelope || !zonaPista ||
            !numeroPista || !perguntaPista || !dicaPista ||
            !formulario || !resposta || !feedback ||
            !continuar || !final || !repetir
        ) {
            return;
        }

        // As respostas são flexíveis para não exigir uma frase exata.
        const pistas = [
            {
                pergunta: "Como nos conhecemos?",
                dica: "Pensa,que pessoas fizeram os nossos caminhos cruzarem-se. 💗",
                respostas: ["atraves de amigos", "por amigos", "amigos"],
                mensagem: "Acertaste! Foram os nossos amigos que ajudaram a cruzar os nossos caminhos. ♡"
            },
            {
                pergunta: "Em que dia demos o nosso primeiro beijo?",
                dica: "Uma data que ficou guardada na nossa história. 💋",
                respostas: [
                    "1 de outubro de 2025",
                    "1 outubro 2025",
                    "01/10/2025",
                    "01-10-2025",
                    "1/10/2025",
                    "1 de outubro"
                ],
                mensagem: "Sim! 1 de outubro de 2025. Um dia especial para recordar. 💗"
            },
            {
                pergunta: "Que memória nossa escolherias para guardar numa caixinha?",
                dica: "Lembra-te de um momento especial que vivemos juntos. ✨",
                respostas: [],
                livre: true,
                mensagem: "Que bonito! As nossas memórias são pequenos tesouros. ♡"
            },
            
                
            {
                pergunta: "Se pudéssemos repetir um dia da nossa história, qual achas que eu escolheria?",
                dica: "Não existe uma única resposta certa. Tenta adivinhar um dia especial para nós. 🌙",
                respostas: [],
                livre: true,
                mensagem: "A nossa história está cheia de momentos que merecem ser revividos. 💗"
            }
        ];

        let indiceAtual = 0;
        let pistaResolvida = false;

        function normalizar(texto) {
            return texto
                .toLocaleLowerCase("pt-PT")
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[^\p{L}\p{N}\s]/gu, " ")
                .replace(/\s+/g, " ")
                .trim();
        }

        function mostrarPista() {
            const pista = pistas[indiceAtual];

            pistaResolvida = false;
            numeroPista.textContent = `PISTA ${indiceAtual + 1} DE ${pistas.length}`;
            perguntaPista.textContent = pista.pergunta;
            dicaPista.textContent = pista.dica;
            resposta.value = "";
            resposta.disabled = false;
            feedback.textContent = "";
            continuar.hidden = true;
            formulario.hidden = false;
            zonaPista.hidden = false;
            resposta.focus({ preventScroll: true });
        }

        botaoComecar.addEventListener("click", () => {
            botaoComecar.hidden = true;
            envelope.hidden = true;
            mostrarPista();
        });

        formulario.addEventListener("submit", (evento) => {
            evento.preventDefault();

            if (pistaResolvida) return;

            const texto = normalizar(resposta.value);

            if (!texto) {
                feedback.textContent = "Escreve uma resposta primeiro, meu amor. ♡";
                return;
            }

            const pista = pistas[indiceAtual];

            const acertou = pista.livre ||
                pista.respostas.some(opcao => {
                    const respostaAceite = normalizar(opcao);
                    return texto === respostaAceite ||
                        texto.includes(respostaAceite);
                });

            if (!acertou) {
                feedback.textContent =
                    "Ainda não é essa! Pensa mais um bocadinho e tenta outra vez. 💗";
                return;
            }

            pistaResolvida = true;
            resposta.disabled = true;
            feedback.textContent = pista.mensagem;
            continuar.hidden = false;

            if (indiceAtual === pistas.length - 1) {
                continuar.textContent = "Abrir o meu tesouro 🎁";
            } else {
                continuar.textContent = "Próxima pista ♡";
            }
        });

        continuar.addEventListener("click", () => {
            if (!pistaResolvida) return;

            if (indiceAtual < pistas.length - 1) {
                indiceAtual++;
                mostrarPista();
                return;
            }

            zonaPista.hidden = true;
            final.hidden = false;
            final.scrollIntoView({ behavior: "smooth", block: "center" });
        });

        repetir.addEventListener("click", () => {
            indiceAtual = 0;
            pistaResolvida = false;
            final.hidden = true;
            botaoComecar.hidden = false;
            envelope.hidden = false;
            zonaPista.hidden = true;
            resposta.disabled = false;
            window.scrollTo({ top: secao.offsetTop, behavior: "smooth" });
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", iniciarCacaTesouro);
    } else {
        iniciarCacaTesouro();
    }
})();

/* ==========================================
   UNIVERSE.EXE — LÓGICA DO CENTRO DE CONTROLO
========================================== */

(() => {
    function iniciarCentroControlo() {
        const centro = document.getElementById("centroControlo");

        if (!centro || centro.dataset.inicializado === "true") {
            return;
        }

        centro.dataset.inicializado = "true";

        const terminal = document.getElementById("ccTerminal");
        const progresso = document.getElementById("ccProgresso");
        const colecao = document.getElementById("ccColecao");
        const locais = centro.querySelectorAll(".cc-local");

        const dados = {
            observatorio: {
                nome: "OBSERVATÓRIO",
                fragmento: "FRAGMENTO 01",
                linhas: [
                    "[A ANALISAR] Sinal recebido do espaço profundo...",
                    "[RESULTADO] Não parece ser uma estrela.",
                    "[SISTEMA] Parece ser uma recordação.",
                    "[SUCESSO] Fragmento 01 recuperado."
                ]
            },

            arquivo: {
                nome: "ARQUIVO PERDIDO",
                fragmento: "FRAGMENTO 02",
                linhas: [
                    "[A ABRIR] Acesso aos ficheiros antigos...",
                    "[AVISO] Foram encontrados dados classificados.",
                    "[RESULTADO] Demasiadas memórias para um único sistema.",
                    "[SUCESSO] Fragmento 02 recuperado."
                ]
            },

            sala: {
                nome: "SALA DE CONTROLO",
                fragmento: "FRAGMENTO 03",
                linhas: [
                    "[DIAGNÓSTICO] A verificar o estado do universo...",
                    "[ERRO] Nível de carinho acima dos limites permitidos.",
                    "[SISTEMA] Tentativa de corrigir o problema...",
                    "[FALHA] Impossível. A culpa é do Gonçalo.",
                    "[SUCESSO] Fragmento 03 recuperado."
                ]
            }
        };

        const chaveGuardado = "olu_fragmentos_v1";
        let descobertos = carregarDescobertos();

        function carregarDescobertos() {
            try {
                const guardado = JSON.parse(
                    localStorage.getItem(chaveGuardado) || "[]"
                );

                if (!Array.isArray(guardado)) return [];

                return guardado.filter(
                    id => Object.prototype.hasOwnProperty.call(dados, id)
                );
            } catch (erro) {
                return [];
            }
        }

        function guardarDescobertos() {
            try {
                localStorage.setItem(
                    chaveGuardado,
                    JSON.stringify(descobertos)
                );
            } catch (erro) {
                // O jogo continua a funcionar sem armazenamento.
            }
        }

        function adicionarLinha(texto, classe = "cc-linha-sistema") {
            const linha = document.createElement("p");
            linha.className = classe;
            linha.textContent = texto;

            terminal.appendChild(linha);
            terminal.scrollTop = terminal.scrollHeight;
        }

        function atualizarColecao() {
            progresso.textContent =
                `FRAGMENTOS: ${descobertos.length}/3`;

            colecao.replaceChildren();

            Object.keys(dados).forEach(id => {
                const fragmento = document.createElement("span");
                const descoberto = descobertos.includes(id);

                fragmento.className = descoberto
                    ? "cc-fragmento ativo"
                    : "cc-fragmento vazio";

                fragmento.textContent = descoberto
                    ? `✦ ${dados[id].fragmento}`
                    : "? BLOQUEADO";

                colecao.appendChild(fragmento);
            });

            locais.forEach(botao => {
                const descoberto = descobertos.includes(
                    botao.dataset.local
                );

                botao.classList.toggle("descoberto", descoberto);

                const estado = botao.querySelector(".cc-local-estado");

                if (estado) {
                    estado.textContent = descoberto
                        ? "FRAGMENTO RECUPERADO ✓"
                        : "INVESTIGAR ↗";
                }
            });
        }

        function investigar(id) {
            const local = dados[id];

            if (!local) return;

            adicionarLinha("");
            adicionarLinha(`> A abrir: ${local.nome}`, "cc-linha-utilizador");

            local.linhas.forEach((texto, indice) => {
                window.setTimeout(() => {
                    adicionarLinha(
                        texto,
                        texto.includes("[SUCESSO]")
                            ? "cc-linha-sucesso"
                            : texto.includes("[ERRO]") ||
                              texto.includes("[FALHA]")
                                ? "cc-linha-alerta"
                                : "cc-linha-sistema"
                    );

                    if (indice === local.linhas.length - 1) {
                        if (!descobertos.includes(id)) {
                            descobertos.push(id);
                            guardarDescobertos();
                            atualizarColecao();

                            if (descobertos.length === 3) {
                                adicionarLinha(
                                    "[MISTÉRIO] Os três fragmentos estão reunidos.",
                                    "cc-linha-sucesso"
                                );

                                adicionarLinha(
                                    "[AVISO] Ainda falta descobrir o que significam...",
                                    "cc-linha-alerta"
                                );
                            }
                        } else {
                            adicionarLinha(
                                "[SISTEMA] Este fragmento já estava guardado."
                            );
                        }
                    }
                }, indice * 450);
            });
        }

        locais.forEach(botao => {
            botao.addEventListener("click", () => {
                investigar(botao.dataset.local);
            });
        });

        atualizarColecao();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", iniciarCentroControlo);
    } else {
        iniciarCentroControlo();
    }
})();

/* ==========================================
   JOGO ESPACIAL — MOTOR E CONTROLOS
   Módulo independente do site existente
========================================== */

(() => {
    function iniciarJogoEspacial() {
        const jogo = document.getElementById("jogoEspacial");

        if (!jogo || jogo.dataset.inicializado === "true") return;
        jogo.dataset.inicializado = "true";

        const canvas = document.getElementById("mapaEspacial");
        const ctx = canvas.getContext("2d");

        const aviso = document.getElementById("avisoJogo");
        const botaoIniciar = document.getElementById("iniciarJogo");
        const estado = document.getElementById("estadoJogo");
        const tituloMensagem = document.getElementById("tituloMensagemJogo");
        const textoMensagem = document.getElementById("textoMensagemJogo");
        const botaoInvestigar = document.getElementById("investigarPortal");
        const botaoReiniciar = document.getElementById("reiniciarJogo");
        const botoesMover = jogo.querySelectorAll("[data-mover]");

const contadorCristais = document.getElementById("contadorCristais");
const progressoCristais = document.getElementById("progressoCristais");
const listaCristais = document.getElementById("listaCristais");
const estadoCristais = document.getElementById("estadoCristais");
const portalFinal = document.getElementById("portalFinal");
const textoPortalFinal = document.getElementById("textoPortalFinal");

        if (
            !canvas || !ctx || !aviso || !botaoIniciar ||
            !estado || !tituloMensagem || !textoMensagem ||
            !botaoInvestigar || !botaoReiniciar
        ) return;

        const LARGURA = 800;
        const ALTURA = 500;
        const CHAVE_FRAGMENTOS = "olu_fragmentos_v1";
        const CHAVE_PORTAIS = "olu_portais_v1";

const CHAVE_CRISTAIS = "olu_cristais_v1";

const cristais = [
    { id: 1, x: 95,  y: 90,  cor: "#ffb8e8", nome: "Primeiro encontro" },
    { id: 2, x: 300, y: 235, cor: "#c7b5ff", nome: "Uma memória especial" },
    { id: 3, x: 580, y: 100, cor: "#ffe0a6", nome: "O teu sorriso" },
    { id: 4, x: 285, y: 440, cor: "#a9e8ff", nome: "A nossa cumplicidade" },
    { id: 5, x: 745, y: 300, cor: "#ff9fb7", nome: "O nosso futuro" }
];

const cristaisRecolhidos = new Set();

        const jogador = {
            x: 100,
            y: 250,
            raio: 12,
            velocidade: 3
        };

        const portais = [
            {
                id: "observatorio",
                x: 245,
                y: 115,
                raio: 27,
                cor: "#e9a5cf",
                nome: "Portal do Observatório",
                fragmento: "FRAGMENTO 01",
                mensagem:
                    "O espaço é enorme, mas há coisas que nos fazem sentir em casa. Primeiro portal explorado! ♡"
            },
            {
                id: "arquivo",
                x: 530,
                y: 365,
                raio: 27,
                cor: "#bba5ff",
                nome: "Portal do Arquivo",
                fragmento: "FRAGMENTO 02",
                mensagem:
                    "Registo recuperado: as pequenas memórias também fazem parte das grandes aventuras. ✨"
            },
            {
                id: "sala",
                x: 690,
                y: 145,
                raio: 27,
                cor: "#ffcb8e",
                nome: "Portal da Sala de Controlo",
                fragmento: "FRAGMENTO 03",
                mensagem:
                    "Anomalia confirmada: o explorador continua a ser responsável por níveis perigosos de fofura. Sistema sem solução. 💗"
            }
        ];

        const obstaculos = [
            { x: 370, y: 110, raio: 36 },
            { x: 400, y: 300, raio: 43 },
            { x: 165, y: 390, raio: 30 },
            { x: 650, y: 420, raio: 23 }
        ];

        const estrelas = Array.from({ length: 115 }, (_, i) => ({
            x: (i * 137.51 + 31) % LARGURA,
            y: (i * 89.17 + 17) % ALTURA,
            raio: 0.5 + ((i * 7) % 10) / 10,
            fase: i * 0.7
        }));

        const teclas = new Set();
        const descobertos = new Set();
        const portaisVisitados = new Set();

        let aJogar = false;
        let animacao = 0;
        let tempo = 0;
        let portalProximo = null;
        let ultimoTempo = 0;

        function lerLista(chave) {
            try {
                const dados = JSON.parse(localStorage.getItem(chave) || "[]");
                return Array.isArray(dados) ? dados : [];
            } catch {
                return [];
            }
        }

        function carregarProgresso() {
            descobertos.clear();
            portaisVisitados.clear();

            lerLista(CHAVE_FRAGMENTOS).forEach(id => {
                if (portais.some(portal => portal.id === id)) {
                    descobertos.add(id);
                }
            });

            lerLista(CHAVE_PORTAIS).forEach(id => {
                if (portais.some(portal => portal.id === id)) {
                    portaisVisitados.add(id);
                }
carregarCristais();
atualizarInventario();

            });
        }

        function guardarVisitas() {
            try {
                localStorage.setItem(
                    CHAVE_PORTAIS,
                    JSON.stringify([...portaisVisitados])
                );
            } catch {
                // O jogo continua a funcionar sem armazenamento.
            }
        }

function guardarCristais() {
    try {
        localStorage.setItem(
            CHAVE_CRISTAIS,
            JSON.stringify([...cristaisRecolhidos])
        );
    } catch {
        // O jogo continua a funcionar sem armazenamento.
    }
}

function carregarCristais() {
    cristaisRecolhidos.clear();

    try {
        const dados = JSON.parse(
            localStorage.getItem(CHAVE_CRISTAIS) || "[]"
        );

        if (Array.isArray(dados)) {
            dados.forEach(id => {
                const numero = Number(id);

                if (cristais.some(cristal => cristal.id === numero)) {
                    cristaisRecolhidos.add(numero);
                }
            });
        }
    } catch {
        // Começa sem cristais se os dados estiverem inválidos.
    }
}

function atualizarInventario() {
    const total = cristais.length;
    const recolhidos = cristaisRecolhidos.size;

    if (contadorCristais) {
        contadorCristais.textContent = `${recolhidos} / ${total}`;
    }

    if (progressoCristais) {
        progressoCristais.style.width =
            `${(recolhidos / total) * 100}%`;
    }

    if (listaCristais) {
        listaCristais.querySelectorAll("[data-cristal]").forEach(slot => {
            const id = Number(slot.dataset.cristal);
            const encontrado = cristaisRecolhidos.has(id);

            slot.classList.toggle("recolhido", encontrado);
            slot.textContent = encontrado ? "✦" : "?";
            slot.setAttribute(
                "aria-label",
                encontrado
                    ? `Cristal ${id} encontrado`
                    : `Cristal ${id} por encontrar`
            );
        });
    }

    if (estadoCristais) {
        if (recolhidos === total) {
            estadoCristais.textContent =
                "Todos os cristais foram recuperados! O portal aguarda os fragmentos restantes. ✨";
        } else {
            estadoCristais.textContent =
                `Ainda faltam ${total - recolhidos} cristal(is). Continua a explorar o universo!`;
        }
    }

    atualizarPortalFinal();
}

function atualizarPortalFinal() {
    const todosOsCristais =
        cristaisRecolhidos.size === cristais.length;

    const todosOsFragmentos =
        descobertos.size === portais.length;

    const desbloqueado = todosOsCristais && todosOsFragmentos;

    if (portalFinal) {
        portalFinal.classList.toggle("desbloqueado", desbloqueado);
    }

    if (textoPortalFinal) {
        textoPortalFinal.textContent = desbloqueado
            ? "PORTAL DESBLOQUEADO! Reuniste todos os cristais e fragmentos. A última surpresa está à tua espera. ♡"
            : `Portal bloqueado: ${cristais.length - cristaisRecolhidos.size} cristal(is) e ${portais.length - descobertos.size} fragmento(s) por recuperar.`;
    }

    if (desbloqueado && !window.__oluPortalFinalAnunciado) {
        window.__oluPortalFinalAnunciado = true;

        mostrarMensagem(
            "PORTAL FINAL DESBLOQUEADO 💗",
            "Conseguiste! Todos os cristais e fragmentos estão reunidos. O nosso último segredo espera por ti."
        );
    }
}

        function mostrarMensagem(titulo, texto) {
            tituloMensagem.textContent = titulo;
            textoMensagem.textContent = texto;
        }

        function portalDesbloqueado(portal) {
            return descobertos.has(portal.id);
        }

        function desenharFundo() {
            const gradiente = ctx.createLinearGradient(0, 0, LARGURA, ALTURA);
            gradiente.addColorStop(0, "#100b20");
            gradiente.addColorStop(0.5, "#1e1330");
            gradiente.addColorStop(1, "#0a101e");

            ctx.fillStyle = gradiente;
            ctx.fillRect(0, 0, LARGURA, ALTURA);

            estrelas.forEach(estrela => {
                const brilho =
                    0.45 + Math.sin(tempo * 0.0015 + estrela.fase) * 0.35;

                ctx.globalAlpha = brilho;
                ctx.fillStyle = "#fce7ff";
                ctx.beginPath();
                ctx.arc(
                    estrela.x,
                    estrela.y,
                    estrela.raio,
                    0,
                    Math.PI * 2
                );
                ctx.fill();
            });

            ctx.globalAlpha = 1;

            // Pequenas nebulosas decorativas.
            [
                { x: 175, y: 115, cor: "rgba(155, 72, 155, 0.13)" },
                { x: 580, y: 290, cor: "rgba(81, 92, 180, 0.12)" },
                { x: 690, y: 100, cor: "rgba(225, 128, 177, 0.1)" }
            ].forEach(nuvem => {
                const brilho = ctx.createRadialGradient(
                    nuvem.x, nuvem.y, 0,
                    nuvem.x, nuvem.y, 125
                );

                brilho.addColorStop(0, nuvem.cor);
                brilho.addColorStop(1, "rgba(0,0,0,0)");

                ctx.fillStyle = brilho;
                ctx.fillRect(
                    nuvem.x - 125,
                    nuvem.y - 125,
                    250,
                    250
                );
            });
        }

        function desenharPlaneta(x, y, raio, cor, nome) {
            ctx.save();

            ctx.strokeStyle = cor;
            ctx.globalAlpha = 0.55;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.ellipse(x, y, raio * 1.5, raio * 0.43, -0.25, 0, Math.PI * 2);
            ctx.stroke();

            ctx.globalAlpha = 1;

            const gradiente = ctx.createRadialGradient(
                x - raio * 0.35,
                y - raio * 0.4,
                2,
                x,
                y,
                raio
            );

            gradiente.addColorStop(0, "#fff0fa");
            gradiente.addColorStop(0.2, cor);
            gradiente.addColorStop(1, "#33203f");

            ctx.fillStyle = gradiente;
            ctx.beginPath();
            ctx.arc(x, y, raio, 0, Math.PI * 2);
            ctx.fill();

            ctx.globalAlpha = 0.45;
            ctx.strokeStyle = cor;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(x, y, raio + 5, 0, Math.PI * 2);
            ctx.stroke();

            ctx.globalAlpha = 1;
            ctx.fillStyle = "#d9c7e2";
            ctx.font = "12px monospace";
            ctx.textAlign = "center";
            ctx.fillText(nome, x, y + raio + 24);

            ctx.restore();
        }

        function desenharPortal(portal) {
            const desbloqueado = portalDesbloqueado(portal);
            const visitado = portaisVisitados.has(portal.id);
            const pulsa = 1 + Math.sin(tempo * 0.003 + portal.x) * 0.08;
            const raio = portal.raio * pulsa;

            ctx.save();

            ctx.globalAlpha = desbloqueado ? 0.2 : 0.07;
            ctx.fillStyle = portal.cor;
            ctx.beginPath();
            ctx.arc(portal.x, portal.y, raio * 2, 0, Math.PI * 2);
            ctx.fill();

            ctx.globalAlpha = 1;
            ctx.lineWidth = 4;
            ctx.strokeStyle = desbloqueado ? portal.cor : "#66596f";
            ctx.beginPath();
            ctx.ellipse(
                portal.x,
                portal.y,
                raio,
                raio * 1.4,
                0,
                0,
                Math.PI * 2
            );
            ctx.stroke();

            ctx.lineWidth = 2;
            ctx.globalAlpha = 0.7;
            ctx.beginPath();
            ctx.ellipse(
                portal.x,
                portal.y,
                raio * 0.65,
                raio * 1.1,
                0,
                0,
                Math.PI * 2
            );
            ctx.stroke();

            ctx.globalAlpha = 1;
            ctx.fillStyle = desbloqueado ? "#fff0fa" : "#8e8198";
            ctx.font = "bold 17px monospace";
            ctx.textAlign = "center";
            ctx.fillText(
                desbloqueado ? (visitado ? "✓" : "✦") : "×",
                portal.x,
                portal.y + 6
            );

            ctx.fillStyle = desbloqueado ? "#f4dfef" : "#9b8da5";
            ctx.font = "11px monospace";
            ctx.fillText(
                desbloqueado ? portal.fragmento : "SINAL BLOQUEADO",
                portal.x,
                portal.y + raio * 1.4 + 18
            );

            ctx.restore();
        }

function desenharCristal(cristal) {
    if (cristaisRecolhidos.has(cristal.id)) return;

    const pulsacao = 1 + Math.sin(tempo * 0.004 + cristal.id) * 0.12;
    const raio = 10 * pulsacao;

    ctx.save();
    ctx.translate(cristal.x, cristal.y);
    ctx.rotate(Math.PI / 4);

    // Aura luminosa.
    const aura = ctx.createRadialGradient(0, 0, 1, 0, 0, 25);

    aura.addColorStop(0, cristal.cor + "cc");
    aura.addColorStop(1, cristal.cor + "00");

    ctx.fillStyle = aura;
    ctx.beginPath();
    ctx.arc(0, 0, 25, 0, Math.PI * 2);
    ctx.fill();

    // Cristal em forma de diamante.
    ctx.fillStyle = cristal.cor;
    ctx.shadowColor = cristal.cor;
    ctx.shadowBlur = 18;

    ctx.beginPath();
    ctx.moveTo(0, -raio);
    ctx.lineTo(raio * 0.72, 0);
    ctx.lineTo(0, raio);
    ctx.lineTo(-raio * 0.72, 0);
    ctx.closePath();
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.strokeStyle = "#fff6ff";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.restore();

    ctx.save();
    ctx.font = "11px monospace";
    ctx.textAlign = "center";
    ctx.fillStyle = "#fff0fa";
    ctx.fillText("CRISTAL " + String(cristal.id).padStart(2, "0"),
        cristal.x, cristal.y + 25);
    ctx.restore();
}

function recolherCristaisProximos() {
    cristais.forEach(cristal => {
        if (cristaisRecolhidos.has(cristal.id)) return;

        const distancia = Math.hypot(
            jogador.x - cristal.x,
            jogador.y - cristal.y
        );

        if (distancia < jogador.raio + 13) {
            cristaisRecolhidos.add(cristal.id);
            guardarCristais();
            atualizarInventario();

            mostrarMensagem(
                "CRISTAL RECUPERADO ✨",
                `${cristal.nome}: encontraste o cristal ${cristal.id} de ${cristais.length}! Continua a tua aventura. ♡`
            );
        }
    });
}

        function desenharJogador() {
            ctx.save();

            // Aura.
            const aura = ctx.createRadialGradient(
                jogador.x, jogador.y, 1,
                jogador.x, jogador.y, 29
            );

            aura.addColorStop(0, "rgba(239, 177, 220, 0.45)");
            aura.addColorStop(1, "rgba(239, 177, 220, 0)");

            ctx.fillStyle = aura;
            ctx.beginPath();
            ctx.arc(jogador.x, jogador.y, 29, 0, Math.PI * 2);
            ctx.fill();

            // Pequena personagem espacial.
            ctx.fillStyle = "#f0c3df";
            ctx.beginPath();
            ctx.arc(jogador.x, jogador.y, jogador.raio, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = "#fff3fc";
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.fillStyle = "#30203e";
            ctx.beginPath();
            ctx.ellipse(
                jogador.x + 3,
                jogador.y - 2,
                5,
                6,
                -0.3,
                0,
                Math.PI * 2
            );
            ctx.fill();

            // Pequena mochila.
            ctx.fillStyle = "#b884c6";
            ctx.fillRect(jogador.x - 14, jogador.y - 5, 5, 10);

            ctx.restore();
        }

        function desenhar() {
            desenharFundo();

            // Caminhos entre os portais.
            ctx.save();
            ctx.setLineDash([5, 10]);
            ctx.strokeStyle = "rgba(216, 170, 223, 0.23)";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(245, 115);
            ctx.lineTo(530, 365);
            ctx.lineTo(690, 145);
            ctx.stroke();
            ctx.restore();

            desenharPlaneta(370, 110, 35, "#8866bd", "Nebulosa");
            desenharPlaneta(400, 300, 42, "#a15c91", "Lunária");
            desenharPlaneta(165, 390, 27, "#668bc6", "Azura");
            desenharPlaneta(650, 420, 22, "#d69a79", "Pequeno caos");

           
 // Portais sobre o mapa.
portais.forEach(desenharPortal);

// Cristais escondidos pelo universo.
cristais.forEach(desenharCristal);

desenharJogador();


            // Obstáculos e limites visuais.
            ctx.save();
            ctx.strokeStyle = "rgba(232, 169, 202, 0.12)";
            ctx.lineWidth = 2;
            ctx.strokeRect(8, 8, LARGURA - 16, ALTURA - 16);
            ctx.restore();

            desenharJogador();

            if (portalProximo) {
                ctx.save();
                ctx.textAlign = "center";
                ctx.font = "bold 13px monospace";
                ctx.fillStyle = "#fff0fa";
                ctx.fillText(
                    portalDesbloqueado(portalProximo)
                        ? "PRIMA E PARA INVESTIGAR"
                        : "PORTAL BLOQUEADO",
                    jogador.x,
                    jogador.y - 30
                );
                ctx.restore();
            }
        }

        function colideComObstaculo(x, y) {
            return obstaculos.some(obstaculo => {
                const dx = x - obstaculo.x;
                const dy = y - obstaculo.y;
                const distancia = Math.hypot(dx, dy);

                return distancia < jogador.raio + obstaculo.raio;
            });
        }

        function atualizarMovimento() {
            let dx = 0;
            let dy = 0;

            if (teclas.has("ArrowLeft") || teclas.has("a")) dx--;
            if (teclas.has("ArrowRight") || teclas.has("d")) dx++;
            if (teclas.has("ArrowUp") || teclas.has("w")) dy--;
            if (teclas.has("ArrowDown") || teclas.has("s")) dy++;

            // Evita que o movimento diagonal seja mais rápido.
            if (dx !== 0 && dy !== 0) {
                dx *= Math.SQRT1_2;
                dy *= Math.SQRT1_2;
            }

            const novoX = Math.max(
                jogador.raio + 10,
                Math.min(LARGURA - jogador.raio - 10,
                    jogador.x + dx * jogador.velocidade)
            );

            const novoY = Math.max(
                jogador.raio + 10,
                Math.min(ALTURA - jogador.raio - 10,
                    jogador.y + dy * jogador.velocidade)
            );

            // Verifica os eixos separadamente para contornar obstáculos.
            if (!colideComObstaculo(novoX, jogador.y)) {
                jogador.x = novoX;
            }

            if (!colideComObstaculo(jogador.x, novoY)) {
                jogador.y = novoY;
            }
recolherCristaisProximos();
            portalProximo = null;

            let menorDistancia = Infinity;

            portais.forEach(portal => {
                const distancia = Math.hypot(
                    jogador.x - portal.x,
                    jogador.y - portal.y
                );

                if (distancia < portal.raio + 25 && distancia < menorDistancia) {
                    portalProximo = portal;
                    menorDistancia = distancia;
                }
            });

            if (portalProximo) {
                estado.textContent = portalDesbloqueado(portalProximo)
                    ? "PORTAL AO ALCANCE"
                    : "PORTAL BLOQUEADO";
            } else {
                estado.textContent = "EXPLORAÇÃO ATIVA";
            }
        }

        function investigarPortal() {
            if (!aJogar) return;

            if (!portalProximo) {
                mostrarMensagem(
                    "Ainda não chegaste a um portal",
                    "Explora o mapa e aproxima-te de um dos anéis luminosos. ✨"
                );
                return;
            }

            const portal = portalProximo;

            if (!portalDesbloqueado(portal)) {
                mostrarMensagem(
                    "Acesso recusado 🔒",
                    `Falta recuperar o ${portal.fragmento}. Volta ao centro de controlo e investiga o local correspondente.`
                );
                return;
            }

            if (portaisVisitados.has(portal.id)) {
                mostrarMensagem(
                    portal.nome,
                    "Já estiveste aqui! Este portal não se esqueceu de ti. ♡"
                );
                return;
            }

            portaisVisitados.add(portal.id);
            guardarVisitas();

            mostrarMensagem(portal.nome, portal.mensagem);

            if (portaisVisitados.size === portais.length) {
                mostrarMensagem(
                    "MISSÃO CUMPRIDA ✨",
                    "Visitaste os três portais. O universo tem uma nova história para contar — e isto foi apenas o começo!"
                );
            }
        }

        function ciclo(agora) {
            if (!aJogar) return;

            const delta = ultimoTempo
                ? Math.min(agora - ultimoTempo, 40)
                : 16;

            ultimoTempo = agora;
            tempo += delta;

            // Movimento independente da frequência do ecrã.
            const velocidadeOriginal = jogador.velocidade;
            jogador.velocidade = 3 * (delta / 16.67);

            atualizarMovimento();

            jogador.velocidade = velocidadeOriginal;

            desenhar();
            animacao = window.requestAnimationFrame(ciclo);
        }

        function iniciar() {
            if (aJogar) return;

            carregarProgresso();

            aJogar = true;
            ultimoTempo = 0;
            aviso.hidden = true;
            canvas.focus({ preventScroll: true });

            mostrarMensagem(
                "Exploração iniciada 🚀",
                "Usa as setas ou WASD. Aproxima-te de um portal e prime E para o investigar."
            );

            desenhar();
            animacao = window.requestAnimationFrame(ciclo);
        }

        function parar() {
            aJogar = false;
            teclas.clear();
            window.cancelAnimationFrame(animacao);
            ultimoTempo = 0;
        }

        function reiniciar() {
            parar();

            jogador.x = 100;
            jogador.y = 250;
            portalProximo = null;
            tempo = 0;

            carregarProgresso();
            desenhar();

            mostrarMensagem(
                "Exploração reiniciada",
                "A tua personagem voltou ao início. Os fragmentos e os portais já visitados continuam guardados."
            );

            iniciar();
        }

        window.addEventListener("keydown", evento => {
            if (!aJogar) return;

            const tecla = evento.key.length === 1
                ? evento.key.toLowerCase()
                : evento.key;

            const teclasJogo = [
                "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight",
                "w", "a", "s", "d", "e"
            ];

            if (
                teclasJogo.includes(tecla) &&
                (document.activeElement === canvas ||
                 jogo.contains(document.activeElement))
            ) {
                evento.preventDefault();
            }

            if (tecla === "e" && !evento.repeat) {
                investigarPortal();
                return;
            }

            if (teclasJogo.includes(tecla)) {
                teclas.add(tecla);
            }
        });

        window.addEventListener("keyup", evento => {
            const tecla = evento.key.length === 1
                ? evento.key.toLowerCase()
                : evento.key;

            teclas.delete(tecla);
        });

        window.addEventListener("blur", () => teclas.clear());

        botaoIniciar.addEventListener("click", iniciar);
        botaoInvestigar.addEventListener("click", investigarPortal);
        botaoReiniciar.addEventListener("click", reiniciar);

        botoesMover.forEach(botao => {
            const direcoes = {
                cima: ["ArrowUp"],
                baixo: ["ArrowDown"],
                esquerda: ["ArrowLeft"],
                direita: ["ArrowRight"]
            };

            const direcao = direcoes[botao.dataset.mover];

            if (!direcao) return;

            botao.addEventListener("pointerdown", evento => {
                evento.preventDefault();

                if (!aJogar) iniciar();

                teclas.add(direcao[0]);
                botao.setPointerCapture?.(evento.pointerId);
            });

            const soltar = () => teclas.delete(direcao[0]);

            botao.addEventListener("pointerup", soltar);
            botao.addEventListener("pointercancel", soltar);
            botao.addEventListener("lostpointercapture", soltar);
        });

        // Inicializa o mapa mesmo antes de começar a jogar.
        carregarProgresso();
        desenhar();

        mostrarMensagem(
            "Bem-vindo ao universo",
            "Entra no mapa, explora os planetas e procura os portais. A aventura começa aqui. ♡"
        );
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", iniciarJogoEspacial);
    } else {
        iniciarJogoEspacial();
    }
})();

/* =========================================
   LEITOR MUSICAL — OUR LITTLE UNIVERSE
========================================= */
(() => {
    function iniciarLeitorMusical() {
        const leitor = document.getElementById("universoMusical");

        if (!leitor || leitor.dataset.inicializado === "true") return;
        leitor.dataset.inicializado = "true";

        const audio = document.getElementById("audioUniverso");
        const disco = document.getElementById("discoMusical");
        const nome = document.getElementById("nomeMusica");
        const estado = document.getElementById("estadoMusica");
        const play = document.getElementById("botaoPlayMusica");
        const anterior = document.getElementById("musicaAnterior");
        const seguinte = document.getElementById("musicaSeguinte");
        const barra = document.getElementById("barraMusica");
        const volume = document.getElementById("volumeMusica");
        const tempoAtual = document.getElementById("tempoAtual");
        const duracao = document.getElementById("duracaoMusica");
        const faixas = [...leitor.querySelectorAll("[data-faixa]")];

        if (
            !audio || !disco || !nome || !estado || !play ||
            !anterior || !seguinte || !barra || !volume ||
            !tempoAtual || !duracao || faixas.length !== 3
        ) return;

        const musicas = [
            { ficheiro: "musica.mp3", nome: "Música 01" },
            { ficheiro: "musica2.mp3", nome: "Música 02" },
            { ficheiro: "musica3.mp3", nome: "Música 03" }
        ];

        let atual = 0;

        function formatarTempo(segundos) {
            if (!Number.isFinite(segundos)) return "0:00";

            const minutos = Math.floor(segundos / 60);
            const segundosRestantes = Math.floor(segundos % 60);

            return `${minutos}:${String(segundosRestantes).padStart(2, "0")}`;
        }

        function atualizarFaixas() {
            faixas.forEach((faixa, indice) => {
                const selecionada = indice === atual;

                faixa.classList.toggle("ativa", selecionada);
                faixa.setAttribute("aria-current", selecionada ? "true" : "false");
            });
        }

        function carregarMusica(indice, reproduzir = false) {
            atual = (indice + musicas.length) % musicas.length;

            audio.src = new URL(
    `musica/${musicas[atual].ficheiro}`,
    document.baseURI
).href;
            audio.load();

            nome.textContent = musicas[atual].nome;
            estado.textContent = "Pronta para tocar ♡";
            play.textContent = "▶";
            play.setAttribute("aria-label", "Reproduzir música");
            disco.classList.remove("a-tocar");

            barra.value = 0;
            tempoAtual.textContent = "0:00";
            duracao.textContent = "0:00";

            atualizarFaixas();

            if (reproduzir) reproduzirMusica();
        }

        async function reproduzirMusica() {
            try {
                await audio.play();
            } catch {
                estado.textContent =
                    "Não foi possível reproduzir. Confirma se o ficheiro existe na pasta musicas.";
            }
        }

        play.addEventListener("click", async () => {
            if (audio.paused) {
                if (!audio.src) {
                    carregarMusica(atual);
                }

                await reproduzirMusica();
            } else {
                audio.pause();
            }
        });

        anterior.addEventListener("click", () => {
            carregarMusica(atual - 1, true);
        });

        seguinte.addEventListener("click", () => {
            carregarMusica(atual + 1, true);
        });

        faixas.forEach((faixa, indice) => {
            faixa.addEventListener("click", () => {
                carregarMusica(indice, true);
            });
        });

        audio.addEventListener("play", () => {
            play.textContent = "Ⅱ";
            play.setAttribute("aria-label", "Pausar música");
            estado.textContent = "A tocar no nosso universo ♡";
            disco.classList.add("a-tocar");
        });

        audio.addEventListener("pause", () => {
            play.textContent = "▶";
            play.setAttribute("aria-label", "Reproduzir música");
            disco.classList.remove("a-tocar");

            if (audio.ended) return;

            estado.textContent = "Música em pausa";
        });

        audio.addEventListener("loadedmetadata", () => {
            duracao.textContent = formatarTempo(audio.duration);
        });

        audio.addEventListener("timeupdate", () => {
            tempoAtual.textContent = formatarTempo(audio.currentTime);

            if (Number.isFinite(audio.duration) && audio.duration > 0) {
                barra.value = (audio.currentTime / audio.duration) * 100;
            }
        });

        barra.addEventListener("input", () => {
            if (Number.isFinite(audio.duration) && audio.duration > 0) {
                audio.currentTime = (Number(barra.value) / 100) * audio.duration;
            }
        });

        volume.addEventListener("input", () => {
            audio.volume = Number(volume.value);
        });

        audio.addEventListener("ended", () => {
            carregarMusica(atual + 1, true);
        });

        audio.addEventListener("error", () => {
            estado.textContent =
                "Não encontrei esta música. Confirma o nome e a pasta dos ficheiros.";
        });

        audio.volume = Number(volume.value);
        carregarMusica(0);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", iniciarLeitorMusical);
    } else {
        iniciarLeitorMusical();
    }
})();

/* =====================================
   CÓDIGO SECRETO — OUR LITTLE UNIVERSE
===================================== */

(function iniciarAcessoSecreto() {
    const acesso = document.getElementById("acessoSecreto");

    if (!acesso || acesso.dataset.iniciado === "sim") return;
    acesso.dataset.iniciado = "sim";

    const pontos = acesso.querySelectorAll(".ponto-codigo");
    const mensagem = document.getElementById("mensagemAcesso");
    const botaoConfirmar = document.getElementById("confirmarCodigo");

    const codigoCorreto = "2631";
    let codigoIntroduzido = "";
    let desbloqueado = false;

    function atualizarPontos() {
        pontos.forEach((ponto, indice) => {
            ponto.classList.toggle(
                "preenchido",
                indice < codigoIntroduzido.length
            );
        });
    }

    function introduzirDigito(digito) {
        if (desbloqueado || codigoIntroduzido.length >= 4) return;

        codigoIntroduzido += digito;
        atualizarPontos();

        mensagem.textContent = "Código em análise...";
        mensagem.className = "mensagem-acesso";

        if (codigoIntroduzido.length === 4) {
            setTimeout(verificarCodigo, 250);
        }
    }

    function verificarCodigo() {
        if (desbloqueado) return;

        if (codigoIntroduzido === codigoCorreto) {
            desbloqueado = true;

            mensagem.textContent = "Acesso autorizado. Bem-vindos ao vosso universo. ♡";
            mensagem.className = "mensagem-acesso sucesso";

            acesso.querySelectorAll("button").forEach(botao => {
                botao.disabled = true;
            });

            setTimeout(() => {
                acesso.classList.add("acesso-desbloqueado");

                setTimeout(() => {
                    acesso.remove();
                }, 1000);
            }, 900);
        } else {
            mensagem.textContent = "Hmm... esse não é o nosso código. Tenta outra vez. ♡";
            mensagem.className = "mensagem-acesso erro";

            acesso.querySelector(".acesso-cartao").animate(
                [
                    { transform: "translateX(0)" },
                    { transform: "translateX(-6px)" },
                    { transform: "translateX(6px)" },
                    { transform: "translateX(0)" }
                ],
                { duration: 280 }
            );

            setTimeout(() => {
                codigoIntroduzido = "";
                atualizarPontos();
                mensagem.textContent = "Apenas nós conhecemos este lugar. ♡";
                mensagem.className = "mensagem-acesso";
            }, 1100);
        }
    }

    function apagarCodigo() {
        if (desbloqueado) return;

        codigoIntroduzido = "";
        atualizarPontos();
        mensagem.textContent = "Podes tentar novamente. ♡";
        mensagem.className = "mensagem-acesso";
    }

    acesso.querySelectorAll("[data-digito]").forEach(botao => {
        botao.addEventListener("click", () => {
            introduzirDigito(botao.dataset.digito);
        });
    });

    acesso.querySelector('[data-apagar="tudo"]')
        .addEventListener("click", apagarCodigo);

    botaoConfirmar.addEventListener("click", verificarCodigo);

    document.addEventListener("keydown", evento => {
        if (desbloqueado || !document.getElementById("acessoSecreto")) return;

        if (/^[0-9]$/.test(evento.key)) {
            introduzirDigito(evento.key);
        } else if (evento.key === "Backspace") {
            codigoIntroduzido = codigoIntroduzido.slice(0, -1);
            atualizarPontos();
        } else if (evento.key === "Enter") {
            verificarCodigo();
        }
    });
})();
