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

const SpecificationGroupCreateOrEdit = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

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
    
    if (!formData.name || formData.name.trim() === "") {
      newErrors.name = props.t("Name is required");
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
        navigate("/specification-groups");
      }
    } catch (error) {
      console.error("Failed to save specification group:", error);
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
                    <Label for="description">
                      {props.t("Description")}
                    </Label>
                    <Input
                      type="textarea"
                      name="description"
                      id="description"
                      placeholder="Short description"
                      rows="4"
                      value={formData.description}
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

SpecificationGroupCreateOrEdit.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation()(SpecificationGroupCreateOrEdit); 