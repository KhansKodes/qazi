import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createFlashSale } from "../../store/flashSales/actions";
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
import { useNavigate } from "react-router-dom";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import PublishCard from "../../components/Common/PublishCard";

const CreateFlashSale = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    products: [],
    productSearch: "",
    status: "Published",
    endDate: "",
  });

  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStatusChange = (status) => {
    setFormData(prev => ({
      ...prev,
      status
    }));
    setShowStatusDropdown(false);
  };

  const handleSubmit = async (e, shouldExit = false) => {
    e.preventDefault();
    try {
      await dispatch(createFlashSale(formData));
      if (shouldExit) {
        navigate("/flash-sales");
      }
    } catch (error) {
      console.error("Failed to create flash sale:", error);
    }
  };

  const handleClearDate = () => {
    setFormData(prev => ({
      ...prev,
      endDate: ""
    }));
  };

  return (
    <div className="page-content">
      <Container fluid>
        <Row>
          <Col lg={9}>
            <Card>
              <CardBody>
                <Form onSubmit={(e) => handleSubmit(e, false)}>
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

                  <FormGroup className="mt-4">
                    <Label>
                      {props.t("Products")}
                    </Label>
                    <Input
                      type="text"
                      name="productSearch"
                      placeholder={props.t("Search products")}
                      value={formData.productSearch}
                      onChange={handleChange}
                    />
                    {/* Product search results would be displayed here */}
                    {formData.products.length === 0 && (
                      <div className="text-muted mt-2">
                        {props.t("No products selected")}
                      </div>
                    )}
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>

          <Col lg={3}>
            <PublishCard
              onSave={handleSubmit}
              cancelLink="/flash-sales"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

CreateFlashSale.propTypes = {
  t: PropTypes.func,
};

export default withTranslation()(CreateFlashSale); 