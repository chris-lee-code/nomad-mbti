import React from "react";
import Link from "next/link";
// reactstrap components
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  Button,
} from "reactstrap";
import { COLORS } from "../../public/publicColor";

class AdminNavbar extends React.Component {
  render() {
    return (
      <>
        <Navbar
          className="navbar-horizontal navbar-main navbar-dark "
          style={{
            background: COLORS.cafeDarker,
            fontFamily: "Cafe24Shiningstar",
          }}
          expand="lg"
          id="navbar-main"
        >
          <Container>
            <Link href="/">
              <span>
                <NavbarBrand href="#pablo">
                  <img
                    alt="..."
                    src={require("../../assets/img/brand/nomadCafeFavicon-white.png")}
                  />
                </NavbarBrand>
              </span>
            </Link>
            <button
              aria-controls="navbar-collapse"
              aria-expanded={false}
              aria-label="Toggle navigation"
              className="navbar-toggler"
              data-target="#navbar-collapse"
              data-toggle="collapse"
              id="navbar-collapse"
              type="button"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <UncontrolledCollapse
              className="navbar-custom-collapse"
              navbar
              toggler="#navbar-collapse"
            >
              <div className="navbar-collapse-header">
                <Row>
                  <Col className="collapse-brand" xs="6">
                    <Link href="/admin/dashboard">
                      <img
                        alt="..."
                        src={require("assets/img/brand/nomadCafeFavicon.png")}
                      />
                    </Link>
                  </Col>
                  <Col className="collapse-close" xs="6">
                    <button
                      aria-controls="navbar-collapse"
                      aria-expanded={false}
                      aria-label="Toggle navigation"
                      className="navbar-toggler"
                      data-target="#navbar-collapse"
                      data-toggle="collapse"
                      id="navbar-collapse"
                      type="button"
                    >
                      <span />
                      <span />
                    </button>
                  </Col>
                </Row>
              </div>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <Link href="/about">
                    <NavLink href="#pablo">
                      <span
                        className="nav-link-inner--text"
                        style={{
                          fontSize: "20px",
                          fontFamily: "Cafe24Dongdong",
                        }}
                      >
                        노마드 카페에 대하여
                      </span>
                    </NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/result">
                    <NavLink href="#pablo">
                      <span
                        className="nav-link-inner--text"
                        style={{
                          fontSize: "20px",
                          fontFamily: "Cafe24Dongdong",
                        }}
                      >
                        메뉴판
                      </span>
                    </NavLink>
                  </Link>
                </NavItem>
              </Nav>
              <hr className="d-lg-none" />
              <Nav className="align-items-lg-center ml-lg-auto" navbar>
                <NavItem className="d-none d-lg-block ml-lg-4">
                  <Link href="/test">
                    <Button
                      className="btn-neutral my-2 py-3 px-3"
                      style={{
                        fontSize: "16px",
                        fontFamily: "Cafe24Dongdong",
                        background: COLORS.cafeBrown,
                        border: "none",
                        color: "white",
                      }}
                    >
                      테스트 바로 시작하기
                    </Button>
                  </Link>
                </NavItem>
              </Nav>
            </UncontrolledCollapse>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default AdminNavbar;
