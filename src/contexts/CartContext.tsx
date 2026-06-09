import { createContext, useState,} from 'react'
import type { ReactNode } from 'react'
import type { ProductsProps } from '../pages/home'


interface CartContextData {
    cart: CartProps[];
    cartAmount: number;
    addItemCart: (newItem: ProductsProps) => void;
    removeItemCart: (product: CartProps) => void;
    total: string;
}

interface CartProps {
    id: number;
    title: string;
    description: string;
    price: number;
    cover: string;
    amount: number;
    total: number;
}

interface CartProviderProps{
    children: ReactNode;
}
export const CartContext = createContext({} as CartContextData)


function CartProvider({ children }: CartProviderProps   ){
    const [cart, setCart] = useState<CartProps[]>([])
    const [total, setTotal] = useState("");

    function addItemCart(newItem: ProductsProps){
        const indexItem = cart.findIndex(item => item.id === newItem.id)

        if(indexItem !== -1){
            // se entrou aqui apenas somamos +1 na quantidade e calculamos o total desse carrinho
            let cartList = cart;

            cartList[indexItem].amount = cartList[indexItem].amount + 1;
            cartList[indexItem].total = cartList[indexItem].amount * cartList[indexItem].price;

            setCart(cartList)
            totalResultCart(cartList)
            return;
        }
        // adicionar esse item a nossa lista
        let data = {
            ...newItem,
            amount: 1,
            total: newItem.price
        }

        setCart(products => [...products, data])
        totalResultCart([...cart, data])
        
    }

    function removeItemCart(product: CartProps){
        const indexItem = cart.findIndex(item => item.id === product.id)

        if(cart[indexItem]?.amount > 1){
            //diminuir apenas 1 amount 

            // agora ao diminuir no carrinho n vai excluir o produto de 1 vez
            // vai diminuir 1 e tbm subtrair o subtotal e total
            let cartList = cart;

            cartList[indexItem].amount = cartList[indexItem].amount - 1;
            cartList[indexItem].total = cartList[indexItem].total - cartList[indexItem].price;

            setCart(cartList);
            totalResultCart(cartList)
            return;
        }


        //filter() vai pecorrer toda nossa lista e verificar se o item.id é diferente do product.id e se for igual vai remover
        const removeItem = cart.filter(item => item.id !== product.id)
        setCart(removeItem);

        totalResultCart(removeItem)
    }

    function totalResultCart(items: CartProps[]){
        let myCart = items;
        //reduce() reduzir a 1 item //acumulador acc + o obj.total
        let result = myCart.reduce((acc, obj) => {return acc + obj.total}, 0);

        const resultFormated = result.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})
        setTotal(resultFormated); // ao inves de retornar passamos para o useState e podemos exportar para qualquer componente buscar esse total
    }


    return(
        <CartContext.Provider value={{ 
            cart,
            cartAmount: cart.length ,
            addItemCart,
            removeItemCart,
            total
            }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;