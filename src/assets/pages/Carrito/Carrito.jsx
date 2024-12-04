import React from "react";
import CardProducts from "./CardProducts";
const products = [
    {
        id: 1,
        name: "Hamburguesa",
        description: "Hamburguesa de carne de res",
        image: "https://assets.unileversolutions.com/recipes-v2/218401.jpg",
        price: 10000,
    },
    {
        id: 2,
        name: "Perro Caliente",
        description: "Perro Caliente",
        image: "https://assets.unileversolutions.com/recipes-v2/218408.jpg",
        price: 8000,
    },
    {
        id: 3,
        name: "Papas",
        description: "Papas con queso",
        image: "https://assets.unileversolutions.com/recipes-v2/218409.jpg",
        price: 5000,
    },
    {
        id: 4,
        name: "Chuzo",
        description: "Carne de res con verduras",
        image: "https://assets.unileversolutions.com/recipes-v2/218405.jpg",
        price: 3000,
    },

]
function Carrito() {

    return (
        <div className="row g-3">
            {products.map((product) => (
                <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={product.id}>
                    <CardProducts product={product} />
                </div>
            ))}
        </div>
    );
}

export default Carrito;