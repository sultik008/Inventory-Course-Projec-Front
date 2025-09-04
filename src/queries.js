import axios from "axios";
import { toast } from "react-toastify";


const url = "https://inventory-course-project-back-production.up.railway.app/api";
const client_id =
  "284659052801-umvj9ni6vebdlpfe7b4ccku41grgj8h3.apps.googleusercontent.com";

function validation(...args) {
  const array = [...args];
  console.log(array)
  for (let i = 0; i < array.length; i++) {
    if (!array[i]) {
      toast.error("Please fill in all required fields");
      return false;
    }
  }
  return true;
}

export async function getUsers() {
  try {
    const res = await axios.get(`${url}/users`);
    return res;
  } catch (error) {
    toast.error(`error ${error.message}`);
  }
}
export async function getInventories() {
  try {
    console.log(localStorage.getItem("token") , localStorage.getItem("userInfo"))
    return await axios.get(`${url}/inventory/common`);

  } catch (error) {
    toast.error(`error ${error.message}`);
  }
}
export async function getInventory(id) {
  try {
    const res = await axios.get(`${url}/inventory/${id}`);
    return res.data[0];
  } catch (error) {
    toast.error(error?.message);
  }
}
export async function registrationByEmail({ email, name, password }) {
  try {
    const res = await axios.post(`${url}/registrationbyemail`, {
      email,
      name,
      password,
    });
    console.log(res)
    saveToken(res.data.token , res.data.user)
    return res
  } catch (error) {
    toast.error(error?.message);
  }
}
export async function registrationGoogle(credential) {
  try {
    const res = await axios.post(`${url}/regbygoogle`, {
      credential,
      client_id,
    });
    console.log(res);
    saveToken(res.data.token , res.data.user)
    toast.success("Registration succesful");
    return res;
  } catch (error) {
    toast.error(`error ${error.message}`);
  }
}
export async function logInbyGoogle(credential) {
  try {
    const res = await axios.post(`${url}/loginbygoogle`, { credential, client_id });
    saveToken(res.data.token , res.data.user)
    return res
  } catch (error) {
    toast.error(`error ${error.message}`);
  }
}
export async function setAdmin(ids) {
  try {
    if (ids.length < 1) toast.error("Choose user or users");
    else {
      toast.success("Admin granted");
      return await axios.patch(`${url}/setadmin`, { ids });
    }
  } catch (error) {
    toast.error(error?.message);
    console.log(error);
  }
}
export async function revokeAdmin(ids) {
  try {
    if (ids.length < 1) toast.error("Choose user or users");
    else {
      toast.success("Admin Revoked");
      return await axios.patch(`${url}/revokeadmin`, { ids });
    }
  } catch (error) {
    toast.error(error?.message);
    console.log(error);
  }
}
export async function getAccessibleInventories(id) {
  id = "6b967eaa-c6ac-4ed6-b0ee-dadfa72063cf";
  try {
    return await axios.get(`${url}/inventory/${id}`);
  } catch (error) {
    toast.error(`error ${error.message}`);
  }
}
export async function createInventory({isPublic,description,image,field1,field2,field3,name,category}) {
  try {
    let user = localStorage.getItem("userInfo")
    console.log(user)
    let ownerName = user.name 
    let owner = user.id
    console.log(owner , ownerName)

    if (validation(owner,description,field1,field2,field3,name,ownerName,category)) {
      const res = await axios.post(`${url}/inventory`, {owner,isPublic,description,image,field1,field2,field3,name,ownerName,category,});
      toast.success("Inventory created");
      return res;
    }
  } catch (error) {
    toast.error(`error ${error.message}`);
  }
}
export async function createItems({
  inventoryid,
  image,
  fieldValue1,
  fieldValue2,
  fieldValue3,
  createdby = "29746f3c-e6b6-4388-9a6c-57460b9fd5ad",
  ownername = "Sultanbek",
}) {
  try {
    console.log(inventoryid);
    if (validation( fieldValue1,fieldValue2,fieldValue3, )){
      const res = await axios.post(`${url}/elements`, {inventoryid: inventoryid,
        image,
        fieldvalue1: fieldValue1,
        fieldvalue2: fieldValue2,
        fieldvalue3: fieldValue3,
        createdby,
        ownername,
      });
      toast.success("Item created");
      if (res.error == true) {
        throw new Error(res.error);
      }
      return res;
    }
  } catch (error) {
    toast.error(`error ${error?.message}`);
  }
}
export async function saveCustomId({inventoryid , format , formatValues}) {
  try {
    const res = await axios.post(`${url}/customid/save` , {inventoryid , format , formatValues})
    toast.success("Custom ID saved")
    return res
  } catch (error) {
    console.log(error)
    toast.error(error?.message)
  }
}
export async function getCategory() {
  try {
    return await axios.get(`${url}/category`);
  } catch (error) {
    toast.error(`error ${error.message}`);
  }
}
export async function getItem(itemid) {
  try {
    const res = await axios.get(`${url}/item/${itemid}`)
    console.log(res)
    return res
  } catch (error) {
    console.log(error)
    toast.error(error?.message)
  }
}
export async function editInventory({inventoryid,ispublic,description,image,field1,field2,field3,name,category,customId,}) {
  try {
    if (validation(inventoryid,field1,field2,field3,name,category,)) {
      const res = await axios.put(`${url}/inventory/edit`, {inventoryid,ispublic,description,image,field1,field2,field3,name,category,customId});
      toast.success("Inventory Updated");
      return res;
    }
  } catch (error) {
    toast.error(`error ${error.message}`);
  }
}
export async function deleteInventory(ids) {
  try {
    let res;
    if (ids.length > 0) {
      res = await axios.delete(`${url}/inventory/delete`, { data: { ids } });
      toast.success("Inventory deleted");
    } else toast.error("Nothing to delete");
    return res;
  } catch (error) {
    toast.error(`error ${error.message}`);
  }
}
export async function deleteUsers(ids) {
  try {
    const res = await axios.delete(`${url}/users`, { data: { ids: ids } });
    if (ids.length > 1) toast.success("Users have been deleted");
    else toast.success("User has been deleted");
    return res;
  } catch (error) {
    toast.error(error?.message);
    console.log(error);
  }
}
export async function getInventoryById(inventoryid) {
  try {
    const res = await axios.get(`${url}/items/${inventoryid}`);
    return res;
  } catch (error) {
    toast.error(`error ${error.message}`);
  }
}
export async function getInventoryProps(inventoryid) {
  try {
    // const res = await axios.get(`${url}/fields${inventoryid}`)
    // console.log(res)
    const res = await axios.get(`${url}/fields/${inventoryid}`);
    return res;
  } catch (error) {
    toast.error(`error ${error.message}`);
  }
}
export async function getCustomID({ format, formatValues }) {
  try {
    console.log(format, formatValues);
    const res = await axios.post(`${url}/examplecustomid`, {
      format,
      formatValues,
      inventoryid: "",
    });
    return res;
  } catch (error) {
    toast.error(error?.message);
  }
}
export async function helloworld() {
  try {
    const res = await axios.get(`${url}/helloworld`);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}
export function saveToken(token , user) {
  localStorage.setItem("userInfo" , user)
  localStorage.setItem("token", token);
}