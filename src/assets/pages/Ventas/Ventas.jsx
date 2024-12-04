import React, { useState } from 'react';
import './Ventas.css';
import { columns, data } from './constantes';
import CustomTable from '../../../components/Table';
import PaymentModal from './ModalPago';
import Swal from 'sweetalert2';

function Ventas() {
    const [payments, setPayments] = useState([]);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [editPayment, setEditPayment] = useState(null);
    const [datas, setDatas] = useState(data);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        setDatas(data.filter((item) => 
            item.id.toString().includes(searchTerm) || 
            item.empleado.toLowerCase().includes(searchTerm.toLowerCase()) || 
            item.cliente.toLowerCase().includes(searchTerm.toLowerCase()) || 
            item.estadoVenta.toLowerCase().includes(searchTerm.toLowerCase())
        ));
    };

    const handleSavePayment = (paymentData, isEditing) => {
        if (isEditing) {
            setPayments(prevPayments => 
                prevPayments.map(payment => 
                    payment.id === paymentData.id ? paymentData : payment
                )
            );
            Swal.fire('Éxito', 'Pago actualizado correctamente', 'success');
        } else {
            setPayments(prevPayments => [...prevPayments, paymentData]);
            Swal.fire('Éxito', 'Pago registrado correctamente', 'success');
        }
        setShowPaymentModal(false);
        setEditPayment(null);
    };

    const handleEditPayment = (payment) => {
        setEditPayment(payment);
        setShowPaymentModal(true);
    };

    const handleDeletePayment = (payment) => {
        Swal.fire({
            title: '¿Está seguro?',
            text: "Esta acción no se puede revertir",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                setPayments(prevPayments => 
                    prevPayments.filter(p => p.id !== payment.id)
                );
                Swal.fire(
                    'Eliminado',
                    'El pago ha sido eliminado correctamente',
                    'success'
                );
            }
        });
    };

    const handleViewPaymentDetails = (payment) => {
        Swal.fire({
            title: 'Detalles del Pago',
            html: `
                <div class="text-left">
                    <p><strong>ID Pago:</strong> ${payment.id}</p>
                    <p><strong>Pedido:</strong> ${payment.orderId}</p>
                    <p><strong>Cliente:</strong> ${payment.order.nombre}</p>
                    <p><strong>Monto:</strong> $${payment.amount.toLocaleString()}</p>
                    <p><strong>Método:</strong> ${payment.paymentMethod}</p>
                    <p><strong>Empleado:</strong> ${payment.employee}</p>
                    <p><strong>Fecha:</strong> ${new Date(payment.date).toLocaleString()}</p>
                    ${payment.details ? `<p><strong>Detalles:</strong> ${payment.details}</p>` : ''}
                </div>
                ${payment.receipt ? `<img src="${payment.receipt}" alt="Comprobante" style="max-width: 100%; margin-top: 10px;">` : ''}
            `,
            width: 600,
            showCloseButton: true,
            showConfirmButton: false
        });
    };

    const enhancedActions = [
        {
            label: "Ver Detalles",
            className: "btn-secondary",
            onClick: handleViewPaymentDetails,
        },
        {
            label: "Editar",
            className: "btn-primary",
            onClick: handleEditPayment,
        },
        {
            label: "Cancelar",
            className: "btn-danger",
            onClick: handleDeletePayment,
        },
    ];

    return (
        <div className="ventas-container">
            <div className="ventas-header">
                <h1 className="ventas-title">Gestión de Ventas</h1>
            </div>
            <div className="ventas-filters-container">
                <div className="ventas-filters">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button onClick={handleSearch} className="btn btn-primary">
                        Buscar
                    </button>
                </div>
                <div className="ventas-actions">
                    <button 
                        className="btn btn-primary"
                        onClick={() => setShowPaymentModal(true)}
                    >
                        Agregar Pago
                    </button>
                    <button className="btn btn-secondary">
                        Exportar
                    </button>
                </div>
            </div>

            <CustomTable
                columns={columns}
                data={datas}
                actions={enhancedActions}
            />

            <PaymentModal
                show={showPaymentModal}
                handleClose={() => {
                    setShowPaymentModal(false);
                    setEditPayment(null);
                }}
                onSave={handleSavePayment}
                editData={editPayment}
            />
        </div>
    );
}

export default Ventas;