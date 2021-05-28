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
import { useRouter } from "next/router";
import { DataStore, Predicates, SortDirection } from "@aws-amplify/datastore";
import { RecommendCoffee } from "../../src/models";
import { COLORS } from "../../public/publicColor";

function Result() {
  const router = useRouter();
  const { mbti } = router.query;
  const [query, setQuery] = useState(null);
  const [coffee, setCoffee] = useState(null);
  const [description, setDescription] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    // Start the DataStore, this kicks-off the sync process.
    DataStore.start();
    getRecommendation(mbti);
  }, []);

  useEffect(() => {
    if (query) {
      setCoffee(Object(query[0])["coffee"]);
      setDescription(Object(query[0])["description"]);
    }
  }, [query]);

  async function getRecommendation(result) {
    try {
      const recommendation = await DataStore.query(RecommendCoffee, (c) =>
        c.mbti("eq", result)
      );
      setQuery(recommendation);
      setNotFound(false);
    } catch (error) {
      console.log("Error retrieving posts", error);
      setNotFound(true);
    }
  }
  return (
    <>
      {" "}
      <IndexNavbar />
      <div className="main-content">
        <section
          className="py-5 pb-9"
          style={{
            fontFamily: "Cafe24Shiningstar",
            background: COLORS.cafeLight,
          }}
        >
          <Container>
            <div className="header-body">
              {notFound ? (
                <>
                  <Row className="justify-content-center text-center align-items-center">
                    <Col lg="8">
                      <h2
                        className="display-2 font-weight-bold mb-0"
                        style={{ color: COLORS.cafeDarker, fontSize: "200px" }}
                      >
                        404
                      </h2>
                      <div className="px-2">
                        <h2
                          className="display-4 text-white font-weight-light"
                          style={{
                            fontSize: "30px",
                            fontFamily: "Cafe24Dongdong",
                          }}
                        >
                          죄송해요! <br />
                          요청하신 커피는 저희 매장에서 판매하지 않는답니다...
                        </h2>
                      </div>
                    </Col>
                  </Row>
                  <Row className="justify-content-center text-center align-items-center">
                    <Col lg="8">
                      <div
                        className="mt-5"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                        }}
                      >
                        <Link href="/">
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
                            홈으로 돌아가기
                          </Button>
                        </Link>
                      </div>
                    </Col>
                  </Row>
                </>
              ) : (
                <>
                  <Row className="justify-content-center text-center align-items-center">
                    <Col lg="8">
                      <div className="px-2">
                        <h2
                          className="display-4 text-white font-weight-light"
                          style={{
                            fontSize: "30px",
                            fontFamily: "Cafe24Dongdong",
                          }}
                        >
                          주문해주셔서 감사합니다! 당신에게 가장 어울리는
                          음료는...
                        </h2>
                        <h2
                          className="display-2 font-weight-bold mb-0"
                          style={{ color: COLORS.cafeDarker, fontSize: "80px" }}
                        >
                          {coffee}!
                        </h2>
                        <h2
                          className="display-4 text-white font-weight-light"
                          style={{
                            fontSize: "30px",
                            fontFamily: "Cafe24Dongdong",
                          }}
                        >
                          그냥 아무렇게나 알려드린건 아니에요. 다 이유가
                          있다구요!
                        </h2>
                        <h2
                          className="display-4 font-weight-light"
                          style={{
                            fontSize: "30px",
                            color: COLORS.cafeDarker,
                            fontFamily: "Cafe24Dongdong",
                          }}
                        >
                          {description}
                        </h2>
                        <h2
                          className="display-4 text-white font-weight-light"
                          style={{
                            fontSize: "30px",
                            fontFamily: "Cafe24Dongdong",
                          }}
                        >
                          이건 비밀인데...혹시 당신은
                          <div className="font-weight-700 my-5">{mbti}...?</div>
                        </h2>
                        <h2
                          className="display-4 text-white font-weight-light"
                          style={{
                            fontSize: "30px",
                            fontFamily: "Cafe24Dongdong",
                          }}
                        >
                          아무튼 감사드려요! 다음에 또 찾아와 주세요!
                        </h2>
                        <hr />
                        <div
                          className="mt-5"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                          }}
                        >
                          <h2
                            className="display-4 text-white font-weight-light"
                            style={{
                              fontSize: "30px",
                              fontFamily: "Cafe24Dongdong",
                            }}
                          >
                            재밌으셨다면 꼭 추천 부탁드려요~!
                          </h2>
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
                          <h2
                            className="display-4 text-white font-weight-light mt-3"
                            style={{
                              fontSize: "20px",
                              fontFamily: "Cafe24Dongdong",
                            }}
                          >
                            또 주문하시고 싶으시다면 얼마든지요!
                          </h2>
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
                              테스트 다시 시작하기
                            </Button>
                          </Link>
                          <h2
                            className="display-4 text-white font-weight-light  mt-3"
                            style={{
                              fontSize: "20px",
                              fontFamily: "Cafe24Dongdong",
                            }}
                          >
                            저희 가게에 더 알고 싶으시다면 아래 버튼을
                            눌러주세요!
                          </h2>
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
                            style={{
                              color: COLORS.cafeDarker,
                              fontSize: "60px",
                            }}
                          >
                            노마드 카페
                          </h1>
                          <img
                            src={require("../../assets/img/brand/nomadCafeFavicon.png")}
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
                </>
              )}
            </div>
          </Container>
        </section>
      </div>
      <AuthFooter />
    </>
  );
}

export default Result;
