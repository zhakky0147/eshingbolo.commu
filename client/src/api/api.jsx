import axios from "axios";

axios.defaults.baseURL = "/";
//axios.defaults.baseURL = "http://localhost:8000";

export default class API {
  //detail
  static addCredentals = async (data) => {
    try {
      const res = await axios.post(`/api/v1/credential/add`, data);
      return res;
    } catch (error) {
      alert("Something went wrong");
      return error?.response?.data;
    }
  };
}
