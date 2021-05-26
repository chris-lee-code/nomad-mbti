import React from "react";
import Link from "next/link";
// reactstrap components
import { Button, Card, CardBody, Container, Row, Col } from "reactstrap";
import { COLORS } from "../../public/publicColor";

class IndexHeader extends React.Component {
  render() {
    return (
      <>
        <div
          className="header pt-5 pb-7"
          style={{
            fontFamily: "Cafe24Shiningstar",
            background: COLORS.cafeLight,
          }}
        >
          <Container>
            <div className="header-body">
              <Row className="justify-content-center text-center align-items-center">
                <Col lg="8">
                  <div className="px-2">
                    <div className="d-flex align-items-center justify-content-center text-center">
                      <h1
                        className="display-2 font-weight-bold mb-0"
                        style={{ color: COLORS.cafeDarker, fontSize: "80px" }}
                      >
                        노마드 카페
                      </h1>
                      <img
                        src={require("../../assets/img/brand/nomadCafeFavicon.png")}
                        style={{ width: "70px", height: "70px" }}
                      />
                    </div>
                    <h2
                      className="display-4 text-white font-weight-light"
                      style={{
                        fontSize: "30px",
                        fontFamily: "Cafe24Dongdong",
                      }}
                    >
                      노마드 코더 여러분들을 위한 심리테스트!
                    </h2>
                    <p
                      className="text-white mt-4"
                      style={{
                        fontSize: "20px",
                        fontFamily: "Cafe24Dongdong",
                      }}
                    >
                      진행 방식은 MBTI와 비슷해요! 총 16가지 결과가 준비되어있고
                      준비된 몇 가지 질문에 대한 대답을 통해 가장 잘맞는 커피를
                      추천해 드릴게요!
                    </p>
                    <div className="mt-5">
                      <Link href="/test">
                        <Button
                          className="btn-neutral my-2 py-3 px-5"
                          style={{
                            fontSize: "20px",
                            fontFamily: "Cafe24Dongdong",
                            background: COLORS.cafeDarker,
                            border: "none",
                            color: "white",
                          }}
                        >
                          테스트 바로 시작하기
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default IndexHeader;
