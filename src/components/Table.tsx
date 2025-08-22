import { createContext, useContext, ReactNode } from "react";

type TableContextType = {
  columns: string;
};

const TableContext = createContext<TableContextType | null>(null);

function Table({
  columns,
  children,
}: {
  columns: string;
  children: ReactNode;
}) {
  return (
    <TableContext.Provider value={{ columns }}>
      {/* 👇 wrapper handles horizontal scrolling */}
      <div className="w-full overflow-x-auto">
        <div
          role="table"
          className="border border-gray-200 bg-white rounded-lg text-sm min-w-max">
          {children}
        </div>
      </div>
    </TableContext.Provider>
  );
}

function Header({ children }: { children: ReactNode }) {
  const { columns } = useContext(TableContext)!;
  return (
    <header
      role="row"
      className="grid items-center gap-x-6 px-6 py-4 uppercase tracking-wide font-semibold text-gray-600 bg-gray-50 border-b border-gray-100"
      style={{ gridTemplateColumns: columns }}>
      {children}
    </header>
  );
}

function Row({ children }: { children: ReactNode }) {
  const { columns } = useContext(TableContext)!;
  return (
    <div
      role="row"
      className="grid items-center gap-x-6 px-6 py-3 text-gray-700 hover:bg-gray-50 transition"
      style={{ gridTemplateColumns: columns }}>
      {children}
    </div>
  );
}

function Body<T>({
  data,
  render,
}: {
  data: T[];
  render: (item: T, index: number) => ReactNode;
}) {
  if (!data?.length) {
    return (
      <p className="text-center text-base font-medium text-gray-500 my-6">
        There is no data to display at the moment
      </p>
    );
  }

  return (
    <section className="divide-y divide-gray-100">{data.map(render)}</section>
  );
}

function Footer({ children }: { children: ReactNode }) {
  if (!children) return null;
  return (
    <footer className="bg-gray-50 flex justify-center py-3">{children}</footer>
  );
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
