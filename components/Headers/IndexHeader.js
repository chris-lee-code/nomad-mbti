import React from "react";
import Link from "next/link";
// reactstrap components
import { Button, Card, CardBody, Container, Row, Col } from "reactstrap";

class IndexHeader extends React.Component {
  render() {
    return (
      <>
        <div className="header bg-info pt-5 pb-7">
          <Container>
            <div className="header-body">
              <Row className="justify-content-center text-center align-items-center">
                <Col lg="6">
                  <div className="pr-5">
                    <h1 className="display-2 text-white font-weight-bold mb-0">
                      Nomad MBTI
                    </h1>
                    <h2 className="display-4 text-white font-weight-light">
                      A beautiful premium dashboard for NextJS, Bootstrap 4,
                      React and Reactstrap.
                    </h2>
                    <p className="text-white mt-4">
                      Argon perfectly combines reusable HTML and modular CSS
                      with a modern styling and beautiful markup throughout each
                      HTML template in the pack.
                    </p>
                    <div className="mt-5">
                      <Link href="/admin/dashboard">
                        <Button className="btn-neutral my-2" color="default">
                          Explore Dashboard
                        </Button>
                      </Link>
                      <Button
                        className="my-2"
                        color="default"
                        href="https://www.creative-tim.com/product/nextjs-argon-dashboard-pro?ref=njsadp-auth-navbar"
                      >
                        Purchase now
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
          <div className="separator separator-bottom separator-skew zindex-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="fill-default"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
        </div>
      </>
    );
  }
}

export default IndexHeader;
