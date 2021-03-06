import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SeatSelect from "./SeatSelect";
import Confirmation from "./Confirmation";
import ResByID from "./SeatSelect/User";
import GlobalStyles, { themeVars } from "./GlobalStyles";

const App = () => {
  const [userReservation, setUserReservation] = useState({});
  const updateUserReservation = (newData) => {
    setUserReservation({ ...userReservation, ...newData });
  };

  useEffect(() => {
    // TODO: check localStorage for an id
    // if yes, get data from server and add it to state
    const reservationID = JSON.parse(localStorage.getItem('reservationID'));
    //console.log(reservationID);
    if(reservationID){
      fetch(`/getreservation/${reservationID}`)
      .then(res=>res.json())
      .then(res=>{
        //console.log(res.data)
        setUserReservation(res.data);
      })
    }
  }, [setUserReservation]);


  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <Main>
        <Switch>
          <Route exact path="/">
            <SeatSelect updateUserReservation={updateUserReservation}/>
          </Route>
          <Route exact path="/confirmed">
            <Confirmation userReservation={userReservation}/>
          </Route>
          <Route exact path="/view-reservation">
            <ResByID />
          </Route>
          <Route path="">404: Oops!</Route>
        </Switch>
        <Footer />
      </Main>
    </BrowserRouter>
  );
};

const Main = styled.div`
  background: ${themeVars.background};
  display: flex;
  flex-direction: column;
  height: calc(100vh - 110px);
`;

export default App;
