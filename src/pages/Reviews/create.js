import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReview } from "../../store/reviews/actions";
import {
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Container,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import PublishCard from "../../components/Common/PublishCard";

const CreateReview = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    product: "",
    selectedCustomer: "",
    customerName: "",
    customerEmail: "",
    star: "5",
    comment: "",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e, exit) => {
    e.preventDefault();
    try {
      const reviewData = {
        product: formData.product,
        user: formData.selectedCustomer || {
          name: formData.customerName,
          email: formData.customerEmail,
        },
        star: parseInt(formData.star),
        comment: formData.comment,
        images: formData.images,
      };
      await dispatch(createReview(reviewData));
      if (exit) {
        navigate("/reviews");
      }
    } catch (error) {
      console.error("Failed to create review:", error);
    }
  };

  return (
    <div className="page-content">
      <Container fluid>
        <Row>
          <Col lg={9}>
            <Card>
              <CardBody>
                <Form onSubmit={(e) => handleSubmit(e, false)}>
                  <FormGroup>
                    <Label for="product" className="required">
                      {props.t("Product")}
                    </Label>
                    <Input
                      type="select"
                      name="product"
                      id="product"
                      value={formData.product}
                      onChange={handleChange}
                      required
                    >
                      <option value="">--Select--</option>
                      {/* Add product options here */}
                    </Input>
                  </FormGroup>

                  <FormGroup>
                    <Label>{props.t("Choose from existing customers")}</Label>
                    <Input
                      type="select"
                      name="selectedCustomer"
                      value={formData.selectedCustomer}
                      onChange={handleChange}
                    >
                      <option value="">--Select--</option>
                      {/* Add customer options here */}
                    </Input>
                    <small className="form-text text-muted">
                      {props.t("Choose a customer to leave a review as them. If you want to enter the customer details manually, leave empty this field and fill the customer name and email fields below.")}
                    </small>
                  </FormGroup>

                  <div className="mt-4">
                    <Label>{props.t("Or enter manually customer details:")}</Label>
                    <FormGroup>
                      <Label for="customerName">
                        {props.t("Customer name")}
                      </Label>
                      <Input
                        type="text"
                        name="customerName"
                        id="customerName"
                        value={formData.customerName}
                        onChange={handleChange}
                        disabled={!!formData.selectedCustomer}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label for="customerEmail">
                        {props.t("Customer email")}
                      </Label>
                      <Input
                        type="email"
                        name="customerEmail"
                        id="customerEmail"
                        placeholder="e.g: example@domain.com"
                        value={formData.customerEmail}
                        onChange={handleChange}
                        disabled={!!formData.selectedCustomer}
                      />
                    </FormGroup>
                  </div>

                  <FormGroup>
                    <Label for="star">
                      {props.t("Star")}
                    </Label>
                    <Input
                      type="select"
                      name="star"
                      id="star"
                      value={formData.star}
                      onChange={handleChange}
                    >
                      <option value="5">5</option>
                      <option value="4">4</option>
                      <option value="3">3</option>
                      <option value="2">2</option>
                      <option value="1">1</option>
                    </Input>
                  </FormGroup>

                  <FormGroup>
                    <Label for="comment" className="required">
                      {props.t("Comment")}
                    </Label>
                    <Input
                      type="textarea"
                      name="comment"
                      id="comment"
                      rows="4"
                      value={formData.comment}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="images">
                      {props.t("Images")}
                    </Label>
                    <div
                      className="dropzone-container p-4 text-center border rounded"
                      style={{ cursor: "pointer" }}
                      onClick={() => document.getElementById("images").click()}
                    >
                      <i className="bx bx-image-add h1 mb-2"></i>
                      <p>{props.t("Click here to add more images.")}</p>
                      <Input
                        type="file"
                        name="images"
                        id="images"
                        multiple
                        style={{ display: "none" }}
                        onChange={(e) => {
                          // Handle image upload logic here
                        }}
                      />
                    </div>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>

          <Col lg={3}>
            <PublishCard
              onSave={handleSubmit}
              cancelLink="/reviews"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

CreateReview.propTypes = {
  t: PropTypes.func,
};

export default withTranslation()(CreateReview); 