/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx, Box, Flex, Text } from "theme-ui";
import { transparentize, darken, lighten, shade } from "@theme-ui/color";
import React from "react";

const center = {
  alignItems: "center",
  justifyContent: "center",
};

const ModalStyle = {
  bg: "#fff",
  height: "400px",
  width: "320px",
  borderRadius: 3,
};

const CursorWindowStyle = {
  ...center,
  boxShadow: 0,
  flexDirection: "column",
  m: 2,
  borderRadius: 2,
  height: "200px",
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
  textAlign: "center",
  maxWidth: 200,
  minHeight: 6,
  px: 4,
  fontSize: 4,
  mt: "auto",
  outline: "none",
  boxSizing: "content-box",
  borderRadius: "pill",
  position: "relative",
  transition: "background 0.2s ease",
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
  transition: "background 0.2s ease",
};

const ColorPickerStyle = {
  mt: "auto",
  mb: 2,
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
};

const colorPalette = {
  ocean: "#0066FF",
  blue: "#0099ff",
  sky: "#00BBFF",
  teal: "#22DDDD",
  green: "#00CC88",
  yellow: "#FFBB00",
  orange: "#FF8C00",
  red: "#FF3366",
  pink: "#FF579A",
  purple: "#8957FF",
  gradient1: ["#FF579A", "#8957FF"],
  gradient2: ["#00BBFF", "#0066FF"],
  gradient3: ["#00CC88", "#FFBB00"],
  gradient4: ["#0066FF", "#0099ff", "#22DDDD"],
};

const brArray = [24, 16, 8, 0];

const NumberContext = React.createContext();

function returnColorType(color) {
  const isArray = Array.isArray(color) && color;
  const isGradient = color.length > 3;
  const colorStopMap =
    isArray &&
    isArray.map((m) => {
      return `${m}`;
    });
  return {
    isGradient: isGradient,
    color: isGradient ? color : `linear-gradient(120deg, ${colorStopMap})`,
  };
}

const ColorSwatch = ({ color }) => {
  return (
    <NumberContext.Consumer>
      {({ bg: [bg, setBg] }) => {
        const isActive = color === bg;
        return (
          <div
            onClick={() => setBg(color)}
            sx={{
              ...(isActive && {
                borderWidth: "2px",
                borderStyle: "solid",
                borderColor: returnColorType(color).isGradient
                  ? color
                  : color[0],
                boxShadow: (t) => `0px 0px 0px 2px ${t.colors.bg} inset`,
              }),
              ...ColorSwatchStyle,
              background: returnColorType(color).color,
            }}
          ></div>
        );
      }}
    </NumberContext.Consumer>
  );
};

const Br = ({ value }) => {
  return (
    <NumberContext.Consumer>
      {({ br: [br, setBr], bg: [bg, setBg] }) => {
        const isActive = value === br;
        return (
          <div
            onClick={() => setBr(value)}
            sx={{
              position: "relative",
              ...ButtonStyle,
            }}
          >
            <Flex
              sx={{
                ...(isActive && {
                  borderWidth: "3px",
                  borderStyle: "solid",
                  borderColor: returnColorType(bg).isGradient ? bg : bg[0],
                  boxShadow: (t) => `0px 0px 0px 3px ${t.colors.bg} inset`,
                }),
                position: "absolute",
                width: "100px",
                height: 7,
                top: 2,
                left: 3,
                background: isActive
                  ? returnColorType(bg).color
                  : returnColorType(bg).color,
                transformOrigin: "0 0",
                transform: "scale(0.75)",
                borderRadius: value,
                maskImage: "linear-gradient(140deg ,#000, rgba(0,0,0,0.5))",
                ...center,
              }}
            ></Flex>
          </div>
        );
      }}
    </NumberContext.Consumer>
  );
};

const Cursor = ({ bg, br }) => {
  const heightArray = [46, 44, 42, 40];
  const ArrowDistanceArray = [-16, -18, -20, -22];
  return (
    <Flex
      bg="primary"
      sx={{
        ...CursorStyle,
        height: `${heightArray[brArray.indexOf(br)]}px`,
        background: returnColorType(bg).color,
        borderColor: bg,
        borderRadius: br,
      }}
    >
      <Arrow
        sx={{
          top: `${ArrowDistanceArray[brArray.indexOf(br)]}px`,
          left: `${ArrowDistanceArray[brArray.indexOf(br)]}px`,
        }}
        num={br}
        color={bg}
      ></Arrow>
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

const Arrow = ({ color, num, ...rest }) => {
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
          fill={returnColorType(color).isGradient ? color : color[0]}
          strokeWidth={num}
          stroke={returnColorType(color).isGradient ? color : color[0]}
          strokeLinejoin="round"
        ></path>
      </svg>
    );
  }
  return (
    <div {...rest} sx={{ ...ArrowStyle }}>
      {Arrow()}
    </div>
  );
};

export const Modal = () => {
  const [bg, setBg] = React.useState(colorPalette.ocean);
  const [br, setBr] = React.useState(brArray[0]);
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
              return <ColorSwatch key={color} color={color}></ColorSwatch>;
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
              return <Br key={br} value={br}></Br>;
            })}
          </Flex>
        </Flex>
      </Box>
    </NumberContext.Provider>
  );
};
