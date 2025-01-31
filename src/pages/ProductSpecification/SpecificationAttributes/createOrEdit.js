import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
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
import Breadcrumbs from "../../../components/Common/Breadcrumb";

const SpecificationAttributeCreateOrEdit = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    associatedGroup: "",
    name: "",
    fieldType: "",
    defaultValue: "",
  });

  const [errors, setErrors] = useState({});

  const fieldTypes = [
    "Text",
    "Textarea",
    "Date",
    "Number",
    "Dropdown",
    "Checkbox",
    "Radio",
  ];

  const availableGroups = [
    { id: 1, name: "Dimensions" },
    { id: 2, name: "Performance" },
    { id: 3, name: "Battery" },
    { id: 4, name: "Display" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.associatedGroup) {
      newErrors.associatedGroup = props.t("Associated Group is required");
    }
    if (!formData.name || formData.name.trim() === "") {
      newErrors.name = props.t("Name is required");
    }
    if (!formData.fieldType) {
      newErrors.fieldType = props.t("Field Type is required");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e, shouldExit = false) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      // Implement your save logic here
      if (shouldExit) {
        navigate("/specification-attributes");
      }
    } catch (error) {
      console.error("Failed to save specification attribute:", error);
    }
  };

  return (
    <div className="page-content">
      <Container fluid>
        <Row>
          <Col lg={8}>
            <Card>
              <CardBody>
                <Form>
                  <FormGroup>
                    <Label for="associatedGroup" className="required">
                      {props.t("Associated Group")} <span className="text-danger">*</span>
                    </Label>
                    <Input
                      type="select"
                      name="associatedGroup"
                      id="associatedGroup"
                      value={formData.associatedGroup}
                      onChange={handleChange}
                      invalid={!!errors.associatedGroup}
                      required
                    >
                      <option value="">{props.t("Choose any Group")}</option>
                      {availableGroups.map(group => (
                        <option key={group.id} value={group.id}>
                          {group.name}
                        </option>
                      ))}
                    </Input>
                    {errors.associatedGroup && (
                      <div className="invalid-feedback d-block">
                        {errors.associatedGroup}
                      </div>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label for="name" className="required">
                      {props.t("Name")} <span className="text-danger">*</span>
                    </Label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleChange}
                      invalid={!!errors.name}
                      required
                    />
                    {errors.name && (
                      <div className="invalid-feedback d-block">
                        {errors.name}
                      </div>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label for="fieldType" className="required">
                      {props.t("Field Type")} <span className="text-danger">*</span>
                    </Label>
                    <Input
                      type="select"
                      name="fieldType"
                      id="fieldType"
                      value={formData.fieldType}
                      onChange={handleChange}
                      invalid={!!errors.fieldType}
                      required
                    >
                      <option value="">{props.t("Choose Field Type")}</option>
                      {fieldTypes.map(type => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </Input>
                    {errors.fieldType && (
                      <div className="invalid-feedback d-block">
                        {errors.fieldType}
                      </div>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label for="defaultValue">
                      {props.t("Default Value")}
                    </Label>
                    <Input
                      type="text"
                      name="defaultValue"
                      id="defaultValue"
                      placeholder=""
                      value={formData.defaultValue}
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>

          <Col lg={4}>
            <Card>
              <CardBody>
                <h4 className="card-title mb-4">{props.t("Publish")}</h4>
                <div className="d-grid gap-2">
                  <Button
                    color="primary"
                    onClick={(e) => handleSubmit(e, false)}
                  >
                    <i className="bx bx-save me-1"></i> {props.t("Save")}
                  </Button>
                  <Button
                    color="secondary"
                    onClick={(e) => handleSubmit(e, true)}
                  >
                    <i className="bx bx-save me-1"></i> {props.t("Save & Exit")}
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

SpecificationAttributeCreateOrEdit.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation()(SpecificationAttributeCreateOrEdit); 