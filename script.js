let estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || ["Tomás", "Pelusa", "Iris"];

const input = document.getElementById("ingresar");
const btnAgregar = document.getElementById("agregar");
const contenedor = document.getElementById("mostrar");

const filtro = document.getElementById("filtro");
const btnAZ = document.getElementById("ordenarAZ");
const btnZA = document.getElementById("ordenarZA");

function mostrarLista() {
    contenedor.innerHTML = "";
    const textoFiltro = filtro.value.toLowerCase();

    estudiantes
        .filter(nombre => nombre.toLowerCase().includes(textoFiltro))
        .forEach((nombre, i) => {
            const div = document.createElement("div");

            const span = document.createElement("span");
            span.textContent = nombre;

            span.style.cursor = "pointer";
            span.onclick = () => editarEstudiante(i, nombre);

            const btnBorrar = document.createElement("button");
            btnBorrar.textContent = "❌";
            btnBorrar.style.marginLeft = "10px";
            btnBorrar.onclick = () => {
                estudiantes.splice(i, 1);
                guardar();
                mostrarLista();
            };

            div.appendChild(span);
            div.appendChild(btnBorrar);
            contenedor.appendChild(div);
        });
}

function editarEstudiante(i, nombre) {
    const div = document.createElement("div");

    const inputEdit = document.createElement("input");
    inputEdit.type = "text";
    inputEdit.value = nombre;

    const btnGuardar = document.createElement("button");
    btnGuardar.textContent = "💾";
    btnGuardar.style.marginLeft = "10px";

    btnGuardar.onclick = () => {
        const nuevoNombre = inputEdit.value.trim();
        if (nuevoNombre !== "") {
            estudiantes[i] = nuevoNombre;
            guardar();
            mostrarLista();
        }
    };

    div.appendChild(inputEdit);
    div.appendChild(btnGuardar);
    
    contenedor.children[i].replaceWith(div);
}

function guardar() {
    localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
}

btnAgregar.addEventListener("click", () => {
    const nombre = input.value.trim();
    if (nombre === "") return;
    estudiantes.push(nombre);
    guardar();
    mostrarLista();
    input.value = "";
});

filtro.addEventListener("input", mostrarLista);

btnAZ.addEventListener("click", () => {
    estudiantes.sort((a, b) => a.localeCompare(b));
    guardar();
    mostrarLista();
});

btnZA.addEventListener("click", () => {
    estudiantes.sort((a, b) => b.localeCompare(a));
    guardar();
    mostrarLista();
});

mostrarLista();
