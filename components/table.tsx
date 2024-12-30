import React from "react";

// Table component
const Table = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='overflow-x-auto'>
      <table className='table-auto border-collapse border border-gray-300 w-full'>
        {children}
      </table>
    </div>
  );
};

// TableRow component
const TableRow = ({ children }: { children: React.ReactNode }) => (
  <tr className='border border-gray-300'>{children}</tr>
);

// TableCell component
const TableCell = ({
  children,
  isHeader = false,
}: {
  children: React.ReactNode;
  isHeader?: boolean;
}) => {
  const Tag = isHeader ? "th" : "td";
  return (
    <Tag
      className={`p-2 border border-gray-300 ${
        isHeader ? "font-bold bg-gray-100" : ""
      }`}>
      {children}
    </Tag>
  );
};

export { Table, TableRow, TableCell };
