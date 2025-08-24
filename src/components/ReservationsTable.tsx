import { useState } from "react";
import { Check, Trash2Icon } from "lucide-react";
import Table from "./Table";
import Tag from "./Tag";
import { acceptReservation, deleteReservation } from "@/services/reservations";
import { AnniversaryModal } from "./AnniversaryModal";

export default function ReservationsTable({
  data,
  refresh,
  notify,
}: {
  data: Record<string, any>[];
  refresh: () => void;
  notify: (message: string, type?: "success" | "error") => void;
}) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [targetId, setTargetId] = useState<string | null>(null);

  async function accept(id: string) {
    try {
      const res = await acceptReservation(id);
      if (res?.status == 200) {
        notify("Accepted successfully", "success");
        refresh();
      } else notify("An error occurred while accepting", "error");
    } catch (error) {
      console.error(error);
      notify("An error occurred while accepting", "error");
    }
  }

  async function doDelete(id: string) {
    try {
      const res = await deleteReservation(id);
      if (res?.status == 200) {
        notify("Deleted successfully", "success");
        refresh();
      } else notify("An error occurred while deleting", "error");
    } catch (error) {
      console.error(error);
      notify("An error occurred while deleting", "error");
    }
  }

  function requestDelete(id: string) {
    setTargetId(id);
    setConfirmOpen(true);
  }

  function closeConfirm() {
    setConfirmOpen(false);
    setTargetId(null);
  }

  async function confirmDelete() {
    if (!targetId) return;
    await doDelete(targetId);
    closeConfirm();
  }

  return (
    <>
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
                <Tag type={item?.status === "accepted" ? "green" : "yellow"}>{item?.status}</Tag>
              </div>
              <div>{item?.numOfGuests}</div>
              <div className="flex flex-row items-center gap-6 justify-end">
                {item?.status === "pending" && (
                  <span
                    className="p-2 cursor-pointer rounded-full text-emerald-400 hover:bg-emerald-900/30 transition-colors"
                    onClick={() => accept(item._id)}
                  >
                    <Check />
                  </span>
                )}
                <span
                  className="p-2 cursor-pointer rounded-full text-rose-400 hover:bg-rose-900/30 transition-colors"
                  onClick={() => requestDelete(item._id)}
                >
                  <Trash2Icon />
                </span>
              </div>
            </Table.Row>
          )}
        />
      </Table>

      {/* Confirm Delete Modal */}
      <AnniversaryModal
        isOpen={confirmOpen}
        onClose={closeConfirm}
        title="Confirm deletion"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-[#FFD700]/80">Are you sure you want to delete this reservation? This action cannot be undone.</p>
          <div className="flex justify-end gap-3">
            <button
              onClick={closeConfirm}
              className="px-4 py-2 rounded-md border border-[#FFD700]/30 text-[#FFD700]/90 hover:bg-[#FFD700]/10 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 rounded-md bg-rose-600 text-white hover:bg-rose-500 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </AnniversaryModal>
    </>
  );
}