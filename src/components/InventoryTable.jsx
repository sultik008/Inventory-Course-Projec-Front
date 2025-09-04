import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBCheckbox,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import { deleteInventory, getInventories } from "../queries";
import EditInventory from "./editInventory";
import AddInventory from "./addInventory";
import { useNavigate } from "react-router-dom";

export default function InventoryTable() {
  const [inventories, setInventories] = useState([]);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  function navigateToInventory(id) {
    navigate(`/inv/${id}`);
  }
  async function getInventorieshandle() {
    const res = await getInventories();
    console.log(res);
    setInventories(res?.data);
  }
  useEffect(() => {
    getInventorieshandle();
  }, [1]);
  async function deleteHandle() {
    const res = await deleteInventory(items);
    console.log(res);
    getInventorieshandle();
  }
  function select(id) {
    if (!items.includes(id)) {
      setItems([...items, id]);
    } else {
      setItems(items.filter((f) => f !== id));
    }
    console.log(items);
  }
  return (
    <MDBContainer fluid>
      <MDBRow>
        <MDBCol style={{ display: "flex", gap: "10px", padding: "10px" }}>
          <MDBBtn color="danger" onClick={deleteHandle}>
            Delete
          </MDBBtn>
          <AddInventory></AddInventory>
        </MDBCol>
        <MDBCol></MDBCol>
      </MDBRow>
      <MDBTable hover responsive>
        <MDBTableHead>
          <tr style={{ fontWeight: "bold" }}>
            <td>#</td>
            <td>Inventory name</td>
            <td>Category</td>
            <td>Description</td>
            <td>Owner</td>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {Array.isArray(inventories)
            ? inventories.map((inventory) => {
                return (
                  <tr
                    style={{ cursor: "pointer" }}
                    
                  >
                    <th>
                      <MDBCheckbox
                        onClick={() => select(inventory.inventoryid)}
                      ></MDBCheckbox>
                    </th>
                    <th onClick={() => navigateToInventory(inventory.inventoryid)}>{inventory.name}</th>
                    <td onClick={() => navigateToInventory(inventory.inventoryid)}>{inventory.category}</td>
                    <td onClick={() => navigateToInventory(inventory.inventoryid)}>{inventory.description}</td>
                    <td onClick={() => navigateToInventory(inventory.inventoryid)}>{inventory.ownername}</td>

                  </tr>
                );
              })
            : ""}
        </MDBTableBody>
      </MDBTable>
    </MDBContainer>
  );
}
