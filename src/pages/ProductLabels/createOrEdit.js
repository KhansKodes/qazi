import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
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
  Toast,
  ToastHeader,
  ToastBody,
} from "reactstrap";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import PublishCard from "../../components/Common/PublishCard";

// Translation
import { withTranslation } from "react-i18next";

const ProductLabelCreateOrEdit = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .required("Name is required"),
    color: Yup.string().required("Color is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      color: "#e3e3e3",
      status: "Published",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form Values:", values);
      setToast({
        show: true,
        message: "Label saved successfully!",
        type: "success",
      });
      setTimeout(() => navigate("/product-labels"), 1500);
    },
  });

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title={props.t("Product Labels")}
            breadcrumbItem={props.t(id ? "Edit Label" : "Create Label")}
          />

          <Form onSubmit={formik.handleSubmit}>
            <Row>
              {/* Main Content - Left Column */}
              <Col lg="9">
                <Card>
                  <CardBody>
                    <div className="mb-4">
                      <FormGroup className="mb-4">
                        <Label htmlFor="name">
                          {props.t("Name")}{" "}
                          <span className="text-danger">*</span>
                        </Label>
                        <Input
                          type="text"
                          id="name"
                          name="name"
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={`form-control ${
                            formik.touched.name && formik.errors.name
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        {formik.touched.name && formik.errors.name && (
                          <div className="invalid-feedback">
                            {formik.errors.name}
                          </div>
                        )}
                      </FormGroup>

                      <FormGroup className="mb-4">
                        <Label htmlFor="color">
                          {props.t("Color")}{" "}
                          <span className="text-danger">*</span>
                        </Label>
                        <Input
                          type="color"
                          id="color"
                          name="color"
                          value={formik.values.color}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={`form-control ${
                            formik.touched.color && formik.errors.color
                              ? "is-invalid"
                              : ""
                          }`}
                          style={{ height: "50px", width: "10%" }}
                        />
                        {formik.touched.color && formik.errors.color && (
                          <div className="invalid-feedback">
                            {formik.errors.color}
                          </div>
                        )}
                      </FormGroup>
                    </div>
                  </CardBody>
                </Card>
              </Col>

              {/* Sidebar - Right Column */}
              <Col lg={3}>
                <PublishCard
                  onSave={formik.handleSubmit}
                  cancelLink="/product-labels"
                />
              </Col>
            </Row>
          </Form>
        </Container>

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
      </div>
    </React.Fragment>
  );
};

ProductLabelCreateOrEdit.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation()(ProductLabelCreateOrEdit);
