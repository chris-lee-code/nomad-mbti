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
import { DataStore } from "aws-amplify";
import { RecommendCoffee, Result } from "../src/models";
function Index() {
  const [registered, setRegistered] = useState(null);
  const [results, setResults] = useState(null);
  const [popularCoffee, setPopularCoffee] = useState(null);
  const [percentage, setPercentage] = useState(null);
  useEffect(() => {
    getResults();
    startDatastore();
  }, []);

  async function startDatastore() {
    try {
      await DataStore.start();
      console.log("Datastore was successfully started.");
    } catch (error) {
      console.log("Error starting the Datastore: ", error);
    }
  }
  async function getResults() {
    try {
      const results = await DataStore.query(Result);
      let resultArr = [];
      for (const result of results) {
        resultArr.push(Object(result)["result"]);
      }
      setResults(resultArr);
      setRegistered(results.length);
      console.log(`We have so far ${results.length} orders.`);
      console.log("The result was successfully retrieved from Datastore.");
    } catch (error) {
      console.log("Error getting results: ", error);
    }
  }

  useEffect(() => {
    if (results && registered) {
      const popularMBTI = getMostFrequent(results);
      getMBTInum(popularMBTI[0]);
      getCoffee(popularMBTI[0]);
    }
  }, [results, registered]);

  function getMBTInum(mbti) {
    let counter = 0;
    for (const result of results) {
      if (result === mbti) {
        counter++;
      }
    }
    let percentage;
    percentage = Math.floor((counter / registered) * 100);
    setPercentage(percentage);
    console.log("The percentage for the most popular coffee is: ", percentage);
  }

  async function getCoffee(mbti) {
    try {
      const coffee = await DataStore.query(RecommendCoffee, (c) =>
        c.mbti("eq", mbti)
      );
      setPopularCoffee(coffee[0]["coffee"]);
      console.log("The most popular coffee is: ", coffee[0]["coffee"]);
    } catch (error) {
      console.log("Error getting results: ", error);
    }
  }

  function getMostFrequent(arr) {
    let counts = arr.reduce((a, c) => {
      a[c] = (a[c] || 0) + 1;
      return a;
    }, {});
    let maxCount = Math.max(...Object.values(counts));
    let mostFrequent = Object.keys(counts).filter(
      (k) => counts[k] === maxCount
    );
    return mostFrequent;
  }
  return (
    <>
      <IndexNavbar />
      <div className="main-content">
        <IndexHeader />
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
                    <h2
                      className="display-4 text-white font-weight-light"
                      style={{
                        fontSize: "30px",
                        fontFamily: "Cafe24Dongdong",
                      }}
                    >
                      저희 커피를 이때까지 이만큼이나 주문해주셨어요!
                    </h2>
                    <h2
                      className="display-2 font-weight-bold mb-0"
                      style={{ color: COLORS.cafeDarker, fontSize: "80px" }}
                    >
                      {registered} 잔
                    </h2>
                    <h2
                      className="display-4 text-white font-weight-light"
                      style={{
                        fontSize: "30px",
                        fontFamily: "Cafe24Dongdong",
                      }}
                    >
                      가장 잘 나가는 음료는...
                    </h2>

                    <h2
                      className="display-2 font-weight-bold mb-0"
                      style={{ color: COLORS.cafeDarker, fontSize: "80px" }}
                    >
                      {popularCoffee}
                    </h2>
                    <h2
                      className="display-4 text-white font-weight-light"
                      style={{
                        fontSize: "30px",
                        fontFamily: "Cafe24Dongdong",
                      }}
                    >
                      총 주문 중 무려{" "}
                      <div className="font-weight-700">{percentage}%...!</div>
                    </h2>
                    <h2
                      className="display-4 text-white font-weight-light"
                      style={{
                        fontSize: "30px",
                        fontFamily: "Cafe24Dongdong",
                      }}
                    >
                      아직 주문 안하셨다면 바로 아래 버튼을 눌러주세요!
                    </h2>
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

export default Index;
