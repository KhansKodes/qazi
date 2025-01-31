import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getDiscounts, deleteDiscount } from "../../store/discounts/actions";
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
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { withTranslation } from "react-i18next";

const Discounts = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { discounts = [], loading = false } = useSelector(
    (state) => state.discounts || {}
  );

  // Delete Modal
  const [deleteModal, setDeleteModal] = useState(false);
  const [discountToDelete, setDiscountToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    dispatch(getDiscounts());
  }, [dispatch]);

  const handleDeleteClick = (discount) => {
    setDiscountToDelete(discount);
    setDeleteModal(true);
  };

  const handleDeleteDiscount = async () => {
    if (discountToDelete) {
      try {
        await dispatch(deleteDiscount(discountToDelete._id));
        setToast({
          show: true,
          message: "Discount deleted successfully!",
          type: "success",
        });
        setDeleteModal(false);
        setDiscountToDelete(null);
      } catch (error) {
        setToast({
          show: true,
          message: error.message || "Failed to delete discount",
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
                          to="/discounts/create"
                          className="btn btn-success btn-rounded waves-effect waves-light mb-2 me-2"
                        >
                          <i className="mdi mdi-plus me-1" />
                          {props.t("New Discount")}
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
                          <th>DETAIL</th>
                          <th>USED</th>
                          <th>START DATE</th>
                          <th>END DATE</th>
                          <th>STORE</th>
                          <th>OPERATIONS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {discounts.map((discount) => (
                          <tr key={discount.id}>
                            <td>{discount.id}</td>
                            <td>
                              <div className="text-primary fw-medium mb-1">
                                COUPON CODE: {discount.detail.code}{" "}
                                <i className="bx bx-copy cursor-pointer" />
                              </div>
                              <div>{discount.detail.description}</div>
                              <div className="text-warning fst-italic">
                                {discount.detail.note}
                              </div>
                            </td>
                            <td>{discount.used}</td>
                            <td>{discount.startDate}</td>
                            <td>{discount.endDate}</td>
                            <td>{discount.store}</td>
                            <td>
                              <Button
                                color="info"
                                size="sm"
                                className="me-2"
                                tag={Link}
                                to={`/discounts/edit/${discount.id}`}
                                title="Edit"
                              >
                                <i className="bx bx-pencil" />
                              </Button>
                              <Button
                                color="danger"
                                size="sm"
                                onClick={() => handleDeleteClick(discount)}
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
            <h5 className="modal-title">Delete Discount</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setDeleteModal(false)}
            />
          </div>
          <div className="modal-body">
            Are you sure you want to delete this discount?
          </div>
          <div className="modal-footer">
            <Button color="secondary" onClick={() => setDeleteModal(false)}>
              Cancel
            </Button>
            <Button color="danger" onClick={handleDeleteDiscount}>
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

Discounts.propTypes = {
  t: PropTypes.func,
};

export default withTranslation()(Discounts);
