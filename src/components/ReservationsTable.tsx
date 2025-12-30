import { useState, useEffect } from "react";
import { Check, Trash2Icon, Bell, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import Table from "./Table";
import Tag from "./Tag";
import { acceptReservation, deleteReservation, sendReminder, sendThankYouToUser } from "@/services/reservations";
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
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Reset to page 1 when data length changes (e.g. filtering)
  useEffect(() => {
    setCurrentPage(1);
  }, [data.length]);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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

  async function handleSendReminder(id: string) {
    try {
      const res = await sendReminder(id);
      if (res?.status === 200) {
        notify("Reminder sent successfully!", "success");
      } else {
        notify("Failed to send reminder.", "error");
      }
    } catch (error: any) {
      console.error("Error sending reminder:", error);
      notify(error.response?.data?.message || "Failed to send reminder.", "error");
    }
  }

  async function handleSendThankYou(id: string) {
    try {
      const res = await sendThankYouToUser(id);
      if (res?.status === 200) {
        notify("Thank you email sent successfully!", "success");
      } else {
        notify("Failed to send thank you email.", "error");
      }
    } catch (error: any) {
      console.error("Error sending thank you email:", error);
      notify(error.response?.data?.message || "Failed to send thank you email.", "error");
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
      <Table columns="1.5fr 2.5fr 1fr 0.8fr 1.2fr">
        <Table.Header>
          <div>Invitation Code</div>
          <div>Name</div>
          <div>Status</div>
          <div>Number of guests</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={currentData}
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
              <div className="flex flex-row items-center gap-2 md:gap-6 justify-end">
                {item?.status === "pending" && (
                  <span
                    className="p-1 md:p-2 cursor-pointer rounded-full text-emerald-400 hover:bg-emerald-900/30 transition-colors"
                    onClick={() => accept(item._id)}
                  >
                    <Check className="w-4 h-4 md:w-5 md:h-5" />
                  </span>
                )}
                <span
                  className="p-1 md:p-2 cursor-pointer rounded-full text-blue-400 hover:bg-blue-900/30 transition-colors"
                  onClick={() => handleSendReminder(item._id)}
                  title="Resend Reminder"
                >
                  <Bell className="w-4 h-4 md:w-5 md:h-5" />
                </span>
                {item?.status === "accepted" && (
                  <span
                    className="p-1 md:p-2 cursor-pointer rounded-full text-pink-400 hover:bg-pink-900/30 transition-colors"
                    onClick={() => handleSendThankYou(item._id)}
                    title="Send Thank You Email"
                  >
                    <Heart className="w-4 h-4 md:w-5 md:h-5" />
                  </span>
                )}
                <span
                  className="p-1 md:p-2 cursor-pointer rounded-full text-rose-400 hover:bg-rose-900/30 transition-colors"
                  onClick={() => requestDelete(item._id)}
                >
                  <Trash2Icon className="w-4 h-4 md:w-5 md:h-5" />
                </span>
              </div>
            </Table.Row>
          )}
        />
        {totalPages > 1 && (
          <Table.Footer>
            <div className="flex items-center gap-4">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-1 rounded hover:bg-[#FFD700]/10 disabled:opacity-50 disabled:cursor-not-allowed text-[#FFD700]"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm text-[#FFD700]/80">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-1 rounded hover:bg-[#FFD700]/10 disabled:opacity-50 disabled:cursor-not-allowed text-[#FFD700]"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </Table.Footer>
        )}
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