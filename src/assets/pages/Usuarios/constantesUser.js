export const columns = [
    { key: 'id', header: 'Id' },
    { key: 'nombre', header: 'Nombre' },
    { key: 'apellido', header: 'Apellido' },
    { key: 'tipoDocumento', header: 'Tipo. Dcto' },
    { key: 'documento', header: 'Documento' },
    { key: 'telefono', header: 'Telefono' },
    { key: 'rol', header: 'Rol' },
    { key: 'estado', header: 'Estado' },
]

export const data = [
    { id: 1, nombre: 'Javier', apellido: 'Perez', tipoDocumento: 'CC', documento: '1017198864', telefono: '3025215654', correo: 'javierperez@gmail.com', rol: 'Administrador', estado: 'Activo', contrasena: 'aA12345678' },
    { id: 2, nombre: 'Abel Yesith', apellido: 'Bello Palacios', tipoDocumento: 'CC', documento: '1001432123', telefono: '3122114232', correo: 'yesithpalacios63@gmail.com', rol: 'Empleado', estado: 'Activo', contrasena: 'aA12345678' },
    { id: 3, nombre: 'Niber Ariel', apellido: 'Jiménez Restrepo', tipoDocumento: 'CC', documento: '98123546', telefono: '3014266545', correo: 'arielniber4@gmail.com', rol: 'Empleado', estado: 'Activo', contrasena: 'aA12345678' },
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