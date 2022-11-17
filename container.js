const { promises: fs } = require('fs')

class Container {

    constructor(route) {
        this.route = route
    }

    async getAll() {
        try {
            const content = JSON.parse(await fs.readFile(`./products.txt`, 'utf-8'))
            return content
        } catch (err) {
            console.log(err)
            return []
        }
    }
    async deleteAll() {
        try {
            await fs.unlink(`./products.txt`)
            console.log("Archive deleted successfully")
        } catch (err) {
            console.log(err)
        }
    }
    async deleteById(id) {
        try {
            const content = await this.getAll()
            const filter = content.filter(e => e.id !== id)
            await fs.writeFile(`./products.txt`, JSON.stringify(filter, null, 2))
            return "Successfully deleted"
        } catch (err) {
            console.log(err)
        }
    }

    async getById(id) {
        try {
            const content = JSON.parse(await fs.readFile(`./products.txt`, 'utf-8'))
            const find = content.find(e => e.id === id)
            return find
        }
        catch (err) {
            console.log(err)
        }
    }

    async save(product) {
        try {
            const products = await this.getAll();
            if (products.length == 0) {
                const firstProduct = { id: 1, title: product.title, price: product.price, thumbnail: product.thumbnail }
                await products.push(firstProduct)
                await fs.writeFile(`./products.txt`, JSON.stringify(products, null, 2))
            } else if (products.length == 1) {
                const secondProduct = { id: 1 + 1, title: product.title, price: product.price, thumbnail: product.thumbnail }
                await products.push(secondProduct)
                await fs.writeFile(`./products.txt`, JSON.stringify(products, null, 2))
            } else {
                const productMayor = products.sort((b, a) => a.id - b.id)[0];
                const newProduct = { id: (productMayor.id + 1), title: product.title, price: product.price, thumbnail: product.thumbnail }
                await products.push(newProduct)
                await fs.writeFile(`./products.txt`, JSON.stringify(products, null, 2))
            }
        } catch (err) {
            console.log(err)
        }
        return "Item saved successfull"
    }


    async update(product, id) {
        try {
            await this.deleteById(id)
            console.log(id);
            const products = await this.getAll()
            const updatedProduct = { id: id, title: product.title, price: product.price, thumbnail: product.thumbnail }
            products.push(updatedProduct)
            await fs.writeFile(`./products.txt`, JSON.stringify(products, null, 2))
        } catch (err) {
            console.log(err)
        }
        return "Item updated successfull"
    }
}
module.exports = Container
