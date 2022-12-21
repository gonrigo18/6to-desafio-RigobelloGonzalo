const productsApi = {
    get: () => {
        return fetch('/products')
            .then(data => data.json())
    }
}

const cartApi = {
    createCart: () => {
        const options = { method: "POST"}
        return fetch('/cart', options)
            .then(data => data.json())
    },
    getIds: () => {
        return fetch('/cart')
            .then(data => data.json())
    },
    postProd: (idCart, idProd) => {
        const data = { id: idProd }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }
        return fetch(`cart/${idCart}/products`, options)
    },
    getProds: idCart => {
        return fetch(`cart/${idCart}/products`)
            .then(data => data.json())
    },
    deleteProd: (idCart, idProduct) => {
        const options = {
            method: 'DELETE',
        }
        return fetch(`cart/${idCart}/products/${idProduct}`, options)
    }
}

loadComboProducts()

loadComboCart()

document.getElementById('btnAddToCart').addEventListener('click', () => {
    const idCart = document.getElementById('comboCart').value
    const idProd = document.getElementById('comboProducts').value
    if (idCart && idProd) {
        addToCart(idCart, idProd)
    } else {
        alert('Debe seleccionar un carrito y un producto')
    }
})

document.getElementById('btnCreateCart').addEventListener('click', () => {
    cartApi.createCart()
        .then(({ id }) => {
            loadComboCart().then(() => {
                const combo = document.getElementById('comboCart')
                combo.value = `${id}`
                combo.dispatchEvent(new Event('change'));
            })
        })
})

document.getElementById('comboCart').addEventListener('change', () => {
    const idCart = document.getElementById('comboCart').value
    updateCartList(idCart)
})

function addToCart(idCart, idProduct) {
    return cartApi.postProd(idCart, idProduct).then(() => {
        updateCartList(idCart)
    })
}

function deleteProd(idProduct) {
    const idCart = document.getElementById('comboCart').value
    return cartApi.deleteProd(idCart, idProduct).then(() => {
        updateCartList(idCart)
    })
}

function updateCartList(idCart) {
    return cartApi.getProds(idCart)
        .then(prods => makeHtmlTable(prods))
        .then(html => {
            document.getElementById('cart').innerHTML = html
        })
}

function makeHtmlTable(products) {
    let html = `
        <style>
            .table td,
            .table th {
                vertical-align: middle;
            }
        </style>`

    if (productos.length > 0) {
        html += `
        <h2>Lista de Productos</h2>
        <div class="table-responsive">
            <table class="table table-dark">
                <tr>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Foto</th>
                    <th>Categoria</th>
                </tr>`
        for (const prod of products) {
            html += `
                    <tr>
                    <td>${prod.title}</td>
                    <td>$${prod.price}</td>
                    <td><img width="50" src=${prod.thumbnail} alt="not found"></td>
                    <td>$${prod.category}</td>
                    <td><a type="button" onclick="quitarDelCarrito('${prod.id}')">borrar</a></td>
                    </tr>`
        }
        html += `
            </table>
        </div >`
    } else {
        html += `<br><h4>carrito sin productos</h2>`
    }
    return Promise.resolve(html)
}

function createMenu(leyend) {
    const defaultItem = document.createElement("option")
    defaultItem.value = ''
    defaultItem.text = leyend
    defaultItem.hidden = true
    defaultItem.disabled = true
    defaultItem.selected = true
    return defaultItem
}

function loadComboProducts() {
    return productsApi.get()
        .then(products => {
            const combo = document.getElementById('comboProducts');
            combo.appendChild(createMenu('elija un producto'))
            for (const prod of products) {
                const comboItem = document.createElement("option");
                comboItem.value = prod.id;
                comboItem.text = prod.title;
                combo.appendChild(comboItem);
            }
        })
}

function deleteCombo(combo) {
    while (combo.childElementCount > 0) {
        combo.remove(0)
    }
}

function loadComboCart() {
    return cartApi.getIds()
        .then(ids => {
            const combo = document.getElementById('comboCart');
            deleteCombo(combo)
            combo.appendChild(createMenu('elija un carrito'))
            for (const id of ids) {
                const comboItem = document.createElement("option");
                comboItem.value = id;
                comboItem.text = id;
                combo.appendChild(comboItem);
            }
        })
}