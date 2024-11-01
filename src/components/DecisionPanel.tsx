import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface DecisionDimension {
  dimension: string;
  pros: string[];
  cons: string[];
}

interface DecisionPanelProps {
  problem: string;
  dimensions: DecisionDimension[];
}

export function DecisionPanel({ problem, dimensions }: DecisionPanelProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`relative transition-all duration-300 ease-in-out border-r border-black ${isCollapsed ? 'w-12' : 'w-80'}`}>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-4 bg-white border border-black rounded-full p-1 z-10 hover:bg-gray-100"
      >
        {isCollapsed ? <FaChevronRight size={12} /> : <FaChevronLeft size={12} />}
      </button>

      <div className={`bg-white h-full overflow-y-auto p-4 ${isCollapsed ? 'hidden' : 'block'}`}>
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2">Problem Statement</h2>
          <p className="text-sm text-gray-600">{problem || 'No problem defined yet'}</p>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-2">Decision Dimensions</h2>
          {dimensions.length === 0 ? (
            <p className="text-sm text-gray-500 italic">No dimensions defined yet</p>
          ) : (
            dimensions.map((dim, index) => (
              <div key={index} className="mb-4 border rounded-lg p-3">
                <h3 className="font-semibold text-sm mb-2">{dim.dimension}</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <h4 className="text-xs font-medium text-green-600 mb-1">Pros</h4>
                    <ul className="text-xs list-disc list-inside">
                      {dim.pros.map((pro, i) => (
                        <li key={i}>{pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-red-600 mb-1">Cons</h4>
                    <ul className="text-xs list-disc list-inside">
                      {dim.cons.map((con, i) => (
                        <li key={i}>{con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}