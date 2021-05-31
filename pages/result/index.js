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
import { DataStore, Predicates, SortDirection } from "@aws-amplify/datastore";
import { Question, RecommendCoffee, Result } from "../../src/models";
import { COLORS } from "../../public/publicColor";
function ResultIndex() {
  const [mostFrequent, setMostFrequent] = useState(null);
  const [menuList, setMenuList] = useState(null);
  useEffect(() => {
    getResults();
  }, []);
  useEffect(() => {
    if (!menuList) {
      getResults();
    }
    const subscription = DataStore.observe(Result).subscribe(() =>
      getResults()
    );
    return () => {
      subscription.unsubscribe();
    };
  }, [menuList]);

  async function getResults() {
    try {
      const recommendQueries = await DataStore.query(RecommendCoffee);
      console.log("recommendQueries: ", recommendQueries);
      if (recommendQueries && recommendQueries !== undefined) {
        let menuObj = {};
        for (const menu of recommendQueries) {
          menuObj[Object(menu)["mbti"]] = Object(menu)["coffee"];
        }
        setMenuList(menuObj);
        let resultArr = [];
        const resultQueries = await DataStore.query(Result);
        for (const result of resultQueries) {
          resultArr.push(Object(result)["result"]);
        }
        getMostFrequent(resultArr);
      }
    } catch (error) {
      console.log("Error getting results: ", error);
    }
  }

  function menuButton(obj) {
    const obtToList = Object.entries(obj);
    const listItems = obtToList.map((menu) => (
      <>
        <Col lg="3" md="4" sm="6" xs="12">
          <Link href={`/result/${menu[0]}`}>
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
              {menu[1]}
            </Button>
          </Link>
        </Col>
      </>
    ));
    return listItems;
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
    let popularMenu;
    for (const mbti of Object.entries(menuList)) {
      if (mostFrequent[0] === mbti[0]) {
        popularMenu = mbti[1];
      }
    }
    setMostFrequent(popularMenu);
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
              <Row className="justify-content-center text-center align-items-center">
                <Col lg="8">
                  <h2
                    className="display-2 font-weight-bold mb-0"
                    style={{ color: COLORS.cafeDarker, fontSize: "200px" }}
                  >
                    MENU
                  </h2>
                  <div className="px-2">
                    <h2
                      className="display-4 text-white font-weight-light"
                      style={{
                        fontSize: "30px",
                        fontFamily: "Cafe24Dongdong",
                      }}
                    >
                      어서오세요! 저희 카페에서 제공하는 <br />총 16가지의
                      메뉴를 보시겠어요?
                    </h2>
                  </div>
                </Col>
              </Row>
              <Row className="justify-content-center text-center align-items-center">
                <Col lg="8">
                  <div className="px-2 mt-3">
                    <h2
                      className="display-4 font-weight-light"
                      style={{
                        fontSize: "30px",
                        fontFamily: "Cafe24Dongdong",
                        color: COLORS.cafeBrown,
                      }}
                    >
                      참고로 제일 잘 나가는 메뉴는...
                    </h2>
                    <h2
                      className="display-2 font-weight-bold mb-0"
                      style={{ color: COLORS.cafeDarker, fontSize: "100px" }}
                    >
                      {mostFrequent ? mostFrequent : <>...</>}
                    </h2>
                    <h2
                      className="display-4 text-white font-weight-light mb-5"
                      style={{
                        fontSize: "30px",
                        fontFamily: "Cafe24Dongdong",
                      }}
                    >
                      입니다!
                    </h2>
                  </div>
                </Col>
              </Row>
              <Row className="justify-content-center text-center align-items-center">
                {menuList ? menuButton(menuList) : ""}
              </Row>
              <Row className="justify-content-center text-center align-items-center">
                <Col lg="8">
                  <div
                    className="mt-5 "
                    style={{
                      width: "100%",
                    }}
                  >
                    <div className="px-2 mb-5">
                      <h2
                        className="display-4 text-white font-weight-light"
                        style={{
                          fontSize: "30px",
                          fontFamily: "Cafe24Dongdong",
                        }}
                      >
                        주문하시고 싶으시면 <br /> 언제든지 말씀해주세요!
                      </h2>
                    </div>
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
                        주문하기
                      </Button>
                    </Link>
                  </div>
                </Col>
              </Row>
              <Row className="justify-content-center text-center align-items-center">
                <Col lg="8">
                  <div
                    className="mt-2 "
                    style={{
                      width: "100%",
                    }}
                  >
                    <Link href="/">
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
                        홈으로 돌아가기
                      </Button>
                    </Link>
                  </div>
                  <div className="d-flex align-items-center justify-content-center text-center mt-5">
                    <h1
                      className="display-2 font-weight-bold mb-0 "
                      style={{ color: COLORS.cafeDarker, fontSize: "60px" }}
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

export default ResultIndex;
