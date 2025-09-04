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
import React, { useState, useEffect } from "react";
import Header from "./header";
import { useParams } from "react-router-dom";
import { getInventoryProps, getItem } from "../queries";
import BreadCrumbs from "./BreadCrumbs";

export default function ItemPage() {
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
    {
      url: `/inv/${id}/item/${itemid}`,
      title: "item",
    },
  ];
  const [basicActive, setBasicActive] = useState("tab1");
  const [image, setImage] = useState("");
  const [inventoryProps, setInventoryProps] = useState([]);
  async function getInventoryPropsHandle() {
    const res = await getInventoryProps(id);
    setInventoryProps(res.data);
  }
  async function getItemHandle() {
    const res = await getItem(itemid)
  }
  function handleBasicClick(value) {
    if (value === basicActive) return;
    setBasicActive(value);
  }
  useEffect(()=>{
  getInventoryPropsHandle()
  }, [1])
  return (
    <MDBContainer fluid>
      <MDBRow>
        <Header></Header>
      </MDBRow>
      <MDBRow>
        <BreadCrumbs paths={paths}></BreadCrumbs>
      </MDBRow>
      <MDBRow style={{ width: "100%" }}>
        <MDBTabs className="mb-3" fill>
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleBasicClick("tab1")}
              active={basicActive === "tab1"}
            >
              Item
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleBasicClick("tab2")}
              active={basicActive === "tab2"}
            >
              edit
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleBasicClick("tab3")}
              active={basicActive === "tab3"}
            >
              3
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>
        <MDBTabsContent>
          <MDBTabsPane open={basicActive === "tab1"}>
            <MDBRow center>
              <img
                style={{
                  aspectRatio: "1/1",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  width: "30%",
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
            {}
          </MDBTabsPane>
          <MDBTabsPane open={basicActive === "tab2"}>Tab 2 content</MDBTabsPane>
          <MDBTabsPane open={basicActive === "tab3"}>Tab 3 content</MDBTabsPane>
        </MDBTabsContent>
      </MDBRow>
    </MDBContainer>
  );
}
