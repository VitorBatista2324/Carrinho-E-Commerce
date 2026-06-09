import { useContext } from 'react'
import { Link } from 'react-router-dom' // importando link para usar a navegação
import { FiShoppingCart } from 'react-icons/fi' // icone do carrinho 

import { CartContext } from '../../contexts/CartContext'

// Dentro do nav vai ser onde fica os nossos links
export function Header() {
    const { cartAmount } = useContext(CartContext)
    
    return(
        <header className='w-full px-1 bg-slate-200'>
            <nav className='w-full max-w-7xl h-14 flex items-center justify-between px-5 mx-auto'> 
                <Link className= "font-bold text-2xl" to="/">
                    Dev Shop
                </Link>

                <Link className='relative' to="/cart">
                    <FiShoppingCart size={24} color='#121212'/>
                    {cartAmount > 0 && (
                        <span className='absolute -top-3 -right-3 px-2.5 bg-sky-500 rounded-full w-6 h-6 flex items-center justify-center text-white text-xs'>
                        {cartAmount}
                        </span>
                    )}
                </Link>
            </nav>

        </header>
    )
}