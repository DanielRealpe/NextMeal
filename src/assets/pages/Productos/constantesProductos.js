export const columns = [
    { key: 'img', header: 'Imagen' },
    { key: 'nombre', header: 'Nombre' },
    { key: 'categoria', header: 'Categoria' },
    { key: 'stock', header: 'Stock' },
    { key: 'precio', header: 'Precio' },
    { key: 'estado', header: 'Estado' },
]

export const data = [
    {
        img: 'https://pizzeriacolombianita.com/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsiZGF0YSI6NTQ1MTg1LCJwdXIiOiJibG9iX2lkIn19--e912b0ec0f92fdccbc55eefb42cff02f96634786/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJwbmciLCJyZXNpemVfdG9fZml0IjpbODAwLDgwMF19LCJwdXIiOiJ2YXJpYXRpb24ifX0=--cef66509c9cdc75663c0eefd9421db1d2ea4fead/hamburguesa-sencilla-a-domicilio-villavicencio.png?locale=es', id: 1, nombre: 'Hamburguesa sencilla', stock: 26, precio: 14000,
        preparacion: 'Una hamburguesa es una hamburguesa de carne picada asada a la parrilla y colocada entre dos mitades de pan.\
        Se le agregan rodajas de cebolla cruda, lechuga, tocino, mayonesa y otros ingredientes para darle sabor.',
        estado: 'Activo',
        categoria: 'Hamburguesa',
        descripcion: 'Las hamburguesas se consideran una comida estadounidense, pero son populares en todo el mundo.\
        En Japón, las hamburguesas teriyaki son populares.',
        ingredientes: [
            { ingrediente: 'Pan', cantidad: '2 rodajas' },
            { ingrediente: 'Queso', cantidad: '1 lonchita' },
            { ingrediente: 'Carne', cantidad: '30mg' },
            { ingrediente: 'Lechuga', cantidad: '12mg' },
            { ingrediente: 'Tomate', cantidad: '1 rodaja' },
            { ingrediente: 'Cebolla', cantidad: '2 rodajas' },
            { ingrediente: 'Aguacate', cantidad: '1/2 pieza' },
        ]
    },
    {
        img: 'https://laparisienne.com.co/cdn/shop/articles/SALCHIPAPA_LA_PARISIENNE_CUADRADA.jpg?v=1682626308',
        id: 2,
        nombre: 'Salchipapas navideñas',
        stock: 26,
        precio: 14000,
        preparacion: 'Cortar las papas en bastones y cortar las salchichas en tiras finas.\
        El perejil en polvo se pone entre las salchichas y las papas para darle sabor.',
        categoria: 'Salchipapas',
        descripcion: 'Salchipapas navideñas, una comida perfecta para los amantes de las salchichas y las papas fritas.\
        Una deliciosa comida para los amantes de las salchichas y las papas fritas.\
        Una comida perfecta para los amantes de las salchichas y las papas fritas.',
        ingredientes: [
            { ingrediente: 'Papas', cantidad: '2 lonchitas' },
            { ingrediente: 'Salchichas', cantidad: '1 lonchita' },
            { ingrediente: 'Perejil en polvo', cantidad: '1 cucharadita' },
            { ingrediente: 'Queso', cantidad: '1/2 bloque' },
        ],
        estado: 'Activo',
    }
]

export const acionecitas = (handleEdit, handleDelete, handleView) => {
    const actions = [
        {
            label: "Editar",
            className: "btn-primary",
            onClick: (row) => handleEdit(row),
        },
        {
            label: "Ver detalle",
            className: "btn-secondary",
            onClick: (row) => handleView(row),
        },
        {
            label: "Eliminar",
            className: "btn-danger",
            onClick: (row) => handleDelete(row),
        },
    ];

    return actions;
}

export const generateId = (list) => {
    if (list.length === 0) {
        return 1; // Si la lista está vacía, el primer ID será 1
    }

    // Obtener el ID máximo de la lista
    const lastId = Math.max(...list.map(item => item.id));

    return lastId + 1; // Incrementar el último ID
};
