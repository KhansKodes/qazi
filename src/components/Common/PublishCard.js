import React from "react";
import PropTypes from "prop-types";
import { Card, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";

const PublishCard = ({ onSave, cancelLink }) => {
  return (
    <Card>
      <CardBody>
        <h4 className="card-title mb-4">Publish</h4>
        <div className="d-grid gap-2">
          <Button
            color="primary"
            className="btn-primary-custom w-100"
            onClick={onSave}
            style={{
              backgroundColor: "#34c38f",
              borderColor: "#34c38f",
            }}
          >
            Save
          </Button>
          <Link
            to={cancelLink}
            className="btn btn-outline-secondary w-100"
            style={{
              borderColor: "#74788d",
              color: "#74788d"
            }}
          >
            Save & Exit
          </Link>
        </div>
      </CardBody>
    </Card>
  );
};

PublishCard.propTypes = {
  onSave: PropTypes.func.isRequired,
  cancelLink: PropTypes.string.isRequired,
};

export default PublishCard; 