// ==========================================================================
// 1. CONFIGURAÇÕES GERAIS DO SITE
// ==========================================================================
const siteConfig = {
    telefoneVisor: "(11) 97583-7636",
    whatsappLink: "https://wa.me/5511975837636",
    mensagemWhatsapp: "Olá! Acessei o seu site e gostaria de agendar uma consulta.",
    instagramLink: "https://instagram.com/espirita_carina", 
    enderecoLinha1: "Rua Princesa Isabel, 528 - Brooklin Paulista, São Paulo - SP",
    enderecoCep: "CEP: 04601-001",
    mapaSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.2417772421894!2d-46.68598858448981!3d-23.6334654687593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce50a9829cd1bb%3A0x6b10292bf1727715!2sR.%20Princesa%20Isabel%2C%20528%20-%20Brooklin%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2004601-001!5e0!3m2!1spt-BR!2sbr!4v1689255000000!5m2!1spt-BR!2sbr",

    videosDepoimentos: [
        "eZzmso11vxM", 
        "qO8hYxBs0Fw", 
        "XPvKMyimo18"  
    ],

    // Imagens para o carrossel
    galeriaImagens: [
        "src/img/carrossel/carina-1.webp",
        "src/img/carrossel/carina-2.webp",
        "src/img/carrossel/carina-3.webp",
        "src/img/carrossel/carina-4.webp",
        "src/img/carrossel/carina-5.webp",
        "src/img/carrossel/carina-6.webp",
        "src/img/carrossel/carina-7.webp",
        "src/img/carrossel/carina-8.webp",
        "src/img/carrossel/carina-9.webp",
        "src/img/carrossel/carina-10.webp"
    ]
};

// ==========================================================================
// HEADER SCROLL EFFECT
// ==========================================================================
window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    if (window.scrollY > 100) { 
        header.classList.add('header-scrolled'); 
    } else { 
        header.classList.remove('header-scrolled'); 
    }
});

// ==========================================================================
// 2. INJETOR DE DADOS (DOM)
// ==========================================================================
function carregarConfiguracoes() {
    document.getElementById('txt-telefone').textContent = siteConfig.telefoneVisor;
    document.getElementById('txt-endereco').innerHTML = `<p>${siteConfig.enderecoLinha1}</p><p>${siteConfig.enderecoCep}</p>`;
    document.getElementById('txt-ano').textContent = new Date().getFullYear();

    const mensagemCodificada = encodeURIComponent(siteConfig.mensagemWhatsapp);
    const linkWhatsappComMensagem = `${siteConfig.whatsappLink}?text=${mensagemCodificada}`;

    document.getElementById('link-whatsapp').href = linkWhatsappComMensagem;
    document.getElementById('iframe-mapa').src = siteConfig.mapaSrc;
    
    const linkInsta = document.getElementById('link-instagram-sobre');
    if (linkInsta) linkInsta.href = siteConfig.instagramLink;
    
    const linkInstaFooter = document.getElementById('link-instagram-footer');
    if (linkInstaFooter) linkInstaFooter.href = siteConfig.instagramLink;
    
    const linkWhatsappFooter = document.getElementById('link-whatsapp-footer');
    if (linkWhatsappFooter) linkWhatsappFooter.href = linkWhatsappComMensagem;

    /* ---> CARREGAR DEPOIMENTOS <--- */
    const gridVideos = document.getElementById('grid-videos-dinamico');
    let htmlVideos = '';
    siteConfig.videosDepoimentos.forEach((videoId, index) => {
        const delayCascata = (index + 1) * 0.2;
        htmlVideos += `
            <div class="video-container revelar" style="transition-delay: ${delayCascata}s;">
                <iframe src="https://www.youtube-nocookie.com/embed/${videoId}?rel=0" title="Depoimento Cliente ${index + 1}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        `;
    });
    gridVideos.innerHTML = htmlVideos;

    /* ---> CARREGAR GALERIA DE FOTOS (COM LOOP) <--- */
    const trackGaleria = document.getElementById('carousel-track');
    let htmlGaleria = '';
    siteConfig.galeriaImagens.forEach((url, i) => {
        // Aplica o lazy loading apenas nas imagens mais distantes
        const atributoLoading = i > 3 ? 'loading="lazy"' : '';
        
        htmlGaleria += `
            <div class="carousel-item" onclick="interagirGaleria('${url}')">
                <img src="${url}" alt="Foto Galeria ${i+1}" ${atributoLoading} decoding="async">
            </div>
        `;
    });
    trackGaleria.innerHTML = htmlGaleria + htmlGaleria;
}

// ==========================================================================
// MÓDULO DA GALERIA: LIGHTBOX E PAUSE
// ==========================================================================
const modalGaleria = document.getElementById('modal-galeria');
const imgModal = document.getElementById('img-modal-galeria');
const trackGaleria = document.getElementById('carousel-track');

function interagirGaleria(url) {
    // Agora, o clique na foto abre o modal e pausa o fundo em qualquer dispositivo
    imgModal.src = url;
    modalGaleria.classList.add('mostrar');
    trackGaleria.classList.add('paused');
}

document.getElementById('btn-fechar-modal').addEventListener('click', fecharModal);

modalGaleria.addEventListener('click', (e) => {
    if (e.target === modalGaleria) {
        fecharModal();
    }
});

function fecharModal() {
    modalGaleria.classList.remove('mostrar');
    trackGaleria.classList.remove('paused');
}

// ==========================================================================
// 3. INTERAÇÕES DE UX (Scroll Spy via Observer e Auto-fechar Menu)
// ==========================================================================
const menuToggle = document.getElementById('menu-toggle');
const linksMenu = document.querySelectorAll('.link-menu');
const sections = document.querySelectorAll('section');

// Auto-fechar menu no mobile
linksMenu.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.checked = false;
    });
});

// NOVO SCROLL SPY: Sem reflow forçado, ultra performático para mobile
const opçõesSpy = {
    rootMargin: '-30% 0px -60% 0px' // Ativa o link quando a seção ocupa o centro da tela
};

const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const idSecao = entry.target.getAttribute('id');
            linksMenu.forEach(link => {
                link.classList.remove('ativo');
                if (link.getAttribute('href') === `#${idSecao}`) {
                    link.add('ativo');
                }
            });
        }
    });
}, opçõesSpy);

// Vincula o observador às seções
sections.forEach(section => spyObserver.observe(section));

// ==========================================================================
// 4. OBSERVERS
// ==========================================================================
const observarElementos = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('ativo');
            }
        });
    }, { threshold: 0.1 }); 

    document.querySelectorAll('.revelar').forEach((el) => {
        observer.observe(el);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    carregarConfiguracoes();
    setTimeout(observarElementos, 100);
});