import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteProduct, getProducts } from "../api/productsAPI";

const Products = () => {

    const queryClient = useQueryClient()

    const { isLoading, data: products, isError, error } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts,
        select: products => products.sort((a,b) => b.id - a.id)
    })

    const deleteProductMutation = useMutation({
      mutationFn: deleteProduct,
      onSuccess: () => {
        console.log('Product delete');
        queryClient.invalidateQueries('products')
      }
    })

    if( isLoading ) return <div>Loading...</div>
    else if(isError) return <div>Error: {error.mesage}</div>
    

  return products.map(product => (
    <div key={product.id}>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>{product.price}</p>
        <button onClick = {() => {
          deleteProductMutation.mutate(product.id);
        }}
        >
            Delete
        </button>
        <input type="checkbox" />
        <label htmlFor="">In Stock</label>
    </div>
  ))
}

export default Products