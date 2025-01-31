import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Card,
  CardBody,
  Table,
  Container,
  Input,
  Modal,
  Toast,
  ToastHeader,
  ToastBody,
} from "reactstrap";
import { Link } from "react-router-dom";

const Users = (props) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setDeleteModal(true);
  };

  const handleDeleteUser = async () => {
    if (userToDelete) {
      try {
        // Add your delete logic here
        setToast({
          show: true,
          message: "User deleted successfully!",
          type: "success",
        });
        setDeleteModal(false);
        setUserToDelete(null);
      } catch (error) {
        setToast({
          show: true,
          message: error.message || "Failed to delete user",
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
                        <Link
                          to="/platform-administration/users/create"
                          className="btn btn-success btn-rounded waves-effect waves-light mb-2 me-2"
                        >
                          <i className="mdi mdi-plus me-1" />
                          {props.t("New User")}
                        </Link>
                      </div>
                    </Col>
                  </Row>

                  <div className="table-responsive">
                    <table className="table align-middle table-nowrap table-hover">
                      <thead className="table-light">
                        <tr>
                          <th scope="col">{props.t("Username")}</th>
                          <th scope="col">{props.t("Email")}</th>
                          <th scope="col">{props.t("Role")}</th>
                          <th scope="col">{props.t("Created At")}</th>
                          <th scope="col">{props.t("Status")}</th>
                          <th scope="col">{props.t("Is Super?")}</th>
                          <th scope="col">{props.t("Action")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Sample data - replace with your actual data mapping */}
                        <tr>
                          <td>admin</td>
                          <td>admin@example.com</td>
                          <td>Administrator</td>
                          <td>2024-01-31</td>
                          <td>
                            <span className="badge badge-pill badge-soft-success font-size-11">
                              active
                            </span>
                          </td>
                          <td>
                            <span className="badge badge-pill badge-soft-primary font-size-11">
                              Yes
                            </span>
                          </td>
                          <td>
                            <div className="d-flex gap-3">
                              <Link
                                to="/platform-administration/users/edit/1"
                                className="text-success"
                              >
                                <i className="mdi mdi-pencil font-size-18" />
                              </Link>
                              <Link
                                to="#"
                                className="text-danger"
                                onClick={() => handleDeleteClick({ id: 1, name: "admin" })}
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
          <h5 className="modal-title">{props.t("Delete User")}</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setDeleteModal(false)}
          />
        </div>
        <div className="modal-body">
          {props.t("Are you sure you want to delete this user?")}
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
            onClick={handleDeleteUser}
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

Users.propTypes = {
  t: PropTypes.func,
};

export default withTranslation()(Users); 