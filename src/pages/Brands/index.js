import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getBrands, deleteBrand } from "../../store/brands/actions";
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Table,
  Modal,
  Toast,
  ToastHeader,
  ToastBody,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";

// Translation
import { withTranslation } from "react-i18next";

const Brands = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { brands = [], loading = false } = useSelector(
    (state) => state.brands || {}
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  // Delete Modal
  const [deleteModal, setDeleteModal] = useState(false);
  const [brandToDelete, setBrandToDelete] = useState(null);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  const handleDeleteClick = (brand) => {
    setBrandToDelete(brand);
    setDeleteModal(true);
  };

  const handleDeleteBrand = async () => {
    if (brandToDelete) {
      try {
        await dispatch(deleteBrand(brandToDelete._id));
        setToast({
          show: true,
          message: "Brand deleted successfully!",
          type: "success",
        });
        setDeleteModal(false);
        setBrandToDelete(null);
      } catch (error) {
        setToast({
          show: true,
          message: error.message || "Failed to delete brand",
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
                          />
                          <i className="bx bx-search-alt search-icon" />
                        </div>
                      </div>
                    </Col>
                    <Col sm="8">
                      <div className="text-sm-end">
                        <Link
                          to="/brands/create"
                          className="btn btn-success btn-rounded waves-effect waves-light mb-2 me-2"
                        >
                          <i className="mdi mdi-plus me-1" />
                          {props.t("New Brand")}
                        </Link>
                      </div>
                    </Col>
                  </Row>

                  <div className="table-responsive">
                    <table className="table align-middle table-nowrap table-hover">
                      <thead className="table-light">
                        <tr>
                          <th scope="col">{props.t("ID")}</th>
                          <th scope="col">{props.t("Logo")}</th>
                          <th scope="col">{props.t("Name")}</th>
                          <th scope="col">{props.t("Description")}</th>
                          <th scope="col">{props.t("Status")}</th>
                          <th scope="col">{props.t("Action")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.isArray(brands) &&
                          brands.map((brand, index) => (
                            <tr key={brand?._id || index}>
                              <td>{brand?._id}</td>
                              <td>
                                {brand?.logo && (
                                  <img
                                    src={brand.logo}
                                    alt={brand.name}
                                    className="avatar-sm"
                                  />
                                )}
                              </td>
                              <td>{brand?.name || "N/A"}</td>
                              <td>{brand?.description || "N/A"}</td>
                              <td>
                                <span
                                  className={`badge badge-pill badge-soft-${
                                    brand?.status === "active"
                                      ? "success"
                                      : "danger"
                                  } font-size-11`}
                                >
                                  {brand?.status || "N/A"}
                                </span>
                              </td>
                              <td>
                                <div className="d-flex gap-3">
                                  <Link
                                    to={`/brands/edit/${brand?._id}`}
                                    className="text-success"
                                  >
                                    <i className="mdi mdi-pencil font-size-18" />
                                  </Link>
                                  <Link
                                    to="#"
                                    className="text-danger"
                                    onClick={() => handleDeleteClick(brand)}
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
          <h5 className="modal-title">{props.t("Delete Brand")}</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setDeleteModal(false)}
          />
        </div>
        <div className="modal-body">
          {props.t("Are you sure you want to delete this brand?")}
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
            onClick={handleDeleteBrand}
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

Brands.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation()(Brands);
