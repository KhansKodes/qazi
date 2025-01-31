import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
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
  InputGroup,
  InputGroupText,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import PublishCard from "../../components/Common/PublishCard";

const ProductCreateOrEdit = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const isEdit = !!id;

  const [productType, setProductType] = useState(
    searchParams.get("type") || (isEdit ? "" : "physical")
  );
  const [activeTab, setActiveTab] = useState("1");
  
  const [formData, setFormData] = useState({
    name: "",
    permalink: "",
    description: "",
    content: "",
    sku: "",
    price: "0",
    price_sale: "",
    cost_per_item: "0",
    barcode: "",
    with_storehouse_management: false,
    stock_status: "in_stock",
    weight: "0",
    length: "0",
    width: "0",
    height: "0",
    status: "published",
    store: "",
    is_featured: false,
    categories: [],
    brand: "",
    specification_table: "",
    minimum_order: "0",
    maximum_order: "0",
    tags: "",
  });

  const [errors, setErrors] = useState({});
  const [showDescriptionToolbar, setShowDescriptionToolbar] = useState(true);
  const [showContentToolbar, setShowContentToolbar] = useState(true);

  const [selectedCategories, setSelectedCategories] = useState(new Set());

  const handleTypeSelection = (type) => {
    setProductType(type);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.permalink) newErrors.permalink = "Permalink is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e, shouldExit = false) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      // Implement save logic here
      if (shouldExit) {
        navigate("/products");
      }
    } catch (error) {
      console.error("Failed to save product:", error);
    }
  };

  const handleCategoryChange = (categoryId, childCategories = []) => {
    setSelectedCategories(prev => {
      const newSelected = new Set(prev);
      const isCurrentlySelected = newSelected.has(categoryId);
      
      if (isCurrentlySelected) {
        // Uncheck the category and its children
        newSelected.delete(categoryId);
        childCategories.forEach(childId => newSelected.delete(childId));
      } else {
        // Check the category and its children
        newSelected.add(categoryId);
        childCategories.forEach(childId => newSelected.add(childId));
      }
      
      return newSelected;
    });

    // Update formData categories
    setFormData(prev => ({
      ...prev,
      categories: Array.from(selectedCategories)
    }));
  };

  // Category child relationships
  const categoryChildren = {
    cat_electronics: [
      'cat_featured',
      'cat_electronics_new',
      'cat_best_sellers',
      'cat_mobile_phone',
      'cat_computers',
      'cat_cpu_heat_pipes',
      'cat_cpu_coolers'
    ],
    cat_computers: ['cat_top_brands', 'cat_weekly_best'],
    cat_accessories: [
      'cat_headphones',
      'cat_wireless_headphones',
      'cat_tws_earphones'
    ],
    cat_electronics_gadgets: [
      'cat_microscope',
      'cat_remote_control',
      'cat_monitor',
      'cat_thermometer'
    ]
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
                      className={classnames({ active: activeTab === "1" })}
                      onClick={() => setActiveTab("1")}
                    >
                      {props.t("General")}
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "2" })}
                      onClick={() => setActiveTab("2")}
                    >
                      {props.t("Images")}
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={activeTab} className="pt-4">
                  <TabPane tabId="1">
                    <Form>
                      <FormGroup>
                        <Label for="name" className="required">
                          {props.t("Name")} <span className="text-danger">*</span>
                        </Label>
                        <Input
                          type="text"
                          name="name"
                          id="name"
                          value={formData.name}
                          onChange={handleChange}
                          invalid={!!errors.name}
                          required
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label for="permalink" className="required">
                          {props.t("Permalink")} <span className="text-danger">*</span>
                        </Label>
                        <Input
                          type="text"
                          name="permalink"
                          id="permalink"
                          value={formData.permalink}
                          onChange={handleChange}
                          invalid={!!errors.permalink}
                          required
                        />
                        <small className="text-muted">
                          {props.t("Preview")}: {formData.permalink}
                        </small>
                      </FormGroup>

                      <FormGroup>
                        <Label for="description">
                          {props.t("Description")}
                        </Label>
                        <div className="mb-2">
                          <Button
                            color="light"
                            size="sm"
                            className="me-2"
                            onClick={() => setShowDescriptionToolbar(!showDescriptionToolbar)}
                          >
                            <i className={`bx ${showDescriptionToolbar ? 'bx-hide' : 'bx-show'} me-1`}></i>
                            {showDescriptionToolbar ? props.t("Hide Toolbar") : props.t("Show Toolbar")}
                          </Button>
                          <Button color="light" size="sm">
                            <i className="bx bx-image-add me-1"></i>
                            {props.t("Add Media")}
                          </Button>
                        </div>
                        <Editor
                          toolbarHidden={!showDescriptionToolbar}
                          toolbarClassName="toolbarClassName"
                          wrapperClassName="wrapperClassName"
                          editorClassName="editorClassName"
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label for="content">
                          {props.t("Content")}
                        </Label>
                        <div className="mb-2">
                          <Button
                            color="light"
                            size="sm"
                            className="me-2"
                            onClick={() => setShowContentToolbar(!showContentToolbar)}
                          >
                            <i className={`bx ${showContentToolbar ? 'bx-hide' : 'bx-show'} me-1`}></i>
                            {showContentToolbar ? props.t("Hide Toolbar") : props.t("Show Toolbar")}
                          </Button>
                          <Button color="light" size="sm">
                            <i className="bx bx-image-add me-1"></i>
                            {props.t("Add Media")}
                          </Button>
                        </div>
                        <Editor
                          toolbarHidden={!showContentToolbar}
                          toolbarClassName="toolbarClassName"
                          wrapperClassName="wrapperClassName"
                          editorClassName="editorClassName"
                        />
                      </FormGroup>

                      {/* Images Section */}
                      <FormGroup>
                        <Label>{props.t("Images")}</Label>
                        <div className="text-center p-4 border rounded">
                          <i className="bx bx-image-add fs-1 mb-2"></i>
                          <p className="mb-0">{props.t("Click here to add more images.")}</p>
                        </div>
                      </FormGroup>

                      {/* Video Section */}
                      <FormGroup>
                        <Label>{props.t("Video")}</Label>
                        <div>
                          <Button color="light" size="sm">
                            {props.t("Add new")}
                          </Button>
                        </div>
                      </FormGroup>

                      {/* Specification Tables Section */}
                      <FormGroup>
                        <Label>{props.t("Specification Tables")}</Label>
                        <Input
                          type="select"
                          name="specification_table"
                          value={formData.specification_table}
                          onChange={handleChange}
                        >
                          <option value="">{props.t("None")}</option>
                        </Input>
                        <small className="text-muted d-block mt-2">
                          {props.t("Select the specification table to display in this product")}
                        </small>
                      </FormGroup>

                      {/* Overview Section */}
                      <div className="mt-4">
                        <h5 className="border-bottom pb-2">{props.t("Overview")}</h5>
                        <Row className="mt-3">
                          <Col md={4}>
                            <FormGroup>
                              <Label for="sku">
                                {props.t("SKU")}
                              </Label>
                              <Input
                                type="text"
                                name="sku"
                                id="sku"
                                value={formData.sku}
                                onChange={handleChange}
                                placeholder="SF-2443-TOUA"
                              />
                            </FormGroup>
                          </Col>
                          <Col md={4}>
                            <FormGroup>
                              <Label for="price">
                                {props.t("Price")}
                              </Label>
                              <InputGroup>
                                <InputGroupText>$</InputGroupText>
                                <Input
                                  type="number"
                                  name="price"
                                  id="price"
                                  value={formData.price}
                                  onChange={handleChange}
                                  placeholder="0"
                                />
                              </InputGroup>
                            </FormGroup>
                          </Col>
                          <Col md={4}>
                            <FormGroup>
                              <Label for="price_sale" className="d-flex justify-content-between">
                                <span>{props.t("Price sale")}</span>
                                <Button color="link" className="p-0 text-primary">
                                  {props.t("Choose Discount Period")}
                                </Button>
                              </Label>
                              <InputGroup>
                                <InputGroupText>$</InputGroupText>
                                <Input
                                  type="text"
                                  name="price_sale"
                                  id="price_sale"
                                  value={formData.price_sale}
                                  onChange={handleChange}
                                />
                              </InputGroup>
                              <small className="text-muted">
                                {props.t("Discount")} 0% {props.t("from original price.")}
                              </small>
                            </FormGroup>
                          </Col>
                        </Row>

                        <Row className="mt-3">
                          <Col md={6}>
                            <FormGroup>
                              <Label for="cost_per_item">
                                {props.t("Cost per item")}
                              </Label>
                              <InputGroup>
                                <InputGroupText>$</InputGroupText>
                                <Input
                                  type="number"
                                  name="cost_per_item"
                                  id="cost_per_item"
                                  value={formData.cost_per_item}
                                  onChange={handleChange}
                                  placeholder="0"
                                />
                              </InputGroup>
                              <small className="text-muted">
                                {props.t("Customers won't see this price.")}
                              </small>
                            </FormGroup>
                          </Col>
                          <Col md={6}>
                            <FormGroup>
                              <Label for="barcode">
                                {props.t("Barcode (ISBN, UPC, GTIN, etc.)")}
                              </Label>
                              <Input
                                type="text"
                                name="barcode"
                                id="barcode"
                                value={formData.barcode}
                                onChange={handleChange}
                                placeholder={props.t("Enter barcode")}
                              />
                              <small className="text-muted">
                                {props.t("Must be unique for each product.")}
                              </small>
                            </FormGroup>
                          </Col>
                        </Row>

                        <FormGroup className="mt-3">
                          <div className="form-check">
                            <Input
                              type="checkbox"
                              className="form-check-input"
                              id="with_storehouse_management"
                              name="with_storehouse_management"
                              checked={formData.with_storehouse_management}
                              onChange={handleChange}
                            />
                            <Label className="form-check-label" for="with_storehouse_management">
                              {props.t("With storehouse management")}
                            </Label>
                          </div>
                        </FormGroup>

                        <FormGroup className="mt-3">
                          <Label>
                            {props.t("Stock status")}
                          </Label>
                          <div>
                            <div className="form-check form-check-inline">
                              <Input
                                type="radio"
                                id="in_stock"
                                name="stock_status"
                                value="in_stock"
                                checked={formData.stock_status === "in_stock"}
                                onChange={handleChange}
                              />
                              <Label className="form-check-label" for="in_stock">
                                {props.t("In stock")}
                              </Label>
                            </div>
                            <div className="form-check form-check-inline">
                              <Input
                                type="radio"
                                id="out_of_stock"
                                name="stock_status"
                                value="out_of_stock"
                                checked={formData.stock_status === "out_of_stock"}
                                onChange={handleChange}
                              />
                              <Label className="form-check-label" for="out_of_stock">
                                {props.t("Out of stock")}
                              </Label>
                            </div>
                            <div className="form-check form-check-inline">
                              <Input
                                type="radio"
                                id="on_backorder"
                                name="stock_status"
                                value="on_backorder"
                                checked={formData.stock_status === "on_backorder"}
                                onChange={handleChange}
                              />
                              <Label className="form-check-label" for="on_backorder">
                                {props.t("On backorder")}
                              </Label>
                            </div>
                          </div>
                        </FormGroup>
                      </div>

                      {/* Shipping Section */}
                      <Card className="mt-4">
                        <CardBody>
                          <h5>{props.t("Shipping")}</h5>
                          <Row>
                            <Col md={6}>
                              <FormGroup>
                                <Label for="weight">
                                  {props.t("Weight (g)")}
                                </Label>
                                <InputGroup>
                                  <Input
                                    type="number"
                                    name="weight"
                                    id="weight"
                                    value={formData.weight}
                                    onChange={handleChange}
                                  />
                                  <InputGroupText>g</InputGroupText>
                                </InputGroup>
                              </FormGroup>
                            </Col>
                            <Col md={6}>
                              <FormGroup>
                                <Label for="length">
                                  {props.t("Length (cm)")}
                                </Label>
                                <InputGroup>
                                  <Input
                                    type="number"
                                    name="length"
                                    id="length"
                                    value={formData.length}
                                    onChange={handleChange}
                                  />
                                  <InputGroupText>cm</InputGroupText>
                                </InputGroup>
                              </FormGroup>
                            </Col>
                            <Col md={6}>
                              <FormGroup>
                                <Label for="width">
                                  {props.t("Wide (cm)")}
                                </Label>
                                <InputGroup>
                                  <Input
                                    type="number"
                                    name="width"
                                    id="width"
                                    value={formData.width}
                                    onChange={handleChange}
                                  />
                                  <InputGroupText>cm</InputGroupText>
                                </InputGroup>
                              </FormGroup>
                            </Col>
                            <Col md={6}>
                              <FormGroup>
                                <Label for="height">
                                  {props.t("Height (cm)")}
                                </Label>
                                <InputGroup>
                                  <Input
                                    type="number"
                                    name="height"
                                    id="height"
                                    value={formData.height}
                                    onChange={handleChange}
                                  />
                                  <InputGroupText>cm</InputGroupText>
                                </InputGroup>
                              </FormGroup>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>

                      {/* Attributes Section */}
                      <Card className="mt-4">
                        <CardBody>
                          <div className="d-flex justify-content-between align-items-center">
                            <h5>{props.t("Attributes")}</h5>
                            <Button color="light" size="sm">
                              {props.t("Add new attributes")}
                            </Button>
                          </div>
                          <p className="text-muted">
                            {props.t("Adding new attributes helps the product to have many options, such as size or color.")}
                          </p>
                        </CardBody>
                      </Card>

                      {/* Product Options Section */}
                      <Card className="mt-4">
                        <CardBody>
                          <h5>{props.t("Product options")}</h5>
                          <div className="d-flex gap-2 mt-3">
                            <Button color="light" size="sm">
                              {props.t("Add new option")}
                            </Button>
                            <Input
                              type="select"
                              bsSize="sm"
                              style={{ width: 'auto' }}
                            >
                              <option>{props.t("Select Global Option")}</option>
                            </Input>
                            <Button color="light" size="sm">
                              {props.t("Add Global Option")}
                            </Button>
                          </div>
                        </CardBody>
                      </Card>

                      {/* Related Products Section */}
                      <Card className="mt-4">
                        <CardBody>
                          <h5>{props.t("Related products")}</h5>
                          <Input
                            type="search"
                            placeholder={props.t("Search products")}
                            className="mt-3"
                          />
                        </CardBody>
                      </Card>

                      {/* Cross-selling Products Section */}
                      <Card className="mt-4">
                        <CardBody>
                          <h5>{props.t("Cross-selling products")}</h5>
                          <Input
                            type="search"
                            placeholder={props.t("Search products")}
                            className="mt-3"
                          />
                        </CardBody>
                      </Card>

                      {/* Product FAQs Section */}
                      <Card className="mt-4">
                        <CardBody>
                          <h5>{props.t("Product FAQs")}</h5>
                          <div className="mt-3">
                            <Button color="light" size="sm">
                              {props.t("Add new")}
                            </Button>
                            <div className="mt-2">
                              <span>{props.t("or")} </span>
                              <Button color="link" className="p-0">
                                {props.t("Select from existing FAQs")}
                              </Button>
                            </div>
                          </div>
                        </CardBody>
                      </Card>

                      {/* Search Engine Optimize Section */}
                      <Card className="mt-4">
                        <CardBody>
                          <div className="d-flex justify-content-between align-items-center">
                            <h5>{props.t("Search Engine Optimize")}</h5>
                            <Button color="link" className="p-0">
                              {props.t("Edit SEO meta")}
                            </Button>
                          </div>
                          <p className="text-muted">
                            {props.t("Setup meta title & description to make your site easy to discovered on search engines such as Google")}
                          </p>
                        </CardBody>
                      </Card>
                    </Form>
                  </TabPane>
                  <TabPane tabId="2">
                    <div className="text-center p-4 border rounded">
                      <i className="bx bx-image-add fs-1 mb-2"></i>
                      <p>{props.t("Click here to add more images.")}</p>
                    </div>
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>

          <Col lg={3}>
            <PublishCard
              onSave={handleSubmit}
              cancelLink="/products"
            />

            <Card>
              <CardBody>
                <h4 className="card-title mb-3">{props.t("Status")}</h4>
                <FormGroup>
                  <Input
                    type="select"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="published">{props.t("Published")}</option>
                    <option value="draft">{props.t("Draft")}</option>
                    <option value="pending">{props.t("Pending")}</option>
                  </Input>
                </FormGroup>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <h4 className="card-title mb-3">{props.t("Store")}</h4>
                <FormGroup>
                  <Input
                    type="select"
                    name="store"
                    value={formData.store}
                    onChange={handleChange}
                  >
                    <option value="">{props.t("Select a store...")}</option>
                  </Input>
                </FormGroup>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <h4 className="card-title mb-3">{props.t("Is featured?")}</h4>
                <FormGroup>
                  <div className="form-check form-switch form-switch-lg">
                    <Input
                      type="switch"
                      className="form-check-input"
                      id="is_featured"
                      name="is_featured"
                      checked={formData.is_featured}
                      onChange={handleChange}
                    />
                  </div>
                </FormGroup>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <h4 className="card-title mb-3">{props.t("Categories")}</h4>
                <div className="mb-3">
                  <Input
                    type="search"
                    placeholder={props.t("Search...")}
                    className="form-control"
                  />
                </div>
                <div className="border p-3 rounded" style={{ maxHeight: "400px", overflowY: "auto" }}>
                  <div className="categories-tree">
                    {/* New Arrivals */}
                    <div className="form-check">
                      <Input 
                        type="checkbox" 
                        className="form-check-input" 
                        id="cat_new_arrivals"
                        checked={selectedCategories.has('cat_new_arrivals')}
                        onChange={() => handleCategoryChange('cat_new_arrivals')}
                      />
                      <Label className="form-check-label" for="cat_new_arrivals">New Arrivals</Label>
                    </div>

                    {/* Electronics */}
                    <div className="form-check">
                      <Input 
                        type="checkbox" 
                        className="form-check-input" 
                        id="cat_electronics"
                        checked={selectedCategories.has('cat_electronics')}
                        onChange={() => handleCategoryChange('cat_electronics', categoryChildren.cat_electronics)}
                      />
                      <Label className="form-check-label" for="cat_electronics">Electronics</Label>
                      <div className="ms-4">
                        {/* Featured */}
                        <div className="form-check">
                          <Input 
                            type="checkbox" 
                            className="form-check-input" 
                            id="cat_featured"
                            checked={selectedCategories.has('cat_featured')}
                            onChange={() => handleCategoryChange('cat_featured')}
                          />
                          <Label className="form-check-label" for="cat_featured">Featured</Label>
                        </div>
                        {/* New Arrivals under Electronics */}
                        <div className="form-check">
                          <Input 
                            type="checkbox" 
                            className="form-check-input" 
                            id="cat_electronics_new"
                            checked={selectedCategories.has('cat_electronics_new')}
                            onChange={() => handleCategoryChange('cat_electronics_new')}
                          />
                          <Label className="form-check-label" for="cat_electronics_new">New Arrivals</Label>
                        </div>
                        {/* Best Sellers */}
                        <div className="form-check">
                          <Input 
                            type="checkbox" 
                            className="form-check-input" 
                            id="cat_best_sellers"
                            checked={selectedCategories.has('cat_best_sellers')}
                            onChange={() => handleCategoryChange('cat_best_sellers')}
                          />
                          <Label className="form-check-label" for="cat_best_sellers">Best Sellers</Label>
                        </div>
                        {/* Mobile Phone */}
                        <div className="form-check">
                          <Input 
                            type="checkbox" 
                            className="form-check-input" 
                            id="cat_mobile_phone"
                            checked={selectedCategories.has('cat_mobile_phone')}
                            onChange={() => handleCategoryChange('cat_mobile_phone')}
                          />
                          <Label className="form-check-label" for="cat_mobile_phone">Mobile Phone</Label>
                        </div>
                        {/* Computers & Laptops */}
                        <div className="form-check">
                          <Input 
                            type="checkbox" 
                            className="form-check-input" 
                            id="cat_computers"
                            checked={selectedCategories.has('cat_computers')}
                            onChange={() => handleCategoryChange('cat_computers', categoryChildren.cat_computers)}
                          />
                          <Label className="form-check-label" for="cat_computers">Computers & Laptops</Label>
                          <div className="ms-4">
                            {/* Top Brands */}
                            <div className="form-check">
                              <Input 
                                type="checkbox" 
                                className="form-check-input" 
                                id="cat_top_brands"
                                checked={selectedCategories.has('cat_top_brands')}
                                onChange={() => handleCategoryChange('cat_top_brands')}
                              />
                              <Label className="form-check-label" for="cat_top_brands">Top Brands</Label>
                            </div>
                            {/* Weekly Best Selling */}
                            <div className="form-check">
                              <Input 
                                type="checkbox" 
                                className="form-check-input" 
                                id="cat_weekly_best"
                                checked={selectedCategories.has('cat_weekly_best')}
                                onChange={() => handleCategoryChange('cat_weekly_best')}
                              />
                              <Label className="form-check-label" for="cat_weekly_best">Weekly Best Selling</Label>
                            </div>
                          </div>
                        </div>
                        {/* CPU Heat Pipes */}
                        <div className="form-check">
                          <Input 
                            type="checkbox" 
                            className="form-check-input" 
                            id="cat_cpu_heat_pipes"
                            checked={selectedCategories.has('cat_cpu_heat_pipes')}
                            onChange={() => handleCategoryChange('cat_cpu_heat_pipes')}
                          />
                          <Label className="form-check-label" for="cat_cpu_heat_pipes">CPU Heat Pipes</Label>
                        </div>
                        {/* CPU Coolers */}
                        <div className="form-check">
                          <Input 
                            type="checkbox" 
                            className="form-check-input" 
                            id="cat_cpu_coolers"
                            checked={selectedCategories.has('cat_cpu_coolers')}
                            onChange={() => handleCategoryChange('cat_cpu_coolers')}
                          />
                          <Label className="form-check-label" for="cat_cpu_coolers">CPU Coolers</Label>
                        </div>
                      </div>
                    </div>

                    {/* Accessories */}
                    <div className="form-check">
                      <Input 
                        type="checkbox" 
                        className="form-check-input" 
                        id="cat_accessories"
                        checked={selectedCategories.has('cat_accessories')}
                        onChange={() => handleCategoryChange('cat_accessories', categoryChildren.cat_accessories)}
                      />
                      <Label className="form-check-label" for="cat_accessories">Accessories</Label>
                      <div className="ms-4">
                        {/* Headphones */}
                        <div className="form-check">
                          <Input 
                            type="checkbox" 
                            className="form-check-input" 
                            id="cat_headphones"
                            checked={selectedCategories.has('cat_headphones')}
                            onChange={() => handleCategoryChange('cat_headphones')}
                          />
                          <Label className="form-check-label" for="cat_headphones">Headphones</Label>
                        </div>
                        {/* Wireless Headphones */}
                        <div className="form-check">
                          <Input 
                            type="checkbox" 
                            className="form-check-input" 
                            id="cat_wireless_headphones"
                            checked={selectedCategories.has('cat_wireless_headphones')}
                            onChange={() => handleCategoryChange('cat_wireless_headphones')}
                          />
                          <Label className="form-check-label" for="cat_wireless_headphones">Wireless Headphones</Label>
                        </div>
                        {/* TWS Earphones */}
                        <div className="form-check">
                          <Input 
                            type="checkbox" 
                            className="form-check-input" 
                            id="cat_tws_earphones"
                            checked={selectedCategories.has('cat_tws_earphones')}
                            onChange={() => handleCategoryChange('cat_tws_earphones')}
                          />
                          <Label className="form-check-label" for="cat_tws_earphones">TWS Earphones</Label>
                        </div>
                      </div>
                    </div>

                    {/* Smart Watch */}
                    <div className="form-check">
                      <Input 
                        type="checkbox" 
                        className="form-check-input" 
                        id="cat_smart_watch"
                        checked={selectedCategories.has('cat_smart_watch')}
                        onChange={() => handleCategoryChange('cat_smart_watch')}
                      />
                      <Label className="form-check-label" for="cat_smart_watch">Smart Watch</Label>
                    </div>

                    {/* Gaming Console */}
                    <div className="form-check">
                      <Input 
                        type="checkbox" 
                        className="form-check-input" 
                        id="cat_gaming_console"
                        checked={selectedCategories.has('cat_gaming_console')}
                        onChange={() => handleCategoryChange('cat_gaming_console')}
                      />
                      <Label className="form-check-label" for="cat_gaming_console">Gaming Console</Label>
                    </div>

                    {/* Electronics Gadgets */}
                    <div className="form-check">
                      <Input 
                        type="checkbox" 
                        className="form-check-input" 
                        id="cat_electronics_gadgets"
                        checked={selectedCategories.has('cat_electronics_gadgets')}
                        onChange={() => handleCategoryChange('cat_electronics_gadgets', categoryChildren.cat_electronics_gadgets)}
                      />
                      <Label className="form-check-label" for="cat_electronics_gadgets">Electronics Gadgets</Label>
                      <div className="ms-4">
                        {/* Microscope */}
                        <div className="form-check">
                          <Input 
                            type="checkbox" 
                            className="form-check-input" 
                            id="cat_microscope"
                            checked={selectedCategories.has('cat_microscope')}
                            onChange={() => handleCategoryChange('cat_microscope')}
                          />
                          <Label className="form-check-label" for="cat_microscope">Microscope</Label>
                        </div>
                        {/* Remote Control */}
                        <div className="form-check">
                          <Input 
                            type="checkbox" 
                            className="form-check-input" 
                            id="cat_remote_control"
                            checked={selectedCategories.has('cat_remote_control')}
                            onChange={() => handleCategoryChange('cat_remote_control')}
                          />
                          <Label className="form-check-label" for="cat_remote_control">Remote Control</Label>
                        </div>
                        {/* Monitor */}
                        <div className="form-check">
                          <Input 
                            type="checkbox" 
                            className="form-check-input" 
                            id="cat_monitor"
                            checked={selectedCategories.has('cat_monitor')}
                            onChange={() => handleCategoryChange('cat_monitor')}
                          />
                          <Label className="form-check-label" for="cat_monitor">Monitor</Label>
                        </div>
                        {/* Thermometer */}
                        <div className="form-check">
                          <Input 
                            type="checkbox" 
                            className="form-check-input" 
                            id="cat_thermometer"
                            checked={selectedCategories.has('cat_thermometer')}
                            onChange={() => handleCategoryChange('cat_thermometer')}
                          />
                          <Label className="form-check-label" for="cat_thermometer">Thermometer</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Brand Section */}
            <Card>
              <CardBody>
                <h4 className="card-title mb-3">{props.t("Brand")}</h4>
                <FormGroup>
                  <Input
                    type="select"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                  >
                    <option value="">{props.t("Select a brand...")}</option>
                  </Input>
                </FormGroup>
              </CardBody>
            </Card>

            {/* Featured Image Section */}
            <Card>
              <CardBody>
                <h4 className="card-title mb-3">{props.t("Featured image (optional)")}</h4>
                <div className="text-center p-3 border rounded">
                  <i className="bx bx-image fs-1 text-muted"></i>
                </div>
                <div className="mt-2">
                  <Button color="link" className="p-0 me-2">
                    {props.t("Choose image")}
                  </Button>
                  <span className="text-muted">or</span>
                  <Button color="link" className="p-0 ms-1">
                    {props.t("Add from URL")}
                  </Button>
                </div>
              </CardBody>
            </Card>

            {/* Product Collections Section */}
            <Card>
              <CardBody>
                <h4 className="card-title mb-3">{props.t("Product collections")}</h4>
                <div className="form-check mb-2">
                  <Input
                    type="checkbox"
                    className="form-check-input"
                    id="collection_weekly"
                  />
                  <Label className="form-check-label" for="collection_weekly">
                    {props.t("Weekly Gadget Spotlight")}
                  </Label>
                </div>
                <div className="form-check mb-2">
                  <Input
                    type="checkbox"
                    className="form-check-input"
                    id="collection_trendsetters"
                  />
                  <Label className="form-check-label" for="collection_trendsetters">
                    {props.t("Electronics Trendsetters")}
                  </Label>
                </div>
                <div className="form-check mb-2">
                  <Input
                    type="checkbox"
                    className="form-check-input"
                    id="collection_workspace"
                  />
                  <Label className="form-check-label" for="collection_workspace">
                    {props.t("Digital Workspace Gear")}
                  </Label>
                </div>
                <div className="form-check">
                  <Input
                    type="checkbox"
                    className="form-check-input"
                    id="collection_tech"
                  />
                  <Label className="form-check-label" for="collection_tech">
                    {props.t("Cutting-Edge Tech Showcase")}
                  </Label>
                </div>
              </CardBody>
            </Card>

            {/* Labels Section */}
            <Card>
              <CardBody>
                <h4 className="card-title mb-3">{props.t("Labels")}</h4>
                <div className="form-check mb-2">
                  <Input
                    type="checkbox"
                    className="form-check-input"
                    id="label_hot"
                  />
                  <Label className="form-check-label" for="label_hot">
                    {props.t("Hot")}
                  </Label>
                </div>
                <div className="form-check mb-2">
                  <Input
                    type="checkbox"
                    className="form-check-input"
                    id="label_new"
                  />
                  <Label className="form-check-label" for="label_new">
                    {props.t("New")}
                  </Label>
                </div>
                <div className="form-check">
                  <Input
                    type="checkbox"
                    className="form-check-input"
                    id="label_sale"
                  />
                  <Label className="form-check-label" for="label_sale">
                    {props.t("Sale")}
                  </Label>
                </div>
              </CardBody>
            </Card>

            {/* Taxes Section */}
            <Card>
              <CardBody>
                <h4 className="card-title mb-3">{props.t("Taxes")}</h4>
                <div className="form-check mb-2">
                  <Input
                    type="radio"
                    className="form-check-input"
                    name="tax"
                    id="tax_none"
                  />
                  <Label className="form-check-label" for="tax_none">
                    {props.t("None (0%)")}
                  </Label>
                </div>
                <div className="form-check mb-2">
                  <Input
                    type="radio"
                    className="form-check-input"
                    name="tax"
                    id="tax_vat"
                  />
                  <Label className="form-check-label" for="tax_vat">
                    {props.t("VAT (10%)")}
                  </Label>
                </div>
                <div className="form-check">
                  <Input
                    type="radio"
                    className="form-check-input"
                    name="tax"
                    id="tax_import"
                  />
                  <Label className="form-check-label" for="tax_import">
                    {props.t("Import Tax (15%)")}
                  </Label>
                </div>
              </CardBody>
            </Card>

            {/* Minimum Order Quantity Section */}
            <Card>
              <CardBody>
                <h4 className="card-title mb-3">{props.t("Minimum order quantity")}</h4>
                <Input
                  type="number"
                  name="minimum_order"
                  value={formData.minimum_order}
                  onChange={handleChange}
                  placeholder="0"
                />
                <small className="text-muted d-block mt-2">
                  {props.t("Minimum quantity to place an order, if the value is 0, there is no limit.")}
                </small>
              </CardBody>
            </Card>

            {/* Maximum Order Quantity Section */}
            <Card>
              <CardBody>
                <h4 className="card-title mb-3">{props.t("Maximum order quantity")}</h4>
                <Input
                  type="number"
                  name="maximum_order"
                  value={formData.maximum_order}
                  onChange={handleChange}
                  placeholder="0"
                />
                <small className="text-muted d-block mt-2">
                  {props.t("Maximum quantity to place an order, if the value is 0, there is no limit.")}
                </small>
              </CardBody>
            </Card>

            {/* Tags Section */}
            <Card>
              <CardBody>
                <h4 className="card-title mb-3">{props.t("Tags")}</h4>
                <Input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder={props.t("Write some tags")}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

ProductCreateOrEdit.propTypes = {
  t: PropTypes.func.isRequired,
  type: PropTypes.string,
};

export default withTranslation()(ProductCreateOrEdit); 