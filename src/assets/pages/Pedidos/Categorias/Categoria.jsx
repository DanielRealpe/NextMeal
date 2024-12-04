import React from 'react';
import './Categoria.css';

const ImageButtonTable = ({ images, buttonTexts, title, handleCategoryChange }) => {


    return (
        <div className="table-container table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        <th>{title}</th>
                    </tr>
                </thead>
                <tbody>
                    {images.map((src, index) => (
                        <tr key={index}>
                            <td>
                                <div className="image-button-cell">
                                    <div className="image-container">
                                        <img src={src} alt={`Image ${index + 1}`} />
                                    </div>
                                    <div className="button-container">
                                        <button onClick={() => handleCategoryChange(buttonTexts[index])} className="btn btn-primary">{buttonTexts[index]}</button>
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

export default ImageButtonTable;

