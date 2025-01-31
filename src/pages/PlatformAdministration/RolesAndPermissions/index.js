import React, { useState } from "react";
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
} from "reactstrap";
import { Link } from "react-router-dom";

const RolesAndPermissions = (props) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const handleDeleteClick = (role) => {
    setRoleToDelete(role);
    setDeleteModal(true);
  };

  const handleDeleteRole = async () => {
    if (roleToDelete) {
      try {
        // Add your delete logic here
        setToast({
          show: true,
          message: "Role deleted successfully!",
          type: "success",
        });
        setDeleteModal(false);
        setRoleToDelete(null);
      } catch (error) {
        setToast({
          show: true,
          message: error.message || "Failed to delete role",
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
                          to="/platform-administration/roles/create"
                          className="btn btn-success btn-rounded waves-effect waves-light mb-2 me-2"
                        >
                          <i className="mdi mdi-plus me-1" />
                          {props.t("New Role")}
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
                          <th scope="col">{props.t("Description")}</th>
                          <th scope="col">{props.t("Created At")}</th>
                          <th scope="col">{props.t("Created By")}</th>
                          <th scope="col">{props.t("Action")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Example row - you'll map through your actual data here */}
                        <tr>
                          <td>1</td>
                          <td>
                            <Link to="/platform-administration/roles/edit/1" className="text-dark">
                              {props.t("Admin")}
                            </Link>
                          </td>
                          <td>{props.t("Admin users role")}</td>
                          <td>2025-01-08</td>
                          <td>
                            <Link to="#" className="text-dark">
                              Marlen Harber
                            </Link>
                          </td>
                          <td>
                            <div className="d-flex gap-3">
                              <Link
                                to="/platform-administration/roles/edit/1"
                                className="text-success"
                              >
                                <i className="mdi mdi-pencil font-size-18" />
                              </Link>
                              <Link
                                to="#"
                                className="text-danger"
                                onClick={() => handleDeleteClick({ id: 1, name: "Admin" })}
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
          <h5 className="modal-title">{props.t("Delete Role")}</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setDeleteModal(false)}
          />
        </div>
        <div className="modal-body">
          {props.t("Are you sure you want to delete this role?")}
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
            onClick={handleDeleteRole}
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

RolesAndPermissions.propTypes = {
  t: PropTypes.func,
};

export default withTranslation()(RolesAndPermissions); 