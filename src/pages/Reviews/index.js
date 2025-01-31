import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getReviews, deleteReview } from "../../store/reviews/actions";
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

const Reviews = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { reviews = [], loading = false } = useSelector(
    (state) => state.reviews || {}
  );

  // Delete Modal
  const [deleteModal, setDeleteModal] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    dispatch(getReviews());
  }, [dispatch]);

  const handleDeleteClick = (review) => {
    setReviewToDelete(review);
    setDeleteModal(true);
  };

  const handleDeleteReview = async () => {
    if (reviewToDelete) {
      try {
        await dispatch(deleteReview(reviewToDelete._id));
        setToast({
          show: true,
          message: "Review deleted successfully!",
          type: "success",
        });
        setDeleteModal(false);
        setReviewToDelete(null);
      } catch (error) {
        setToast({
          show: true,
          message: error.message || "Failed to delete review",
          type: "danger",
        });
      }
    }
  };

  const renderStars = (count) => {
    return "★".repeat(count) + "☆".repeat(5 - count);
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
                          to="/reviews/create"
                          className="btn btn-success btn-rounded waves-effect waves-light mb-2 me-2"
                        >
                          <i className="mdi mdi-plus me-1" />
                          {props.t("New Review")}
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
                          <th>PRODUCT</th>
                          <th>USER</th>
                          <th>STAR</th>
                          <th>COMMENT</th>
                          <th>IMAGES</th>
                          <th>STATUS</th>
                          <th>CREATED AT</th>
                          <th>OPERATIONS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reviews.map((review) => (
                          <tr key={review.id}>
                            <td>{review.id}</td>
                            <td>{review.product}</td>
                            <td>{review.user}</td>
                            <td>
                              <span style={{ color: "#ffd700" }}>
                                {renderStars(review.star)}
                              </span>
                            </td>
                            <td>{review.comment}</td>
                            <td>
                              {review.images?.map((image, index) => (
                                <img
                                  key={index}
                                  src={image}
                                  alt=""
                                  className="avatar-sm rounded me-1"
                                />
                              ))}
                            </td>
                            <td>
                              <Badge
                                color={review.status === "Published" ? "success" : "warning"}
                                pill
                              >
                                {review.status}
                              </Badge>
                            </td>
                            <td>{review.createdAt}</td>
                            <td>
                              <Button
                                color="info"
                                size="sm"
                                className="me-2"
                                tag={Link}
                                to={`/reviews/edit/${review.id}`}
                                title="Edit"
                              >
                                <i className="bx bx-pencil" />
                              </Button>
                              <Button
                                color="danger"
                                size="sm"
                                onClick={() => handleDeleteClick(review)}
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
            <h5 className="modal-title">Delete Review</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setDeleteModal(false)}
            />
          </div>
          <div className="modal-body">
            Are you sure you want to delete this review?
          </div>
          <div className="modal-footer">
            <Button color="secondary" onClick={() => setDeleteModal(false)}>
              Cancel
            </Button>
            <Button color="danger" onClick={handleDeleteReview}>
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

Reviews.propTypes = {
  t: PropTypes.func,
};

export default withTranslation()(Reviews);
