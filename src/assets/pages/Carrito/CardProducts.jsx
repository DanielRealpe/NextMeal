import React, { useState } from "react";
import { Button, IconButton } from '@mui/material';
import { Card, CardContent, CardMedia, CardHeader, CardActionArea, Collapse, FormControlLabel, Checkbox } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useCart } from "../../hooks/useCart";
function CardProducts({ product }) {
    const { addToCart } = useCart();
    const [expanded, setExpanded] = useState(false);
    const [aditions, setAditions] = useState({
        queso: 0,
        tocineta: 0,
        salsas: false,
    });
    const [catsup, setCatsup] = useState({
        Ketchup: false,
        Mayonesa: false,
        Mostaza: false,
    });

    const handleExpandClick = () => {
        setExpanded(!expanded);
    }

    const handleToppingChange = (event) => {
        setAditions({
            ...aditions,
            [event.target.name]: event.target.checked,
        });
        setCatsup({
            ...catsup,
            [event.target.name]: event.target.checked,
        });
    };

    const handleIncrement = (name) => {
        setAditions({
            ...aditions,
            [name]: aditions[name] + 1,
        });
    };

    const handleDecrement = (name) => {
        setAditions({
            ...aditions,
            [name]: aditions[name] > 0 ? aditions[name] - 1 : 0,
        });
    };

    const handleAddToCart = () => {
        const selectedCatsup = Object.keys(catsup).filter((key) => catsup[key]);

        const cartItem = {
            name: product.name,
            description: product.description,
            image: product.image,
            price: product.price,
            aditions: {
                queso: aditions.queso,
                tocineta: aditions.tocineta,
            },
            catsup: selectedCatsup,
        };

        addToCart(cartItem);

        setAditions({
            queso: 0,
            tocineta: 0,
            salsas: false,
        });
        setCatsup({
            Ketchup: false,
            Mayonesa: false,
            Mostaza: false,
        });
        console.log(cartItem);
    }

    return (
        <div>
            <Card >
                <CardActionArea onClick={handleExpandClick} >
                    <CardHeader title={product.name} />
                    <CardContent>
                        <p>{product.description}</p>
                        <CardMedia
                            component="img"
                            height="140"
                            image={product.image}
                        />
                    </CardContent>
                </CardActionArea >
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <h4>Adicionales</h4>
                        <div>
                            <h5>Queso</h5>
                            <IconButton onClick={() => handleDecrement('queso')}>
                                <RemoveIcon />
                            </IconButton>
                            {aditions.queso}
                            <IconButton onClick={() => handleIncrement('queso')}>
                                <AddIcon />
                            </IconButton>
                        </div>
                        <div>
                            <h5>Tocineta</h5>
                            <IconButton onClick={() => handleDecrement('tocineta')}>
                                <RemoveIcon />
                            </IconButton>
                            {aditions.tocineta}
                            <IconButton onClick={() => handleIncrement('tocineta')}>
                                <AddIcon />
                            </IconButton>
                        </div>
                        <h4>Salsas</h4>
                        {Object.keys(catsup).map((key) => (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={catsup[key]}
                                        onChange={handleToppingChange}
                                        name={key}
                                    />
                                }
                                label={key}
                            />
                        ))}
                        <div className="flex text-center justify-center">
                            <Button variant="contained" color="primary" onClick={handleAddToCart}>Comprar</Button>
                        </div>
                    </CardContent>
                </Collapse>
            </Card>
        </div>
    );
}

export default CardProducts;