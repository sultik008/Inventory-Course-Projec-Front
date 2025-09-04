import React, { useState } from "react";
import "../App.css";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect } from "react";
import { MDBInput, MDBBtn, MDBRow, MDBCol } from "mdb-react-ui-kit";
import Select from "react-select";

export default function Block({ id, title, select }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const [flag, setFlag] = useState(true);
  const [listenersIf, setListenersIf] = useState({});

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
  const [fixed, setFixed] = useState("");
  const style = {
    position: "relative",
    transition,
    transform: CSS.Transform.toString(transform),
  };
  function handleInput(e, i) {
    const updated = [...fieldValues];
    updated[i] = e;
    setFieldValues(updated);
  }
  return (
    <div className="task" style={style}>
        <MDBCol md={1} style={{ margin: "0" , width: "fit-content"}}> 
      <h6 ref={setNodeRef}{...attributes} {...listeners} style={{ margin: "0" , width: "fit-content" , paddingRight: "0"}}className="padding-20-media-10">⮁</h6>
        </MDBCol>
      <MDBCol md={3}>
        <Select
          options={select.map((f) => ({
            label: f.value,
            value: f.value,
          }))}
        ></Select>
      </MDBCol>
      <MDBCol>
        <MDBInput label={title}></MDBInput>
      </MDBCol>
    </div>
  );
}
