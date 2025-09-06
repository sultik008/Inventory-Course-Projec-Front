import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBCheckbox,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import { useNavigate, useParams } from "react-router-dom";
import {
  getInventoryById,
  getInventoryProps,
  getCustomID,
  editInventory,
  createItems,
  saveCustomId,
} from "../queries";
import Header from "./header";
import EditInventory from "./editInventory";
import Select from "react-select";
import { toast } from "react-toastify";
import Dnd from "./dnd";
import BreadCrumbs from "./BreadCrumbs";

export default function Inventory() {
  const [items, setItems] = useState([""]);
  const [fillActive, setFillActive] = useState("tab1");
  const [fieldValue1, setFieldValue1] = useState("");
  const [fieldValue2, setFieldValue2] = useState("");
  const [fieldValue3, setFieldValue3] = useState("");
  const [image, setImage] = useState("");
  const [inventoryProps, setInventoryProps] = useState([]);
  const [fieldsCount, setFieldsCount] = useState(2);
  const [idExample, setIdExample] = useState("");
  const [customID, setCustomID] = useState("");
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
  const [format, setFormat] = useState(["Fixed", "20-bit Random"]);
  const [fieldValues, setFieldValues] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const navigate = useNavigate();
  const { id, itemid } = useParams();
  const paths = [
    {
      url: "/",
      title: "Main",
    },
    {
      url: `/inv/${id}`,
      title: "inventory",
    },
  ];
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
    let newFormat;
    if (!update) {
      toast.info("blocks must be used once");
    } else {
      setFields(update);
      newFormat = update.slice(0, fieldsCount);
      setFormat(newFormat);
    }
    console.log(format);
  }
  function handleInput(e, i) {
    const updated = [...fieldValues];
    updated[i] = e;
    setFieldValues(updated);
  }
  async function getInventoryPropsHandle() {
    const res = await getInventoryProps(id);
    setInventoryProps(res.data);
  }
  function handleFillClick(value) {
    if (value === fillActive) {
      return;
    }
    setFillActive(value);
  }
  useEffect(() => {
    send();
  }, [format, fieldValues]);
  async function send() {
    const res = await getCustomID({ format, formatValues: fieldValues });
    setIdExample(res.data);
  }
  useEffect(() => {
    getInventoryPropsHandle();
    getItemsHandle();
  }, [1]);
  async function getItemsHandle() {
    const res = await getInventoryById(id);
    setItems(res.data);
  }
  async function handleCreateItem() {
    const res = await createItems({
      inventoryid: id,
      image,
      fieldValue1,
      fieldValue2,
      fieldValue3,
    });
    getItemsHandle();
    console.log(res);
  }
  async function saveCustomIdHandle() {
    const res = await saveCustomId({
      format: format,
      formatValues: fieldValues.slice(0, 1),
      inventoryid: id,
    });
    console.log(res);
  }
  return (
    <MDBContainer fluid style={{ height: "100vh" }}>
      <MDBRow style={{ marginBottom: "10px" }}>
        <Header />
      </MDBRow>
      <MDBRow>
        <BreadCrumbs paths={paths} />
      </MDBRow>
      <MDBTabs fill className="mb-3 dir-cl">
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleFillClick("tab1")}
            active={fillActive === "tab1"}
          >
            Inventory
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => {
              handleFillClick("tab2");
            }}
            active={fillActive === "tab2"}
          >
            Create Item
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleFillClick("tab3")}
            active={fillActive === "tab3"}
          >
            Edit Inventory
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleFillClick("tab4")}
            active={fillActive === "tab4"}
          >
            Custom ID
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>
      <MDBTabsContent>
        <MDBTabsPane className="h-auto-media" open={fillActive === "tab1"}>
          <MDBTable responsive hover>
            <MDBTableHead className="fw-b">
              <tr>
                <th>ID</th>
                {Array.isArray(inventoryProps)
                  ? inventoryProps.map((field) => {
                      return <th>{field}</th>;
                    })
                  : ""}
                <th>Created By</th>
                <th>Created At</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {Array.isArray(items)
                ? items.map((item) => {
                    return (
                      <tr
                        onClick={() => {
                          navigate(`/inv/${id}/item/${item.inventoryid}`);
                        }}
                        key={item.inventoryid}
                      >
                        <td>{item.customid}</td>
                        <td>{item.fieldvalue1}</td>
                        <td>{item.fieldvalue2}</td>
                        <td>{item.fieldvalue3}</td>
                        <td>{item.ownername}</td>
                        <td>{item.createdat}</td>
                      </tr>
                    );
                  })
                : ""}
            </MDBTableBody>
          </MDBTable>
        </MDBTabsPane>
        <MDBTabsPane
          className="h-auto-media"
          style={{ height: "84.5vh" }}
          open={fillActive === "tab2"}
        >
          <MDBRow
            style={{
              display: "flex",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <MDBRow
              className="w-auto-media"
              style={{
                display: "flex",
                alignSelf: "center",
                justifyContent: "center",
                gap: "10px",
                width: "50%",
                height: "fit-content",
              }}
            >
              <MDBRow center>
                <img
                  style={{
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    width: "50%",
                    borderRadius: "8px",
                  }}
                  src={
                    image
                      ? image
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtEY1E5uyX1bU9au2oF74LoFPdthQlmZ5YIQ&s"
                  }
                  className="img-fluid hover-shadow"
                />
              </MDBRow>
              <h5>Fill fields</h5>
              <MDBRow>
                <MDBInput
                  onChange={(e) => {
                    if (e.target.value.trim()) {
                      setImage(e.target.value);
                    }
                  }}
                  label={"url path to Image"}
                ></MDBInput>
              </MDBRow>
              <MDBRow>
                <MDBInput
                  onChange={(e) => {
                    if (e.target.value.trim()) {
                      setFieldValue1(e.target.value);
                    }
                  }}
                  label={inventoryProps[0]}
                ></MDBInput>
              </MDBRow>
              <MDBRow>
                <MDBInput
                  onChange={(e) => {
                    if (e.target.value.trim()) {
                      setFieldValue2(e.target.value);
                    }
                  }}
                  label={inventoryProps[1]}
                ></MDBInput>
              </MDBRow>
              <MDBRow>
                <MDBInput
                  onChange={(e) => {
                    if (e.target.value.trim()) {
                      setFieldValue3(e.target.value);
                    }
                  }}
                  label={inventoryProps[2]}
                ></MDBInput>
              </MDBRow>
              <MDBRow style={{ justifyContent: "center" }}>
                <MDBBtn style={{ width: "50%" }} onClick={handleCreateItem}>
                  create
                </MDBBtn>
              </MDBRow>
            </MDBRow>
          </MDBRow>
        </MDBTabsPane>
        <MDBTabsPane
          className="h-auto-media"
          style={{ height: "84.5vh" }}
          open={fillActive === "tab3"}
        >
          <EditInventory id={id} />
        </MDBTabsPane>
        <MDBTabsPane
          className="h-auto-media"
          style={{ height: "84.5vh" }}
          open={fillActive === "tab4"}
        >
          <h4>Example: {idExample ? idExample : ""}</h4>

          {Array.isArray(fields)
            ? fields.slice(0, fieldsCount).map((item, i) => {
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
                          if (fields[i] !== e.value) {
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
              })
            : ""}
          <MDBRow

            style={{ flexDirection: "row", justifyContent: "center" }}
          >
            <MDBRow
              style={{display: "flex", justifyContent: "center", gap: "20px" }}
            >
              <div style={{width: "fit-content", display: "flex" , gap: "10px"}}>
                <MDBBtn
                onClick={() => {
                  if (fieldsCount < 8) {
                    setFieldsCount(fieldsCount + 1);
                    send();
                    handleSelect();
                  } else toast.info("Fields must be lowert than 8");
                }}
              >
                Add field
              </MDBBtn>
              <MDBBtn
                onClick={() => {
                  if (fieldsCount > 2) {
                    setFieldsCount(fieldsCount - 1);
                    send();
                    handleSelect();
                  } else toast.info("Fields must be 2 or more");
                }}
              >
                Delete field
              </MDBBtn>
              </div>
            </MDBRow>
            <MDBRow style={{ justifyContent: "center", padding: "10px" }}>
              <MDBBtn style={{ width: "25%" }} onClick={saveCustomIdHandle}>
                Save
              </MDBBtn>
            </MDBRow>
          </MDBRow>
        </MDBTabsPane>
      </MDBTabsContent>
      <MDBRow>
        <Dnd></Dnd>
      </MDBRow>
    </MDBContainer>
  );
}
