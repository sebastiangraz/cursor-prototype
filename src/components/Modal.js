/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx, Box, Flex, Text } from "theme-ui";
import {
  transparentize,
  darken,
  lighten,
  shade,
  complement,
  rotate,
} from "@theme-ui/color";
import React from "react";
import { framer, apple, instagram } from "../images/";

const center = {
  alignItems: "center",
  justifyContent: "center",
};

const ModalStyle = {
  bg: "#fff",
  height: "400px",
  width: "328px",
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
  gradient4: ["#FF8C00", "#FF3366", "#FF579A"],
  gradient5: ["#0099ff", "#22DDDD", "#00CC88", "#FFBB00"],
};

const brArray = [24, 16, 8, 0];

const teamArray = [
  { name: "none", img: "" },
  { name: "framer", img: framer },
  { name: "instagram", img: instagram },
  { name: "apple", img: apple },
];

const NumberContext = React.createContext();

function returnColorType(color) {
  const isArray = Array.isArray(color) && color;
  const isGradient = color.length > 5;
  const positionArray = ["0% 0%", "100% 0%", "0% 100%", "100% 100%"];
  const colorStopMap =
    isArray &&
    isArray.map((m, i) => {
      return `radial-gradient(circle at ${positionArray[i]},${m} 0%,transparent 80%)`;
    });

  return {
    isGradient: isGradient,
    color: isGradient ? color : `${colorStopMap}`,
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

const Team = ({ value }) => {
  return (
    <NumberContext.Consumer>
      {({ teamBadge: [teamBadge, setTeamBadge], bg: [bg, setBg] }) => {
        const isActive = value === teamBadge;
        return (
          <Flex
            onClick={() => setTeamBadge(value)}
            sx={{
              position: "relative",
              ...center,
              ...ButtonStyle,
            }}
          >
            <div>
              {value.name !== "none" ? (
                <div>
                  <div
                    sx={{
                      position: "relative",
                      width: "20px",
                      height: "20px",
                      mask: `url("${value.img}")0/100% 100%,
                          linear-gradient(#fff,#fff)`,
                      backgroundColor: "#fff",
                      maskSize: "55%, 100%",
                      WebkitMaskComposite: isActive
                        ? "destination-in"
                        : "destination-out",
                      maskPosition: "center",
                      maskRepeat: "no-repeat",
                      borderRadius: "pill",
                      zIndex: 1,
                    }}
                  ></div>
                  <div
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "19px",
                      height: "19px",
                      content: '""',
                      background: returnColorType(bg).color,
                      borderRadius: "pill",
                      zIndex: 0,
                    }}
                  />
                </div>
              ) : (
                <Text sx={{ opacity: 0.7 }}>None</Text>
              )}
            </div>
          </Flex>
        );
      }}
    </NumberContext.Consumer>
  );
};

const Cursor = ({ bg, br, team }) => {
  console.log();
  const heightArray = [46, 44, 42, 40];
  const ArrowDistanceArray = [-16, -18, -20, -22];
  const pxValue = [20, 18, 16, 12];
  return (
    <Flex
      bg="primary"
      sx={{
        ...CursorStyle,
        px: `${pxValue[brArray.indexOf(br)]}px`,
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
      {team.name !== "none" && (
        <div
          sx={{
            ml: 2,
            width: "20px",
            height: "20px",
            mask: `url("${team.img}")0/100% 100%,
            linear-gradient(#fff,#fff)`,
            backgroundColor: "#fff",
            maskSize: "55%, 100%",
            WebkitMaskComposite: "destination-out",
            maskPosition: "center",
            maskRepeat: "no-repeat",
            borderRadius: "pill",
          }}
        ></div>
      )}
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
  const [teamBadge, setTeamBadge] = React.useState(teamArray[0]);
  return (
    <NumberContext.Provider
      value={{
        bg: [bg, setBg],
        br: [br, setBr],
        teamBadge: [teamBadge, setTeamBadge],
      }}
    >
      <Box sx={{ ...ModalStyle }}>
        <Flex
          sx={{
            ...CursorWindowStyle,
          }}
        >
          <Text mt={2} sx={{ fontSize: 2, opacity: 0.3 }}>
            Customize your cursor
          </Text>
          <Cursor bg={bg} br={br} team={teamBadge}></Cursor>
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
          <Text mr={3} sx={{ fontSize: 2 }}>
            Border
          </Text>
          <Flex sx={{ maxWidth: "200px" }}>
            {brArray.map((br) => {
              return <Br key={br} value={br}></Br>;
            })}
          </Flex>
        </Flex>
        <Flex
          sx={{
            ...OptionRowStyle,
          }}
        >
          <Text mr={3} sx={{ fontSize: 2 }}>
            Team Badge
          </Text>
          <Flex sx={{ maxWidth: "200px" }}>
            {teamArray.map((team) => {
              return <Team key={team.name} value={team}></Team>;
            })}
          </Flex>
        </Flex>
      </Box>
    </NumberContext.Provider>
  );
};
