import React from "react";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

const PlatformAdministration = (props) => {
  const systemCards = [
    {
      title: "Users",
      description: "View and update your system users",
      icon: "bx bx-user",
      link: "/platform-administration/users",
      enabled: true,
    },
    {
      title: "Roles And Permissions",
      description: "View and update your roles and permissions",
      icon: "bx bx-key",
      link: "/platform-administration/roles",
      enabled: true,
    },
    {
      title: "Request Logs",
      description: "View and delete your system request logs",
      icon: "bx bx-file",
      link: "/platform-administration/request-logs",
      enabled: false,
    },
    {
      title: "Activities Logs",
      description: "View and delete your system activity logs",
      icon: "bx bx-list-ul",
      link: "/platform-administration/activities-logs",
      enabled: true,
    },
    {
      title: "Backup",
      description: "Backup database and uploads folder",
      icon: "bx bx-cloud-download",
      link: "/platform-administration/backup",
      enabled: false,
    },
    {
      title: "Cronjob",
      description: "Cronjob allow you to automate certain commands or scripts on your site",
      icon: "bx bx-time",
      link: "/platform-administration/cronjob",
      enabled: false,
    },
    {
      title: "Cache Management",
      description: "Clear cache to make your site up to date",
      icon: "bx bx-refresh",
      link: "/platform-administration/cache",
      enabled: false,
    },
    {
      title: "Cleanup System",
      description: "Cleanup your unused data in database",
      icon: "bx bx-trash",
      link: "/platform-administration/cleanup",
      enabled: false,
    },
    {
      title: "System Information",
      description: "All information about current system configuration",
      icon: "bx bx-info-circle",
      link: "/platform-administration/system-info",
      enabled: false,
    },
    {
      title: "System Updater",
      description: "Update your system to the latest version",
      icon: "bx bx-upload",
      link: "/platform-administration/system-update",
      enabled: false,
    },
  ];

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h4 className="mb-4">{props.t("System")}</h4>
          <Row>
            {systemCards.map((card, index) => (
              <Col key={index} xl={4} sm={6}>
                <Card className={!card.enabled ? "opacity-50" : ""}>
                  <CardBody>
                    {card.enabled ? (
                      <Link to={card.link} className="text-dark">
                        <div className="d-flex align-items-center mb-3">
                          <div className="avatar-xs me-3">
                            <span className="avatar-title rounded-circle bg-success bg-soft text-black">
                              <i className={card.icon + " font-size-18"}></i>
                            </span>
                          </div>
                          <h5 className="font-size-14 mb-0">
                            {props.t(card.title)}
                          </h5>
                        </div>
                        <div className="text-muted">
                          <p className="mb-1">{props.t(card.description)}</p>
                        </div>
                      </Link>
                    ) : (
                      <div className="text-dark">
                        <div className="d-flex align-items-center mb-3">
                          <div className="avatar-xs me-3">
                            <span className="avatar-title rounded-circle bg-success bg-soft text-black">
                              <i className={card.icon + " font-size-18"}></i>
                            </span>
                          </div>
                          <h5 className="font-size-14 mb-0">
                            {props.t(card.title)}
                          </h5>
                        </div>
                        <div className="text-muted">
                          <p className="mb-1">{props.t(card.description)}</p>
                          <small className="text-danger">(Coming Soon)</small>
                        </div>
                      </div>
                    )}
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

PlatformAdministration.propTypes = {
  t: PropTypes.func,
};

export default withTranslation()(PlatformAdministration); 