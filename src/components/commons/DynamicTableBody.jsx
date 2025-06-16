import { Edit, Trash2, Check, X, MoreVertical } from "lucide-react";

export const DynamicTableBody = ({ 
  data,
  columns,
  actions = [],
  onSelect = () => {},
}) => {
  // Default action icons mapping
  const actionIcons = {
    edit: <Edit className="w-5 h-5 text-gray-400" />,
    delete: <Trash2 className="w-5 h-5 text-red-500" />,
    approve: <Check className="w-5 h-5 text-green-500" />,
    reject: <X className="w-5 h-5 text-red-500" />,
    default: <MoreVertical className="w-5 h-5 text-gray-400" />
  };

  return (
    <tbody className="scroll-container">
      {data?.map((item) => (
        <tr className="border-b border-gray-700 cursor-pointer" key={item.id} onClick={() => onSelect(item.id)}>
          {columns.map((column) => (
            <td key={column.key} className="py-3 px-4">
              {column.render ? column.render(item) : item[column.key]}
            </td>
          ))}
          
          {actions.length > 0 && (
            <td className="py-3 px-4 flex space-x-2">
              {actions.map((action, index) => (
                <button
                  key={index}
                  className={`p-2 bg-gray-700 rounded ${
                    action.color ? `text-${action.color}-500` : 'text-gray-400'
                  }`}
                  onClick={() => action.handler(item)}
                  disabled={action.disabled?.(item) || false}
                  title={action.label}
                >
                  {actionIcons[action.icon] || actionIcons.default}
                </button>
              ))}
            </td>
          )}
        </tr>
      ))}
    </tbody>
  );
};