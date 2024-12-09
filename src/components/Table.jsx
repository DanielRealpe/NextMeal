import React from "react";
import PropTypes from "prop-types";
import { Table, Form } from "react-bootstrap";
import "../styles/CustomTable.css";

const CustomTable = ({
    columns,
    data,
    actions,
    striped = true,
    bordered = true,
    hover = true,
    responsive = true,
    onRowClick,
    onStateChange,
    compact = false, // Nueva prop
}) => {
    return (
        <div className={`table-container ${responsive ? "table-responsive" : ""}`}>
            <Table striped={striped} bordered={bordered} hover={hover}>
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column.key} style={{ ...column.style, ...(compact ? { width: '1%', whiteSpace: 'nowrap' } : {}) }}>
                                {column.header}
                            </th>
                        ))}
                        {actions && actions.length > 0 && <th style={compact ? { width: '1%', whiteSpace: 'nowrap' } : {}}>Acciones</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((row, rowIndex) => (
                            <tr
                                key={row.id || rowIndex}
                                onClick={() => onRowClick && onRowClick(row)}
                                className={onRowClick ? "clickable-row" : ""}
                            >
                                {columns.map((column) => (
                                    <td key={column.key}>
                                        {column.key === "img" ? (
                                            <img
                                                src={row[column.key]}
                                                alt={row.alt || "Imagen"}
                                                style={{ maxWidth: "100px", maxHeight: "100px" }} // Ajusta el tamaño según lo necesario
                                            />
                                        ) : column.key === 'estado' && row.rol !== 'Admin' ? (
                                            <div className="d-flex align-items-center justify-content-center">
                                                <Form.Check
                                                    type="switch"
                                                    id={`estado-switch-${row.documento}`}
                                                    checked={row[column.key] === 'Activo'}
                                                    onChange={() => onStateChange(row.documento || row.id, row[column.key] === 'Activo' ? 'Inactivo' : 'Activo')}
                                                    className="me-2"
                                                />
                                                <span>{row[column.key]}</span>
                                            </div>
                                        ) : (
                                            column.render ? column.render(row[column.key], row) : row[column.key]
                                        )}
                                    </td>
                                ))}
                                {actions && actions.length > 0 && row.rol !== 'Admin' && (
                                    <td>
                                        {actions.map((action, actionIndex) => (
                                            <button
                                                key={actionIndex}
                                                className={`btn ${action.className || ""}`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    action.onClick(row);
                                                }}
                                            >
                                                {action.label}
                                            </button>
                                        ))}
                                    </td>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length + (actions ? 1 : 0)} className="text-center">
                                No hay datos disponibles
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
};

// Props por defecto para que el componente sea flexible
CustomTable.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired, // Clave del campo en los datos
            header: PropTypes.string.isRequired, // Título de la columna
            render: PropTypes.func, // Render personalizado
            style: PropTypes.object, // Estilo personalizado para la celda
        })
    ).isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired, // Datos de la tabla
    actions: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired, // Texto del botón
            className: PropTypes.string, // Clase CSS del botón
            onClick: PropTypes.func.isRequired, // Función para manejar clics
        })
    ),
    striped: PropTypes.bool,
    bordered: PropTypes.bool,
    hover: PropTypes.bool,
    responsive: PropTypes.bool,
    onRowClick: PropTypes.func, // Función que se ejecuta al hacer clic en una fila
    compact: PropTypes.bool,
};

export default CustomTable;

