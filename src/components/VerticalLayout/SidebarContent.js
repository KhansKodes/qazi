import React, { useEffect, useRef, useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

// //Import Scrollbar
import SimpleBar from "simplebar-react";

// MetisMenu
import MetisMenu from "metismenujs";
import withRouter from "components/Common/withRouter";
import { Link } from "react-router-dom";
import { Collapse } from "reactstrap";

//i18n
import { withTranslation } from "react-i18next";

const SidebarContent = (props) => {
  const ref = useRef();
  const activateParentDropdown = useCallback((item) => {
    item.classList.add("active");
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];

    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }, []);

  const removeActivation = (items) => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i];
      const parent = items[i].parentElement;

      if (item && item.classList.contains("active")) {
        item.classList.remove("active");
      }
      if (parent) {
        const parent2El =
          parent.childNodes && parent.childNodes.lenght && parent.childNodes[1]
            ? parent.childNodes[1]
            : null;
        if (parent2El && parent2El.id !== "side-menu") {
          parent2El.classList.remove("mm-show");
        }

        parent.classList.remove("mm-active");
        const parent2 = parent.parentElement;

        if (parent2) {
          parent2.classList.remove("mm-show");

          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.remove("mm-active"); // li
            parent3.childNodes[0].classList.remove("mm-active");

            const parent4 = parent3.parentElement; // ul
            if (parent4) {
              parent4.classList.remove("mm-show"); // ul
              const parent5 = parent4.parentElement;
              if (parent5) {
                parent5.classList.remove("mm-show"); // li
                parent5.childNodes[0].classList.remove("mm-active"); // a tag
              }
            }
          }
        }
      }
    }
  };

  const path = useLocation();
  const activeMenu = useCallback(() => {
    const pathName = path.pathname;
    let matchingMenuItem = null;
    const ul = document.getElementById("side-menu");
    const items = ul.getElementsByTagName("a");
    removeActivation(items);

    for (let i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  }, [path.pathname, activateParentDropdown]);

  useEffect(() => {
    ref.current.recalculate();
  }, []);

  useEffect(() => {
    new MetisMenu("#side-menu");
    activeMenu();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    activeMenu();
  }, [activeMenu]);

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }

  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isFAQsOpen, setIsFAQsOpen] = useState(false);

  const toggleProducts = () => {
    setIsProductsOpen(!isProductsOpen);
  };

  const toggleFAQs = () => {
    setIsFAQsOpen(!isFAQsOpen);
  };

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{props.t("Menu")} </li>
            <li>
              <Link to="/dashboard">
                <i className="bx bx-home-circle"></i>
                <span>{props.t("Dashboard")}</span>
              </Link>
            </li>  
            <li>
              <Link to="/reports">
                <i className="bx bx-chart"></i>
                <span>{props.t("Reports")}</span>
              </Link>
            </li>
            <li>
              <Link to="/brands">
                <i className="bx bx-store"></i>
                <span>{props.t("Brands")}</span>
              </Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={toggleProducts}
                className="has-arrow waves-effect"
              >
                <i className="bx bx-package"></i>
                <span>{props.t("Products")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded={isProductsOpen}>
                <li>
                  <Link to="/products">
                    <i className="bx bx-box"></i>
                    <span>{props.t("Products")}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/product-inventory">
                    <i className="bx bx-box"></i>
                    <span>{props.t("Product Inventory")}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/product-prices">
                    <i className="bx bx-package"></i>
                    <span>{props.t("Product Prices")}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/product-collections">
                    <i className="bx bx-collection"></i>
                    <span>{props.t("Collections")}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/product-labels">
                    <i className="bx bx-label"></i>
                    <span>{props.t("Labels")}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/product-options">
                    <i className="bx bx-list-ul"></i>
                    <span>{props.t("Options")}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/product-attribute-sets">
                    <i className="bx bx-grid-alt"></i>
                    <span>{props.t("Attribute Sets")}</span>
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link
                to="/"
                onClick={toggleProducts}
                className="has-arrow waves-effect"
              >
                <i className="bx bx-package"></i>
                <span>{props.t("Products Specification")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded={isProductsOpen}>
                <li>
                  <Link to="/specification-tables">
                    <i className="bx bx-table"></i>
                    <span>{props.t("Specification Tables")}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/specification-attributes">
                    <i className="bx bx-list-ul"></i>
                    <span>{props.t("Specification Attributes")}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/specification-groups">
                    <i className="bx bx-group"></i>
                    <span>{props.t("Specification Groups")}</span>
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link
                to="/"
                onClick={toggleFAQs}
                className="has-arrow waves-effect"
              >
                <i className="bx bx-help-circle"></i>
                <span>{props.t("FAQs")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded={isFAQsOpen}>
                <li>
                  <Link to="/faqs">
                    <i className="bx bx-question-mark"></i>
                    <span>{props.t("FAQs")}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/faq-categories">
                    <i className="bx bx-category"></i>
                    <span>{props.t("FAQ Categories")}</span>
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/reviews">
                <i className="bx bx-star"></i>
                <span>{props.t("Reviews")}</span>
              </Link>
            </li>
            <li>
              <Link to="/flash-sales">
                <i className="bx bx-timer"></i>
                <span>{props.t("Flash Sales")}</span>
              </Link>
            </li>
            <li>
              <Link to="/discounts">
                <i className="bx bx-tag"></i>
                <span>{props.t("Discounts")}</span>
              </Link>
            </li>
            <li>
              <Link to="/customers">
                <i className="bx bx-user"></i>
                <span>{props.t("Customers")}</span>
              </Link>
            </li>
            <li>
              <Link to="/platform-administration">
                <i className="bx bx-user"></i>
                <span>{props.t("Platform Administration")}</span>
              </Link>
            </li>
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(SidebarContent));
