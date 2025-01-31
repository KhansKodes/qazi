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

const SpecificationTableCreateOrEdit = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    selectedGroups: [],
  });

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
  };

  const handleGroupSelection = (groupId) => {
    setFormData(prev => ({
      ...prev,
      selectedGroups: prev.selectedGroups.includes(groupId)
        ? prev.selectedGroups.filter(id => id !== groupId)
        : [...prev.selectedGroups, groupId]
    }));
  };

  const handleSubmit = async (e, shouldExit = false) => {
    e.preventDefault();
    try {
      // Implement your save logic here
      if (shouldExit) {
        navigate("/specification-tables");
      }
    } catch (error) {
      console.error("Failed to save specification table:", error);
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
                      {props.t("Group name")}
                    </Label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
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

                  <FormGroup>
                    <Label className="required">
                      {props.t("Select the groups to display in this table")}
                    </Label>
                    <div className="d-flex flex-wrap gap-2">
                      {availableGroups.map(group => (
                        <div key={group.id} className="form-check">
                          <Input
                            type="checkbox"
                            className="form-check-input"
                            id={`group-${group.id}`}
                            checked={formData.selectedGroups.includes(group.id)}
                            onChange={() => handleGroupSelection(group.id)}
                          />
                          <Label className="form-check-label" for={`group-${group.id}`}>
                            {group.name}
                          </Label>
                        </div>
                      ))}
                    </div>
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

SpecificationTableCreateOrEdit.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation()(SpecificationTableCreateOrEdit); 