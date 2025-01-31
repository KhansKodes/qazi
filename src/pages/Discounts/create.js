import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createDiscount } from "../../store/discounts/actions";
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

const CreateDiscount = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    discountType: "Coupon code",
    couponCode: "",
    canUseWithPromotion: false,
    canUseWithFlashSale: false,
    isUnlimited: false,
    applyViaUrl: false,
    displayAtCheckout: false,
    discountAmount: 0,
    discountUnit: "$",
    applyFor: "All orders",
    startDate: "",
    startTime: "0:00",
    endDate: "",
    endTime: "23:59",
    neverExpire: false,
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const generateCouponCode = () => {
    // Generate a random coupon code (you can customize this logic)
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    setFormData(prev => ({ ...prev, couponCode: code }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const discountData = {
        ...formData,
        startDate: formData.startDate + " " + formData.startTime,
        endDate: formData.neverExpire ? null : formData.endDate + " " + formData.endTime,
      };
      await dispatch(createDiscount(discountData));
      navigate("/discounts");
    } catch (error) {
      console.error("Failed to create discount:", error);
    }
  };

  return (
    <div className="page-content">
      <Container fluid>
        <Row>
          <Col lg={8}>
            <Card>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label>{props.t("Select type of discount")}</Label>
                    <Input
                      type="select"
                      name="discountType"
                      value={formData.discountType}
                      onChange={handleChange}
                    >
                      <option value="Coupon code">Coupon code</option>
                      <option value="Promotion">Promotion</option>
                    </Input>
                  </FormGroup>

                  <FormGroup>
                    <Label>{props.t("Create coupon code")}</Label>
                    <div className="d-flex">
                      <Input
                        type="text"
                        name="couponCode"
                        value={formData.couponCode}
                        onChange={handleChange}
                        className="me-2"
                      />
                      <Button
                        color="primary"
                        type="button"
                        onClick={generateCouponCode}
                      >
                        {props.t("Generate coupon code")}
                      </Button>
                    </div>
                    <small className="form-text text-muted">
                      {props.t("Customers will enter this coupon code when they checkout.")}
                    </small>
                  </FormGroup>

                  <FormGroup className="mb-3">
                    <div className="d-flex align-items-center">
                      <Input
                        type="checkbox"
                        id="canUseWithPromotion"
                        name="canUseWithPromotion"
                        checked={formData.canUseWithPromotion}
                        onChange={handleChange}
                        className="me-2"
                      />
                      <Label for="canUseWithPromotion">
                        {props.t("Can be used with promotion?")}
                      </Label>
                    </div>
                  </FormGroup>

                  <FormGroup className="mb-3">
                    <div className="d-flex align-items-center">
                      <Input
                        type="checkbox"
                        id="canUseWithFlashSale"
                        name="canUseWithFlashSale"
                        checked={formData.canUseWithFlashSale}
                        onChange={handleChange}
                        className="me-2"
                      />
                      <Label for="canUseWithFlashSale">
                        {props.t("Can be used with flash sale?")}
                      </Label>
                    </div>
                    <small className="form-text text-muted ms-4">
                      {props.t("Allows customers to apply the coupon to items already on flash sale, enabling combined discounts.")}
                    </small>
                  </FormGroup>

                  <FormGroup className="mb-3">
                    <div className="d-flex align-items-center">
                      <Input
                        type="checkbox"
                        id="isUnlimited"
                        name="isUnlimited"
                        checked={formData.isUnlimited}
                        onChange={handleChange}
                        className="me-2"
                      />
                      <Label for="isUnlimited">
                        {props.t("Unlimited coupon?")}
                      </Label>
                    </div>
                  </FormGroup>

                  <FormGroup className="mb-3">
                    <div className="d-flex align-items-center">
                      <Input
                        type="checkbox"
                        id="applyViaUrl"
                        name="applyViaUrl"
                        checked={formData.applyViaUrl}
                        onChange={handleChange}
                        className="me-2"
                      />
                      <Label for="applyViaUrl">
                        {props.t("Apply via URL?")}
                      </Label>
                    </div>
                    <small className="form-text text-muted ms-4">
                      {props.t('This setting will apply coupon code when customers access the URL with the parameter "?coupon=code".')}
                    </small>
                  </FormGroup>

                  <FormGroup className="mb-4">
                    <div className="d-flex align-items-center">
                      <Input
                        type="checkbox"
                        id="displayAtCheckout"
                        name="displayAtCheckout"
                        checked={formData.displayAtCheckout}
                        onChange={handleChange}
                        className="me-2"
                      />
                      <Label for="displayAtCheckout">
                        {props.t("Display coupon code at the checkout page?")}
                      </Label>
                    </div>
                    <small className="form-text text-muted ms-4">
                      {props.t("The list of coupon codes will be displayed at the checkout page and customers can choose to apply.")}
                    </small>
                  </FormGroup>

                  <FormGroup>
                    <Label>{props.t("Coupon type")}</Label>
                    <Row>
                      <Col sm={3}>
                        <div className="position-relative">
                          <Input
                            type="select"
                            name="discountUnit"
                            value={formData.discountUnit}
                            onChange={handleChange}
                            className="form-control border-success"
                          >
                            <option value="$">$</option>
                            <option value="%">Percentage discount (%)</option>
                            <option value="free_shipping">Free shipping</option>
                            <option value="same_price">Same price</option>
                          </Input>
                          <i className="bx bx-check text-success position-absolute" 
                             style={{ right: "10px", top: "50%", transform: "translateY(-50%)" }}
                          />
                        </div>
                      </Col>
                      <Col sm={4}>
                        <Input
                          type="number"
                          name="discountAmount"
                          value={formData.discountAmount}
                          onChange={handleChange}
                          placeholder="Discount"
                        />
                      </Col>
                      <Col sm={5}>
                        <div className="position-relative">
                          <Input
                            type="select"
                            name="applyFor"
                            value={formData.applyFor}
                            onChange={handleChange}
                            className="form-control border-success"
                          >
                            <option value="All orders">All orders</option>
                            <option value="Order amount from">Order amount from</option>
                            <option value="Product collection">Product collection</option>
                            <option value="Product category">Product category</option>
                            <option value="Product">Product</option>
                            <option value="Customer">Customer</option>
                            <option value="Variant">Variant</option>
                            <option value="Once per customer">Once per customer</option>
                          </Input>
                          <i className="bx bx-check text-success position-absolute" 
                             style={{ right: "10px", top: "50%", transform: "translateY(-50%)" }}
                          />
                        </div>
                      </Col>
                    </Row>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>

          <Col lg={4}>
            <div className="bg-light-subtle border rounded">
              <div className="p-4">
                <h5 className="mb-4">{props.t("Publish")}</h5>
                <Button
                  color="primary"
                  className="w-100 mb-2"
                  onClick={(e) => handleSubmit(e, false)}
                >
                  {props.t("Save")}
                </Button>
                <Button
                  color="secondary"
                  className="w-100"
                  onClick={(e) => handleSubmit(e, true)}
                >
                  {props.t("Save & Exit")}
                </Button>
              </div>
            </div>

            <div className="bg-light-subtle border rounded mt-4">
              <div className="p-4">
                <FormGroup>
                  <Label>{props.t("Time")}</Label>
                  <FormGroup>
                    <Label>{props.t("Start date")}</Label>
                    <Row>
                      <Col sm={7}>
                        <Input
                          type="date"
                          name="startDate"
                          value={formData.startDate}
                          onChange={handleChange}
                        />
                      </Col>
                      <Col sm={5}>
                        <Input
                          type="time"
                          name="startTime"
                          value={formData.startTime}
                          onChange={handleChange}
                        />
                      </Col>
                    </Row>
                  </FormGroup>

                  <FormGroup>
                    <Label>{props.t("End date")}</Label>
                    <Row>
                      <Col sm={7}>
                        <Input
                          type="date"
                          name="endDate"
                          value={formData.endDate}
                          onChange={handleChange}
                          disabled={formData.neverExpire}
                        />
                      </Col>
                      <Col sm={5}>
                        <Input
                          type="time"
                          name="endTime"
                          value={formData.endTime}
                          onChange={handleChange}
                          disabled={formData.neverExpire}
                        />
                      </Col>
                    </Row>
                  </FormGroup>

                  <FormGroup check className="mb-0">
                    <Input
                      type="checkbox"
                      id="neverExpire"
                      name="neverExpire"
                      checked={formData.neverExpire}
                      onChange={handleChange}
                    />
                    <Label for="neverExpire" check>
                      {props.t("Never expired?")}
                    </Label>
                  </FormGroup>
                </FormGroup>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

CreateDiscount.propTypes = {
  t: PropTypes.func,
};

export default withTranslation()(CreateDiscount); 