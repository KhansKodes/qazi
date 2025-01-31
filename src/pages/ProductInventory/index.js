import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import {
  Row,
  Col,
  Card,
  CardBody,
  Input,
  Table,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";

const ProductInventory = (props) => {
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
                  </Row>

                  <div className="table-responsive">
                    <Table className="table align-middle table-nowrap table-hover">
                      <thead className="table-light">
                        <tr>
                          <th>ID <i className="bx bx-sort"></i></th>
                          <th>IMAGE</th>
                          <th>PRODUCTS</th>
                          <th>STOREHOUSE MANAGEMENT</th>
                          <th>QUANTITY</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Products will be mapped here */}
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

ProductInventory.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation()(ProductInventory);
