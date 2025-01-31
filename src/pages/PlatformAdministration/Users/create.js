import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
} from "reactstrap";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import PublishCard from "../../../components/Common/PublishCard";

const CreateUser = (props) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [validation, setValidation] = useState({
    firstName: null,
    lastName: null,
    username: null,
    email: null,
    password: null,
    confirmPassword: null,
    role: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation state when user types
    setValidation(prev => ({
      ...prev,
      [name]: null
    }));
  };

  const validateForm = () => {
    const newValidation = {};
    let isValid = true;

    // First Name validation
    if (!formData.firstName.trim()) {
      newValidation.firstName = "First name is required";
      isValid = false;
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newValidation.lastName = "Last name is required";
      isValid = false;
    }

    // Username validation
    if (!formData.username.trim()) {
      newValidation.username = "Username is required";
      isValid = false;
    } else if (formData.username.length < 3) {
      newValidation.username = "Username must be at least 3 characters";
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newValidation.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newValidation.email = "Please enter a valid email";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newValidation.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newValidation.password = "Password must be at least 6 characters";
      isValid = false;
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newValidation.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newValidation.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    // Role validation
    if (!formData.role) {
      newValidation.role = "Please select a role";
      isValid = false;
    }

    setValidation(newValidation);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission
      console.log("Form submitted:", formData);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Breadcrumb */}
          <Breadcrumbs
            title={props.t("Users")}
            breadcrumbItem={props.t("Create User")}
          />

          <Row>
            <Col lg={9}>
              <Card>
                <CardBody>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="firstName">
                            First Name <span className="text-danger">*</span>
                          </Label>
                          <Input
                            type="text"
                            name="firstName"
                            id="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            invalid={!!validation.firstName}
                          />
                          <FormFeedback>{validation.firstName}</FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="lastName">
                            Last Name <span className="text-danger">*</span>
                          </Label>
                          <Input
                            type="text"
                            name="lastName"
                            id="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            invalid={!!validation.lastName}
                          />
                          <FormFeedback>{validation.lastName}</FormFeedback>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="username">
                            Username <span className="text-danger">*</span>
                          </Label>
                          <Input
                            type="text"
                            name="username"
                            id="username"
                            value={formData.username}
                            onChange={handleChange}
                            invalid={!!validation.username}
                          />
                          <FormFeedback>{validation.username}</FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="email">
                            Email <span className="text-danger">*</span>
                          </Label>
                          <Input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="e.g: example@domain.com"
                            value={formData.email}
                            onChange={handleChange}
                            invalid={!!validation.email}
                          />
                          <FormFeedback>{validation.email}</FormFeedback>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="password">
                            Password <span className="text-danger">*</span>
                          </Label>
                          <Input
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            invalid={!!validation.password}
                          />
                          <FormFeedback>{validation.password}</FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for="confirmPassword">
                            Re-type password <span className="text-danger">*</span>
                          </Label>
                          <Input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            invalid={!!validation.confirmPassword}
                          />
                          <FormFeedback>{validation.confirmPassword}</FormFeedback>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>

            <Col lg={3}>
              <Card>
                <CardBody>
                  <h4 className="card-title mb-4">Role</h4>
                  <FormGroup>
                    <Input
                      type="select"
                      name="role"
                      id="role"
                      value={formData.role}
                      onChange={handleChange}
                      invalid={!!validation.role}
                    >
                      <option value="">Select role</option>
                      <option value="admin">Admin</option>
                      <option value="manager">Manager</option>
                      <option value="user">User</option>
                    </Input>
                    <FormFeedback>{validation.role}</FormFeedback>
                  </FormGroup>

                  <div className="d-flex mt-4">
                    <Button
                      type="submit"
                      color="success"
                      className="me-2"
                      onClick={handleSubmit}
                    >
                      <i className="bx bx-save me-1"></i> Save
                    </Button>
                    <Link
                      to="/platform-administration/users"
                      className="btn btn-outline-success"
                    >
                      <i className="bx bx-exit me-1"></i> Save & Exit
                    </Link>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col lg={3}>
              <PublishCard
                onSave={handleSubmit}
                cancelLink="/platform-administration/users"
              />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

CreateUser.propTypes = {
  t: PropTypes.func,
};

export default withTranslation()(CreateUser);
