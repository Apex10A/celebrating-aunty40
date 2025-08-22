import api from "./api";

export type Reservation = {
  name: string;
  email: string;
  phoneNumber: string;
  message?: string;
  restriction?: string;
  numOfGuests: number;
  invitationCode?: string;
  isPresent?: boolean;
  status?: string;
};

export async function getReservations() {
  try {
    const res = await api.get("/reservations/get");
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function makeReservation(reservation: Reservation) {
  try {
    const res = await api.post("/reservations/book", reservation);
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function acceptReservation(reservationId: string) {
  try {
    const res = await api.put(`/reservations/accept/${reservationId}`);
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function findInvite(invitationCode: string) {
  try {
    const res = await api.get(`/reservations/reservation/${invitationCode}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function checkin(reservationId: string) {
  try {
    const res = await api.put(`/reservations/checkin/${reservationId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteReservation(reservationId: string) {
  try {
    const res = await api.delete(`/reservations/delete/${reservationId}`);
    return res;
  } catch (error) {
    console.log(error);
  }
}
