document.addEventListener("DOMContentLoaded",() => {

    const renderizarProductos = () => {

        let carrito = JSON.parse(localStorage.getItem("carrito")) || [] 
        productosEnCarrito(carrito)

        let seccionProductos = document.getElementById("contenedor-carrito")

        seccionProductos.innerHTML = ""


        if(!carrito.length){
            let mensajeCarrito = document.createElement("p")
            mensajeCarrito.classList.add("mensaje-carrito")
            mensajeCarrito.textContent = "no hay productos en el carrito "
            seccionProductos.appendChild(mensajeCarrito)
        }

        else{
            carrito.forEach((element,index) => {
                let tarjetaProducto = document.createElement("article")
                tarjetaProducto.classList.add("producto-carrito")

                let imagenProducto = document.createElement("img")
                imagenProducto.src = element.images[0]

                let tituloProducto = document.createElement("h3")
                tituloProducto.textContent =  element.title 

                let precioProducto = document.createElement("p")
                precioProducto.textContent = `$ ${element.price}`


                let botonEliminar  = document.createElement("button")
                botonEliminar.classList.add("boton-eliminar-carrito")
                botonEliminar.textContent = "Eliminar"

                botonEliminar.addEventListener("click", () => {

                    eliminarProducto(index)
                })

                tarjetaProducto.appendChild(imagenProducto)
                tarjetaProducto.appendChild(tituloProducto)
                tarjetaProducto.appendChild(precioProducto)
                tarjetaProducto.appendChild(botonEliminar)

                seccionProductos.appendChild(tarjetaProducto)

            });

       }
       renderizarBotons()   
    }

    const renderizarBotons = () => {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [] 
        let acciones = document.getElementById("acciones-carrito")

        acciones.innerHTML = ""

        if(carrito.length){

            let botonVaciar = document.createElement("button")
            botonVaciar.textContent = "Vaciar el carrito"

            botonVaciar.addEventListener("click", () =>{ 
                vaciarCarrito()
            })

            let botonFinalizar   = document.createElement("button")
            botonFinalizar.textContent = "Finaliza tu compra"

            botonFinalizar.addEventListener("click",() => {
                let confirmado = confirm("¿desea finalizar la compra?")

                if(confirmado){
                    alert("gracias por comprar un nuestra pagina")
                    localStorage.removeItem("carrito")
                    window.location.href = "../index.html"
                }
            })

            acciones.appendChild(botonVaciar)
            acciones.appendChild(botonFinalizar)
            
        }
    }


    const  productosEnCarrito = (carrito) => {
        let contadorCarrito = document.getElementById("contador-carrito")
        contadorCarrito.textContent = carrito.length
    }

    const eliminarProducto = (indice) => {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [] 

        carrito.splice(indice,1)

        localStorage.setItem("carrito",JSON.stringify(carrito))
        alert("eliminado")
        renderizarProductos()
    }

    const vaciarCarrito = () => {
        localStorage.removeItem("carrito")
        alert("vaciando carrito")
        renderizarProductos()
    }

    renderizarProductos()
})