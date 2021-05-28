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
function ResultIndex() {
  const [mostFrequent, setMostFrequent] = useState(null);
  useEffect(() => {
    getResults();
  }, []);

  async function getResults() {
    try {
      let resultArr = [];
      const resultQueries = await DataStore.query(Result);
      for (const result of resultQueries) {
        resultArr.push(Object(result)["result"]);
      }
      getMostFrequent(resultArr);
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
    setMostFrequent(mostFrequent);
  }

  return (
    <>
      {" "}
      <IndexNavbar />
      We have {mostFrequent} the most.
      <AuthFooter />
    </>
  );
}

export default ResultIndex;
