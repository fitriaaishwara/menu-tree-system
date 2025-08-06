import { useState } from "react";
import '../../../css/app.css'

const TreeNode = ({ node }) => {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = node.children_recursive && node.children_recursive.length > 0;

  return (
    <div className="ml-4">
      <div
        className="flex items-center cursor-pointer py-1"
        onClick={() => setExpanded(!expanded)}
      >
        {hasChildren && (
          <span className="mr-1 text-sm select-none">
            {expanded ? "▼" : "▶"}
          </span>
        )}
        <span>{node.name}</span>
      </div>

      {hasChildren && expanded && (
        <div className="ml-4 border-l border-gray-300 pl-2">
          {node.children_recursive.map((child, index) => (
            <TreeNode key={index} node={child} />
          ))}
        </div>
      )}
    </div>
  );
};

const TreeMenu = ({ menus }) => {
  return (
    <div className="text-sm font-medium text-gray-800">
      {menus.map((menu, index) => (
        <TreeNode key={index} node={menu} />
      ))}
    </div>
  );
};

export default TreeMenu;
