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
  Alert,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";

const ProductPrices = (props) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">

          {/* Price Notice Banner */}
          <Alert color="warning" className="d-flex align-items-center mb-4">
            <i className="bx bx-info-circle me-2 fs-4"></i>
            <div>
              These prices represent the original costs of the product and may not reflect the final prices, which could vary due to factors such as flash sales, promotions, and more.
            </div>
          </Alert>

          <Row>
            <Col xs={12}>
              <Card>
                <CardBody>
                  {/* Search Bar */}
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

                  {/* Table */}
                  <div className="table-responsive">
                    <Table className="table align-middle table-nowrap table-hover">
                      <thead className="table-light">
                        <tr>
                          <th>ID <i className="bx bx-sort"></i></th>
                          <th>IMAGE</th>
                          <th>PRODUCTS</th>
                          <th>COST PER ITEM</th>
                          <th>PRICE</th>
                          <th>PRICE SALE</th>
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

ProductPrices.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation()(ProductPrices);
