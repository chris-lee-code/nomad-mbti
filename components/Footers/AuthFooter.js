import React from "react";

// reactstrap components
import { NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";
import { COLORS } from "../../public/publicColor";

class Login extends React.Component {
  render() {
    return (
      <>
        <footer
          className="py-5"
          id="footer-main"
          style={{ background: COLORS.cafeDarker }}
        >
          <Container>
            <Row className="d-flex align-items-center justify-content-xl-between justify-content-center text-lg-left text-center">
              <Col xl="6" className="text-lg-left text-center">
                <div className="copyright  text-xl-left text-center text-muted d-flex justify-content-xl-start justify-content-center mb-3 mb-xl-0 text-success">
                  © {new Date().getFullYear()}{" "}
                  <div
                    className="font-weight-bold ml-1"
                    style={{ color: COLORS.cafeLight }}
                  >
                    노마드 카페
                  </div>
                </div>
              </Col>
              <Col xl="6">
                <Nav className="nav-footer justify-content-center justify-content-xl-end">
                  <NavItem>
                    <NavLink
                      href="https://nomadcoders.co/community/type-test"
                      target="_blank"
                    >
                      <a
                        className="font-weight-bold ml-1 bg-success py-2 px-2 text-white"
                        style={{
                          fontFamily: "Cafe24Dongdong",
                          borderRadius: "10px",
                          fontSize: "20px",
                        }}
                      >
                        노마드코더에서 추천하기!
                      </a>
                    </NavLink>
                  </NavItem>
                </Nav>
              </Col>
            </Row>
          </Container>
        </footer>
      </>
    );
  }
}

export default Login;
