import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
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
  Toast,
  ToastHeader,
  ToastBody,
} from "reactstrap";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import PublishCard from "../../components/Common/PublishCard";

// Translation
import { withTranslation } from "react-i18next";

const ProductOptionCreateOrEdit = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [optionValues, setOptionValues] = useState([
    { label: "", price: "", priceType: "Fixed" }, // Default empty row
  ]);

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
    type: Yup.string().required("Type is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      type: "",
      isRequired: false,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form Values:", values);
      setToast({
        show: true,
        message: "Option saved successfully!",
        type: "success",
      });
      setTimeout(() => navigate("/product-options"), 1500);
    },
  });

  const handleAddOptionValue = () => {
    setOptionValues([
      ...optionValues,
      { label: "", price: "", priceType: "Fixed" },
    ]);
  };

  const handleDeleteOptionValue = (index) => {
    const newValues = optionValues.filter((_, i) => i !== index);
    setOptionValues(newValues);
  };

  const handleOptionValueChange = (index, field, value) => {
    const newValues = [...optionValues];
    newValues[index][field] = value;
    setOptionValues(newValues);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(optionValues);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setOptionValues(items);
  };

  const renderOptionValues = () => {
    if (!["Dropdown", "Checkbox", "RadioButton"].includes(formik.values.type)) {
      return (
        <div className="alert alert-info">
          {props.t("Please choose option type!")}
        </div>
      );
    }

    return (
      <>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="optionValues">
            {(provided) => (
              <Table className="table-centered table-nowrap mb-0">
                <thead className="table-light">
                  <tr>
                    <th scope="col" style={{ width: "50px" }}>
                      #
                    </th>
                    <th scope="col">{props.t("Label")}</th>
                    <th scope="col">{props.t("Price")}</th>
                    <th scope="col">{props.t("Price Type")}</th>
                    <th scope="col" style={{ width: "80px" }}>
                      {props.t("Operations")}
                    </th>
                  </tr>
                </thead>
                <tbody {...provided.droppableProps} ref={provided.innerRef}>
                  {optionValues.map((value, index) => (
                    <Draggable
                      key={index}
                      draggableId={`option-${index}`}
                      index={index}
                    >
                      {(provided) => (
                        <tr
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <td className="text-center align-middle">
                            <div
                              {...provided.dragHandleProps}
                              style={{
                                cursor: "move",
                                height: "100%",
                                width: "100%",
                              }}
                            >
                              <i className="bx bx-move font-size-18" />
                            </div>
                          </td>
                          <td>
                            <Input
                              type="text"
                              placeholder={props.t("Please fill label")}
                              value={value.label}
                              onChange={(e) =>
                                handleOptionValueChange(
                                  index,
                                  "label",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td>
                            <Input
                              type="text"
                              placeholder={props.t("Please fill affect price")}
                              value={value.price}
                              onChange={(e) =>
                                handleOptionValueChange(
                                  index,
                                  "price",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td>
                            <Input
                              type="select"
                              value={value.priceType}
                              onChange={(e) =>
                                handleOptionValueChange(
                                  index,
                                  "priceType",
                                  e.target.value
                                )
                              }
                            >
                              <option value="Fixed">Fixed</option>
                              <option value="Percent">Percent</option>
                            </Input>
                          </td>
                          <td className="text-center align-middle">
                            <Button
                              color="link"
                              className="text-danger p-0"
                              onClick={() => handleDeleteOptionValue(index)}
                            >
                              <i className="mdi mdi-delete font-size-18" />
                            </Button>
                          </td>
                        </tr>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </tbody>
              </Table>
            )}
          </Droppable>
        </DragDropContext>
        <div className="mt-3">
          <Button color="soft-success" onClick={handleAddOptionValue}>
            <i className="bx bx-plus me-1"></i>
            {props.t("Add new row")}
          </Button>
        </div>
      </>
    );
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title={props.t("Product Options")}
            breadcrumbItem={props.t(id ? "Edit Option" : "Create Option")}
          />

          <Form onSubmit={formik.handleSubmit}>
            <Row>
              {/* Main Content - Left Column */}
              <Col lg="9">
                <Card>
                  <CardBody>
                    <FormGroup className="mb-4">
                      <Label htmlFor="name">
                        {props.t("Name")} <span className="text-danger">*</span>
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

                    <FormGroup>
                      <Label>{props.t("Option Value")}</Label>
                      {renderOptionValues()}
                    </FormGroup>
                  </CardBody>
                </Card>
              </Col>

              {/* Sidebar - Right Column */}
              <Col lg={3}>
                <PublishCard
                  onSave={formik.handleSubmit}
                  cancelLink="/product-options"
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

ProductOptionCreateOrEdit.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation()(ProductOptionCreateOrEdit);
