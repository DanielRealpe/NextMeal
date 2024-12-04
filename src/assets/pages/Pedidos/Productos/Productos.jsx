import React from 'react';
import './Producto.css';

const ProductList = ({ product, title, Add }) => {


    return (
        <div className="table-container table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        <th>{title}</th>
                    </tr>
                </thead>
                <tbody>
                    {product.map((item) => (
                        <tr key={item.id}>
                            <td>
                                <div className="image-button-cell">
                                    <div className="image-container">
                                        <img src={item.image} alt={`Image ${item.id}`} />
                                    </div>
                                    {/* Descripción y precio */}
                                    <div className="description-container">
                                        <p>{item.description}</p>
                                    </div>
                                    <div className="description-container">
                                        <p>{item.price}</p>
                                    </div>
                                    <div className="button-container">
                                        <button onClick={() => Add(item)} className="btn btn-primary">Agregar</button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;

