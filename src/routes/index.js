import React from "react";
import { Navigate } from "react-router-dom";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";

// Dashboard
import Dashboard from "../pages/Dashboard/index";
import Reports from "../pages/Reports/index";
import Brands from "../pages/Brands/index";
import BrandCreateOrEdit from "../pages/Brands/createOrEdit";
import ProductCollections from "../pages/ProductCollections/index";
import ProductCollectionCreateOrEdit from "../pages/ProductCollections/createOrEdit";
import ProductLabels from "../pages/ProductLabels/index";
import ProductLabelCreateOrEdit from "../pages/ProductLabels/createOrEdit";
import ProductOptions from "../pages/ProductOptions/index";
import ProductOptionCreateOrEdit from "../pages/ProductOptions/createOrEdit";
import ProductAttributeSets from "../pages/ProductAttributeSets/index";
import ProductAttributeSetCreateOrEdit from "../pages/ProductAttributeSets/createOrEdit";
import Reviews from "../pages/Reviews/index";
import CreateReview from "../pages/Reviews/create";
import FlashSales from "../pages/FlashSales/index";
import CreateFlashSale from "../pages/FlashSales/create";
import Discounts from "../pages/Discounts/index";
import CreateDiscount from "../pages/Discounts/create";
import Customers from "../pages/Customers/index";
import CreateCustomer from "../pages/Customers/create";
import Products from "../pages/Products/index";
import ProductCreateOrEdit from "../pages/Products/createOrEdit";
import ProductPrices from "../pages/ProductPrices/index";
import ProductInventory from '../pages/ProductInventory';
import SpecificationTables from "../pages/ProductSpecification/SpecificationTables/index";
import SpecificationTableCreateOrEdit from "../pages/ProductSpecification/SpecificationTables/createOrEdit";
import SpecificationAttributes from "../pages/ProductSpecification/SpecificationAttributes/index";
import SpecificationGroups from "../pages/ProductSpecification/SpecificationGroups/index";
import SpecificationAttributeCreateOrEdit from "../pages/ProductSpecification/SpecificationAttributes/createOrEdit";
import SpecificationGroupCreateOrEdit from "../pages/ProductSpecification/SpecificationGroups/createOrEdit";

// FAQ pages
import FAQs from "../pages/FAQs/FAQs/index";
import FAQCategories from "../pages/FAQs/Categories/index";
import FAQCategoryCreateOrEdit from "../pages/FAQs/Categories/createOrEdit";

// Platform Administration pages
import PlatformAdministration from "../pages/PlatformAdministration/index";
import ActivityLog from "../pages/PlatformAdministration/ActivitiesLogs/index";
import Users from "../pages/PlatformAdministration/Users/index";
import CreateUser from "../pages/PlatformAdministration/Users/create";
import RolesAndPermissions from "../pages/PlatformAdministration/RolesAndPermissions/index";
import CreateRole from "../pages/PlatformAdministration/RolesAndPermissions/create";

const authProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/reports", component: <Reports /> },

  // Products routes
  { path: "/products", component: <Products /> },
  { path: "/products/create", component: <ProductCreateOrEdit /> },
  { path: "/products/edit/:id", component: <ProductCreateOrEdit /> },

  // Brands routes
  { path: "/brands", component: <Brands /> },
  { path: "/brands/create", component: <BrandCreateOrEdit /> },
  { path: "/brands/edit/:id", component: <BrandCreateOrEdit /> },
  { path: "/product-collections", component: <ProductCollections /> },
  {
    path: "/product-collections/create",
    component: <ProductCollectionCreateOrEdit />,
  },
  {
    path: "/product-collections/edit/:id",
    component: <ProductCollectionCreateOrEdit />,
  },
  {
    path: "/product-labels",
    component: <ProductLabels />,
  },
  {
    path: "/product-labels/create",
    component: <ProductLabelCreateOrEdit />,
  },
  {
    path: "/product-labels/edit/:id",
    component: <ProductLabelCreateOrEdit />,
  },
  {
    path: "/product-options",
    component: <ProductOptions />,
  },
  {
    path: "/product-options/create",
    component: <ProductOptionCreateOrEdit />,
  },
  {
    path: "/product-options/edit/:id",
    component: <ProductOptionCreateOrEdit />,
  },
  {
    path: "/product-attribute-sets",
    component: <ProductAttributeSets />,
  },
  {
    path: "/product-attribute-sets/create",
    component: <ProductAttributeSetCreateOrEdit />,
  },
  {
    path: "/product-attribute-sets/edit/:id",
    component: <ProductAttributeSetCreateOrEdit />,
  },
  // Reviews routes
  { path: "/reviews", component: <Reviews /> },
  { path: "/reviews/create", component: <CreateReview /> },

  // Flash Sales routes
  { path: "/flash-sales", component: <FlashSales /> },
  { path: "/flash-sales/create", component: <CreateFlashSale /> },

  // Discounts routes
  { path: "/discounts", component: <Discounts /> },
  { path: "/discounts/create", component: <CreateDiscount /> },

  // Customers routes
  { path: "/customers", component: <Customers /> },
  { path: "/customers/create", component: <CreateCustomer /> },

  { path: "/product-prices", component: <ProductPrices /> },

  //product inventory routes
  {path: "/product-inventory", component: <ProductInventory /> },

  // Specification Tables routes
  { path: "/specification-tables", component: <SpecificationTables /> },
  { path: "/specification-tables/create", component: <SpecificationTableCreateOrEdit /> },
  { path: "/specification-tables/edit/:id", component: <SpecificationTableCreateOrEdit /> },
  
  // Specification Attributes routes
  { path: "/specification-attributes", component: <SpecificationAttributes /> },
  { path: "/specification-attributes/create", component: <SpecificationAttributeCreateOrEdit /> },
  { path: "/specification-attributes/edit/:id", component: <SpecificationAttributeCreateOrEdit /> },
  
  // Specification Groups routes
  { path: "/specification-groups", component: <SpecificationGroups /> },
  { path: "/specification-groups/create", component: <SpecificationGroupCreateOrEdit /> },
  { path: "/specification-groups/edit/:id", component: <SpecificationGroupCreateOrEdit /> },

  // FAQ routes
  { path: "/faqs", component: <FAQs /> },
  { path: "/faq-categories", component: <FAQCategories /> },
  { path: "/faq-categories/create", component: <FAQCategoryCreateOrEdit /> },
  { path: "/faq-categories/edit/:id", component: <FAQCategoryCreateOrEdit /> },

  // Platform Administration routes
  { path: "/platform-administration", component: <PlatformAdministration /> },
  { path: "/platform-administration/activities-logs", component: <ActivityLog /> },
  { path: "/platform-administration/users", component: <Users /> },
  { path: "/platform-administration/users/create", component: <CreateUser /> },
  { path: "/platform-administration/roles", component: <RolesAndPermissions /> },
  { path: "/platform-administration/roles/create", component: <CreateRole /> },

  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
];

const publicRoutes = [
  { path: "/login", component: <Login /> },
  { path: "/logout", component: <Logout /> },
  { path: "/forgot-password", component: <ForgetPwd /> },
  { path: "/register", component: <Register /> },
];

export { authProtectedRoutes, publicRoutes };
