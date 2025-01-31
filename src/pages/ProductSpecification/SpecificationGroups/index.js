import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  CardBody,
  Input,
  Table,
  Button,
} from "reactstrap";
import Breadcrumbs from "../../../components/Common/Breadcrumb";

const SpecificationGroups = (props) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">

          <Row>
            <Col xs={12}>
              <Card>
                <CardBody>
                  {/* Search and Create Button */}
                  <Row className="mb-2">
                    <Col sm="4">
                      <div className="search-box me-2 mb-2 d-inline-block">
                        <div className="position-relative">
                          <Input
                            type="text"
                            className="form-control"
                            placeholder={props.t("Search...")}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                          <i className="bx bx-search-alt search-icon" />
                        </div>
                      </div>
                    </Col>
                    <Col sm="8">
                      <div className="text-sm-end">
                        <Link
                          to="/specification-groups/create"
                          className="btn btn-success btn-rounded waves-effect waves-light mb-2 me-2"
                        >
                          <i className="mdi mdi-plus me-1" />
                          {props.t("Create")}
                        </Link>
                      </div>
                    </Col>
                  </Row>

                  {/* Table */}
                  <div className="table-responsive">
                    <Table className="table align-middle table-nowrap table-hover">
                      <thead className="table-light">
                        <tr>
                          <th>ID <i className="bx bx-sort"></i></th>
                          <th>NAME</th>
                          <th>DESCRIPTION</th>
                          <th>CREATED AT</th>
                          <th>OPERATIONS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Specification groups will be mapped here */}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
};

SpecificationGroups.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation()(SpecificationGroups);
