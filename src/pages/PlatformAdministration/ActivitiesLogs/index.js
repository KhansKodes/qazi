import React, { useState } from 'react';
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Card,
  CardBody,
  Container,
  Input,
  Modal,
  Toast,
  ToastHeader,
  ToastBody,
} from 'reactstrap';
import { Link } from "react-router-dom";

const ActivityLog = (props) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [logToDelete, setLogToDelete] = useState(null);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const handleDeleteClick = (log) => {
    setLogToDelete(log);
    setDeleteModal(true);
  };

  const handleDeleteLog = async () => {
    if (logToDelete) {
      try {
        // Add your delete logic here
        setToast({
          show: true,
          message: "Log deleted successfully!",
          type: "success",
        });
        setDeleteModal(false);
        setLogToDelete(null);
      } catch (error) {
        setToast({
          show: true,
          message: error.message || "Failed to delete log",
          type: "danger",
        });
      }
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
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
                        <button
                          type="button"
                          className="btn btn-danger btn-rounded waves-effect waves-light mb-2 me-2"
                          onClick={() => handleDeleteClick({ id: 'all' })}
                        >
                          <i className="mdi mdi-trash-can me-1" />
                          {props.t("Clear All Logs")}
                        </button>
                      </div>
                    </Col>
                  </Row>

                  <div className="table-responsive">
                    <table className="table align-middle table-nowrap table-hover">
                      <thead className="table-light">
                        <tr>
                          <th scope="col">{props.t("ID")}</th>
                          <th scope="col">{props.t("User")}</th>
                          <th scope="col">{props.t("Action")}</th>
                          <th scope="col">{props.t("Model")}</th>
                          <th scope="col">{props.t("Time")}</th>
                          <th scope="col">{props.t("Action")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Example row - you'll map through your actual data here */}
                        <tr>
                          <td>1</td>
                          <td>
                            <Link to="#" className="text-dark">
                              admin@example.com
                            </Link>
                          </td>
                          <td>Created</td>
                          <td>Product</td>
                          <td>2024-01-31 10:30 AM</td>
                          <td>
                            <div className="d-flex gap-3">
                              <Link
                                to="#"
                                className="text-primary"
                                title="View Details"
                              >
                                <i className="mdi mdi-eye font-size-18" />
                              </Link>
                              <Link
                                to="#"
                                className="text-danger"
                                onClick={() => handleDeleteClick({ id: 1 })}
                              >
                                <i className="mdi mdi-delete font-size-18" />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Delete Modal */}
      <Modal isOpen={deleteModal} toggle={() => setDeleteModal(!deleteModal)}>
        <div className="modal-header">
          <h5 className="modal-title">
            {logToDelete?.id === 'all'
              ? props.t("Clear All Logs")
              : props.t("Delete Log")}
          </h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setDeleteModal(false)}
          />
        </div>
        <div className="modal-body">
          {logToDelete?.id === 'all'
            ? props.t("Are you sure you want to clear all activity logs?")
            : props.t("Are you sure you want to delete this log?")}
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
            onClick={handleDeleteLog}
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

ActivityLog.propTypes = {
  t: PropTypes.func,
};

export default withTranslation()(ActivityLog);
