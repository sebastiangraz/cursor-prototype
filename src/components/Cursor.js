import { Flex } from "theme-ui";

const CursorStyle = {
  bg: "#eee",
  height: "100vh",
  width: "100vw",
  alignItems: "center",
  justifyContent: "center",
};

export const Cursor = ({ children }) => {
  return <Flex sx={{ ...CursorStyle }}>{children}</Flex>;
};
