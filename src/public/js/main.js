const socket = io()

const delID = document.getElementById("delID")
const delSubmit = document.getElementById("delSubmit")

delSubmit.addEventListener("click", (e)=> {
    e.preventDefault();
    const delIDVal = document.getElementById("delID").value
    if(delIDVal.trim().length >0){
        Swal.fire({
            icon: 'success',
            title: 'Producto eliminado',
            showConfirmButton: true,
            timer: 2000
        })
        socket.emit("delItem", parseInt(delIDVal))
    }
    }
)

const addSubmit = document.getElementById("addSubmit")

addSubmit.addEventListener("click", (e)=> {
    e.preventDefault();
    const addTitleVal = document.getElementById("addProdTitle").value
    const addDescVal = document.getElementById("addProdDesc").value
    const addPriceVal = document.getElementById("addProdPrice").value
    const addCodeVal = document.getElementById("addProdCode").value
    const addStockVal = document.getElementById("addProdStock").value
    const addStatusVal = true
    const addCatVal = document.getElementById("addProdCat").value
    const addThumbVal = document.getElementById("addProdThumb").value
    const addedItem = {
        title:addTitleVal, 
        description:addDescVal, 
        price:addPriceVal, 
        code: addCodeVal,
        stock:addStockVal,
        status: addStatusVal,
        category: addCatVal,
        thumbnail: addThumbVal
    }
        

    socket.emit("addItem", addedItem) 
    }
)
    
socket.on("mssgAddProd", async mssg => {
    await Swal.fire({
        icon: 'success',
        title: `El producto fue agregado correctamente!`,
        showConfirmButton: true,
    })
    
})

socket.on("mssgDelProd", async mssg => {
        await Swal.fire({
            icon: 'success',
            title: 'El producto fue eliminado',
            showConfirmButton: true,
        })
    
})

socket.on("getProds", products => {
    const prodsRender = document.getElementById("prodsRender")
    prodsRender.innerHTML=""
    console.log(products)
    products.forEach(product => {
        prodsRender.innerHTML += 
        `
        <div>
        <h4>${product.title}</h4>
        <img src="${product.thumbnail}">
        <p>ID: ${product.id}</p>
        <p>Código: ${product.code}</p>
        <p>${product.description}</p>
        <p>Categoría: ${product.category}</p>
        <p>Stock disponible: ${product.stock} unidades</p>
        <h4>Precio: $ ${product.price}</h4>
        <div>
        `
    })
})

const mssgSubmit = document.getElementById("mssgSubmit")
const mssgUser = document.getElementById("mssgUser")
const mssgBody = document.getElementById("mssgBody")
const allMessages = document.getElementById("allMessages")

mssgSubmit.addEventListener("click", () => {
    
    if(mssgBody.value.trim().length > 0) {
        socket.emit("message", {user: mssgUser, message: mssgBody.value})
        mssgBody.value = "" 
    }
})

socket.on("allMessages", mssgArray => {
    mssgArray.innerHTML = ""
    mssgArray.forEach(mssg => {
        allMessages.innerHTML += `<p>${mssg.user} : ${mssg.message} </p>`
    });
})
