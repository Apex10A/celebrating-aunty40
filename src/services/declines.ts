import api from "./api";

export type Decline = {
  name: string;
  email: string;
  message?: string;
};

export async function getDeclines() {
  try {
    const res = await api.get("/declines/get");
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function sendDecline(decline: Decline) {
  try {
    const res = await api.post("/declines/send", decline);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
