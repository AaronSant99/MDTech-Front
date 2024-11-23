import { BASE_URL, eventManager } from "./utils.js";

document.addEventListener("DOMContentLoaded", async () => {
    try {

        const productId = new URLSearchParams(window.location.search).get("id");
        // Función para buscar productos a la API
        const searchProducts = eventManager(async function cargarDetalle() {

            fetch(`${BASE_URL}/Productos/${productId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            })
            .then((response) => response.json())
            .then((data) => {
                console.log("Detalles: ", data);
                document.getElementById("product-name").innerHTML = data.producto.nombre;
                document.getElementById("product-brand").innerHTML = data.producto.marca;
                document.getElementById("product-description").innerHTML = data.producto.descripcion;

                let imgs_html = "";
                data.producto.imagenes.forEach(element => {
                        imgs_html += `<div class="carousel-item active"><img class="d-block w-100" src="${element.url}" alt="First slide"></div>`;
                });
                document.getElementById("carousel-inner").innerHTML = imgs_html;


            })
            .catch((error) => {
                console.error("Error:", error);
            });
        });

        searchProducts();


    } catch (error) {
        console.error("Error al cargar los detalles del producto:", error);
    }
});
