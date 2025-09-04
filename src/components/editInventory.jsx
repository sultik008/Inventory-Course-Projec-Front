import React, { useEffect, useState } from "react";
import {
  MDBCol,
  MDBRow,
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
import {
  editInventory,
  getCategory,
  getInventory,
} from "../queries";
import { useParams } from "react-router-dom";

export default function EditInventory() {
  const {id} = useParams()
  const [isPublic, setIsPublic] = useState(true);
  const [description, setDescription] = useState("");
  const [customId, setCustomId] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [field1, setField1] = useState("");
  const [field2, setField2] = useState("");
  const [field3, setField3] = useState("");
  const [basicModal, setBasicModal] = useState(false);
  const [categories, setCategories] = useState([""]);
  const [inventories, setInventories] = useState([""]);
  const [inventory, setInventory] = useState("");

  function toggleOpen() {
    setBasicModal(!basicModal);
  }
  async function getCategoriesHandle() {
    const res = await getCategory();
    setCategories(res.data);
    console.log(res);
  }
  async function getInventoryhandle() {
    let inventory = await getInventory(id);
    setDescription(inventory.description);
    setCategory(inventory.category);
    setField1(inventory.field1);
    setField2(inventory.field2);
    setField3(inventory.field3);
    setName(inventory.name);
    setImage(inventory.image);
    setCustomId(inventory.customid);
  }
  async function editInventoryHandle() {
    console.log(inventory);
    const res = await editInventory({
      inventoryid: id,
      isPublic,
      description,
      image,
      field1,
      field2,
      field3,
      name,
      category,
      customId,
    });
    console.log(res);
  }
  useEffect(() => {
    getInventoryhandle()
  }, [1])
  return (
    <MDBRow
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        flexDirection: "column",
      }}
    >
      <MDBRow
        center
        className="d-flex h-fit-c"
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          flexDirection: "row"
        }}
      >
        <MDBRow>
          <MDBCol>
            <MDBInput
              label="Inventory name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </MDBCol>
          <MDBCol>
            <select
              class="form-control form-select"
              aria-label="Default select example"
              onClick={getCategoriesHandle}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled selected>
                select categories
              </option>
              {categories
                ? categories.map((categories) => {
                    return (
                      <option value={categories.name}>{categories.name}</option>
                    );
                  })
                : ""}
            </select>
          </MDBCol>
        </MDBRow>
        <MDBRow style={{flexDirection: "column" , gap: "15px"}}>
          <MDBCol>
            <MDBInput
              label="Field #1 name"
              value={field1}
              onChange={(e) => setField1(e.target.value)}
            />
          </MDBCol>
          <MDBCol>
            <MDBInput
              label="Field #2 name"
              value={field2}
              onChange={(e) => setField2(e.target.value)}
            />
          </MDBCol>
          <MDBCol>
            <MDBInput
              label="Field #3 name"
              value={field3}
              onChange={(e) => setField3(e.target.value)}
            />
          </MDBCol>
        </MDBRow>
        <MDBRow className="d-flex" style={{ gap: "10px" }}>
          <MDBCol>
            <MDBCheckbox
              label="Public"
              checked={isPublic}
              onChange={() => {
                setIsPublic(!isPublic);
                console.log(isPublic);
              }}
            />
          </MDBCol>
          <MDBCol>
            <MDBInput
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              label="Image url"
            />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBTextArea
            id="Description"
            label="Description"
            maxLength={255}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></MDBTextArea>
        </MDBRow>
        <MDBRow style={{justifyContent: "center"}} >
          <MDBBtn style={{width: "25%"}} onClick={editInventoryHandle}>Edit</MDBBtn>
        </MDBRow>
      </MDBRow>
    </MDBRow>
  );
}
