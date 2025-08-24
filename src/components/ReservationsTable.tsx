import { Check, Trash2Icon } from "lucide-react";
import Table from "./Table";
import Tag from "./Tag";
import { acceptReservation, deleteReservation } from "@/services/reservations";

export default function ReservationsTable({
  data,
  refresh,
}: {
  data: Record<string, any>[];
  refresh: () => void;
}) {
  async function accept(id: string) {
    try {
      const res = await acceptReservation(id);
      if (res?.status == 200) {
        alert("Accepted successfully");
        refresh();
      } else alert("An error");
    } catch (error) {
      console.error("An error");
    }
  }

  async function deleteItem(id: string) {
    try {
      const res = await deleteReservation(id);
      if (res?.status == 200) {
        alert("Accepted successfully");
        refresh();
      } else alert("An error");
    } catch (error) {
      console.error("An error");
    }
  }

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
        data={data}
        render={(item) => (
          <Table.Row key={item?._id}>
            <div>{item.invitationCode ? item.invitationCode : "-"}</div>
            <div className="flex flex-col gap-1">
              <span>{item?.name}</span>
              <span>{item?.email}</span>
            </div>
            <div>
              <Tag type={item?.status === "accepted" ? "green" : "yellow"}>
                {item?.status}
              </Tag>
            </div>
            <div>{item?.numOfGuests}</div>
            <div className="flex flex-row items-center gap-6 justify-end">
              {item?.status === "pending" && (
                <span
                  className="p-2 cursor-pointer rounded-full text-emerald-400 hover:bg-emerald-900/30 transition-colors"
                  onClick={() => accept(item._id)}>
                  <Check />
                </span>
              )}
              <span
                className="p-2 cursor-pointer rounded-full text-rose-400 hover:bg-rose-900/30 transition-colors"
                onClick={() => deleteItem(item._id)}>
                <Trash2Icon />
              </span>
            </div>
          </Table.Row>
        )}
      />
    </Table>
  );
}
