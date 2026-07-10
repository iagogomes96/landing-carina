// ==========================================================================
// 1. CONFIGURAÇÕES GERAIS DO SITE (O JSON que você pediu)
// Alterar os dados aqui reflete automaticamente no site inteiro
// ==========================================================================
const siteConfig = {
    telefoneVisor: "(11) 98175-7939",
    whatsappLink: "https://wa.me/5511981757939",
    mensagemWhatsapp: "Olá! Acessei o seu site e gostaria de agendar uma consulta.",
    instagramLink: "https://instagram.com/espirita_carina", // Adicionado link do Instagram
    enderecoLinha1: "Rua Princesa Isabel, 528 - Brooklin Paulista, São Paulo - SP",
    enderecoCep: "CEP: 04601-001",
    mapaSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.2417772421894!2d-46.68598858448981!3d-23.6334654687593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce50a9829cd1bb%3A0x6b10292bf1727715!2sR.%20Princesa%20Isabel%2C%20528%20-%20Brooklin%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2004601-001!5e0!3m2!1spt-BR!2sbr!4v1689255000000!5m2!1spt-BR!2sbr",

    // IDs dos Vídeos do YouTube (Pegue a sopa de letras após o v= ou /embed/)
    videosDepoimentos: [
        "eZzmso11vxM", // Vídeo 1
        "qO8hYxBs0Fw", // Vídeo 2
        "XPvKMyimo18"  // Vídeo 3
    ]
};

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    if (window.scrollY > 50) { header.classList.add('header-scrolled'); }
    else { header.classList.remove('header-scrolled'); }
});

// ==========================================================================
// 2. INJETOR DE DADOS
// ==========================================================================
function carregarConfiguracoes() {
    // Textos Simples
    document.getElementById('txt-telefone').textContent = siteConfig.telefoneVisor;
    document.getElementById('txt-endereco').innerHTML = `<p>${siteConfig.enderecoLinha1}</p><p>${siteConfig.enderecoCep}</p>`;
    document.getElementById('txt-ano').textContent = new Date().getFullYear();

    // Links
    // Constrói a URL do WhatsApp com a mensagem encodada para a web
    const mensagemCodificada = encodeURIComponent(siteConfig.mensagemWhatsapp);
    const linkWhatsappComMensagem = `${siteConfig.whatsappLink}?text=${mensagemCodificada}`;

    document.getElementById('link-whatsapp').href = linkWhatsappComMensagem;
    document.getElementById('iframe-mapa').src = siteConfig.mapaSrc;
    
    // Link do Instagram (Verifica se existe antes de tentar alterar)
    const linkInsta = document.getElementById('link-instagram-sobre');
    if (linkInsta) {
        linkInsta.href = siteConfig.instagramLink;
    }
    
    const linkInstaFooter = document.getElementById('link-instagram-footer');
    if (linkInstaFooter) {
        linkInstaFooter.href = siteConfig.instagramLink;
    }
    
    const linkWhatsappFooter = document.getElementById('link-whatsapp-footer');
    if (linkWhatsappFooter) {
        linkWhatsappFooter.href = linkWhatsappComMensagem;
    }

    // Construir Grade de Vídeos com delay em cascata
    const gridVideos = document.getElementById('grid-videos-dinamico');
    let htmlVideos = '';

    siteConfig.videosDepoimentos.forEach((videoId, index) => {
        const delayCascata = (index + 1) * 0.2;
        htmlVideos += `
            <div class="video-container revelar" style="transition-delay: ${delayCascata}s;">
                <iframe src="https://www.youtube.com/embed/${videoId}?rel=0" title="Depoimento Cliente ${index + 1}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        `;
    });
    gridVideos.innerHTML = htmlVideos;
}

// ==========================================================================
// 3. INTERAÇÕES DE UX (Scroll Spy e Auto-fechar Menu)
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

// Scroll Spy (Marca de amarelo o menu ativo)
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    linksMenu.forEach(link => {
        link.classList.remove('ativo');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('ativo');
        }
    });
});

// ==========================================================================
// 4. OBSERVERS (Animação de Revelar Seções)
// ==========================================================================
const observarElementos = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('ativo');
                // Optional: parar de observar após revelar (para não repetir ao subir)
                // observer.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.1 }); // Dispara quando 10% do item aparece

    // Observar todos os elementos que tem a classe 'revelar' (inclusive os vídeos criados no passo 2)
    document.querySelectorAll('.revelar').forEach((el) => {
        observer.observe(el);
    });
};

// ==========================================================================
// INICIALIZAÇÃO
// ==========================================================================
window.onload = () => {
    carregarConfiguracoes(); // 1. Injeta os dados do JSON
    setTimeout(observarElementos, 100); // 2. Atrasa um pouquinho o observer pra garantir que o HTML dos vídeos foi injetado
};