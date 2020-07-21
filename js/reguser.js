// funcion para captrar el id de un elemento
const id = x => document.getElementById(x);

const formUI = id("form-reg");

const Est = id("est"); // capturamos la etiqueta tbody para insertar los datos

let registroDB = []; // declaramos un array vacio.

// esta funcion s utiliza para crear un objeto de los datos del formulario
const createReg = (a, b, c, d, e = "") => {
    if (e) {
        const item = {
            Nombre: a,
            Matricula: b,
            Edad: c,
            Nota: d,
        }

        registroDB.splice(e, 1, item);

        return item;
    } else {
        const item = {
            Nombre: a,
            Matricula: b,
            Edad: c,
            Nota: d
        }

        registroDB.push(item);

        return item;
    }
}

// esta funcion es para guardar en el localstorage
const guardarDB = () => {
    localStorage.setItem("Estudiantes", JSON.stringify(registroDB));
    showTable();
}

// Esta funcion es para modificar el contenido
const editarDB = data => {
    let indexReg = registroDB.findIndex(el => el.Matricula === data);
    let Nombre = id("name").value = registroDB[indexReg].Nombre,
        Matricla = id("matricula").value = registroDB[indexReg].Matricula,
        Edad = id("edad").value = registroDB[indexReg].Edad,
        Nota = id("calificacion").value = registroDB[indexReg].Nota;

    const input = document.createElement("input"),
        atInput = input.setAttribute("type", "hidden"),
        idInput = input.setAttribute("id", "vIndex"),
        atInput2 = input.setAttribute("value", indexReg);

    formUI.appendChild(input);

    document.querySelector(".btn-registrar").setAttribute("id", "btn-guardar");
}

// esta funcion es para eliminar contenidos
const eliminarDB = dato => {
    // console.log(dato);
    let indexReg;
    registroDB.forEach((elem, index) => {
        if (elem.Nombre === dato) {
            indexReg = index;
        }
    });

    registroDB.splice(indexReg, 1);
    guardarDB();
}

// esta funcion se utiliza para cargar los datos en la tabla
const showTable = () => {
    Est.innerHTML = "";
    registroDB = JSON.parse(localStorage.getItem("Estudiantes"));
    // console.log(registroDB);
    if (registroDB === null || registroDB.length === 0) {
        registroDB = [];
        Est.innerHTML = `
                  <tr>
                     <td colspan="5">No hay datos</td>                     
                  </tr>
               `;
    } else {
        registroDB.forEach(el => {
            Est.innerHTML += `
                  <tr>
                     <td>${el.Nombre}</td>
                     <td>${el.Matricula}</td>
                     <td>${el.Edad}</td>
                     <td>${el.Nota}</td>
                     <td>
                        <a class="btn-editar" href="${el.Matricula}">Editar</a>
                        <a class="btn-eliminar" href="${el.Nombre}">Eliminar</a>
                  </tr>
               `;
        });
    }
}

// capturamos el evento submit para procesar los datos del formulario
formUI.addEventListener("submit", e => {
    e.preventDefault();

    const n = id("name"),
        m = id("matricula"),
        ed = id("edad"),
        no = id("calificacion");


    if (n.value !== "" || m.value !== "" || ed.value !== "" || no.value !== "") {
        createReg(n.value, m.value, ed.value, no.value);
        guardarDB();
        showTable();
        const message = id("message").innerHTML = "Datos Guardados";
        formUI.reset();
        setTimeout(() => {
            const message = id("message").innerHTML = "";
        }, 4000);
    } else {
        const message = id("message").innerHTML = "Debes llenar los campos";
        setTimeout(() => {
            const message = id("message").innerHTML = "";
        }, 4000);
    }
});

// este evento es para cargar los datos en la tabla despues que cargue la pagina
document.addEventListener("DOMContentLoaded", showTable);

// Se captura el evento click de los botones editar y eliminar de la tabla
Est.addEventListener("click", (e) => {
    if (e.target.matches(".btn-editar")) {
        e.preventDefault();
        editarDB(e.target.attributes[1].nodeValue);
    }

    if (e.target.matches(".btn-eliminar")) {
        e.preventDefault();
        eliminarDB(e.target.attributes[1].nodeValue)
    }
});

// se captura el evento click del id del boton registro para actualizar los datos
formUI.addEventListener("click", e => {
    if (e.target.matches("#btn-guardar")) {
        e.preventDefault()
        const n = id("name"),
            m = id("matricula"),
            ed = id("edad"),
            no = id("calificacion"),
            vi = id("vIndex");

        if (n.value !== "" || m.value !== "" || ed.value !== "" || no.value !== "") {
            createReg(n.value, m.value, ed.value, no.value, vi.value);
            guardarDB();
            showTable();
            formUI.removeChild(vi);
            formUI.reset();
            document.querySelector(".btn-registrar").removeAttribute("id", "btn-guardar");
            const message = id("message").innerHTML = "Datos Actualizados";
            setTimeout(() => {
                const message = id("message").innerHTML = "";
            }, 4000);

        }
    }
});
