import React, { useState } from 'react';
import {
    Box,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Container
} from '@mui/material';
import PrimarySearchAppBar from '../../components/Navegation';
import '../../styles/Home.css';

// Productos por categoría
const imagenePerras = {
    Hamburguesas: 'https://files.lafm.com.co/assets/public/styles/seoimg_1200x675_/public/2023-09/hamburguesa.jpg?VersionId=daQCdWXXGimjqh1MJ142xeERovVsB4jh&h=99a541cf&itok=BF6JIci4',
    Salchipapas: 'https://i0.wp.com/lacocinalatina.club/wp-content/uploads/2020/10/Salchipapas-Colombianas.jpg?w=700&ssl=1',
    Perros: 'https://comidasrapidasolafo.com/wp-content/uploads/2021/02/perro-pollo.jpg',
    Bebidas: 'https://termosyeti.com/wp-content/uploads/2023/10/bebidas-alcoholicas.jpg',
}

const productos = {
    Hamburguesas: [
        {
            nombre: 'Hamburguesa Clásica',
            descripcion: 'Carne de res, queso, lechuga y tomate',
            precio: 8.99,
            imagen: 'https://www.unileverfoodsolutions.com.co/dam/global-ufs/mcos/NOLA/calcmenu/recipes/col-recipies/fruco-tomate-cocineros/HAMBURGUESA%201200x709.png'
        },
        {
            nombre: 'Hamburguesa BBQ',
            descripcion: 'Carne con salsa BBQ, cebolla caramelizada',
            precio: 9.99,
            imagen: 'https://www.infobae.com/resizer/v2/GHAHUE6RHVHKJIHC2HDO3LNOLI.png?auth=ca1c3b872d107e916fa21d4cc4a5645de1a165be04fe145940a129ee3738665a&smart=true&width=1200&height=900&quality=85'
        },
    ],
    Salchipapas: [
        {
            nombre: 'Salchipapa Clásica',
            descripcion: 'Salchicha, papas fritas, salsas',
            precio: 5.99,
            imagen: 'https://comedera.com/wp-content/uploads/sites/9/2021/07/salchipapas.jpg?resize=1316,740&quality=80'
        },
        {
            nombre: 'Salchipapa Suprema',
            descripcion: 'Salchicha especial, papas, queso, tocino',
            precio: 6.99,
            imagen: 'https://estaticos.elcolombiano.com/binrepository/848x565/34c0/780d565/none/11101/PAOX/whatsapp-image-2021-08-12-at-11-02-48-am-1_38328947_20210813161521.jpg'
        }
    ],
    Perros: [
        {
            nombre: 'Perro Clásico',
            descripcion: 'Salchicha, pan, salsas tradicionales',
            precio: 3.99,
            imagen: 'https://www.cocinadelirante.com/800x600/filters:format(webp):quality(75)/sites/default/files/images/2023/02/receta-de-hot-dogs.jpg'
        },
        {
            nombre: 'Perro Especial',
            descripcion: 'Salchicha, queso, salsas gourmet',
            precio: 4.99,
            imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjiDkpwmOZKrvH263uVi8HPTftuShOw0yDqUtoiwlZHYbImLQt2mMkFpJNyz-pM7eoxiM&usqp=CAU'
        }
    ],
    Bebidas: [
        {
            nombre: 'Coca-Cola',
            descripcion: 'Refresco de cola',
            precio: 10.99,
            imagen: 'https://www.nutricionyentrenamiento.fit/images/alimento/215.jpg'
        },
        {
            nombre: 'Limonada de cerezas',
            descripcion: 'Limonada de cerezas',
            precio: 12.99,
            imagen: 'https://www.laylita.com/recetas/wp-content/uploads/2013/06/Cerezada-o-limonada-de-cereza.jpg'
        }
    ]
};

// console.log(categoriaImagenes.map((imagen) => imagen[Object.keys(imagen)[0]]));

export default function ClientView() {
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

    React.useEffect(() => {
        document.body.classList.add('home-page');
        return () => {
            document.body.classList.remove('home-page');
        };
    }, []);

    return (
        <div className="home-container">
            <Box>
                <PrimarySearchAppBar />
                <Container sx={{ mt: 4 }}>
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                        {Object.keys(productos).map((categoria) => (
                            <Grid item xs={12} sm={3} key={categoria}>
                                <Card
                                    onClick={() => setCategoriaSeleccionada(categoria)}
                                    sx={{
                                        cursor: 'pointer',
                                        transition: 'transform 0.3s',
                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                            boxShadow: 3
                                        }
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={imagenePerras[categoria]}
                                        alt={categoria}
                                    />
                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            component="div"
                                            align="center"
                                        >
                                            {categoria}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    {categoriaSeleccionada && (
                        <Box>
                            <Typography variant="h4" sx={{ mb: 3 }}>
                                {categoriaSeleccionada}
                            </Typography>
                            <Grid container spacing={3}>
                                {productos[categoriaSeleccionada].map((producto) => (
                                    <Grid item xs={12} sm={4} key={producto.nombre}>
                                        <Card>
                                            <CardMedia
                                                component="img"
                                                height="200"
                                                image={producto.imagen}
                                                alt={producto.nombre}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {producto.nombre}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {producto.descripcion}
                                                </Typography>
                                                <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                                                    ${producto.precio.toFixed(2)}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    )}
                </Container>
            </Box>
        </div>
    );
}