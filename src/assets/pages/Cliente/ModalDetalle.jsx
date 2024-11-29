import CustomTable from '../../../components/Table';
import { Row, Col, Modal, Button } from 'react-bootstrap';
import { columnsDetalle } from './constantes';
import '../../../styles/Modal.css';

const ModalDetalle = ({ isOpen, onClose, row = [] }) => {
    if (!isOpen) return null;
    return (
        <Modal
            show={isOpen}
            onHide={onClose}
            className="modal-wrapper"
            centered
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Detalle</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CustomTable 
                columns={columnsDetalle}
                data={row} />
            </Modal.Body>
            <Row>
                <Col className="text-end">
                    <Button variant="secondary" onClick={onClose} className="me-2">
                        Cerrar
                    </Button>
                </Col>
            </Row>
        </Modal >
    );
};

export default ModalDetalle;