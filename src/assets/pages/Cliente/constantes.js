export const columns = [,
    { key: 'nombre', header: 'Nombre' },
    { key: 'apellido', header: 'Apellido' },
    { key: 'tipoDocumento', header: 'Tipo. Dcto' },
    { key: 'documento', header: 'Documento' },
    { key: 'telefono', header: 'Telefono' },
    { key: 'direccion', header: 'Direccion' },
    { key: 'estado', header: 'Estado' },
]

export const columnsDetalle = [
    { key: 'fecha_compra', header: 'Fecha Compra' },
    { key: 'descripcion', header: 'Descripcion' },
    { key: 'FormaDePago', header: 'Forma de Pago' },
    { key: 'total', header: 'Total' },
]

export const data = [
    {
        nombre: 'Carlos Arbey', apellido: 'Rua Perez', tipoDocumento: 'CC', documento: '1017198864', telefono: '3064557940', direccion: 'Calle siempre viva', estado: 'Activo', contrasena: '123456789aA',
        pedido: [{
            fecha_compra: '2023-09-01',
            descripcion: 'Primer compra',
            FormaDePago: 'Efectivo',
            total: '1000',
        }, {
            fecha_compra: '2023-09-01',
            descripcion: 'Compra 2',
            FormaDePago: 'Efectivo',
            total: '1000',
        }]
    },
    {
        nombre: 'Carmen Yiset', apellido: 'Perez Ruiz', tipoDocumento: 'CC', documento: '1040789678', telefono: '3056789854', direccion: 'Calle del pecao', estado: 'Activo', contrasena: '123456789aA',
        pedido: [{
            fecha_compra: '2023-09-01',
            descripcion: 'Primer compra',
            FormaDePago: 'Efectivo',
            total: '1000',
        }]
    },
    {
        nombre: 'Ruben Dario', apellido: 'Llanes Silva', tipoDocumento: 'CC', documento: '96546765', telefono: '123456789', direccion: '123 Main St', estado: 'Activo', contrasena: '123456789aA',
        pedido: [{
            fecha_compra: '2024-13-05',
            descripcion: 'Hamburguesa doble',
            FormaDePago: 'Transferencia',
            total: '13.500',
        }]
    },
]

export const data3000 = [
    {
        nombre: 'Carlos Arbey', apellido: 'Rua Perez', tipoDocumento: 'CC', documento: '1017198864', telefono: '3064557940', direccion: 'Calle siempre viva', estado: 'Activo', contrasena: '123456789aA',
        products: [{ productos: 'Salchipapa boruto', adicion: ['Queso', 'Cheddar', 'Mayonesa'], price: '36000', cantidad: '2', total: '72000' },
        { productos: 'Coca Cola', adicion: [], price: '3500', cantidad: '2', total: '7000' },
        { productos: 'Chuzo Sencillo', adicion: [], price: '10000', cantidad: '1', total: '10000' },]
    },
    {
        nombre: 'Carmen Yiset', apellido: 'Perez Ruiz', tipoDocumento: 'CC', documento: '1040789678', telefono: '3056789854', direccion: 'Calle del pecao', estado: 'Activo', contrasena: '123456789aA',
        products: [{ productos: 'Salchipapa boruto', adicion: ['Queso', 'Cheddar', 'Mayonesa'], price: '36000', cantidad: '2', total: '72000' },
        { productos: 'Coca Cola', adicion: [], price: '3500', cantidad: '2', total: '7000' },
        { productos: 'Chuzo Sencillo', adicion: [], price: '10000', cantidad: '1', total: '10000' },]
    },
    {
        nombre: 'Ruben Dario', apellido: 'Llanes Silva', tipoDocumento: 'CC', documento: '96546765', telefono: '123456789', direccion: '123 Main St', estado: 'Activo', contrasena: '123456789aA',
        products: [{ productos: 'Salchipapa boruto', adicion: ['Queso', 'Cheddar', 'Mayonesa'], price: '36000', cantidad: '2', total: '72000' },
        { productos: 'Coca Cola', adicion: [], price: '3500', cantidad: '2', total: '7000' },
        { productos: 'Chuzo Sencillo', adicion: [], price: '10000', cantidad: '1', total: '10000' },]
    },
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
            onClick: (row) => handleView(row.pedido),
        },
        {
            label: "Eliminar",
            className: "btn-danger",
            onClick: (row) => handleDelete(row),
        },
    ];

    return actions;
}