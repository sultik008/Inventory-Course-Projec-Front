import { CSS } from "@dnd-kit/utilities";
import {
  DndContext,
  closestCenter,
  closestCorners,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  PointerSensor,
  TouchSensor,
} from "@dnd-kit/core";
import Blocks from "./blocks";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  horizontalListSortingStrategy
} from "@dnd-kit/sortable";
import { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBCol,
  MDBRow,
  MDBInput,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import { getCustomID } from "../queries";
import Block from "./Block";

export default function Dnd() {
  const { isOver, setDropRef } = useDroppable({ id: "droppable" });
  const [blocks, setBlocks] = useState([
    { id: 1, disabled: false, value: "Fixed" },
    { id: 2, disabled: true, value: "20-bit Random" },
    { id: 3, disabled: true, value: "32-bit Random" },
    { id: 4, disabled: true, value: "6 digits" },
    { id: 5, disabled: true, value: "9 digits" },
    { id: 6, disabled: true, value: "GUID" },
    { id: 8, disabled: true, value: "Date/Time" },
    { id: 9, disabled: true, value: "Sequence" },
  ]);
  const [count, setCount] = useState(2);
  const [idExample, setIdExample] = useState("");
  const [format, setFormat] = useState([]);
  const sensor = useSensors(useSensor(PointerSensor), useSensor(MouseEvent), {
    activationConstraint: {
      distance: 5,
    },
  });
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
  const getTaskPos = (id) => blocks.findIndex((task) => task.id === id);
  function handleDragEnd(e) {
    const { active, over } = e;
    console.log(active, over);
    if (active.id === over.id) return;
    setBlocks((tasks) => {
      const originalpos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);

      return arrayMove(tasks, originalpos, newPos);
    });
  }
  useEffect(() => {
    send();
  }, [format]);
  async function send() {
    const res = await getCustomID({ format });
    setIdExample(res.data);
    console.log(res, 1);
  }
  return (
    <MDBContainer
      fluid
      className="gap-20-media-10 d-flex"
      style={{ flexDirection: "column" }}
    >
      <MDBRow>
        <h4>Example: {idExample ? idExample : ""}</h4>
        <DndContext
          onDragEnd={handleDragEnd}
          collisionDetection={closestCorners}
        >
          <BlocksContext  count={count} blocks={blocks} fields={fieldsProps} select={fields}/>
        </DndContext>
      </MDBRow>
      <MDBRow>
        <MDBCol
          style={{ display: "flex", justifyContent: "center", gap: "20px" }}
        >
          <MDBBtn
            onClick={() => {
              if (count < 8) {
                setCount(count + 1);
              } else toast.info("Blocks must be lower than 8");
            }}
          >
            Add field
          </MDBBtn>
          <MDBBtn
            onClick={() => {
              if (count > 2) {
                setCount(count - 1);
              } else toast.info("Blocks must be 2 or more");
            }}
          >
            Delete field
          </MDBBtn>
        </MDBCol>
        <MDBRow style={{ justifyContent: "center", padding: "10px" }}>
          <MDBBtn style={{ width: "25%" }}>Save</MDBBtn>
        </MDBRow>
      </MDBRow>
    </MDBContainer>
  );
}
function BlocksContext({blocks , count , fields}) {
    return(
        <div className="column">
            <SortableContext items={blocks} strategy={horizontalListSortingStrategy}>
            {blocks.slice(0 , count).map((block , i) => {
            return <Block id={block.id} key={block.id} select={fields} title={block.value} ></Block>
        })}
        </SortableContext>
        </div>
    )
}
