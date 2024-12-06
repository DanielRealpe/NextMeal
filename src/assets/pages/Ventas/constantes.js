
export const columns = [
    { key: 'id', header: 'Id_Ventas' },
    { key: 'fecha', header: 'Fecha/Hora' },
    { key: 'empleado', header: 'Empleado' },
    { key: 'cliente', header: 'Cliente' },
    { key: 'estadoVenta', header: 'Estado' },
]
export const data = [
    {
        id: 101, fecha: '2023-09-01', empleado: 'Carlos Darwin Alzate', cliente: 'Ruben Dario Llanes', estadoVenta: 'Pagada',
        order: { idPedidos: 1, fecha: '2024-12-01', nombre: 'Ruben Dario Llanes Silva', clienteDocumento: '96546765', estadoPedidos: 'Pendiente', total: 260.0}, metodoPago: 'tarjeta',
        details: 'Detalles venta 1',
    },
    {
        id: 102, fecha: '2023-09-01', empleado: 'Farid Díaz', cliente: 'John Doe', estadoVenta: 'Pagada',
        order: { idPedidos: 2, fecha: '2024-12-01', nombre: 'John Doe', clienteDocumento: '96546765', estadoPedidos: 'Pendiente', total: 260.0}, metodoPago: 'tarjeta',
        details: 'Detalles venta 2',
    },
    {
        id: 103, fecha: '2023-09-01', empleado: 'James Rodriguez', cliente: 'John Doe', estadoVenta: 'Pagada',
        order: { idPedidos: 3, fecha: '2024-12-01', nombre: 'John Doe', clienteDocumento: '96546765', estadoPedidos: 'Pendiente', total: 260.0}, metodoPago: 'efectivo',
        details: 'Detalles venta 3',
    },
    {
        id: 104, fecha: '2023-09-01', empleado: 'Radamel Falcao García', cliente: 'John Doe', estadoVenta: 'Pagada',
        order: { idPedidos: 4, fecha: '2024-12-01', nombre: 'John Doe', clienteDocumento: '96546765', estadoPedidos: 'Pendiente', total: 260.0}, metodoPago: 'efectivo',
        details: 'Detalles venta 4',
    },
]
export const actions = [
    {
        label: "Editar",
        className: "btn-primary",
        onClick: (row) => console.log("Editar:", row),
    },
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

export const pedidos = [
    {
        idPedidos: 1,
        fecha: "2024-12-01",
        nombre: "Ruben Dario Llanes Silva",
        clienteDocumento: "96546765",
        estadoPedidos: "Pendiente",
        total: 260.0,
        products: [
            { id: 5657, name: "Producto A", price: 130, quantity: 1, total: 130 },
            { id: 8667, name: "Producto B", price: 130, quantity: 1, total: 130 },
        ],
    },
    {
        idPedidos: 2,
        fecha: "2024-12-01",
        nombre: "Carmen Beatriz Quiroz",
        clienteDocumento: "1040789678",
        estadoPedidos: "Pendiente",
        total: 150.0,
        products: [
            { id: 4545, name: "Producto C", price: 50, quantity: 1, total: 50 },
            { id: 8989, name: "Producto D", price: 100, quantity: 1, total: 100 },
        ],
    },
    {
        idPedidos: 3,
        fecha: "2024-12-01",
        nombre: "Carlos Arvey Rúa Perez",
        clienteDocumento: "1017198864",
        estadoPedidos: "Pendiente",
        total: 360.0,
        products: [
            { id: 6357, name: "Producto E", price: 180, quantity: 1, total: 180 },
            { id: 1434, name: "Producto F", price: 180, quantity: 1, total: 180 },
        ],
    },
]