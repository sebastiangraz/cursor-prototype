import { Flex } from "theme-ui";

const BaseStyle = {
  bg: "#eee",
  height: "100vh",
  width: "100vw",
  alignItems: "center",
  justifyContent: "center",
};

export const Base = ({ children }) => {
  return <Flex sx={{ ...BaseStyle }}>{children}</Flex>;
};
