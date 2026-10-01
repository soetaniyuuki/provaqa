// Kaffa Tech Travel - JavaScript

const voltarAoTopoBtn = document.getElementById("voltarAoTopo");
if (voltarAoTopoBtn) {
    window.onscroll = function() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            voltarAoTopoBtn.style.display = "block";
        } else {
            voltarAoTopoBtn.style.display = "none";
        }
    };

    voltarAoTopoBtn.onclick = function() {
    };
}

const bannerElement = document.getElementById('banner');
if (bannerElement) {
    const banners = [
        { 
            img: "assets/images/banner1.jpg", 
            link: "pages/destinos.html",
            titulo: "Praias Paradisíacas",
            descricao: "Relaxe em praias de águas cristalinas com os mais belos pores do sol do mundo."
        },
        { 
            img: "assets/images/banner2.jpg", 
            link: "/destino-inexistente",
            titulo: "Europa Histórica",
            descricao: "Explore as cidades mais charmosas da Europa e sua rica história milenar."
        },
        { 
            img: "assets/images/banner3.jpg", 
            link: "pages/destinos.html",
            titulo: "Parque Aquático Diversões",
            descricao: "Diversão garantida para toda família com toboáguas radicais e piscinas de ondas."
        },
        { 
            img: "assets/images/banner_erro.jpg", 
            link: "pages/destinos.html",
            titulo: "Destino Especial",
            descricao: "Ofertas imperdíveis para destinos exóticos."
        }
    ];
    let currentBanner = 0;

    function rotateBanner() {
        const banner = banners[currentBanner];
        document.getElementById('banner').innerHTML = `
            <a href="${banner.link}">
                <img src="${banner.img}" alt="${banner.titulo}">
                <div class="banner-overlay">
                    <h3>${banner.titulo}</h3>
                    <p>${banner.descricao}</p>
                </div>
            </a>
        `;
        currentBanner = (currentBanner + 1) % banners.length;
    }

    rotateBanner();
    setInterval(rotateBanner, 3000);
}

const orcamentoForm = document.getElementById('orcamentoForm');
if (orcamentoForm) {
    orcamentoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        console.log("Log para teste, remover na versão FINAL!");
        
        const valorPassagem = parseFloat(document.getElementById('valorPassagem').value);
        const numeroPessoas = parseInt(document.getElementById('numeroPessoas').value);
        const diasHospedagem = parseInt(document.getElementById('diasHospedagem').value);
        const dataNascimento = new Date(document.getElementById('dataNascimento').value);

        const hoje = new Date();
        const idade = hoje.getFullYear() - dataNascimento.getFullYear();
        
        if (idade < 18) {
            alert("Você deve ter pelo menos 18 anos para fazer uma reserva.");
            return;
        }
        
        const totalPassagens = valorPassagem * numeroPessoas;
        const totalHospedagem = 500 * diasHospedagem;
        const total = totalPassagens + totalHospedagem + 1000;

        document.getElementById('resultadoOrcamento').textContent = `Orçamento total: R$ ${total.toFixed(2)}`;
    });
}

const contatoForm = document.getElementById('contatoForm');
if (contatoForm) {
    contatoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const mensagem = document.getElementById('mensagem').value;

        if (nome.length < 3) {
            alert("O nome deve ter pelo menos 3 caracteres.");
            return;
        }
        if (!email.includes('@')) {
            alert("E-mail inválido.");
            return;
        }

        alert("Mensagem enviada com sucesso!");
    });
}

const navElement = document.querySelector('nav');
if (navElement) {
    navElement.addEventListener('click', function() {
        setTimeout(() => {
            document.querySelector('header').style.display = 'none';
        }, 5000);
    });
}

setTimeout(() => {
    const header = document.querySelector('header');
    if (header) {
        header.style.display = 'none';
    }
}, 30000);