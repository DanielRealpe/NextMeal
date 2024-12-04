import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    const addToCart = (product) => {
        setCart(prevState => [...prevState,
        { ...product, id: cart.length + 1 }]
        );
        setTotal(total + product.price);
    };

    const removeFromCart = (product) => {
        const newCart = cart.filter((item) => item.id !== product.id);
        setCart(newCart);
        setTotal(total - product.price);
    };

    return (
        <CartContext.Provider value={{ cart, total, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
}