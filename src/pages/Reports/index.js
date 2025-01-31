import React, { useState, useEffect } from "react";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Card,
  CardBody,
  Container,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Line, Doughnut } from "react-chartjs-2";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

const Reports = (props) => {
  const [dateRange, setDateRange] = useState({ start: "2025-01-02", end: "2025-01-31" });
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const handleDateRangeSelect = (option) => {
    const today = new Date();
    let start = new Date();
    const end = today;

    switch (option) {
      case 'today':
        start = today;
        break;
      case 'thisWeek':
        start.setDate(today.getDate() - today.getDay());
        break;
      case 'last7Days':
        start.setDate(today.getDate() - 6);
        break;
      case 'last30Days':
        start.setDate(today.getDate() - 29);
        break;
      case 'thisMonth':
        start = new Date(today.getFullYear(), today.getMonth(), 1);
        break;
      case 'thisYear':
        start = new Date(today.getFullYear(), 0, 1);
        break;
      default:
        break;
    }

    setDateRange({
      start: start.toISOString().split('T')[0],
      end: end.toISOString().split('T')[0],
    });
  };

  // Static data for statistics
  const stats = {
    revenue: { total: 127151.00, increase: 28731 },
    products: { total: 57, increase: 123 },
    customers: { total: 10, increase: 10 },
    orders: { total: 26, increase: 10 }
  };

  // Chart configurations
  const customersChartData = {
    labels: ["08 Jan"],
    datasets: [
      {
        label: "Customers",
        data: [10],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const ordersChartData = {
    labels: ["02 Jan", "03 Jan", "04 Jan", "05 Jan", "06 Jan", "07 Jan", "08 Jan", "31 Jan"],
    datasets: [
      {
        label: "Orders",
        data: [4, 7, 8, 6, 5, 7, 2, 1],
        fill: false,
        borderColor: "rgb(53, 162, 235)",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Breadcrumb */}
          <div className="d-flex align-items-center mb-3">
            <div className="ms-auto">
              <Dropdown isOpen={isOpen} toggle={toggle}>
                <DropdownToggle color="success" outline className="btn-rounded">
                  <i className="far fa-calendar-alt me-2"></i>
                  {dateRange.start} to {dateRange.end}
                </DropdownToggle>
                <DropdownMenu className="p-3" style={{ minWidth: '300px' }}>
                  <div className="mb-3">
                    <DropdownItem onClick={() => handleDateRangeSelect('today')}>Today</DropdownItem>
                    <DropdownItem onClick={() => handleDateRangeSelect('thisWeek')}>This week</DropdownItem>
                    <DropdownItem onClick={() => handleDateRangeSelect('last7Days')}>Last 7 days</DropdownItem>
                    <DropdownItem onClick={() => handleDateRangeSelect('last30Days')}>Last 30 days</DropdownItem>
                    <DropdownItem onClick={() => handleDateRangeSelect('thisMonth')}>This month</DropdownItem>
                    <DropdownItem onClick={() => handleDateRangeSelect('thisYear')}>This year</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem header>Custom Range</DropdownItem>
                  </div>
                  <Flatpickr
                    value={[new Date(dateRange.start), new Date(dateRange.end)]}
                    className="form-control"
                    options={{
                      mode: "range",
                      dateFormat: "Y-m-d",
                      maxDate: "today",
                      showMonths: 1,
                      static: true,
                    }}
                    onChange={dates => {
                      if (dates.length === 2) {
                        setDateRange({
                          start: dates[0].toISOString().split('T')[0],
                          end: dates[1].toISOString().split('T')[0],
                        });
                      }
                    }}
                  />
                  <div className="d-flex justify-content-end mt-3">
                    <Button color="success" size="sm" className="me-2" onClick={toggle}>
                      Cancel
                    </Button>
                    <Button color="success" size="sm" onClick={toggle}>
                      Apply
                    </Button>
                  </div>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>

          {/* Statistics Cards */}
          <Row>
            {/* Revenue Card */}
            <Col xl={3} md={6}>
              <Card>
                <CardBody>
                  <div className="d-flex align-items-center">
                    <div className="avatar-sm rounded-circle bg-success bg-soft p-2 me-3">
                      <span className="avatar-title rounded-circle bg-success bg-soft">
                        <i className="bx bx-dollar font-size-24"></i>
                      </span>
                    </div>
                    <div className="flex-grow-1">
                      <p className="text-muted mb-1">{props.t("Revenue")}</p>
                      <h4 className="mb-0">${stats.revenue.total.toFixed(2)}</h4>
                      <p className="text-success mb-0">
                        <i className="mdi mdi-arrow-up me-1"></i>
                        {stats.revenue.increase} increase
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>

            {/* Products Card */}
            <Col xl={3} md={6}>
              <Card>
                <CardBody>
                  <div className="d-flex align-items-center">
                    <div className="avatar-sm rounded-circle bg-success bg-soft p-2 me-3">
                      <span className="avatar-title rounded-circle bg-success bg-soft">
                        <i className="bx bx-store font-size-24"></i>
                      </span>
                    </div>
                    <div className="flex-grow-1">
                      <p className="text-muted mb-1">{props.t("Products")}</p>
                      <h4 className="mb-0">{stats.products.total}</h4>
                      <p className="text-success mb-0">
                        <i className="mdi mdi-arrow-up me-1"></i>
                        {stats.products.increase} increase
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>

            {/* Customers Card */}
            <Col xl={3} md={6}>
              <Card>
                <CardBody>
                  <div className="d-flex align-items-center">
                    <div className="avatar-sm rounded-circle bg-success bg-soft p-2 me-3">
                      <span className="avatar-title rounded-circle bg-success bg-soft">
                        <i className="bx bx-user font-size-24"></i>
                      </span>
                    </div>
                    <div className="flex-grow-1">
                      <p className="text-muted mb-1">{props.t("Customers")}</p>
                      <h4 className="mb-0">{stats.customers.total}</h4>
                      <p className="text-success mb-0">
                        <i className="mdi mdi-arrow-up me-1"></i>
                        {stats.customers.increase} increase
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>

            {/* Orders Card */}
            <Col xl={3} md={6}>
              <Card>
                <CardBody>
                  <div className="d-flex align-items-center">
                    <div className="avatar-sm rounded-circle bg-success bg-soft p-2 me-3">
                      <span className="avatar-title rounded-circle bg-success bg-soft">
                        <i className="bx bx-cart font-size-24"></i>
                      </span>
                    </div>
                    <div className="flex-grow-1">
                      <p className="text-muted mb-1">{props.t("Orders")}</p>
                      <h4 className="mb-0">{stats.orders.total}</h4>
                      <p className="text-success mb-0">
                        <i className="mdi mdi-arrow-up me-1"></i>
                        {stats.orders.increase} increase
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* Charts */}
          <Row>
            {/* Customers Chart */}
            <Col xl={6}>
              <Card>
                <CardBody>
                  <h4 className="card-title mb-4">{props.t("Customers")}</h4>
                  <div>
                    <Line data={customersChartData} options={chartOptions} />
                  </div>
                </CardBody>
              </Card>
            </Col>

            {/* Orders Chart */}
            <Col xl={6}>
              <Card>
                <CardBody>
                  <h4 className="card-title mb-4">{props.t("Orders")}</h4>
                  <div>
                    <Line data={ordersChartData} options={chartOptions} />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* Sales Reports Section */}
          <Row className="mt-4">
            <Col xs={12}>
              <Card>
                <CardBody>
                  <h4 className="card-title mb-4">{props.t("Sales Reports")}</h4>
                  <Row>
                    {/* Sales Line Chart */}
                    <Col xl={8}>
                      <div>
                        <Line 
                          data={{
                            labels: [
                              "02 Jan", "04 Jan", "06 Jan", "08 Jan", "10 Jan", 
                              "12 Jan", "14 Jan", "16 Jan", "18 Jan", "20 Jan",
                              "22 Jan", "24 Jan", "26 Jan", "28 Jan", "30 Jan"
                            ],
                            datasets: [
                              {
                                label: "Items Earning Sales",
                                data: [
                                  0, 0, 0, 127151, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
                                ],
                                fill: true,
                                borderColor: "#ffc107",
                                backgroundColor: "rgba(255, 193, 7, 0.1)",
                                tension: 0.4,
                              },
                            ],
                          }}
                          options={{
                            ...chartOptions,
                            scales: {
                              ...chartOptions.scales,
                              y: {
                                beginAtZero: true,
                                max: 150000,
                                ticks: {
                                  stepSize: 30000,
                                },
                              },
                            },
                          }}
                        />
                      </div>
                      <div className="mt-3">
                        <div className="d-flex align-items-center">
                          <div className="d-flex align-items-center">
                            <div className="me-2" style={{ 
                              width: 12, 
                              height: 12, 
                              backgroundColor: "#ffc107", 
                              borderRadius: "50%" 
                            }}></div>
                            <span>Items Earning Sales: $127,151.00</span>
                          </div>
                        </div>
                      </div>
                    </Col>

                    {/* Sales Donut Chart */}
                    <Col xl={4}>
                      <div className="text-center">
                        <Doughnut
                          data={{
                            labels: ["Completed", "Pending"],
                            datasets: [
                              {
                                data: [127151.00, 58432.00],
                                backgroundColor: ["#28a745", "#dc3545"],
                                borderWidth: 0,
                              },
                            ],
                          }}
                          options={{
                            responsive: true,
                            cutout: "70%",
                            plugins: {
                              legend: {
                                display: false,
                              },
                            },
                          }}
                        />
                        <div className="mt-4">
                          <div className="d-flex justify-content-center mb-3">
                            <h4 className="mb-0">$127,151.00</h4>
                          </div>
                          <p className="text-muted mb-3 text-center">Total Earnings</p>
                          <div className="d-flex justify-content-around">
                            <div className="d-flex align-items-center">
                              <div className="me-2" style={{ 
                                width: 12, 
                                height: 12, 
                                backgroundColor: "#28a745", 
                                borderRadius: "50%" 
                              }}></div>
                              <span>$127,151.00 Completed</span>
                            </div>
                            <div className="d-flex align-items-center">
                              <div className="me-2" style={{ 
                                width: 12, 
                                height: 12, 
                                backgroundColor: "#dc3545", 
                                borderRadius: "50%" 
                              }}></div>
                              <span>$58,432.00 Pending</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* Recent Orders Section */}
          <Row className="mt-4">
            <Col xs={12}>
              <Card>
                <CardBody>
                  <h4 className="card-title mb-4">{props.t("Recent Orders")}</h4>
                  
                  {/* Search Input */}
                  <div className="mb-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search..."
                      style={{ maxWidth: "300px" }}
                    />
                  </div>

                  {/* Orders Table */}
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead>
                        <tr>
                          <th>
                            ID 
                            <i className="fas fa-sort ms-1"></i>
                          </th>
                          <th>
                            CUSTOMER 
                            <i className="fas fa-sort ms-1"></i>
                          </th>
                          <th>
                            AMOUNT 
                            <i className="fas fa-sort ms-1"></i>
                          </th>
                          <th>
                            PAYMENT METHOD 
                            <i className="fas fa-sort ms-1"></i>
                          </th>
                          <th>
                            PAYMENT STATUS 
                            <i className="fas fa-sort ms-1"></i>
                          </th>
                          <th>
                            STATUS 
                            <i className="fas fa-sort ms-1"></i>
                          </th>
                          <th>
                            CREATED AT 
                            <i className="fas fa-sort ms-1"></i>
                          </th>
                          <th>
                            STORE 
                            <i className="fas fa-sort ms-1"></i>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Table rows will be populated dynamically */}
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* Products Statistics Section */}
          <Row className="mt-4">
            {/* Top Selling Products */}
            <Col xl={6}>
              <Card>
                <CardBody>
                  <h4 className="card-title mb-4">{props.t("Top Selling Products")}</h4>
                  
                  {/* Search Input */}
                  <div className="mb-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search..."
                      style={{ maxWidth: "300px" }}
                    />
                  </div>

                  {/* Top Selling Products Table */}
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead>
                        <tr>
                          <th>
                            PRODUCT ID 
                            <i className="fas fa-sort ms-1"></i>
                          </th>
                          <th>
                            PRODUCT NAME 
                            <i className="fas fa-sort ms-1"></i>
                          </th>
                          <th>
                            QUANTITY 
                            <i className="fas fa-sort ms-1"></i>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Table rows will be populated dynamically */}
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>
            </Col>

            {/* Trending Products */}
            <Col xl={6}>
              <Card>
                <CardBody>
                  <h4 className="card-title mb-4">{props.t("Trending Products")}</h4>
                  
                  {/* Search Input */}
                  <div className="mb-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search..."
                      style={{ maxWidth: "300px" }}
                    />
                  </div>

                  {/* Trending Products Table */}
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead>
                        <tr>
                          <th>
                            ID 
                            <i className="fas fa-sort ms-1"></i>
                          </th>
                          <th>
                            PRODUCT NAME 
                            <i className="fas fa-sort ms-1"></i>
                          </th>
                          <th>
                            VIEWS 
                            <i className="fas fa-sort ms-1"></i>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Table rows will be populated dynamically */}
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

Reports.propTypes = {
  t: PropTypes.func,
};

export default withTranslation()(Reports);
