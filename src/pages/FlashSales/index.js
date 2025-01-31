import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getFlashSales, deleteFlashSale } from "../../store/flashSales/actions";
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Input,
  Table,
  Modal,
  Toast,
  ToastHeader,
  ToastBody,
  Badge,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { withTranslation } from "react-i18next";

const FlashSales = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { flashSales = [], loading = false } = useSelector(
    (state) => state.flashSales || {}
  );

  // Delete Modal
  const [deleteModal, setDeleteModal] = useState(false);
  const [saleToDelete, setSaleToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    dispatch(getFlashSales());
  }, [dispatch]);

  const handleDeleteClick = (sale) => {
    setSaleToDelete(sale);
    setDeleteModal(true);
  };

  const handleDeleteSale = async () => {
    if (saleToDelete) {
      try {
        await dispatch(deleteFlashSale(saleToDelete._id));
        setToast({
          show: true,
          message: "Flash Sale deleted successfully!",
          type: "success",
        });
        setDeleteModal(false);
        setSaleToDelete(null);
      } catch (error) {
        setToast({
          show: true,
          message: error.message || "Failed to delete flash sale",
          type: "danger",
        });
      }
    }
  };

  // Add a loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Row>
            <Col xs={12}>
              <Card>
                <CardBody>
                  {/* Table Actions */}
                  <Row className="mb-2">
                    <Col sm="4">
                      <div className="search-box me-2 mb-2 d-inline-block">
                        <div className="position-relative">
                          <Input
                            type="text"
                            className="form-control"
                            placeholder={props.t("Search...")}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                          <i className="bx bx-search-alt search-icon" />
                        </div>
                      </div>
                    </Col>
                    <Col sm="8">
                      <div className="text-sm-end">
                        <Link
                          to="/flash-sales/create"
                          className="btn btn-success btn-rounded waves-effect waves-light mb-2 me-2"
                        >
                          <i className="mdi mdi-plus me-1" />
                          {props.t("New Flash Sale")}
                        </Link>
                      </div>
                    </Col>
                  </Row>

                  {/* Table */}
                  <div className="table-responsive">
                    <Table className="table align-middle table-nowrap table-hover">
                      <thead className="table-light">
                        <tr>
                          <th>ID</th>
                          <th>NAME</th>
                          <th>END DATE</th>
                          <th>CREATED AT</th>
                          <th>STATUS</th>
                          <th>OPERATIONS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {flashSales.map((sale) => (
                          <tr key={sale.id}>
                            <td>{sale.id}</td>
                            <td>{sale.name}</td>
                            <td>{sale.endDate}</td>
                            <td>{sale.createdAt}</td>
                            <td>
                              <Badge
                                color={sale.status === "Published" ? "success" : "warning"}
                                pill
                              >
                                {sale.status}
                              </Badge>
                            </td>
                            <td>
                              <Button
                                color="info"
                                size="sm"
                                className="me-2"
                                tag={Link}
                                to={`/flash-sales/edit/${sale.id}`}
                                title="Edit"
                              >
                                <i className="bx bx-pencil" />
                              </Button>
                              <Button
                                color="danger"
                                size="sm"
                                onClick={() => handleDeleteClick(sale)}
                                title="Delete"
                              >
                                <i className="bx bx-trash" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>

        {/* Delete Modal */}
        <Modal isOpen={deleteModal} toggle={() => setDeleteModal(false)}>
          <div className="modal-header">
            <h5 className="modal-title">Delete Flash Sale</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setDeleteModal(false)}
            />
          </div>
          <div className="modal-body">
            Are you sure you want to delete this flash sale?
          </div>
          <div className="modal-footer">
            <Button color="secondary" onClick={() => setDeleteModal(false)}>
              Cancel
            </Button>
            <Button color="danger" onClick={handleDeleteSale}>
              Delete
            </Button>
          </div>
        </Modal>

        {/* Toast */}
        <div
          style={{
            position: "fixed",
            top: "10px",
            right: "10px",
            zIndex: 9999,
          }}
        >
          <Toast isOpen={toast.show} style={{ minWidth: "200px" }}>
            <ToastHeader
              toggle={() => setToast({ ...toast, show: false })}
              className={`bg-${toast.type} text-white`}
            >
              Notification
            </ToastHeader>
            <ToastBody>{toast.message}</ToastBody>
          </Toast>
        </div>
      </div>
    </React.Fragment>
  );
};

FlashSales.propTypes = {
  t: PropTypes.func,
};

export default withTranslation()(FlashSales);
