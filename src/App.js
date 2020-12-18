import React, { useEffect, useState } from "react";
import "./App.css";
import "antd/dist/antd.css";
import { DatePicker, Space, Input, Card, Steps, List } from "antd";
import { render } from "@testing-library/react";

const { Search } = Input;
const { Step } = Steps;

function App() {
  const [hotels, setHotels] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [steps, setSteps] = useState(0);
  useEffect(() => {}, []);

  const search = (value) => {
    if (value) {
      setStartDate(value[0]._d);
      setEndDate(value[1]._d);
    }
  };

  const searchBooking = (city) => {
    if (startDate && endDate && city) {
      searchHotel(city);
    } else {
      alert("Il manque une information");
    }
  };

  const searchHotel = (city) => {
    //Hotel WSHotel
    fetch(
      `http://127.0.0.1:8080/v1/booking?city=${city}&startDate=${startDate}&endDate=${endDate}`,
      {
        mode: "cors",
        method: "GET",
        headers: {
          Accept: "*/*",
        },
      }
    )
      .then((response) =>
        response.json().then((data) => {
          if (data) {
            console.log(data);
            const listHotel = hotels;
            listHotel.push({
              compagny: "WS-Hotel",
              ville: city,
              idReservation: data.result.uidSejour,
              price: data.result.price,
            });
            setHotels(listHotel);
          }
        })
      )
      .catch((error) => {
        console.log({ error });
      });

    //Wati Hotel erreur 500 et cors
    // fetch(`http://watihotelapi.azurewebsites.net/watiHotel/destinations`, {
    //   method: "GET",
    //   headers: {
    //     Accept: "application/json",
    //   },
    // })
    //   .then((response) =>
    //     response.json().then((data) => {
    //       if (data) {
    //         console.log(data);
    //       }
    //     })
    //   )
    //   .catch((error) => {
    //     console.log({ error });
    //   });
  };

  const getStatusSteps = (position) => {
    if (position === steps) {
      return "En cours";
    } else if (position < steps) {
      return "Fini";
    }
    return "En attente";
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
            backgroundSize: "cover",
            filter: "blur(3px)",
            justifyContent: "center",
            minWidth: "100%",
            backgroundRepeat: "no-repeat",
            background:
              "url(https://scontent-rtl.akamaized.net/GED/09020000/9020600/9020609_700x0.webp)",
          }}
        />
        <Card
          hoverable
          style={{
            width: 800,
            borderRadius: 4,
            height: 700,
          }}
        >
          <h1>Travel.io</h1>
          <Space style={{ marginTop: 10 }} direction="vertical" size={18}>
            <RangePicker onChange={(value) => search(value)} />
          </Space>
          <Search
            style={{ marginTop: 40, marginBottom: 40 }}
            placeholder="Destination (exemple : Paris)"
            enterButton="Rechercher"
            size="large"
            onSearch={(value) => searchBooking(value)}
            loading={false}
          />
          <Steps current={steps}>
            <Step title={getStatusSteps(0)} description="Hotel" />
            <Step title={getStatusSteps(1)} description="Avion" />
            <Step title={getStatusSteps(2)} description="Voiture" />
            <Step title={getStatusSteps(3)} description="Payment" />
          </Steps>
          {hotels && hotels.length > 0 && steps === 0 && (
            <List
              itemLayout="horizontal"
              dataSource={hotels}
              renderItem={(item) => (
                <List.Item onClick={(item) => setSteps(steps + 1)}>
                  <List.Item.Meta
                    key={item.index}
                    style={{ background: "#ddd" }}
                    title={item.compagny}
                    description={`${item.ville} - ${item.price}`}
                  />
                </List.Item>
              )}
            />
          )}
        </Card>
      </header>
    </div>
  );
}

export default App;
