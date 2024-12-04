
export const columns = [
    { key: 'idPedidos', header: 'id_Pedidos' },
    { key: 'fecha', header: 'Fecha' },
    { key: 'nombre', header: 'Nombre' },
    { key: 'direccion', header: 'Direccion' },
    { key: 'estadoPedidos', header: 'Estado' },
    { key: 'total', header: 'Total' },
]
export const data2 = [
    {
        idPedidos: 1, fecha: '2024-08-13', nombre: 'Ruben Dario Llanes Silva', direccion: 'Calle siempre viva' ,estadoPedidos: 'Preparando', total: '89000',
        products: [{ name: 'Salchipapa boruto', adicion: ['Queso', 'Cheddar', 'Mayonesa'], price: '36000', cantidad: '2', total: '72000' },
        { productos: 'Coca Cola', adicion: [], price: '3500', cantidad: '2', total: '7000' },
        { productos: 'Chuzo Sencillo', adicion: [], price: '10000', cantidad: '1', total: '10000' },]
    },
    {
        idPedidos: 2, fecha: '2024-08-13', nombre: 'Carmen Beatriz Quiroz',direccion: 'Calle siempre viva', estadoPedidos: 'Preparando', total: '50000',
        products: [{ productos: 'Coca Cola', adicion: [], price: '3500', cantidad: '2', total: '7000' },
        { productos: 'Chuzo Sencillo', adicion: [], price: '10000', cantidad: '1', total: '10000' },]
    },
    {
        idPedidos: 3, fecha: '2024-08-13', nombre: 'Gonzalo Castro Uribe',direccion: 'Calle siempre viva', estadoPedidos: 'Preparando', total: '75000',
        products: [{ productos: 'Coca Cola', adicion: [], price: '3500', cantidad: '2', total: '7000' },
        { productos: 'Chuzo Sencillo', adicion: [], price: '10000', cantidad: '1', total: '10000' },]
    },
]
export const actions = [
    {
        label: "Ver detalle",
        className: "btn-secondary",
        onClick: (row) => console.log("Ver detalle:", row),
    },
    {
        label: "Eliminar",
        className: "btn-danger",
        onClick: (row) => console.log("Eliminar:", row),
    },
];
export const columns1 = [
    { key: 'productos', header: 'Productos' },
    { key: 'adicion', header: 'Adicion' },
    { key: 'price', header: 'Precio Unitario' },
    { key: 'cantidad', header: 'Cantidad' },
    { key: 'total', header: 'Total' },
]
export const data1 = [
    { productos: 'Salchipapa boruto', adicion: ['Queso', 'Cheddar', 'Mayonesa'], precioVentas: '36000', cantidad: '2', total: '72000' },
    { productos: 'Coca Cola', adicion: [], precioVentas: '3500', cantidad: '2', total: '7000' },
    { productos: 'Chuzo Sencillo', adicion: [], precioVentas: '10000', cantidad: '1', total: '10000' },
]
export const actions1 = [
    {
        label: "Adicionar",
        className: "btn-secondary",
        onClick: (row) => console.log("Adicionar:", row),
    },
    {
        label: "Editar",
        className: "btn-primary",
        onClick: (row) => console.log("Editar:", row),
    },
    {
        label: "Eliminar",
        className: "btn-danger",
        onClick: (row) => console.log("Eliminar:", row),
    },
];

export const images = [
    'https://comidasrapidasolafo.com/wp-content/uploads/2021/02/perro-pollo.jpg',
    'https://i0.wp.com/lacocinalatina.club/wp-content/uploads/2020/10/Salchipapas-Colombianas.jpg?w=700&ssl=1',
    'https://kosante.s3.us-east-2.amazonaws.com/users/3/9AdTOSInSVprHoG1rHKGIWSJvTfPFFSP92obv6Wptc08PdfoCc.png',
];
export const buttonTexts = ['Perros', 'Salchipapas', 'Gaseosas'];

export const products1 = [
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
        description: "Perro",
        image: "https://assets.unileversolutions.com/recipes-v2/218401.jpg",
        price: 8000,
    },
    {
        id: 3,
        name: "Papas",
        description: "Papas",
        image: "https://assets.unileversolutions.com/recipes-v2/218401.jpg",
        price: 5000,
    },
];

export const products = [{
    perros: [
        {
            id: 2,
            productos: "Perro Caliente",
            description: "Perro",
            adicion: [],
            image: "https://comidasrapidasolafo.com/wp-content/uploads/2021/02/perro-pollo.jpg",
            price: 8000,
        },
        {
            id: 3,
            productos: "Perra",
            description: "Perra",
            adicion: [],
            image: "https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img,w_980/https://www.habitantesiete.com/wp-content/uploads/2020/09/perrras.jpg",
            price: 8000,
        },
        {
            id: 4,
            productos: "Perro con tocineta",
            description: "Perro con tocineta",
            adicion: [],
            image: "https://losperritoscr.com/wp-content/uploads/2023/04/perra-con-queso.png.webp",
            price: 8000,
        },
    ],
    salchipapas: [
        {
            id: 3,
            productos: "Papas",
            description: "Papas",
            adicion: [],
            image: "https://assets.unileversolutions.com/recipes-v2/218401.jpg",
            price: 5000,
        },
    ],
    gaseosas: [
        {
            id: 4,
            productos: "COCA COLA",
            description: "COCA COLA",
            adicion: [],
            image: "https://drinkx.com.co/wp-content/uploads/2021/07/gaseosa-coca-cola-250-ml.jpeg",
            price: 3000,
        },
        {
            id: 5,
            productos: "FANTA",
            description: "FANTA",
            adicion: [],
            image: "https://www.coca-cola.com/content/dam/onexp/pe/es/brands/fanta/fanta-naranja.jpg/width1960.jpg",
            price: 3000,
        },
        {
            id: 6,
            productos: "SPRITE",
            description: "SPRITE",
            adicion: [],
            image: "https://olimpica.vtexassets.com/arquivos/ids/1396371-800-auto?v=638500196947230000&width=800&height=auto&aspect=true",
            price: 3000,
        },
    ],
}];