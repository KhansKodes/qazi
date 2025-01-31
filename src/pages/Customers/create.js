import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createCustomer } from "../../store/customers/actions";
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
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import classnames from "classnames";
import PublishCard from "../../components/Common/PublishCard";

const CreateCustomer = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("detail");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirmation: "",
    dateOfBirth: "",
    isVendor: false,
    privateNotes: "",
    avatar: null,
    avatarUrl: "",
    status: "Activated",
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        avatar: file,
        avatarUrl: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = async (e, shouldExit = false) => {
    e.preventDefault();
    try {
      const customerData = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'avatar' && formData[key]) {
          customerData.append('avatar', formData[key]);
        } else if (key !== 'avatarUrl') {
          customerData.append(key, formData[key]);
        }
      });
      
      await dispatch(createCustomer(customerData));
      if (shouldExit) {
        navigate("/customers");
      }
    } catch (error) {
      console.error("Failed to create customer:", error);
    }
  };

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  return (
    <div className="page-content">
      <Container fluid>
        <Row>
          <Col lg={9}>
            <Card>
              <CardBody>
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === 'detail' })}
                      onClick={() => toggleTab('detail')}
                    >
                      {props.t("Detail")}
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={activeTab} className="pt-4">
                  <TabPane tabId="detail">
                    <Form onSubmit={(e) => handleSubmit(e, false)}>
                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="name">
                              {props.t("Name")}
                            </Label>
                            <Input
                              type="text"
                              name="name"
                              id="name"
                              placeholder={props.t("Name")}
                              value={formData.name}
                              onChange={handleChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="email" className="required">
                              {props.t("Email")}
                            </Label>
                            <Input
                              type="email"
                              name="email"
                              id="email"
                              placeholder="e.g: example@domain.com"
                              value={formData.email}
                              onChange={handleChange}
                              required
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <FormGroup check className="mb-3">
                        <Input
                          type="checkbox"
                          id="isVendor"
                          name="isVendor"
                          checked={formData.isVendor}
                          onChange={handleChange}
                        />
                        <Label for="isVendor" check>
                          {props.t("Is vendor?")}
                        </Label>
                      </FormGroup>

                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="phone">
                              {props.t("Phone")}
                            </Label>
                            <Input
                              type="text"
                              name="phone"
                              id="phone"
                              placeholder={props.t("Phone")}
                              value={formData.phone}
                              onChange={handleChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="dateOfBirth">
                              {props.t("Date of birth")}
                            </Label>
                            <div className="d-flex">
                              <Input
                                type="date"
                                name="dateOfBirth"
                                id="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                className="me-2"
                              />
                              <Button color="light" type="button">
                                <i className="bx bx-x"></i>
                              </Button>
                            </div>
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="password" className="required">
                              {props.t("Password")}
                            </Label>
                            <Input
                              type="password"
                              name="password"
                              id="password"
                              value={formData.password}
                              onChange={handleChange}
                              required
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="passwordConfirmation" className="required">
                              {props.t("Password confirmation")}
                            </Label>
                            <Input
                              type="password"
                              name="passwordConfirmation"
                              id="passwordConfirmation"
                              value={formData.passwordConfirmation}
                              onChange={handleChange}
                              required
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <FormGroup>
                        <Label for="privateNotes">
                          {props.t("Private notes")}
                        </Label>
                        <Input
                          type="textarea"
                          name="privateNotes"
                          id="privateNotes"
                          rows="3"
                          value={formData.privateNotes}
                          onChange={handleChange}
                        />
                        <small className="form-text text-muted">
                          {props.t("Private notes are only visible to admins.")}
                        </small>
                      </FormGroup>
                    </Form>
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>

          <Col lg={3}>
            <PublishCard
              onSave={handleSubmit}
              cancelLink="/customers"
            />
          </Col>

          <Col lg={4}>
            <div className="bg-light-subtle border rounded">
              <div className="p-4">
                <h5 className="mb-4">{props.t("Status")} <span className="text-danger">*</span></h5>
                <div className="position-relative">
                  <Input
                    type="select"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="form-control border-primary"
                    required
                  >
                    <option value="Activated">Activated</option>
                    <option value="Locked">Locked</option>
                  </Input>
                  <i className="bx bx-check text-primary position-absolute"
                    style={{ right: "10px", top: "50%", transform: "translateY(-50%)" }}
                  />
                </div>
              </div>
            </div>

            <div className="bg-light-subtle border rounded mt-4">
              <div className="p-4">
                <h5 className="mb-3">{props.t("Avatar")}</h5>
                <div 
                  className="border rounded p-4 text-center"
                  style={{ cursor: "pointer" }}
                  onClick={() => document.getElementById("avatar").click()}
                >
                  {formData.avatarUrl ? (
                    <img 
                      src={formData.avatarUrl} 
                      alt="Avatar" 
                      className="img-fluid mb-3"
                      style={{ maxHeight: "150px" }}
                    />
                  ) : (
                    <div className="text-center">
                      <i className="bx bx-image-add h1 mb-2"></i>
                      <p>{props.t("Choose image")}</p>
                    </div>
                  )}
                  <Input
                    type="file"
                    id="avatar"
                    name="avatar"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                  />
                </div>
                <div className="mt-2 text-center">
                  <Link to="#" className="text-primary">
                    {props.t("Add from URL")}
                  </Link>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

CreateCustomer.propTypes = {
  t: PropTypes.func,
};

export default withTranslation()(CreateCustomer); 