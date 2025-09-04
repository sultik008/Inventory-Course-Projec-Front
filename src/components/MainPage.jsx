import React, { useState, useEffect , useContext} from 'react';
import axios from 'axios';
import {
  MDBCol,
  MDBRow,
  MDBContainer,
  MDBBtn,
  MDBInput,
  MDBTextArea,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBCheckbox,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import AddInventory from './addInventory';
import InventoryTable from './InventoryTable';
import EditInventory from './editInventory';
import Header from './header';




function Main() {
  return (
    <MDBContainer fluid>
      <MDBRow>
        <Header></Header>
      </MDBRow>
      <MDBRow>
        <InventoryTable></InventoryTable>
      </MDBRow>
    </MDBContainer>
  );
}

export default Main;
