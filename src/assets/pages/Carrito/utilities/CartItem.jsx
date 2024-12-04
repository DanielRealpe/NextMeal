import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useCart } from '../../../hooks/useCart';


export default function MediaCard({ product }) {
    const { addToCart } = useCart();
    if (!product) {
        return;
    }
    const handleAddToCart = () => {
        addToCart(product);
    };


    return (
        <Card className="m-2" sx={{ maxWidth: 345, }}>
            <CardMedia
                component="img"
                sx={{ height: 140 }}
                image={product.image || "https://via.placeholder.com/345x200"}
                title={product.name || "Producto"}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {product.name || "Producto"}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {product.description ||
                        "Descripción no disponible para este producto."}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" variant="contained" color="primary" onClick={handleAddToCart}>
                    Comprar
                </Button>
                <Button size="small" color="secondary" onClick={() => console.log(product)}>
                    Detalles
                </Button>
            </CardActions>
        </Card>
    );
}