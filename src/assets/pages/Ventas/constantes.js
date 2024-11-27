
export const columns = [
    { key: 'id', header: 'Id_Ventas' },
    { key: 'fecha', header: 'Fecha/Hora' },
    { key: 'empleado', header: 'Empleado' },
    { key: 'cliente', header: 'Cliente' },
    { key: 'estado', header: 'Estado' },
]
export const data = [
    { id: 101, fecha: '2023-09-01', empleado: 'Carlos Darwin Alzate', cliente: 'Ruben Dario Llanes', estado: 'Pagada' },
    { id: 102, fecha: '2023-09-01', empleado: 'John Doe', cliente: 'John Doe', estado: 'Pagada' },
    { id: 103, fecha: '2023-09-01', empleado: 'John Doe', cliente: 'John Doe', estado: 'Pagada' },
    { id: 104, fecha: '2023-09-01', empleado: 'John Doe', cliente: 'John Doe', estado: 'Pagada' },
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