import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Input,
  Modal,
  Toast,
  ToastHeader,
  ToastBody,
} from "reactstrap";
import { Link } from "react-router-dom";

// Translation
import { withTranslation } from "react-i18next";

const ProductLabels = (props) => {
  // Dummy data for the table
  const dummyLabels = [
    {
      _id: "LAB001",
      name: "New Arrival",
      createdAt: "2024-03-15",
      status: "Published",
    },
  ];

  const [deleteModal, setDeleteModal] = useState(false);
  const [labelToDelete, setLabelToDelete] = useState(null);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const handleDeleteClick = (label) => {
    setLabelToDelete(label);
    setDeleteModal(true);
  };

  const handleDeleteLabel = () => {
    if (labelToDelete) {
      setToast({
        show: true,
        message: "Label deleted successfully!",
        type: "success",
      });
      setDeleteModal(false);
      setLabelToDelete(null);
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Published":
        return "success";
      case "Draft":
        return "warning";
      case "Pending":
        return "info";
      default:
        return "secondary";
    }
  };

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
                          />
                          <i className="bx bx-search-alt search-icon" />
                        </div>
                      </div>
                    </Col>
                    <Col sm="8">
                      <div className="text-sm-end">
                        <Link
                          to="/product-labels/create"
                          className="btn btn-success btn-rounded waves-effect waves-light mb-2 me-2"
                        >
                          <i className="mdi mdi-plus me-1" />
                          {props.t("New Label")}
                        </Link>
                      </div>
                    </Col>
                  </Row>

                  <div className="table-responsive">
                    <table className="table align-middle table-nowrap table-hover">
                      <thead className="table-light">
                        <tr>
                          <th scope="col">{props.t("ID")}</th>
                          <th scope="col">{props.t("Name")}</th>
                          <th scope="col">{props.t("Created At")}</th>
                          <th scope="col">{props.t("Status")}</th>
                          <th scope="col">{props.t("Action")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dummyLabels.map((label, index) => (
                          <tr key={label._id || index}>
                            <td>{label._id}</td>
                            <td>{label.name}</td>
                            <td>{label.createdAt}</td>
                            <td>
                              <span
                                className={`badge badge-pill badge-soft-${getStatusBadgeColor(
                                  label.status
                                )} font-size-11`}
                              >
                                {label.status}
                              </span>
                            </td>
                            <td>
                              <div className="d-flex gap-3">
                                <Link
                                  to={`/product-labels/edit/${label._id}`}
                                  className="text-success"
                                >
                                  <i className="mdi mdi-pencil font-size-18" />
                                </Link>
                                <Link
                                  to="#"
                                  className="text-danger"
                                  onClick={() => handleDeleteClick(label)}
                                >
                                  <i className="mdi mdi-delete font-size-18" />
                                </Link>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>

      {/* Delete Modal */}
      <Modal isOpen={deleteModal} toggle={() => setDeleteModal(!deleteModal)}>
        <div className="modal-header">
          <h5 className="modal-title">{props.t("Delete Label")}</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setDeleteModal(false)}
          />
        </div>
        <div className="modal-body">
          {props.t("Are you sure you want to delete this label?")}
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setDeleteModal(false)}
          >
            {props.t("Cancel")}
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleDeleteLabel}
          >
            {props.t("Delete")}
          </button>
        </div>
      </Modal>

      {/* Toast Component */}
      <div
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 9999,
          minWidth: "250px",
        }}
      >
        <Toast
          isOpen={toast.show}
          fade
          onClose={() => setToast((prev) => ({ ...prev, show: false }))}
        >
          <ToastHeader
            toggle={() => setToast((prev) => ({ ...prev, show: false }))}
            className={`bg-${toast.type} text-white`}
          >
            {toast.type === "success" ? "Success" : "Error"}
          </ToastHeader>
          <ToastBody>{toast.message}</ToastBody>
        </Toast>
      </div>
    </React.Fragment>
  );
};

ProductLabels.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation()(ProductLabels);
