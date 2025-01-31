import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
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
  InputGroup,
  Toast,
  ToastHeader,
  ToastBody,
} from "reactstrap";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import {
  createBrand,
  updateBrand,
  deleteBrand,
} from "../../store/brands/actions";
import PublishCard from "../../components/Common/PublishCard";

// Translation
import { withTranslation } from "react-i18next";

const BrandCreateOrEdit = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { brands = [] } = useSelector((state) => state.brands || {});
  const editedBrand = id ? brands.find((brand) => brand._id === id) : null;

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
    description: Yup.string()
      .min(2, "Description must be at least 2 characters")
      .required("Description is required"),
    website: Yup.string().url("Please enter a valid URL").nullable(),
    logo: Yup.mixed().required("Logo is required"),
    // ... other optional fields don't need validation
  });

  // Add loading state from Redux
  const { loading } = useSelector((state) => state.brands);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      website: "",
      order: "",
      seoTitle: "",
      seoDescription: "",
      seoIndex: "true",
      isFeatured: "false",
      status: "active",
      logo: null,
      seoImage: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const formDataToSend = new FormData();

        // Log the values being sent
        console.log("Form Values:", values);

        // Append all text fields
        Object.keys(values).forEach((key) => {
          if (key !== "logo" && key !== "seoImage") {
            formDataToSend.append(key, values[key]);
          }
        });

        // Append files
        if (values.logo) {
          formDataToSend.append("logo", values.logo);
        }
        if (values.seoImage) {
          formDataToSend.append("seoImage", values.seoImage);
        }

        // Log the FormData (for debugging)
        for (let pair of formDataToSend.entries()) {
          console.log(pair[0] + ": " + pair[1]);
        }

        if (id) {
          await handleUpdateBrand(formDataToSend);
        } else {
          const actionResult = await dispatch(
            createBrand(formDataToSend)
          ).unwrap();
          console.log("Action Result:", actionResult);

          setToast({
            show: true,
            message: "Brand created successfully!",
            type: "success",
          });
          setTimeout(() => navigate("/brands"), 2000);
        }
      } catch (error) {
        console.error("Submission Error:", error);
        setToast({
          show: true,
          message: error.message || "An error occurred while saving the brand",
          type: "danger",
        });
      }
    },
  });

  // Load brand data if in edit mode
  useEffect(() => {
    if (editedBrand) {
      formik.setValues({
        name: editedBrand.name || "",
        description: editedBrand.description || "",
        website: editedBrand.website || "",
        order: editedBrand.order || "",
        seoTitle: editedBrand.seoTitle || "",
        seoDescription: editedBrand.seoDescription || "",
        seoIndex: editedBrand.seoIndex?.toString() || "true",
        isFeatured: editedBrand.isFeatured?.toString() || "false",
        status: editedBrand.status || "active",
        logo: null,
        seoImage: null,
      });
    }
  }, [editedBrand]);

  // Update file handling
  const handleFileChange = (event, fieldName) => {
    formik.setFieldValue(fieldName, event.currentTarget.files[0]);
  };

  // Sample categories data structure
  const categories = [
    {
      id: 1,
      name: "Electronics",
      subCategories: [
        { id: 11, name: "Phones" },
        { id: 12, name: "Laptops" },
      ],
    },
    {
      id: 2,
      name: "Fashion",
      subCategories: [
        { id: 21, name: "Men" },
        { id: 22, name: "Women" },
      ],
    },
  ];

  // Add a function to handle deletion
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this brand?")) {
      dispatch(deleteBrand(id))
        .then(() => {
          setToast({
            show: true,
            message: "Brand deleted successfully!",
            type: "success",
          });
          setTimeout(() => {
            navigate("/brands");
          }, 1500);
        })
        .catch((error) => {
          setToast({
            show: true,
            message: error.message || "Error deleting brand",
            type: "danger",
          });
        });
    }
  };

  const handleUpdateBrand = async (values) => {
    try {
      await dispatch(updateBrand(id, values));
      setToast({
        show: true,
        message: "Brand updated successfully!",
        type: "success",
      });
      setTimeout(() => navigate("/brands"), 2000);
    } catch (error) {
      setToast({
        show: true,
        message: error.message || "Failed to update brand",
        type: "danger",
      });
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title={props.t("Brands")}
            breadcrumbItem={props.t(id ? "Edit Brand" : "Create Brand")}
          />

          <Form onSubmit={formik.handleSubmit}>
            <Row>
              {/* Main Content - Left Column */}
              <Col lg="9">
                <Card>
                  <CardBody>
                    {/* Basic Information */}
                    <div className="mb-4">
                      <h5 className="card-title mb-4">
                        {props.t("Basic Information")}
                      </h5>

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
                        <Label htmlFor="permalink">
                          {props.t("Permalink")}
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="permalink"
                          name="permalink"
                        />
                      </FormGroup>

                      <FormGroup className="mb-4">
                        <Label htmlFor="description">
                          {props.t("Description")}{" "}
                          <span className="text-danger">*</span>
                        </Label>
                        <Input
                          type="textarea"
                          className={`form-control ${
                            formik.touched.description &&
                            formik.errors.description
                              ? "is-invalid"
                              : ""
                          }`}
                          id="description"
                          name="description"
                          rows="5"
                          value={formik.values.description}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.description &&
                          formik.errors.description && (
                            <div className="invalid-feedback">
                              {formik.errors.description}
                            </div>
                          )}
                      </FormGroup>

                      <FormGroup className="mb-4">
                        <Label htmlFor="website">{props.t("Website")}</Label>
                        <Input
                          type="url"
                          className={`form-control ${
                            formik.touched.website && formik.errors.website
                              ? "is-invalid"
                              : ""
                          }`}
                          id="website"
                          name="website"
                          value={formik.values.website}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.website && formik.errors.website && (
                          <div className="invalid-feedback">
                            {formik.errors.website}
                          </div>
                        )}
                      </FormGroup>
                    </div>

                    {/* SEO Section */}
                    <div className="mb-4">
                      <h5 className="card-title mb-4">
                        {props.t("SEO Settings")}
                      </h5>

                      <FormGroup className="mb-4">
                        <Label htmlFor="seoTitle">{props.t("SEO Title")}</Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="seoTitle"
                          name="seoTitle"
                          value={formik.values.seoTitle}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </FormGroup>

                      <FormGroup className="mb-4">
                        <Label htmlFor="seoDescription">
                          {props.t("SEO Description")}
                        </Label>
                        <Input
                          type="textarea"
                          className="form-control"
                          id="seoDescription"
                          name="seoDescription"
                          rows="3"
                          value={formik.values.seoDescription}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </FormGroup>

                      <FormGroup className="mb-4">
                        <Label>{props.t("Index Settings")}</Label>
                        <div>
                          <div className="form-check form-check-inline">
                            <Input
                              type="radio"
                              id="indexTrue"
                              name="seoIndex"
                              className="form-check-input"
                              value="true"
                              checked={formik.values.seoIndex === "true"}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                            <Label
                              className="form-check-label"
                              htmlFor="indexTrue"
                            >
                              Index
                            </Label>
                          </div>
                          <div className="form-check form-check-inline">
                            <Input
                              type="radio"
                              id="indexFalse"
                              name="seoIndex"
                              className="form-check-input"
                              value="false"
                              checked={formik.values.seoIndex === "false"}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                            <Label
                              className="form-check-label"
                              htmlFor="indexFalse"
                            >
                              No Index
                            </Label>
                          </div>
                        </div>
                      </FormGroup>
                    </div>
                  </CardBody>
                </Card>

                {/* Categories Card */}
                <Card>
                  <CardBody>
                    <h5 className="card-title mb-4">{props.t("Categories")}</h5>

                    <FormGroup className="mb-4">
                      <InputGroup>
                        <Input
                          type="text"
                          placeholder="Search categories..."
                          value={formik.values.categorySearch}
                          onChange={(e) => {
                            formik.setFieldValue(
                              "categorySearch",
                              e.target.value
                            );
                          }}
                        />
                        <Button color="primary">
                          <i className="bx bx-search"></i>
                        </Button>
                      </InputGroup>
                    </FormGroup>

                    <div
                      className="category-tree p-3 border rounded"
                      style={{ maxHeight: "400px", overflowY: "auto" }}
                    >
                      {categories.map((category) => (
                        <div key={category.id} className="mb-3">
                          <div className="form-check">
                            <Input
                              type="checkbox"
                              className="form-check-input"
                              id={`category-${category.id}`}
                            />
                            <Label
                              className="form-check-label fw-bold"
                              htmlFor={`category-${category.id}`}
                            >
                              {category.name}
                            </Label>
                          </div>
                          <div className="ms-4">
                            {category.subCategories.map((subCat) => (
                              <div className="form-check" key={subCat.id}>
                                <Input
                                  type="checkbox"
                                  className="form-check-input"
                                  id={`subcategory-${subCat.id}`}
                                />
                                <Label
                                  className="form-check-label"
                                  htmlFor={`subcategory-${subCat.id}`}
                                >
                                  {subCat.name}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </Col>

              {/* Sidebar - Right Column */}
              <Col lg={3}>
                <PublishCard
                  onSave={formik.handleSubmit}
                  cancelLink="/brands"
                />
              </Col>
            </Row>
          </Form>
        </Container>

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

BrandCreateOrEdit.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation()(BrandCreateOrEdit);
