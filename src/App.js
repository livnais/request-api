import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import "antd/dist/antd.css";
import moment from "moment";
import { DatePicker, Space, Input, Card, Alert } from "antd";

const { Search } = Input;

const URLWSHOTEL = "https://wshotelapp.herokuapp.com/v1/booking";

function App() {
  const [dataJson, setDataJson] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  useEffect(() => {}, []);

  const search = (value) => {
    setStartDate(value[0]._d);
    setEndDate(value[1]._d);
  };

  const searchBooking = (city) => {
    if (startDate && endDate && city) {
      const url = `http://127.0.0.1:8080/v1/booking?city=${city}&startDate=${startDate}&endDate=${endDate}`;
      fetch(url, {
        mode: "cors",
        method: "GET",
        headers: {
          Accept: "*/*",
        },
      })
        .then((response) =>
          response.json().then((data) => {
            if (data) {
              setDataJson(data);
              console.log(data);
            }
          })
        )
        .catch((error) => {
          console.log({ error });
        });
    } else {
      alert("Il manque une information");
    }
  };

  const { RangePicker } = DatePicker;
  return (
    <div className="App">
      <header className="App-header">
        <div
          style={{
            position: "absolute",
            display: "flex",
            height: "100vh",
            backgroundSize: "contain",
            filter: "blur(3px)",
            justifyContent: "center",
            minWidth: "100%",
            backgroundRepeat: "no-repeat",
            background:
              "url(https://scontent-rtl.akamaized.net/GED/09020000/9020600/9020609_700x0.webp)",
          }}
        />
        <Card hoverable style={{ width: 500, borderRadius: 20, height: 700 }}>
          <h1>Travel.io</h1>
          <Space style={{ marginTop: 10 }} direction="vertical" size={18}>
            <RangePicker onChange={(value) => search(value)} />
          </Space>
          <Search
            style={{ marginTop: 40 }}
            placeholder="Destination (exemple : Paris)"
            enterButton="Rechercher"
            size="large"
            onSearch={(value) => searchBooking(value)}
            loading={false}
          />
        </Card>
      </header>
    </div>
  );
}

export default App;
