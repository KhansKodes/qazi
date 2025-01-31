import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Card,
  CardBody,
  Table,
  Container,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Link } from "react-router-dom";

const FAQCategories = (props) => {
  const [selectedRows, setSelectedRows] = useState([]);

  const toggleSelectAll = (e) => {
    if (e.target.checked) {
      // Logic to select all rows
      setSelectedRows([]);
    } else {
      setSelectedRows([]);
    }
  };

  const toggleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col xs={12}>
              <Card>
                <CardBody>
                  <Row className="mb-2">
                    <Col sm="4">
                      <div className="search-box me-2 mb-2 d-inline-block">
                        <div className="position-relative">
                          <input
                            type="text"
                            className="form-control"
                            placeholder={props.t("Search...")}
                          />
                          <i className="bx bx-search-alt search-icon"></i>
                        </div>
                      </div>
                    </Col>
                    <Col sm="8">
                      <div className="text-sm-end">
                        <Link
                          to="/faq-categories/create"
                          className="btn btn-success btn-rounded waves-effect waves-light mb-2 me-2"
                        >
                          <i className="mdi mdi-plus me-1" />
                          {props.t("New FAQ Category")}
                        </Link>
                      </div>
                    </Col>
                  </Row>

                  <div className="table-responsive">
                    <Table className="table align-middle table-nowrap table-hover">
                      <thead className="table-light">
                        <tr>
                          <th>
                            <div className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                onChange={toggleSelectAll}
                              />
                            </div>
                          </th>
                          <th>{props.t("ID")}</th>
                          <th>{props.t("Name")}</th>
                          <th>{props.t("Created At")}</th>
                          <th>{props.t("Status")}</th>
                          <th>
                            <img src="/images/flags/us.jpg" alt="English" height="16" />
                            <img src="/images/flags/vn.jpg" alt="Vietnamese" height="16" />
                            <img src="/images/flags/sa.jpg" alt="Arabic" height="16" />
                          </th>
                          <th>{props.t("Operations")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Example row - you'll map through your actual data here */}
                        <tr>
                          <td>
                            <div className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                checked={selectedRows.includes(1)}
                                onChange={() => toggleSelectRow(1)}
                              />
                            </div>
                          </td>
                          <td>1</td>
                          <td>Shipping</td>
                          <td>2025-01-08</td>
                          <td>
                            <span className="badge badge-pill badge-soft-success">
                              {props.t("Published")}
                            </span>
                          </td>
                          <td>
                            <i className="bx bx-check text-success"></i>
                            <i className="bx bx-check text-success"></i>
                            <i className="bx bx-check text-success"></i>
                          </td>
                          <td>
                            <UncontrolledDropdown>
                              <DropdownToggle
                                href="#"
                                className="card-drop"
                                tag="i"
                              >
                                <i className="mdi mdi-dots-horizontal font-size-18" />
                              </DropdownToggle>
                              <DropdownMenu className="dropdown-menu-end">
                                <DropdownItem href={`/faq-categories/edit/1`}>
                                  <i className="mdi mdi-pencil font-size-16 text-success me-1" />
                                  {props.t("Edit")}
                                </DropdownItem>
                                <DropdownItem href="#">
                                  <i className="mdi mdi-trash-can font-size-16 text-danger me-1" />
                                  {props.t("Delete")}
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
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

FAQCategories.propTypes = {
  t: PropTypes.func,
};

export default withTranslation()(FAQCategories);
