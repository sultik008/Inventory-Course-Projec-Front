import React, { useState } from "react";
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
import { createInventory, getCategory, helloworld } from "../queries";

export default function AddInventory() {
  const [isPublic, setIsPublic] = useState(true);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [field1, setField1] = useState("");
  const [field2, setField2] = useState("");
  const [field3, setField3] = useState("");
  const [basicModal, setBasicModal] = useState(false);
  const [categories, setCategories] = useState([""]);

  function toggleOpen() {
    setBasicModal(!basicModal);
  }
  async function getCategoriesHandle() {
    const res = await getCategory();
    setCategories(res.data);
    console.log(res);
  }
  async function createInventoryHandle() {
    const res = await createInventory({
      isPublic,
      description,
      image,
      field1,
      field2,
      field3,
      name,
      category,
    });
    console.log(res);
  }
  

  return (
    <>
      <MDBBtn onClick={toggleOpen}>create inventory</MDBBtn>
      <MDBModal
        closeOnEsc
        open={basicModal}
        onClose={() => setBasicModal(false)}
        tabIndex="-1"
      >
        <MDBModalDialog size="fullscreen">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Create Inventory</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleOpen}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBRow
                className="d-flex dir-cl"
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "center",
                }}
              >
                <MDBRow className="d-flex dir-cl" style={{gap :"10px"}}>
                  <MDBCol>
                    <MDBInput
                      label="Inventory name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </MDBCol>
                  <MDBCol md={4}>
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
                              <option value={categories.name}>
                                {categories.name}
                              </option>
                            );
                          })
                        : ""}
                    </select>
                  </MDBCol>
                </MDBRow>
                <MDBRow className="d-flex dir-cl" style={{gap :"10px"}}>
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
                <MDBRow className="d-flex dir-cl" style={{gap :"10px"}}>
                  <MDBTextArea
                    id="Description"
                    label="Description"
                    maxLength={255}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></MDBTextArea>
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
              </MDBRow>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleOpen}>
                Close
              </MDBBtn>
              <MDBBtn onClick={createInventoryHandle}>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
