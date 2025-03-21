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
    const campoSearch = document.getElementById("inSearch").value.trim();

    pesquisarDados(campoSearch);
    frm.reset();
})

function pesquisarDados(pesquisar) {
    const fuse = new Fuse(Dados, Options);
    const pesq = fuse.search(pesquisar);

    let receitasResult = "";

    pesq.map(item => {
        const { titulo, link } = item.item;

        receitasResult += `<li><a href=${link}>${titulo}</a></li>`
    })

    result.innerHTML = receitasResult;
    result.style.display = "block"
}

window.addEventListener("click", (e) => {
    if (!document.querySelector(".top").contains(e.target)) {
        result.style.display = "none"
    }
})
