import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getCustomers, deleteCustomer } from "../../store/customers/actions";
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

const Customers = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { customers = [], loading = false } = useSelector(
    (state) => state.customers || {}
  );

  // Delete Modal
  const [deleteModal, setDeleteModal] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);

  const handleDeleteClick = (customer) => {
    setCustomerToDelete(customer);
    setDeleteModal(true);
  };

  const handleDeleteCustomer = async () => {
    if (customerToDelete) {
      try {
        await dispatch(deleteCustomer(customerToDelete._id));
        setToast({
          show: true,
          message: "Customer deleted successfully!",
          type: "success",
        });
        setDeleteModal(false);
        setCustomerToDelete(null);
      } catch (error) {
        setToast({
          show: true,
          message: error.message || "Failed to delete customer",
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
                        <Button
                          color="secondary"
                          className="btn-rounded mb-2 me-2"
                          onClick={() => {/* Implement export functionality */}}
                        >
                          <i className="bx bx-export me-1" />
                          {props.t("Export")}
                        </Button>
                        <Link
                          to="/customers/create"
                          className="btn btn-success btn-rounded waves-effect waves-light mb-2 me-2"
                        >
                          <i className="mdi mdi-plus me-1" />
                          {props.t("New Customer")}
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
                          <th>AVATAR</th>
                          <th>NAME</th>
                          <th>EMAIL</th>
                          <th>CREATED AT</th>
                          <th>STATUS</th>
                          <th>IS VENDOR?</th>
                          <th>OPERATIONS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {customers.map((customer) => (
                          <tr key={customer.id}>
                            <td>{customer.id}</td>
                            <td>
                              <img
                                src={customer.avatar}
                                alt={customer.name}
                                className="avatar-sm rounded-circle"
                              />
                            </td>
                            <td>{customer.name}</td>
                            <td>{customer.email}</td>
                            <td>{customer.createdAt}</td>
                            <td>
                              <Badge
                                color={customer.status === "Activated" ? "info" : "warning"}
                                pill
                              >
                                {customer.status}
                              </Badge>
                            </td>
                            <td>{customer.isVendor}</td>
                            <td>
                              <Button
                                color="info"
                                size="sm"
                                className="me-2"
                                tag={Link}
                                to={`/customers/edit/${customer.id}`}
                                title="Edit"
                              >
                                <i className="bx bx-pencil" />
                              </Button>
                              <Button
                                color="danger"
                                size="sm"
                                onClick={() => handleDeleteClick(customer)}
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
            <h5 className="modal-title">Delete Customer</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setDeleteModal(false)}
            />
          </div>
          <div className="modal-body">
            Are you sure you want to delete this customer?
          </div>
          <div className="modal-footer">
            <Button color="secondary" onClick={() => setDeleteModal(false)}>
              Cancel
            </Button>
            <Button color="danger" onClick={handleDeleteCustomer}>
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

Customers.propTypes = {
  t: PropTypes.func,
};

export default withTranslation()(Customers);
