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
import { COLORS } from "../public/publicColor";
import { DataStore } from "@aws-amplify/datastore";
import { Question, RecommendCoffee } from "../src/models";
import { Amplify, Hub } from "@aws-amplify/core";
import awsconfig from "../src/aws-exports";
Amplify.configure(awsconfig);

function Test() {
  const [step, setStep] = useState(1);
  const [question, setQuestion] = useState("나는 이게 마음에 든다");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [queries, setQueries] = useState([]);
  let answers = [];
  useEffect(() => {
    if (step !== 1) {
      setQuestion("haha");
    }
  }, [step]);

  useEffect(() => {
    // Start the DataStore, this kicks-off the sync process.
    DataStore.start();
    getQuestions();
  }, []);

  async function getQuestions() {
    try {
      const questions = await DataStore.query(Question, (question) =>
        question.questionNo("le", 5)
      );
      console.log("Query success: ", questions);
    } catch (error) {
      console.log("Error retrieving posts", error);
    }
  }

  return (
    <>
      {" "}
      <IndexNavbar />
      <div className="main-content">
        <section
          className="py-2 pb-9"
          style={{
            fontFamily: "Cafe24Shiningstar",
            background: COLORS.cafeLight,
            minHeight: "600px",
          }}
        >
          <Container>
            {step < 51 ? (
              <>
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
                        제가 커피를 준비하는 동안 아래 나오는 문제들을
                        답해주세요!
                      </h2>
                    </div>
                  </Col>
                </Row>
                <Row className="justify-content-center text-center align-items-center">
                  <Col lg="8">
                    <h2
                      className="display-4 font-weight-light"
                      style={{
                        fontSize: "30px",
                        fontFamily: "Cafe24Dongdong",
                        color: COLORS.cafeDarker,
                      }}
                    >
                      {question}
                    </h2>
                  </Col>
                </Row>
                <Row className="justify-content-center text-center align-items-center">
                  <Col lg="4" xs="6">
                    <div className="px-2 py-5">
                      <h2
                        className="display-4 text-white font-weight-light"
                        style={{
                          fontSize: "30px",
                          fontFamily: "Cafe24Dongdong",
                        }}
                      >
                        1
                      </h2>
                    </div>
                  </Col>
                  <Col lg="4" xs="6">
                    <div className="px-2 py-5">
                      <h2
                        className="display-4 text-white font-weight-light"
                        style={{
                          fontSize: "30px",
                          fontFamily: "Cafe24Dongdong",
                        }}
                      >
                        2
                      </h2>
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
                      onClick={getQuestions}
                    >
                      다음 문제
                    </Button>
                  </Col>
                </Row>
              </>
            ) : (
              <>
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
                        끝났어요!
                      </h2>
                    </div>
                  </Col>
                </Row>
                <Row className="justify-content-center text-center align-items-center">
                  <Col lg="8">
                    <h2
                      className="display-4 font-weight-light"
                      style={{
                        fontSize: "30px",
                        fontFamily: "Cafe24Dongdong",
                        color: COLORS.cafeDarker,
                      }}
                    >
                      잠시만 기다려주세요...
                    </h2>
                  </Col>
                </Row>
              </>
            )}
          </Container>
        </section>
      </div>
      <AuthFooter />
    </>
  );
}

export default Test;
