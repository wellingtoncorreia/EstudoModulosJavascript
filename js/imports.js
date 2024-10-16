// a primeira promessa carrega os dados a segunda promessa exibe os dados.
export function carregarComponente(id, url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
        })
        .catch(error => console.error(`Erro ao carregar o componente ${url}: `, error));
}

carregarComponente('header', '/componentes/navbar.html');
carregarComponente('footer', '/componentes/footer.html');
