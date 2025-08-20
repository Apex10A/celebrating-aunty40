import { Check, Trash2Icon } from "lucide-react";
import Table from "./Table";
import Tag from "./Tag";

export default function ReservationsTable() {
  const reservations = [
    {
      _id: "68a42d9bbcd1548a4cd892b1",
      name: "Lex luthor",
      email: "test@gmail.com",
      status: "pending",
      numberOfGuests: 3,
      phoneNumber: "08157093021",
      __v: 0,
      invitationCode: "INV-d8640d2-01669",
    },
    {
      _id: "68a42d9bbcd1548a4cd892b1",
      name: "Lex luthor",
      email: "test@gmail.com",
      status: "accepted",
      phoneNumber: "08157093021",
      numberOfGuests: 3,
      __v: 0,
      invitationCode: "INV-d8640d2-01669",
    },
  ];
  return (
    <Table columns="1fr 1fr 1fr 1fr 0.5fr">
      <Table.Header>
        <div>Invitation Code</div>
        <div>Name</div>
        <div>Status</div>
        <div>Number of guests</div>
        <div></div>
      </Table.Header>
      <Table.Body
        data={reservations}
        render={(item) => (
          <Table.Row>
            <div>{item.invitationCode}</div>
            <div className="flex flex-col gap-1">
              <span>{item.name}</span>
              <span>{item.email}</span>
            </div>
            <div>
              <Tag type={item.status === "accepted" ? "green" : "yellow"}>
                {item.status}
              </Tag>
            </div>
            <div>{item.numberOfGuests}</div>
            <div className="flex flex-row items-center gap-6">
              <span className="hover:bg-green-100 p-2 rounded-full hover:text-green-600">
                <Check />
              </span>
              <span className="hover:bg-red-100 p-2 rounded-full hover:text-red-600">
                <Trash2Icon />
              </span>
            </div>
          </Table.Row>
        )}
      />
    </Table>
  );
}
