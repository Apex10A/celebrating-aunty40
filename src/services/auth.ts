import api from "./api";

export type Credentials = {
  email: string;
  password: string;
};

export async function Login(credentials: Credentials) {
  try {
    const res = await api.post("/admin/login", credentials);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getUser() {
  try {
    const res = await api.get("admin/getUser");
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
