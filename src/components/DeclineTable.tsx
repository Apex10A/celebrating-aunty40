import { Trash2Icon } from "lucide-react";
import Table from "./Table";
import Tag from "./Tag";

export default function DeclineTable({
  data,
}: {
  data: Record<string, any>[];
}) {
  return (
    <Table columns="0.3fr 1fr 1fr 2.2fr 0.5fr">
      <Table.Header>
        <div>S/N</div>
        <div>Detail</div>
        <div>Tag</div>
        <div>Message</div>
        <div></div>
      </Table.Header>
      <Table.Body
        data={data}
        render={(item, index) => (
          <Table.Row key={item?._id}>
            <div>{index + 1}</div>
            <div className="flex flex-col gap-1">
              <span>{item.name}</span>
              <span>{item.email}</span>
            </div>
            <div>
              <Tag type="red">Not-attending</Tag>
            </div>
            <div>{item.message ? item.message : <em>No Message</em>}</div>
            <div className="flex flex-row items-center gap-2 md:gap-6 justify-end">
              <span className="p-1 md:p-2 rounded-full text-rose-400 hover:bg-rose-900/30 transition-colors">
                <Trash2Icon className="w-4 h-4 md:w-5 md:h-5" />
              </span>
            </div>
          </Table.Row>
        )}
      />
    </Table>
  );
}
