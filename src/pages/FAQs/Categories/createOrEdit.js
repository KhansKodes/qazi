import React from "react";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Button,
} from "reactstrap";
import { Formik } from "formik";
import * as Yup from "yup";

const FAQCategoryCreateOrEdit = (props) => {
  const { id } = useParams();
  const isEdit = Boolean(id);

  const initialValues = {
    name: "",
    description: "",
    order: 0,
    status: "published",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(props.t("Name is required")),
    description: Yup.string(),
    order: Yup.number(),
    status: Yup.string().required(props.t("Status is required")),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col xs={12}>
              <Card>
                <CardBody>
                  <h4 className="card-title">
                    {isEdit
                      ? props.t("Edit FAQ Category")
                      : props.t("New FAQ Category")}
                  </h4>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                    }) => (
                      <Form onSubmit={handleSubmit}>
                        <Row>
                          <Col md={6}>
                            <FormGroup>
                              <Label for="name">
                                {props.t("Category Name")} <span className="text-danger">*</span>
                              </Label>
                              <Input
                                type="text"
                                name="name"
                                id="name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                invalid={touched.name && errors.name}
                              />
                              {touched.name && errors.name && (
                                <div className="invalid-feedback d-block">
                                  {errors.name}
                                </div>
                              )}
                            </FormGroup>
                          </Col>
                          <Col md={6}>
                            <FormGroup>
                              <Label for="order">{props.t("Category Order")}</Label>
                              <Input
                                type="number"
                                name="order"
                                id="order"
                                value={values.order}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </FormGroup>
                          </Col>
                        </Row>

                        <Row>
                          <Col md={12}>
                            <FormGroup>
                              <Label for="description">
                                {props.t("Category Description")}
                              </Label>
                              <Input
                                type="textarea"
                                name="description"
                                id="description"
                                rows="4"
                                value={values.description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </FormGroup>
                          </Col>
                        </Row>

                        <Row>
                          <Col md={6}>
                            <FormGroup>
                              <Label for="status">{props.t("Status")}</Label>
                              <Input
                                type="select"
                                name="status"
                                id="status"
                                value={values.status}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option value="published">{props.t("Published")}</option>
                                <option value="draft">{props.t("Draft")}</option>
                              </Input>
                            </FormGroup>
                          </Col>
                        </Row>

                        <div className="d-flex flex-wrap gap-2">
                          <Button
                            type="submit"
                            color="primary"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Saving..." : props.t("Save")}
                          </Button>
                          <Button
                            type="submit"
                            color="secondary"
                            disabled={isSubmitting}
                          >
                            {props.t("Save & Exit")}
                          </Button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

FAQCategoryCreateOrEdit.propTypes = {
  t: PropTypes.func,
};

export default withTranslation()(FAQCategoryCreateOrEdit); 