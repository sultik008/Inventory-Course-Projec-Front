import React , {useState} from "react";
import {
  MDBCol,
  MDBRow,
  MDBContainer,
  MDBBtn,
} from "mdb-react-ui-kit";
import Main from "./MainPage";
import AddInventory from "./addInventory";

export default function UserPage() {
    return(
        <MDBContainer fluid>
            <Main></Main>
        </MDBContainer>
    )
}