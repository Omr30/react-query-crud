import axios from "axios";

const productsApi = axios.create({
    baseURL: 'http://localhost:8080'
})

export const getProducts = async() => {
    const res = await productsApi.get('/products');
    return res.data
}

export const createProduct = async(product) => {
    await productsApi.post('/products', product)
}

export const deleteProduct = async(id) => {
    await productsApi.delete(`/products/${id}`)
}

export const updateProduct = async(product) => {
    await productsApi.put(`products/${product.id}`, product)
}