export const DynamicTableHead = ({ headers }) => {
  return (
    <thead className="bg-gray-700 text-gray-400">
      <tr>
        {headers.map((header, index) => (
          <th key={index} className="py-3 px-4 text-left">
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};