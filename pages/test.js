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
import { DataStore, Predicates, SortDirection } from "@aws-amplify/datastore";
import { Question, RecommendCoffee, Result } from "../src/models";
import { useRouter } from "next/router";

function Test() {
  const [step, setStep] = useState(0);
  const [question, setQuestion] = useState("나는 이게 마음에 든다");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [queries, setQueries] = useState([""]);
  const [questions, setQuestions] = useState([]);
  const [chosen, setChosen] = useState(null);
  const [gender, setGender] = useState(null);
  const [result, setResult] = useState("");
  const [answers, setAnswers] = useState({
    E: 0,
    I: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0,
  });
  const [isSaved, setIsSaved] = useState(false);
  useEffect(() => {
    if (queries !== [""]) {
      handleQuestion();
    }
    if (step === 51) {
      const result = handleResult();
      setResult(result);
    }
  }, [step, queries]);
  const router = useRouter();
  useEffect(() => {
    if (result !== "") {
      saveResult();
    }
    if (result !== "" && isSaved) {
      setTimeout(() => {
        router.push(`/result/${result}`);
      }, 3000);
    }
  }, [result, isSaved]);
  useEffect(() => {
    // Start the DataStore, this kicks-off the sync process.
    DataStore.start();
    getQuestions();
  }, []);

  async function saveResult() {
    try {
      await DataStore.save(
        new Result({
          result: result,
        })
      );
      setIsSaved(true);
      console.log("Successfully saved the result");
    } catch (error) {
      console.log("Error saving the result: ", error);
    }
  }

  function handleQuestion() {
    if (Object(queries[step - 1])["question"]) {
      setQuestion(Object(queries[step - 1])["question"]);
    } else {
      setQuestion("Which word in each pair appeals to you more?");
    }
    setOption1(Object(queries[step - 1])["optionOne"]);
    setOption2(Object(queries[step - 1])["optionTwo"]);
  }

  async function getQuestions() {
    try {
      const questions = await DataStore.query(Question, Predicates.ALL, {
        sort: (question) => question.questionNo(SortDirection.ASCENDING),
      });
      setQueries(questions);
    } catch (error) {
      console.log("Error retrieving posts", error);
    }
  }

  function handleNext(e) {
    e.preventDefault();
    let counter = 0;
    if (step > 0) {
      console.log("The gender is...", gender);
      let updatedAnswers = answers;
      while (counter < Object(queries[step - 1])["onePoint"]) {
        updatedAnswers[Object(queries[step - 1])["oneType"]] += 1;
        counter += 1;
      }
      console.log("Chosen type is...", Object(queries[step - 1])["oneType"]);
      console.log("Currently...", updatedAnswers);
      setAnswers(updatedAnswers);
    } else {
      if (chosen === "1") {
        setGender("M");
      }
      if (chosen === "2") {
        setGender("F");
      } else {
        setGender("N");
      }
    }

    setStep(step + 1);
    setChosen(null);
  }

  function handleChoice(e) {
    e.preventDefault();
    setChosen(e.target.id);
  }

  function handleResult() {
    let result = "";
    if (answers["E"] > answers["I"]) {
      result = result + "E";
    } else {
      result = result + "I";
    }
    if (answers["S"] > answers["N"]) {
      result = result + "S";
    } else {
      result = result + "N";
    }
    if (answers["T"] > answers["F"]) {
      result = result + "T";
    } else {
      if (gender === "M") {
        result = result + "T";
      } else {
        result = result + "F";
      }
    }
    if (answers["J"] > answers["P"]) {
      result = result + "J";
    } else {
      result = result + "P";
    }
    console.log(result);
    return result;
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
            {step === 0 ? (
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
                        주문 감사합니다! 바로 시작할게요!
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
                        Male
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
                        Female
                      </Button>
                    </div>
                  </Col>
                </Row>
                <Row className="justify-content-center text-center align-items-center">
                  <Col lg="4" xs="6">
                    <div className="px-2 py-5">
                      <Button
                        className="btn-neutral my-2 py-3 px-5"
                        style={{
                          fontSize: "20px",
                          fontFamily: "Cafe24Dongdong",
                          background:
                            chosen === "3" ? "#53A452" : COLORS.cafeDarker,
                          border: "none",
                          color: "white",
                          width: "100%",
                        }}
                        id={3}
                        onClick={handleChoice}
                      >
                        Prefer Not To Say
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
                      다음 문제!
                    </Button>
                  </Col>
                </Row>
              </>
            ) : (
              <>
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
                          문제 #{step}
                        </h2>
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
                            {option1}
                          </Button>
                        </div>
                      </Col>
                      <Col lg="4" xs="6">
                        <div className="px-2 py-5">
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
                            {option2}
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
                          다음 문제!
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
                          가장 완벽한 커피를 추천해드릴게요!
                        </h2>
                      </Col>
                    </Row>
                    <Row className="justify-content-center text-center align-items-center">
                      <Col lg="8">
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
                            src={require("../assets/img/brand/nomadCafeFavicon.png")}
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
                  </>
                )}
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
