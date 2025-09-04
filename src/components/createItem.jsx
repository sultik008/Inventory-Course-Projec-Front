import React, { useEffect, useRef, useState } from "react";
import {
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBCheckbox,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import Select from "react-select";
import { toast } from "react-toastify";
import { getCustomID, getInventoryProps } from "../queries";
import { useParams } from "react-router-dom";


export default function CreateItem() {
  const [basicModal, setBasicModal] = useState(false);
  const [basicActive, setBasicActive] = useState("tab1");
  const [fieldsCount, setFieldsCount] = useState(2);
  const [idExample , setIdExample] = useState('')
  const [fieldValue1 , setFieldValue1] = useState('')
  const [fieldValue2 , setFieldValue2] = useState('')
  const [fieldValue3 , setFieldValue3] = useState('')
  const [inventoryProps , setInventoryProps] = useState([])
  const [image , setImage] = useState('')
  const [customID , setCustomID] = useState('')
  const {id} = useParams()
  const [fieldsProps, setFieldsProps] = useState([
    {
      title: "Any text you define (e.g., INV_)",
      value: "Fixed",
      inputType: "text",
    },
    {
      title:
        "Formatted as either 6-digit decimal (D6, e.g. 053124) or 5-digit hex (X5, e.g. AB12F).",
      value: "20-bit Random",
      inputType: "text",
    },
    {
      title: "8-digit hex (X8, e.g. FF12AC9E).",
      value: "32-bit Random",
      inputType: "text",
    },
    {
      title: "Random 6-digit decimal number (D6, e.g. 123456).",
      value: "6 digits",
      inputType: "text",
    },
    {
      title: "Random 9-digit decimal number (D9, e.g. 987654321).",
      value: "9 digits",
      inputType: "text",
    },
    {
      title:
        "A globally unique identifier (e.g. 550e8400-e29b-41d4-a716-446655440000).",
      value: "GUID",
      inputType: "number",
    },
    {
      title: "The creation date/time of the item (e.g. 2025-08-27 10:00).",
      value: "Date/Time",
      inputType: "text",
    },
    {
      title:
        "Incremental number based on the count of items (e.g. SEQ_000123).",
      value: "Sequence",
      inputType: "number",
    },
  ]);
  const [fields, setFields] = useState([
    "Fixed",
    "20-bit Random",
    "32-bit Random",
    "6 digits",
    "9 digits",
    "GUID",
    "Date/Time",
    "Sequence",
  ]);
  const [format, setFormat] = useState(['Fixed' , '20-bit Random']);
  const [fieldValues, setFieldValues] = useState(['' , '' , '','' , '' , '','' , '' , '',]);
  async function createItemhandle() {
    setFormat([fields.slice(0, fieldsCount)]);
    console.log(format, fieldsCount, fields);
    toast.success("Успешно");
  }
  function checkDuplicate(e, i, Arr) {
    const updated = Arr.map((item, j) => (j === i ? e : item));
    const newFields = updated.slice(0, fieldsCount);
    console.log(newFields);
    const duplicates = newFields.filter(
      (item, i) => newFields.indexOf(item) !== i
    );
    if (duplicates.length > 0) return false;
    else return updated;
  }
  function handleSelect(e, i) {
    const update = checkDuplicate(e, i, fields);
    let newFormat
    if (!update) {
      toast.info("blocks must be used once");
    } else {
      setFields(update);
      newFormat = update.slice(0, fieldsCount)
      setFormat(newFormat);
    }
    console.log(format)
  }
  function handleInput(e, i) {
    const updated = [...fieldValues];
    updated[i] = e;
    setFieldValues(updated);
  }
  function toggleOpen() {
    setBasicModal(!basicModal);
  }
  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }
    setBasicActive(value);
  }
  async function getInventoryPropsHandle() {
    console.log(id)
    const res = await getInventoryProps(id)
    console.log(res.data)
    setInventoryProps(res.data)
  }
  useEffect(()=>{
    send()
  },[format, fieldValues])

  async function send(){
    const res = await getCustomID({format , formatValues: fieldValues})
    setIdExample(res.data)
    console.log(res , 1)
  }
  return (
    <>
      <MDBBtn onClick={()=>{toggleOpen(); getInventoryPropsHandle()}}>Create Item</MDBBtn>
      <MDBModal
        closeOnEsc
        open={basicModal}
        onClose={() => setBasicModal(false)}
        tabIndex="-1"
      >
        <MDBModalDialog size="fullscreen">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Create Item</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleOpen}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBTabs className="mb-3">
                <MDBTabsItem>
                  <MDBTabsLink
                    onClick={() => {handleBasicClick("tab1"); getInventoryPropsHandle()}}
                    active={basicActive === "tab1"}
                  >
                    Item
                  </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                  <MDBTabsLink
                    onClick={() => {handleBasicClick("tab2"); send()}}
                    active={basicActive === "tab2"}
                  >
                    custom ID
                  </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                  <MDBTabsLink
                    onClick={() => handleBasicClick("tab3")}
                    active={basicActive === "tab3"}
                  >
                    Tab 3
                  </MDBTabsLink>
                </MDBTabsItem>
              </MDBTabs>

              <MDBTabsContent style={{height: "94.4%"}}>
                <MDBTabsPane style={{height: "100%"}} open={basicActive === "tab1"}>
                    <MDBCol  style={{display: "flex" , justifyContent: "center" , height: "100%"}}>
                      <MDBRow style={{display: "flex", alignSelf: "center" , justifyContent: "center" , gap: "10px" , width: "50%" , height: "fit-content"}}>
                      <MDBRow><MDBInput onChange={e => setImage(e.target.value)} label={"url path to Image"}></MDBInput></MDBRow>
                      <MDBRow> <MDBInput onChange={e => setFieldValue1(e.target.value)} label={inventoryProps[0]}></MDBInput></MDBRow>
                      <MDBRow> <MDBInput onChange={e => setFieldValue2(e.target.value)}  label={inventoryProps[1]}></MDBInput></MDBRow>
                      <MDBRow> <MDBInput onChange={e => setFieldValue3(e.target.value)} label={inventoryProps[2]}></MDBInput></MDBRow>
                      <MDBRow style={{justifyContent: "center"}}><MDBBtn style={{width: "50%"}}>Save</MDBBtn></MDBRow>
                    </MDBRow>
                    </MDBCol>
                </MDBTabsPane>
                <MDBTabsPane open={basicActive === "tab2"}>
                  <h4>Example: {idExample}</h4>

                  {fields.slice(0, fieldsCount).map((item, i) => {
                    const fieldProp = fieldsProps.find((f) => f.value === item);
                    return (
                      <MDBRow key={i}>
                        <MDBCol>
                          <Select
                            options={fieldsProps.map((f) => ({
                              label: f.value,
                              value: f.value,
                            }))}
                            value={{ label: item, value: item }}
                            onChange={async (e) => {
                              
                              if (fields[i] !== e.value){
                                handleSelect(e.value, i);
                              }
                            }}
                          />
                        </MDBCol>
                        <MDBCol>
                          <MDBInput
                            type={fieldProp.inputType}
                            value={fieldValues[i]}
                            onChange={(e) => {
                              handleInput(e.target.value, i);
                            }}
                          />
                        </MDBCol>
                        <h6 style={{ fontSize: "15px", color: "#666" }}>
                          {fieldProp?.title}
                        </h6>
                      </MDBRow>
                    );
                  })}
                  <MDBRow>
                    <MDBCol style={{display: "flex",justifyContent: 'center' , gap: "20px"}}>
                      <MDBBtn
                        onClick={() => {
                          if (fieldsCount < 8) {setFieldsCount(fieldsCount + 1)} else toast.info("Fields must be lowert than 8");
                        }}
                      >
                        Add field
                      </MDBBtn>
                      <MDBBtn
                        onClick={() => {
                          if (fieldsCount > 2) {setFieldsCount(fieldsCount - 1)} else toast.info("Fields must be 2 or more");
                        }}
                      >
                        Delete field
                      </MDBBtn>
                    </MDBCol>
                  </MDBRow>
                </MDBTabsPane>
                <MDBTabsPane open={basicActive === "tab3"}>
                  Tab 3 content
                </MDBTabsPane>
              </MDBTabsContent>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleOpen}>
                Close
              </MDBBtn>
              <MDBBtn onClick={createItemhandle}>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
