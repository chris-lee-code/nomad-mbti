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
// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import IndexHeader from "components/Headers/IndexHeader.js";
import AuthFooter from "components/Footers/AuthFooter.js";
import { COLORS } from "../public/publicColor";
import { DataStore } from "@aws-amplify/datastore";
import { RecommendCoffee, Result } from "../src/models";
import Amplify from "aws-amplify";

function About() {
  return (
    <>
      <IndexNavbar />
      <div className="main-content">
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
                        src={require("../assets/img/brand/nomadCafeFavicon.png")}
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
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </div>

        <section
          className="py-2 pb-9"
          style={{
            fontFamily: "Cafe24Shiningstar",
            background: COLORS.cafeLight,
          }}
        >
          <Container>
            <div className="header-body">
              <Row className="justify-content-center text-center align-items-center">
                <Col lg="8">
                  <h2
                    className="display-4 text-white font-weight-light"
                    style={{
                      fontSize: "30px",
                      fontFamily: "Cafe24Dongdong",
                    }}
                  >
                    안녕하세요! 노마드 카페 주인장입니다.
                  </h2>
                </Col>
              </Row>
              <Row className="justify-content-center text-center align-items-center mt-3">
                <Col lg="10">
                  <h2
                    className="display-4 font-weight-light"
                    style={{
                      fontSize: "30px",
                      fontFamily: "Cafe24Dongdong",
                      color: COLORS.cafeBrown,
                    }}
                  >
                    노마드 코더에서 아주 흥미로운 활동을 주관하여 이렇게
                    참여하게 되었습니다.
                  </h2>
                </Col>
              </Row>
              <Row className="justify-content-center text-center align-items-center mt-3">
                <Col lg="10">
                  <h2
                    className="display-4 font-weight-light text-default"
                    style={{
                      fontSize: "30px",
                      fontFamily: "",
                    }}
                  >
                    노마드 코더에서 카카오 클론을 시작한게 2020년 3월인데 벌써
                    1년이 넘는 기간동안 꾸준히 달리다보니 어느덧 사이트를
                    개발하고 배포할 수 있는 수준까지 오를 수 있게 되었네요.
                    노마드코더 덕분에 이렇게 재밌는 사이트도 만들어 볼 수 있어서
                    아주 큰 보람을 느낍니다. <br />
                    <br /> 많고 많은 수업들을 끊임없이 듣고 어느덧
                    노마드코더에서 가르치지 않는 부분들까지 Documentation을 읽고
                    이해할 수 있는 수준에 이르렀다는게 참 믿기지 않네요.
                    <br />
                    <br /> Firebase 수업을 듣고 백엔드에 더욱 자신감을 갖고
                    공부한 결과 AWS Amplify 마저 습득할 수 있었고 유튜브 라이브
                    시간 니꼬에게 노마드 코더 웹사이트에 대해서 여쭤보니 Next JS
                    프레임워크를 사용한다는 소식을 듣고 아주 오랜기간 혼자서
                    연습을 하였네요.
                  </h2>

                  <h2
                    className="display-4 font-weight-light mt-5"
                    style={{
                      fontSize: "30px",
                      fontFamily: "",
                      color: COLORS.cafeDarker,
                    }}
                  >
                    이렇게 오기까지 1년이 넘는 시간이 걸렸지만 그래도 코딩은
                    언제나 적용의 학문이기에 이렇게 5일이라는 긴 시간을 집중하여
                    코딩할 수 있게 되었습니다. 노마드 코더 덕분에 이 시간 또한
                    즐길 수 있는 프로그래머가 되지 않았나 싶습니다.{" "}
                  </h2>

                  <h2
                    className="display-4 font-weight-light mt-5"
                    style={{
                      fontSize: "30px",
                      fontFamily: "Cafe24Dongdong",
                      color: COLORS.cafeDarker,
                    }}
                  >
                    본 사이트는 위에서 언급했다시피 NextJS와 AWS Amplify로
                    구성되었고요!{" "}
                  </h2>
                </Col>
              </Row>
              <Row className="justify-content-center text-center align-items-center mt-3">
                <Col lg="6">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Nextjs-logo.svg/1200px-Nextjs-logo.svg.png"
                    style={{ height: "100px" }}
                  />
                </Col>
                <Col lg="6" className="mt-3 mt-lg-0">
                  <img
                    src="https://camo.githubusercontent.com/b0221b7ebe904cfd5e7b338a9aa49dd8a001a472f74ca69b14da60dc4d1f6abd/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6177732d6d6f62696c652d6875622d696d616765732f6177732d616d706c6966792d6c6f676f2e706e67"
                    style={{ height: "50px" }}
                  />
                </Col>
              </Row>
              <Row className="justify-content-center text-center align-items-center mt-3">
                <Col lg="10">
                  <h2
                    className="display-4 font-weight-light mt-5"
                    style={{
                      fontSize: "30px",
                      fontFamily: "Cafe24Dongdong",
                      color: COLORS.cafeDarker,
                    }}
                  >
                    심리 테스트는 랜덤 테스트가 아닌 실제 전문 MBTI 테스트로
                    이루어져 있습니다. <br /> (나름 정확하다구요 후후...)
                  </h2>
                  <a
                    style={{ fontSize: "30px" }}
                    href="https://wedgworthleadership.com/wp-content/uploads/2016/08/Myers-Briggs-Personality-Test.pdf"
                  >
                    MBTI 테스트 출처
                  </a>
                </Col>
              </Row>
              <hr />
              <Row className="justify-content-center text-center align-items-center mt-5">
                <Col lg="10">
                  <img
                    src="https://ychef.files.bbci.co.uk/624x351/p04kthpl.jpg"
                    style={{ height: "200px" }}
                  />
                  <h2
                    className="display-4 font-weight-light mt-5 "
                    style={{
                      fontSize: "30px",
                      fontFamily: "Cafe24Dongdong",
                      color: COLORS.cafeDarker,
                    }}
                  >
                    이곳 홍콩은 덥습니다. <br />
                    타지에서 보내는 이 시국이지만 전 세계 노마드코더분들 모두
                    힘내시길 바랄게요.{" "}
                  </h2>
                  <h1 className="text-red" style={{ fontSize: "50px" }}>
                    Again, from Hong Kong.
                  </h1>
                  <h1 style={{ fontSize: "30px" }}>- Christopher Lee</h1>
                </Col>
              </Row>
            </div>
          </Container>
        </section>
        <section
          className="py-2 pb-9"
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
                    <div
                      className=""
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                      }}
                    >
                      <Link href="/test">
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
                        >
                          테스트 바로 시작하기
                        </Button>
                      </Link>
                      <Link href="/about">
                        <Button
                          className="btn-neutral my-2 py-3 px-5"
                          style={{
                            fontSize: "20px",
                            fontFamily: "Cafe24Dongdong",
                            background: COLORS.cafeBrown,
                            border: "none",
                            color: "white",
                            width: "100%",
                          }}
                        >
                          노마드 카페에 대하여
                        </Button>
                      </Link>
                      <Link
                        href="https://nomadcoders.co/community/type-test"
                        target="_blank"
                      >
                        <Button
                          className="btn-neutral my-2 py-3 px-5 bg-success"
                          style={{
                            fontSize: "20px",
                            fontFamily: "Cafe24Dongdong",
                            border: "none",
                            color: "white",
                            width: "100%",
                          }}
                        >
                          <img
                            src="https://nomadcoders.co/m.svg"
                            style={{ height: "30px" }}
                            className="mr-2"
                          />
                          노마드코더에서 추천하러 가기!
                        </Button>
                      </Link>
                    </div>
                    <h2
                      className="display-4 text-white font-weight-light mt-5"
                      style={{
                        fontSize: "30px",
                        fontFamily: "Cafe24Dongdong",
                      }}
                    >
                      모두들 감사드려요!
                    </h2>

                    <div className="d-flex align-items-center justify-content-center text-center">
                      <h1
                        className="display-2 font-weight-bold mb-0 mt-3"
                        style={{ color: COLORS.cafeDarker, fontSize: "60px" }}
                      >
                        노마드 카페
                      </h1>
                      <img
                        src={require("../assets/img/brand/nomadCafeFavicon.png")}
                        style={{ width: "50px", height: "50px" }}
                      />
                    </div>
                    <img
                      src="https://nomadcoders.co/m.svg"
                      style={{ height: "50px" }}
                      className="mb--5"
                    />
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </section>
      </div>
      <AuthFooter />
    </>
  );
}

export default About;
