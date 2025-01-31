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

// Translation
import { withTranslation } from "react-i18next";

const ProductCollectionCreateOrEdit = (props) => {
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
    slug: Yup.string()
      .min(2, "Slug must be at least 2 characters")
      .required("Slug is required"),
    description: Yup.string()
      .min(2, "Description must be at least 2 characters")
      .required("Description is required"),
    image: Yup.mixed().required("Image is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      slug: "",
      description: "",
      status: "Published",
      isFeatured: false,
      image: null,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form Values:", values);
      // Simulate success
      setToast({
        show: true,
        message: "Collection saved successfully!",
        type: "success",
      });
      setTimeout(() => navigate("/product-collections"), 1500);
    },
  });

  // Handle file change
  const handleFileChange = (event) => {
    formik.setFieldValue("image", event.currentTarget.files[0]);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title={props.t("Product Collections")}
            breadcrumbItem={props.t(
              id ? "Edit Collection" : "Create Collection"
            )}
          />

          <Form onSubmit={formik.handleSubmit}>
            <Row>
              {/* Main Content - Left Column */}
              <Col lg="8">
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
                        <Label htmlFor="slug">
                          {props.t("Slug")}{" "}
                          <span className="text-danger">*</span>
                        </Label>
                        <Input
                          type="text"
                          id="slug"
                          name="slug"
                          value={formik.values.slug}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={`form-control ${
                            formik.touched.slug && formik.errors.slug
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        {formik.touched.slug && formik.errors.slug && (
                          <div className="invalid-feedback">
                            {formik.errors.slug}
                          </div>
                        )}
                      </FormGroup>

                      <FormGroup className="mb-4">
                        <Label htmlFor="description">
                          {props.t("Description")}{" "}
                          <span className="text-danger">*</span>
                        </Label>
                        <Input
                          type="textarea"
                          id="description"
                          name="description"
                          rows="5"
                          value={formik.values.description}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={`form-control ${
                            formik.touched.description &&
                            formik.errors.description
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        {formik.touched.description &&
                          formik.errors.description && (
                            <div className="invalid-feedback">
                              {formik.errors.description}
                            </div>
                          )}
                      </FormGroup>
                    </div>
                  </CardBody>
                </Card>
              </Col>

              {/* Sidebar - Right Column */}
              <Col lg="4">
                <Card>
                  <CardBody>
                    <h5 className="card-title mb-4">{props.t("Publish")}</h5>

                    <div className="d-grid gap-2">
                      <Button type="submit" color="primary">
                        {props.t("Save")}
                      </Button>
                      <Button
                        color="secondary"
                        onClick={() => {
                          formik.handleSubmit();
                          navigate("/product-collections");
                        }}
                      >
                        {props.t("Save & Exit")}
                      </Button>
                    </div>
                  </CardBody>
                </Card>

                <Card>
                  <CardBody>
                    <h5 className="card-title mb-4">{props.t("Status")}</h5>
                    <FormGroup>
                      <Input
                        type="select"
                        name="status"
                        value={formik.values.status}
                        onChange={formik.handleChange}
                      >
                        <option value="Published">Published</option>
                        <option value="Draft">Draft</option>
                        <option value="Pending">Pending</option>
                      </Input>
                    </FormGroup>

                    <FormGroup className="mt-4">
                      <div className="form-check form-switch">
                        <Input
                          type="switch"
                          name="isFeatured"
                          id="isFeatured"
                          checked={formik.values.isFeatured}
                          onChange={formik.handleChange}
                        />
                        <Label
                          className="form-check-label"
                          htmlFor="isFeatured"
                        >
                          {props.t("Is Featured?")}
                        </Label>
                      </div>
                    </FormGroup>
                  </CardBody>
                </Card>

                <Card>
                  <CardBody>
                    <h5 className="card-title mb-4">{props.t("Image")}</h5>
                    <FormGroup>
                      <div className="border rounded p-3 text-center mb-2">
                        {formik.values.image ? (
                          <div className="preview-image">
                            <img
                              src={URL.createObjectURL(formik.values.image)}
                              alt="Preview"
                              style={{ maxWidth: "100%", maxHeight: "150px" }}
                            />
                          </div>
                        ) : (
                          <div className="upload-placeholder">
                            <i className="bx bx-image-add h1 text-muted"></i>
                            <p className="text-muted mb-0">Choose Image</p>
                          </div>
                        )}
                      </div>
                      <Input
                        type="file"
                        onChange={handleFileChange}
                        className={`form-control ${
                          formik.touched.image && formik.errors.image
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {formik.touched.image && formik.errors.image && (
                        <div className="invalid-feedback">
                          {formik.errors.image}
                        </div>
                      )}
                    </FormGroup>
                  </CardBody>
                </Card>
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

ProductCollectionCreateOrEdit.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation()(ProductCollectionCreateOrEdit);
