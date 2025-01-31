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
} from "reactstrap";
import { Link } from "react-router-dom";

const FAQs = (props) => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col xs={12}>
              <Card>
                <CardBody>
                  <Row className="mb-2">
                    <Col sm="8">
                      <h4 className="card-title">{props.t("FAQs")}</h4>
                    </Col>
                    <Col sm="4">
                      <div className="text-sm-end">
                        <Link
                          to="/faqs/create"
                          className="btn btn-success btn-rounded waves-effect waves-light mb-2 me-2"
                        >
                          <i className="mdi mdi-plus me-1" />
                          {props.t("New FAQ")}
                        </Link>
                      </div>
                    </Col>
                  </Row>

                  <div className="table-responsive">
                    <Table className="table align-middle table-nowrap table-hover">
                      <thead className="table-light">
                        <tr>
                          <th>{props.t("ID")}</th>
                          <th>{props.t("Question")}</th>
                          <th>{props.t("Category")}</th>
                          <th>{props.t("Created At")}</th>
                          <th>{props.t("Status")}</th>
                          <th>{props.t("Languages")}</th>
                          <th>{props.t("Operations")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* FAQ items will be mapped here */}
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

FAQs.propTypes = {
  t: PropTypes.func,
};

export default withTranslation()(FAQs);
