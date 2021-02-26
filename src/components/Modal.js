/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx, Box, Flex, Text } from "theme-ui";
import React from "react";

const center = {
  alignItems: "center",
  justifyContent: "center",
};

const ModalStyle = {
  bg: "#fff",
  height: "320px",
  width: "300px",
  borderRadius: 3,
};

const CursorWindowStyle = {
  ...center,
  boxShadow: 0,
  flexDirection: "column",
  m: 2,
  borderRadius: 2,
  height: "50%",
  bg: "#eee",
};

const LabelStyle = {
  minWidth: 3,
  outline: "none",
  overflow: "hidden",
  whiteSpace: "pre",
};

const CursorStyle = {
  ...center,
  color: "white",
  minWidth: 7,
  maxWidth: 200,
  minHeight: 6,
  px: 5,
  fontSize: 4,
  mt: "auto",
  outline: "none",
  boxSizing: "content-box",
  borderRadius: "pill",
  position: "relative",
  "&:focus-within": {
    borderWidth: "2px",
    borderStyle: "solid",
    boxShadow: (t) => `0px 0px 0px 2px ${t.colors.bg} inset`,
  },
};

const ArrowStyle = {
  height: 4,
  width: 4,
  top: -3,
  left: -3,
  position: "absolute",
  transform: "rotate(-45deg)",
};

const ColorPickerStyle = {
  mt: "auto",
  mb: 2,
};

const Hover = {
  "&:hover": {
    opacity: 0.7,
    cursor: "pointer",
  },
};

const ButtonStyle = {
  fontSize: 2,
  bg: "bg",
  height: 5,
  width: 7,
  overflow: "hidden",
  borderRadius: 1,
  textTransform: "capitalize",
  mr: 1,
  ...Hover,
};

const OptionRowStyle = {
  mx: 3,
  mt: 3,
  alignItems: "center",
  justifyContent: "space-between",
};

const ColorSwatchStyle = {
  width: 3,
  height: 3,
  mx: "2px",
  borderRadius: "pill",
  background: "#fff",
  ...Hover,
};

const colorPalette = {
  ocean: "#0066FF",
  blue: "#0099ff",
  sky: "#00BBFF",
  teal: "#22DDDD",
  green: "#00CC88",
};

const NumberContext = React.createContext();

const ColorSwatch = ({ color }) => {
  return (
    <NumberContext.Consumer>
      {({ bg: [bg, setBg] }) => (
        <div
          onClick={() => setBg(color)}
          sx={{
            ...ColorSwatchStyle,
            bg: color,
          }}
        ></div>
      )}
    </NumberContext.Consumer>
  );
};

const Br = ({ value }) => {
  return (
    <NumberContext.Consumer>
      {({ br: [br, setBr], bg: [bg, setBg] }) => (
        <div
          onClick={() => setBr(value)}
          sx={{
            position: "relative",
            ...ButtonStyle,
          }}
        >
          <Flex
            sx={{
              position: "absolute",
              width: "100px",
              height: 7,
              top: 2,
              left: 3,
              bg: bg,
              transformOrigin: "0 0",
              transform: "scale(0.75)",
              borderRadius: value,
              maskImage: "linear-gradient(#000, rgba(0,0,0,0.5))",
              ...center,
            }}
          ></Flex>
        </div>
      )}
    </NumberContext.Consumer>
  );
};

const Cursor = ({ bg, br }) => {
  return (
    <Flex
      bg="primary"
      sx={{
        ...CursorStyle,
        background: bg,
        borderColor: bg,
        borderRadius: br,
      }}
    >
      <Arrow num={br} color={bg}></Arrow>
      <span
        contentEditable
        sx={{
          ...LabelStyle,
        }}
      >
        Sebastian
      </span>
    </Flex>
  );
};

const Arrow = ({ color, num }) => {
  function br(value) {
    return value + num / 2;
  }

  function Arrow() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${50 + num} ${50 + num}`}
      >
        <path
          d={`M ${br(25)} ${br(0)} L ${br(46.651)} ${br(37.5)} L ${br(
            3.349
          )} ${br(37.5)} Z`}
          fill={color}
          strokeWidth={num}
          stroke={color}
          strokeLinejoin="round"
        ></path>
      </svg>
    );
  }
  return <div sx={{ ...ArrowStyle }}>{Arrow()}</div>;
};

const brArray = [24, 16, 8, 0];

export const Modal = () => {
  const [bg, setBg] = React.useState(colorPalette.ocean);
  const [br, setBr] = React.useState(25);
  return (
    <NumberContext.Provider value={{ bg: [bg, setBg], br: [br, setBr] }}>
      <Box sx={{ ...ModalStyle }}>
        <Flex
          sx={{
            ...CursorWindowStyle,
          }}
        >
          <Text mt={2} sx={{ fontSize: 2, opacity: 0.3 }}>
            Customize your cursor
          </Text>
          <Cursor bg={bg} br={br}></Cursor>
          <Flex sx={{ ...ColorPickerStyle }}>
            {Object.values(colorPalette).map((color) => {
              return <ColorSwatch color={color}></ColorSwatch>;
            })}
          </Flex>
        </Flex>
        <Flex
          sx={{
            ...OptionRowStyle,
          }}
        >
          <Text mr={3}>Border</Text>
          <Flex>
            {brArray.map((br) => {
              return <Br value={br}></Br>;
            })}
          </Flex>
        </Flex>
      </Box>
    </NumberContext.Provider>
  );
};
