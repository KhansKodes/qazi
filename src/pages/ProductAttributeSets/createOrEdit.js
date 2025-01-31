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
  Table,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { withTranslation } from "react-i18next";

const ProductAttributeSetCreateOrEdit = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [attributes, setAttributes] = useState([
    {
      id: 1,
      isDefault: true,
      title: "",
      color: "",
      image: null,
    },
  ]);

  // Validation schema
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    status: Yup.string().required("Status is required"),
    displayLayout: Yup.string().required("Display Layout is required"),
    sortOrder: Yup.number().min(0),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      useImageFromVariation: false,
      status: "Published",
      displayLayout: "Dropdown Swatch",
      searchable: false,
      comparable: false,
      usedInProductListing: false,
      sortOrder: 0,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleAddAttribute = () => {
    setAttributes([
      ...attributes,
      {
        id: attributes.length + 1,
        isDefault: false,
        title: "",
        color: "",
        image: null,
      },
    ]);
  };

  const handleRemoveAttribute = (id) => {
    setAttributes(attributes.filter((attr) => attr.id !== id));
  };

  const handleDefaultChange = (id) => {
    setAttributes(
      attributes.map((attr) => ({
        ...attr,
        isDefault: attr.id === id,
      }))
    );
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title={props.t("Product Attribute Sets")}
            breadcrumbItem={props.t(
              id ? "Edit Attribute Set" : "Create Attribute Set"
            )}
          />

          <Form onSubmit={formik.handleSubmit}>
            <Row>
              <Col lg="8">
                <Card>
                  <CardBody>
                    <FormGroup className="mb-4">
                      <Label htmlFor="title">
                        {props.t("Title")}{" "}
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        id="title"
                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`form-control ${
                          formik.touched.title && formik.errors.title
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {formik.touched.title && formik.errors.title && (
                        <div className="invalid-feedback">
                          {formik.errors.title}
                        </div>
                      )}
                    </FormGroup>

                    <FormGroup className="mb-4">
                      <div className="form-check form-switch">
                        <Input
                          type="switch"
                          id="useImageFromVariation"
                          name="useImageFromVariation"
                          checked={formik.values.useImageFromVariation}
                          onChange={formik.handleChange}
                        />
                        <Label
                          className="form-check-label"
                          htmlFor="useImageFromVariation"
                        >
                          {props.t(
                            "Use image from product variation (for Visual Swatch only)"
                          )}
                        </Label>
                      </div>
                    </FormGroup>

                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="mb-0">{props.t("Attributes List")}</h5>
                      <Button color="primary" onClick={handleAddAttribute}>
                        <i className="bx bx-plus me-1"></i>
                        {props.t("Add new attribute")}
                      </Button>
                    </div>

                    <div className="table-responsive">
                      <Table className="table-centered table-nowrap mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>{props.t("ID")}</th>
                            <th>{props.t("Is Default?")}</th>
                            <th>{props.t("Title")}</th>
                            <th>{props.t("Color")}</th>
                            <th>{props.t("Image")}</th>
                            <th>{props.t("Remove")}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {attributes.map((attr) => (
                            <tr key={attr.id}>
                              <td className="text-center align-middle">
                                {attr.id}
                              </td>
                              <td className="text-center align-middle">
                                <Input
                                  type="radio"
                                  name="defaultAttribute"
                                  checked={attr.isDefault}
                                  onChange={() => handleDefaultChange(attr.id)}
                                />
                              </td>
                              <td>
                                <Input
                                  type="text"
                                  className={
                                    attr.isDefault ? "text-success" : ""
                                  }
                                  value={attr.title}
                                  onChange={(e) => {
                                    const newAttributes = [...attributes];
                                    const index = newAttributes.findIndex(
                                      (a) => a.id === attr.id
                                    );
                                    newAttributes[index].title = e.target.value;
                                    setAttributes(newAttributes);
                                  }}
                                />
                              </td>
                              <td>
                                <Input
                                  type="color"
                                  value={attr.color}
                                  onChange={(e) => {
                                    const newAttributes = [...attributes];
                                    const index = newAttributes.findIndex(
                                      (a) => a.id === attr.id
                                    );
                                    newAttributes[index].color = e.target.value;
                                    setAttributes(newAttributes);
                                  }}
                                  style={{ width: "50px", height: "37px" }}
                                />
                              </td>
                              <td>
                                <Input type="file" accept="image/*" />
                              </td>
                              <td className="text-center align-middle">
                                <Button
                                  color="link"
                                  className="text-danger p-0"
                                  onClick={() => handleRemoveAttribute(attr.id)}
                                >
                                  <i className="mdi mdi-delete font-size-18" />
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
                          navigate("/product-attribute-sets");
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
                  </CardBody>
                </Card>

                <Card>
                  <CardBody>
                    <h5 className="card-title mb-4">
                      {props.t("Display Layout")}
                    </h5>
                    <FormGroup>
                      <Input
                        type="select"
                        name="displayLayout"
                        value={formik.values.displayLayout}
                        onChange={formik.handleChange}
                      >
                        <option value="Dropdown Swatch">Dropdown Swatch</option>
                        <option value="Visual Swatch">Visual Swatch</option>
                        <option value="Text Swatch">Text Swatch</option>
                      </Input>
                    </FormGroup>
                  </CardBody>
                </Card>

                <Card>
                  <CardBody>
                    <h5 className="card-title mb-4">{props.t("Searchable")}</h5>
                    <FormGroup>
                      <div className="form-check form-switch">
                        <Input
                          type="switch"
                          id="searchable"
                          name="searchable"
                          checked={formik.values.searchable}
                          onChange={formik.handleChange}
                        />
                      </div>
                    </FormGroup>
                  </CardBody>
                </Card>

                <Card>
                  <CardBody>
                    <h5 className="card-title mb-4">{props.t("Comparable")}</h5>
                    <FormGroup>
                      <div className="form-check form-switch">
                        <Input
                          type="switch"
                          id="comparable"
                          name="comparable"
                          checked={formik.values.comparable}
                          onChange={formik.handleChange}
                        />
                      </div>
                    </FormGroup>
                  </CardBody>
                </Card>

                <Card>
                  <CardBody>
                    <h5 className="card-title mb-4">
                      {props.t("Used in product listing")}
                    </h5>
                    <FormGroup>
                      <div className="form-check form-switch">
                        <Input
                          type="switch"
                          id="usedInProductListing"
                          name="usedInProductListing"
                          checked={formik.values.usedInProductListing}
                          onChange={formik.handleChange}
                        />
                      </div>
                    </FormGroup>
                  </CardBody>
                </Card>

                <Card>
                  <CardBody>
                    <h5 className="card-title mb-4">{props.t("Sort order")}</h5>
                    <FormGroup>
                      <Input
                        type="number"
                        name="sortOrder"
                        value={formik.values.sortOrder}
                        onChange={formik.handleChange}
                        min="0"
                      />
                    </FormGroup>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    </React.Fragment>
  );
};

ProductAttributeSetCreateOrEdit.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation()(ProductAttributeSetCreateOrEdit);
