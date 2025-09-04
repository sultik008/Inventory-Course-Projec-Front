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
import Header from "./header";
import { deleteUsers, getUsers, revokeAdmin, setAdmin } from "../queries";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState([]);

  async function deleteUsersHandle() {
    const res = await deleteUsers(selected);
    console.log(res)
    getUsersHandle()
  }
  async function setAdminHandle() {
    const res = await setAdmin(selected)
    getUsersHandle()
  }
  async function revokeAdminHandle() {
    const res = await revokeAdmin(selected)
    getUsersHandle()
  }
  async function getUsersHandle() {
    const res = await getUsers();
    setUsers([...res.data])
    console.log(res , users)
  }
  function select(id) {
    console.log("До" , selected)
    if (!selected.includes(id)) {
      setSelected([...selected, id]);
    } else {
      setSelected(selected.filter((f) => f !== id));
    }
    console.log(selected);
  }
  useEffect(() => {
    getUsersHandle();
  }, [1]);
  return (
    <MDBContainer fluid>
      <MDBRow>
        <Header/>
      </MDBRow>
      <MDBRow style={{borderRadius: '8px' , padding: "10px" , boxShadow: "0px 0px 5px 0.1px gray"}}>
        <MDBCol style={{gap: "10px" , display: 'flex'}}>
          <MDBBtn>Edit</MDBBtn>
          <MDBBtn onClick={deleteUsersHandle}>Delete</MDBBtn>
          <MDBBtn onClick={() => {setAdminHandle();}} >Set Admin</MDBBtn>
          <MDBBtn onClick={() => {revokeAdminHandle();}} >Revoke Admin</MDBBtn>
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBTable hover responsive>
          <MDBTableHead>
            <tr style={{ fontWeight: "bold" }}>
              <td>#</td>
              <th>Avatar</th>
              <td>User name</td>
              <td>email</td>
              <td>loged In</td>
              <td>Admin</td>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {Array.isArray(users)
              ? users.map((user , i) => {
                  return (
                    <tr key={i} style={{ cursor: "pointer" }}>
                      <th>
                        <MDBCheckbox 
                          onClick={() => select(user.id)}
                          defaultChecked={false}
                        ></MDBCheckbox>
                      </th>
                      <th style={{padding: '0 0 0 22.4px'}}>{user.picture != 'false' ? <img src={user.picture} alt="" width={'55px'} /> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" style={{width: '55px' , backgroundColor: "whitesmoke"}} fill="darkgray"><path d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z"/></svg>}</th>
                      <th>{user.name}</th>
                      <td>{user.email}</td>
                      <td>{user.logedin}</td>
                      <td>{JSON.stringify(user.isadmin)}</td>
                    </tr>
                  );
                })
              : ""}
          </MDBTableBody>
        </MDBTable>
      </MDBRow>
    </MDBContainer>
  );
}
