import React from "react";

export const AttachCursor = ({ children }) => {
  const [position, setPosition] = React.useState({ x: -300, y: -300 });
  React.useEffect(() => {
    addEventListeners();
    return () => removeEventListeners();
  });

  const addEventListeners = () => {
    document.addEventListener("mousemove", onMouseMove);
  };

  const removeEventListeners = () => {
    document.removeEventListener("mousemove", onMouseMove);
  };

  const onMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      style={{
        zIndex: 999,
        pointerEvents: "none",
        position: "absolute",
        left: "18px",
        top: "18px",
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      className="cursor"
    >
      {children}
    </div>
  );
};
