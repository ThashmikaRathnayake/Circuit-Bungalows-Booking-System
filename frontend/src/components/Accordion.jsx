import React, { useState } from "react";

export function Accordion({ children, className = "" }) {
  return <div className={`w-full space-y-4 ${className}`}>{children}</div>;
}

export function AccordionItem({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-4 px-5 text-left text-lg font-semibold text-gray-700 hover:text-gray-400 transition-colors"
      >
        {title}
        <span className="text-xl">{isOpen ? "−" : "+"}</span>
      </button>
      <div
        className={`px-5 pb-5 text-gray-600 transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
