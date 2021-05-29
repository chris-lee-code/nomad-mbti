import React, { useEffect, useState } from "react";
import Link from "next/link";
// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardBody,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import IndexHeader from "components/Headers/IndexHeader.js";
import AuthFooter from "components/Footers/AuthFooter.js";
import { COLORS } from "../../public/publicColor";
import { useRouter } from "next/router";

function ChooseTest() {
  const [chosen, setChosen] = useState(null);
  const [redirectTo, setRedirectTo] = useState(null);
  const router = useRouter();
  useEffect(() => {
    if (redirectTo) {
      router.push(redirectTo);
    }
  }, [redirectTo]);
  function handleNext(e) {
    e.preventDefault();
    if (chosen === "1") {
      setRedirectTo("/test/mbti");
    } else {
      setRedirectTo("/test/simple");
    }
  }

  function handleChoice(e) {
    e.preventDefault();
    setChosen(e.target.id);
  }

  return (
    <>
      <IndexNavbar />
      <div className="main-content">
        <section
          className="py-2 pb-9"
          style={{
            fontFamily: "Cafe24Shiningstar",
            background: COLORS.cafeLight,
            minHeight: "800px",
          }}
        >
          <Container>
            <Row className="justify-content-center text-center align-items-center">
              <Col lg="8">
                <div className="px-2 py-5">
                  <h2
                    className="display-4 text-white font-weight-light"
                    style={{
                      fontSize: "30px",
                      fontFamily: "Cafe24Dongdong",
                    }}
                  >
                    안녕하세요! 두 가지 중 한 가지를 선택하실 수 있어요!
                  </h2>
                </div>
              </Col>
            </Row>
            <Row className="justify-content-center text-center align-items-center">
              <Col lg="4" xs="6">
                <div className="px-2 py-2">
                  <Button
                    className="btn-neutral my-2 py-3 px-5"
                    style={{
                      fontSize: "20px",
                      fontFamily: "Cafe24Dongdong",
                      background:
                        chosen === "1" ? "#53A452" : COLORS.cafeDarker,
                      border: "none",
                      color: "white",
                      width: "100%",
                    }}
                    id={1}
                    onClick={handleChoice}
                  >
                    정식 검사 (50 문제) <br /> English
                  </Button>
                </div>
              </Col>
              <Col lg="4" xs="6">
                <div className="px-2 py-2">
                  <Button
                    className="btn-neutral my-2 py-3 px-5"
                    style={{
                      fontSize: "20px",
                      fontFamily: "Cafe24Dongdong",
                      background:
                        chosen === "2" ? "#53A452" : COLORS.cafeDarker,
                      border: "none",
                      color: "white",
                      width: "100%",
                    }}
                    id={2}
                    onClick={handleChoice}
                  >
                    간단 검사 (13 문제) <br /> 한국어
                  </Button>
                </div>
              </Col>
            </Row>

            <Row className="justify-content-center text-center align-items-center mt-5">
              <Col lg="4" xs="6">
                <Button
                  className="btn-neutral my-2 py-3 px-5"
                  style={{
                    fontSize: "20px",
                    fontFamily: "Cafe24Dongdong",
                    background: COLORS.cafeDarker,
                    border: "none",
                    color: "white",
                    width: "100%",
                  }}
                  onClick={handleNext}
                  disabled={!chosen}
                >
                  검사하러 가기!
                </Button>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
      <AuthFooter />
    </>
  );
}

export default ChooseTest;
