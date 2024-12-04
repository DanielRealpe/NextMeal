import * as React from 'react';
import { useCart } from '../../../hooks/useCart';
import CartItem from './CartItem';

const Render = () => {
    const { cart } = useCart();

    return (
        <div >
            {cart.length === 0 ? (
                <p>El carrito está vacío</p>
            ) : (
                    cart.map((product, index) => (
                        <CartItem key={index} product={product} />
                    ))
            )}
        </div>
    );
};

export default Render;