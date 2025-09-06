import axios from "axios";
import { toast } from "react-toastify";

const url = "https://inventory-course-project-back-production.up.railway.app/api";
const client_id =
  "284659052801-umvj9ni6vebdlpfe7b4ccku41grgj8h3.apps.googleusercontent.com";

function validation(...args) {
  const array = [...args];
  console.log(array);
  for (let i = 0; i < array.length; i++) {
    if (!array[i]) {
      toast.error("Please fill in all required fields");
      return false;
    }
  }
  return true;
}
function errorAlert(res) {
  console.log("checking");
  if (res.data.error) {
    toast.error(res.data.error.message);
    return false;
  } else return true;
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
    console.log(
      localStorage.getItem("token"),
      localStorage.getItem("userInfo")
    );
    return await axios.get(`${url}/inventory/common`);
  } catch (error) {
    toast.error(`${error.message}`);
  }
}
export async function getInventory(id) {
  try {
    const res = await axios.get(`${url}/inventory/${id}`);
    errorAlert(res);
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
    const check = errorAlert(res);
    console.log(res);
    if (check) {
      saveToken(res.data.token, res.data.user);
      return res;
    } else return false;
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
    const checked = errorAlert(res);
    if (checked) {
      saveToken(res.data.token, res.data.user);
      toast.success("Registration succesful");
      return res;
    } else return false;
  } catch (error) {
    setTimeout(() => {
      if (error.message == "user has already registred")
        window.location.href = "/login";
    }, 3000);
    toast.error(`${error.message}`);
  }
}
export async function logInbyGoogle(credential) {
  try {
    const res = await axios.post(`${url}/loginbygoogle`, {
      credential,
      client_id,
    });
    const checked = errorAlert(res);
    if (checked) {
      saveToken(res.data.token, res.data.user);
    }
    return res;
  } catch (error) {
    toast.error(`error ${error.message}`);
  }
}
export async function setAdmin(ids) {
  try {
    if (ids.length < 1) toast.error("Choose user or users");
    else {
      toast.success("Admin granted");
      const res = await axios.patch(`${url}/setadmin`, { ids });
      const checked = errorAlert(res);
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
      const res = await axios.patch(`${url}/revokeadmin`, { ids });
      const checked = errorAlert(res);
    }
  } catch (error) {
    toast.error(error?.message);
    console.log(error);
  }
}
export async function getAccessibleInventories(id) {
  id = "6b967eaa-c6ac-4ed6-b0ee-dadfa72063cf";
  try {
    const res = await axios.get(`${url}/inventory/${id}`);
    const checked = errorAlert(res);
  } catch (error) {
    toast.error(`error ${error.message}`);
  }
}
export async function createInventory({
  isPublic,
  description,
  image,
  field1,
  field2,
  field3,
  name,
  category,
}) {
  try {
    let user = getUserInfo();
    let token = getToken();
    console.log(user, token);
    let ownerName, owner;
    if (user) {
      ownerName = user.name;
      owner = user.id;
    } else return toast.error("user not authorized");
    if (validation(owner, field1, field2, field3, name, ownerName, category)) {
      console.log(owner, ownerName);
      const res = await axios.post(
        `${url}/inventory/create`,
        {
          owner,
          isPublic,
          description,
          image,
          field1,
          field2,
          field3,
          name,
          ownerName,
          category,
        },
        { headers: { Authorization: token } }
      );
      const checked = errorAlert(res);
      if (checked) {
        toast.success("Inventory created");
        return res;
      }
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
}) {
  try {
    console.log(inventoryid);
    if (validation(fieldValue1, fieldValue2, fieldValue3)) {
      const user = getUserInfo();
      if (user) {
        const token = getToken();
        const res = await axios.post(
          `${url}/elements`,
          {
            inventoryid: inventoryid,
            image,
            fieldvalue1: fieldValue1,
            fieldvalue2: fieldValue2,
            fieldvalue3: fieldValue3,
            createdby: user.id,
            ownername: user.name,
          },
          { headers: { Authorization: token } }
        );
        const check = errorAlert(res);
        if (check) {
          toast.success("Item created");
          return res;
        }
      } else return toast.error("User is not authorized");
    }
  } catch (error) {
    toast.error(`error ${error?.message}`);
  }
}
export async function saveCustomId({ inventoryid, format, formatValues }) {
  try {
    const user = getUserInfo();
    if (user) {
      const token = getToken();
    }
  } catch (error) {
    console.log(error);
    toast.error(error?.message);
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
    const res = await axios.get(`${url}/item/${itemid}`);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    toast.error(error?.message);
  }
}
export async function editInventory({
  inventoryid,
  ispublic,
  description,
  image,
  field1,
  field2,
  field3,
  name,
  category,
  customId,
}) {
  try {
    const user = getUserInfo();
    if (user) {
      const token = getToken();
      if (validation(inventoryid, field1, field2, field3, name, category)) {
        const res = await axios.put(
          `${url}/inventory/edit`,
          {
            inventoryid,
            ispublic,
            description,
            image,
            field1,
            field2,
            field3,
            name,
            category,
            customId,
          },
          { headers: { Authorization: token } }
        );
        const check = errorAlert(res);
        if (check) {
          toast.success("Inventory Updated");
          return res;
        }
      }
    } else return toast.error("User is not authorized");
  } catch (error) {
    toast.error(`error ${error.message}`);
  }
}
export async function deleteInventory(ids) {
  try {
    const user = getUserInfo();
    if (user) {
      const token = getToken();
      let res;
      if (ids.length > 0) {
        res = await axios.delete(`${url}/inventory/delete`, {
          headers: { Authorization: token },
          data: { ids },
        });
        const check = errorAlert(res);
        if (check) toast.success("Inventory deleted");
      } else toast.error("Nothing to delete");
      return res;
    } else return toast.error("User is not authorized");
  } catch (error) {
    toast.error(`error ${error.message}`);
  }
}
export async function deleteUsers(ids) {
  try {
    const user = getUserInfo();
    if (user) {
      const token = getToken()
      if (ids.length > 1) toast.success("Users have been deleted");
      else if(ids.length <= 0) return toast.error("Nothing to delete")
      else toast.success("User has been deleted");
      const res = await axios.delete(`${url}/users/delete`, {
        data: { ids: ids } , headers: {Authorization: token},
      });
      const check = errorAlert(res)
      if (check) {
        return res;
      }
    } else return toast.error("user is not authorized");
  } catch (error) {
    console.log(error);
    toast.error(error?.message);
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
export function saveToken(token, user) {
  localStorage.setItem("userInfo", JSON.stringify(user));
  localStorage.setItem("token", token);
}
export function getUserInfo() {
  return JSON.parse(localStorage.getItem("userInfo"));
}
function getToken() {
  return localStorage.getItem("token");
}
