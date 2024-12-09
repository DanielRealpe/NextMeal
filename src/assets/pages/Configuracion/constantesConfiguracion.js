export const columns = [
    { key: 'id', header: 'Id' },
    { key: 'rol', header: 'Rol' },
    { key: 'descripcion', header: 'Descripcion' },
    { key: 'estado', header: 'Estado' },
]

export const data = [
    { id: 1, rol: 'Admin', descripcion: 'Descripcion Admin', estado: 'Activo', privilegios:[{
        Dashboard: true,
        ventas: true,
        clientes: true,
        compras: true,
        produccion: true,
        Usuarios: true,
        Configuracion: true
    }]},
    { id: 2, rol: 'Empleado', descripcion: 'Descripcion para empleado', estado: 'Activo', privilegios:{
        Dashboard: true,
        Ventas: true,
        Clientes: true,
        Compras: false,
        Produccion: false,
        Usuarios: false,
        Configuracion: false
    }},
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
        return 1; // Si la lista está vacía, el primer ID será 1
    }

    // Obtener el ID máximo de la lista
    const lastId = Math.max(...list.map(item => item.id));

    return lastId + 1; // Incrementar el último ID en 1
};