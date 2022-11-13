import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { getAllCars } from "../redux/actions/carsActions";
import { Col, Row, Divider, DatePicker, Checkbox, Card, Button } from "antd";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import moment from "moment";
const { RangePicker } = DatePicker;
function Home() {
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [totalCars, setTotalcars] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
  }, []);

  useEffect(() => {
    setTotalcars(cars);
  }, [cars]);

  function setFilter(values) {
    var selectedFrom = moment(values[0], "MMM DD yyyy HH:mm");
    var selectedTo = moment(values[1], "MMM DD yyyy HH:mm");

    var temp = [];

    for (var car of cars) {
      if (car.bookedTimeSlots.length == 0) {
        temp.push(car);
      } else {
        for (var booking of car.bookedTimeSlots) {
          if (
            selectedFrom.isBetween(booking.from, booking.to) ||
            selectedTo.isBetween(booking.from, booking.to) ||
            moment(booking.from).isBetween(selectedFrom, selectedTo) ||
            moment(booking.to).isBetween(selectedFrom, selectedTo)
          ) {
          } else {
            temp.push(car);
          }
        }
      }
    }

    setTotalcars(temp);
  }

  return (
    <DefaultLayout>
      {/* <Row className="mt-3" justify="center">
        <Col lg={20} sm={24} className="d-flex justify-content-center">
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="MMM DD yyyy HH:mm"
            onChange={setFilter}
          />
        </Col>
      </Row> */}

      {loading == true && <Spinner />}

      <Row className="mt-3" justify="center" gutter={16}>
        {totalCars.map((car) => {
          return (
            <Col lg={6} sm={18} xs={24}>
              <Card
                hoverable="true"
                className="m-2 text-align-center align-items-center duration-700 "
                style={{ borderRadius: "5px" }}
              >
                <img className="car-image" src={car.image} alt="car" />
                <div className="content m-2">
                  <p>{car.name}</p>
                  <p>
                    <b className="text-[0.5rem]">₹ {car.rentPerHour}</b>
                    PerHour{" "}
                    <Button
                      className="ml-2"
                      type="primary"
                      style={{ borderRadius: "5px" }}
                    >
                      <Link to={`/booking/${car._id}`}>Book Now</Link>
                    </Button>
                  </p>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
    </DefaultLayout>
  );
}

export default Home;
