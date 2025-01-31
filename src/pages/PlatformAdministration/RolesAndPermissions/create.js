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
  CustomInput,
} from "reactstrap";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import PublishCard from "../../../components/Common/PublishCard";

const CreateRole = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isDefault: false,
    permissions: {
      ads: {
        view: false,
        create: false,
        edit: false,
        delete: false
      },
      announcements: {
        view: false,
        create: false,
        edit: false,
        delete: false
      },
      cms: {
        media: false,
        pages: false,
        blog: false,
        contact: false,
        galleries: false
      },
      ecommerce: {
        reports: false,
        products: false,
        productPrices: false,
        productInventory: false,
        productCategories: false,
        productTags: false,
        brands: false,
        productCollections: false,
        productAttributesSets: false,
        productAttributes: false,
        taxes: false,
        reviews: false,
        shipments: false,
        orders: false,
        discounts: false,
        customers: false,
        flashSales: false,
        productLabels: false,
        orderReturns: false,
        productOptions: false,
        invoices: false,
        productSpecification: false
      },
      faq: {
        main: false,
        categories: false
      },
      location: {
        countries: false,
        states: false,
        cities: false
      },
      marketplace: {
        stores: false,
        withdrawals: false,
        vendors: false,
        unverifiedVendors: false,
        reports: false
      },
      newsletters: {
        delete: false
      },
      payments: {
        settings: false,
        delete: false,
        paymentLogs: false
      },
      salePopups: false,
      settings: {
        common: false,
        others: false,
        ecommerce: false,
        localization: false,
        api: false
      },
      simpleSliders: {
        create: false,
        edit: false,
        delete: false,
        sliderItems: false
      },
      system: {
        users: false,
        roles: false,
        manageLicense: false,
        cronjob: false,
        plugins: false,
        appearance: false,
        analytics: false,
        activityLogs: false,
        backup: false,
        requestLogs: false
      },
      testimonial: {
        create: false,
        edit: false,
        delete: false
      },
      tools: {
        importExportData: false
      }
    }
  });

  const [validation, setValidation] = useState({
    name: null,
    description: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === "checkbox") {
      const nameParts = name.split(".");
      if (nameParts.length === 2) {
        // Handle section-level permissions
        const [section, permission] = nameParts;
        setFormData(prev => ({
          ...prev,
          permissions: {
            ...prev.permissions,
            [section]: {
              ...prev.permissions[section],
              [permission]: checked
            }
          }
        }));
      } else if (nameParts.length === 3) {
        // Handle nested permissions
        const [section, subsection, permission] = nameParts;
        setFormData(prev => ({
          ...prev,
          permissions: {
            ...prev.permissions,
            [section]: {
              ...prev.permissions[section],
              [subsection]: {
                ...prev.permissions[section][subsection],
                [permission]: checked
              }
            }
          }
        }));
      } else {
        // Handle simple checkboxes
        setFormData(prev => ({
          ...prev,
          [name]: checked
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear validation state when user types
    if (!name.includes(".")) {
      setValidation(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleAllPermissions = (checked) => {
    const newPermissions = {};
    Object.keys(formData.permissions).forEach(section => {
      if (typeof formData.permissions[section] === 'object') {
        newPermissions[section] = {};
        Object.keys(formData.permissions[section]).forEach(permission => {
          if (typeof formData.permissions[section][permission] === 'object') {
            newPermissions[section][permission] = {
              view: checked,
              create: checked,
              edit: checked,
              delete: checked
            };
          } else {
            newPermissions[section][permission] = checked;
          }
        });
      }
    });
    
    setFormData(prev => ({
      ...prev,
      permissions: newPermissions
    }));
  };

  const validateForm = () => {
    const newValidation = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newValidation.name = "Name is required";
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

  const renderMainSection = (label) => {
    return (
      <div className="mt-3">
        <div className="d-flex align-items-center bg-light p-2 rounded">
          <div className="form-check">
            <Input
              type="checkbox"
              className="form-check-input"
            />
          </div>
          <span className="text-success fw-medium">
            {label}
          </span>
        </div>
      </div>
    );
  };

  const renderSubItems = (items) => {
    return (
      <Row className="ms-4 mt-2">
        {items.map((item, index) => (
          <Col md={4} key={index}>
            <div className="form-check">
              <Input
                type="checkbox"
                className="form-check-input"
              />
              <Label className="form-check-label text-primary">
                {item}
              </Label>
            </div>
          </Col>
        ))}
      </Row>
    );
  };

  const renderPermissions = () => {
    return (
      <>
        {/* Payments */}
        {renderMainSection('Payments')}
        {renderSubItems(['Settings', 'Delete', 'Payment Logs'])}

        {/* Sale popups */}
        {renderMainSection('Sale popups')}

        {/* Settings */}
        {renderMainSection('Settings')}
        {renderSubItems(['Common', 'Others', 'Ecommerce', 'Localization', 'API'])}

        {/* Simple Sliders */}
        {renderMainSection('Simple Sliders')}
        {renderSubItems(['Create', 'Edit', 'Delete'])}
        <div className="ms-4">
          {renderMainSection('Slider Items')}
        </div>

        {/* System */}
        {renderMainSection('System')}
        {renderSubItems([
          'Users',
          'Roles',
          'Manage license',
          'Cronjob',
          'Plugins',
          'Appearance',
          'Analytics',
          'Activity Logs',
          'Backup',
          'Request Logs'
        ])}

        {/* Testimonial */}
        {renderMainSection('Testimonial')}
        {renderSubItems(['Create', 'Edit', 'Delete'])}
      </>
    );
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Breadcrumb */}
          <Breadcrumbs
            title={props.t("Roles & Permissions")}
            breadcrumbItem={props.t("Create Role")}
          />

          <Row>
            <Col lg={9}>
              <Card>
                <CardBody>
                  <Form onSubmit={handleSubmit}>
                    <FormGroup>
                      <Label for="name">
                        Name <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        invalid={!!validation.name}
                      />
                      <FormFeedback>{validation.name}</FormFeedback>
                    </FormGroup>

                    <FormGroup>
                      <Label for="description">Description</Label>
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

                    <FormGroup className="mb-0">
                      <div className="form-check form-switch form-switch-lg">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="isDefault"
                          name="isDefault"
                          checked={formData.isDefault}
                          onChange={handleChange}
                        />
                        <Label className="form-check-label" for="isDefault">
                          Is default?
                        </Label>
                      </div>
                    </FormGroup>
                  </Form>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="card-title mb-0">Permission Flags</h4>
                    <div>
                      <div className="form-check d-inline-block me-2">
                        <Input
                          type="checkbox"
                          className="form-check-input"
                          id="allPermissions"
                          onChange={(e) => handleAllPermissions(e.target.checked)}
                        />
                        <Label className="form-check-label" for="allPermissions">
                          All Permissions
                        </Label>
                      </div>
                      <Button color="link" className="p-0 me-2">Collapse all</Button>
                      |
                      <Button color="link" className="p-0 ms-2">Expand all</Button>
                    </div>
                  </div>

                  {renderPermissions()}
                </CardBody>
              </Card>
            </Col>

            <Col lg={3}>
              <PublishCard
                onSave={handleSubmit}
                cancelLink="/platform-administration/roles"
              />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

CreateRole.propTypes = {
  t: PropTypes.func,
};

export default withTranslation()(CreateRole);
