import React, { useState } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from "mdb-react-ui-kit";
import './header.css'
import AddInventory from "./addInventory";

export default function Header() {
  const [openBasic, setOpenBasic] = useState(false);
  return (
    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='/'>The Inventory</MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setOpenBasic(!openBasic)}
        >
          =
        </MDBNavbarToggler>

        <MDBCollapse navbar open={openBasic} >
          <MDBNavbarNav style={{display: "flex", justifyContent: "space-around" , width: "100%"}} className="w-100">
            <MDBNavbarNav>
                <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page' href='/'>
                Main
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='/'>Inventories</MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBNavbarLink href="/admin">Admin Page</MDBNavbarLink>
            </MDBNavbarItem>
            </MDBNavbarNav>
             <MDBNavbarItem style={{alignSelf:"center"}}>
              <form className='d-flex input-group'>
                <input type='search' className='form-control' placeholder='Type query' aria-label='Search' />
                <MDBBtn color='primary'>Search</MDBBtn>
              </form>   
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href="/registration" style={{whiteSpace: "nowrap"}}>
                Sign In
              </MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
