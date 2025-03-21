const frm = document.querySelector("form");
const result = document.getElementById("resultado");
import Fuse from "fuse.js";
import Dados from "../API/dados.json"

const Options = {
    includeScore: true,
    threshold: 0.3,
    keys: [
        "titulo",
        "categoria"
    ]
}

frm.addEventListener("submit", (e) => {
    e.preventDefault();

    result.innerHTML = "";

    const campoSearch = document.getElementById("inSearch").value.trim();

    pesquisarDados(campoSearch);
    frm.reset();
})

function pesquisarDados(pesquisar) {
    const fuse = new Fuse(Dados, Options);
    const pesq = fuse.search(pesquisar);


    pesq.map(item => {
        const { titulo, link } = item.item;

        const liResult = document.createElement("li");
        const linkResult = document.createElement("a");

        liResult.style.padding = "10px 0";
        liResult.style.listStyleType = "none";
        linkResult.href = link;
        linkResult.textContent = titulo;
        linkResult.style.textDecoration = "none";
        linkResult.style.color = "#000000";

        result.appendChild(liResult);
        liResult.appendChild(linkResult);
    })

    result.style.display = "block";
}

window.addEventListener("click", (e) => {
    if (!document.querySelector(".top").contains(e.target)) {
        result.style.display = "none"
    }
})
