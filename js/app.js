document.addEventListener("DOMContentLoaded",()=>{
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const rendirizoProductos = () => {

        url = "https://dummyjson.com/products?limit=14"

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                let contenedorProductos = document.getElementById("contenedor-de-productos")

                for( const product of data.products){

                    let tarjetaProducto = document.createElement("article");
                    tarjetaProducto.classList.add("tarjeta-producto");

                    let imagenProducto  = document.createElement("img");
                    imagenProducto.classList.add("titulo-producto");
                    imagenProducto.src = product.images[0]
                    imagenProducto.alt = product.description

                    let tituloProducto  = document.createElement("h3")
                    tituloProducto.classList.add("titulo-producto")
                    tituloProducto.textContent = product.title

                    let precioProducto  = document.createElement("p")
                    precioProducto.textContent =  `$ ${product.price}`  

                    let botonAgregador  = document.createElement("button")
                    botonAgregador.textContent =  "agregar" 
                    
                    botonAgregador.addEventListener("click",() => {
                        alert(`${product.title} fue agregado al carrito `)
                        agregarProductos(product)
                        actualizarProductos()
                    })

                    tarjetaProducto.appendChild(imagenProducto)
                    tarjetaProducto.appendChild(tituloProducto)
                    tarjetaProducto.appendChild(precioProducto)
                    tarjetaProducto.appendChild(botonAgregador)

                    contenedorProductos.appendChild(tarjetaProducto)
                }
            } )
            .catch((err) => console.error("el error fue ", err))

    }



    const agregarProductos = (producto) => {
        carrito.push(producto)
        localStorage.setItem("carrito", JSON.stringify(carrito))
    }

    const actualizarProductos = () => {
        const contadorCarrito = document.getElementById("contador-carrito")
        contadorCarrito.textContent = carrito.length
    }

    rendirizoProductos()
    actualizarProductos()

})