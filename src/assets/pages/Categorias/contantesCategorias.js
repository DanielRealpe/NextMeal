export const columns = [
    { key: 'id', header: 'Id' },
    { key: 'nombre', header: 'Nombre' },
    { key: 'descripcion', header: 'Descripcion' },
    { key: 'estado', header: 'Estado' },
]

export const data = [
    { id: 1, nombre: 'Hamburguesas', descripcion: 'Breve descipcion para hamburguesas', estado: 'Activo' },
    { id: 2, nombre: 'Gaseosas', descripcion: 'Breve descipcion para gaseosas',estado: 'Activo' },
    { id: 3, nombre: 'Salchipapas', descripcion: 'Breve descipcion para salchipapas',estado: 'Activo' },
]

export const acionecitas = (handleEdit, handleDelete) => {
    const actions = [
        {
            label: "Editar",
            className: "btn-primary",
            onClick: (row) => handleEdit(row),
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
