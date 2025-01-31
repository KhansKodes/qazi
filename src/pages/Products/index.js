import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
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
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { withTranslation } from "react-i18next";

const Products = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Delete Modal
  const [deleteModal, setDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setDeleteModal(true);
  };

  const handleDeleteProduct = async () => {
    if (productToDelete) {
      try {
        // await dispatch(deleteProduct(productToDelete._id));
        setToast({
          show: true,
          message: "Product deleted successfully!",
          type: "success",
        });
        setDeleteModal(false);
        setProductToDelete(null);
      } catch (error) {
        setToast({
          show: true,
          message: error.message || "Failed to delete product",
          type: "danger",
        });
      }
    }
  };

  const handleProductTypeSelect = (type) => {
    navigate(`/products/create?type=${type}`);
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
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                          <i className="bx bx-search-alt search-icon" />
                        </div>
                      </div>
                    </Col>
                    <Col sm="8">
                      <div className="text-sm-end">
                        <UncontrolledDropdown className="d-inline mb-2 me-2">
                          <DropdownToggle
                            color="success"
                            className="btn-rounded waves-effect waves-light"
                          >
                            <i className="mdi mdi-plus me-1"></i> {props.t("Create")}
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem onClick={() => handleProductTypeSelect("physical")}>
                              <i className="bx bx-package me-2"></i>
                              {props.t("Physical")}
                            </DropdownItem>
                            <DropdownItem onClick={() => handleProductTypeSelect("digital")}>
                              <i className="bx bx-download me-2"></i>
                              {props.t("Digital")}
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                    </Col>
                  </Row>

                  {/* Table */}
                  <div className="table-responsive">
                    <Table className="table align-middle table-nowrap table-hover">
                      <thead className="table-light">
                        <tr>
                          <th>ID</th>
                          <th>IMAGE</th>
                          <th>PRODUCTS</th>
                          <th>PRICE</th>
                          <th>STOCK STATUS</th>
                          <th>QUANTITY</th>
                          <th>SKU</th>
                          <th>SORT ORDER</th>
                          <th>CREATED AT</th>
                          <th>OPERATIONS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Products will be mapped here */}
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
            <h5 className="modal-title">Delete Product</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setDeleteModal(false)}
            />
          </div>
          <div className="modal-body">
            Are you sure you want to delete this product?
          </div>
          <div className="modal-footer">
            <Button color="secondary" onClick={() => setDeleteModal(false)}>
              Cancel
            </Button>
            <Button color="danger" onClick={handleDeleteProduct}>
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

Products.propTypes = {
  t: PropTypes.func,
};

export default withTranslation()(Products);
