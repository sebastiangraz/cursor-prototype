/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx, Box, Flex, Text } from "theme-ui";
import React from "react";
import { framer, apple, instagram, arrow, dot, star } from "../images/";
import { Cursor } from "../components";
import { center } from "./globalCSS";
import { returnColorType } from "./utils";

const ModalStyle = {
  bg: "#fff",
  width: "356px",
  borderRadius: 3,
  pb: 3,
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

const ButtonBadgeStyle = (img, active) => {
  return {
    position: "relative",
    width: "20px",
    height: "20px",
    mask: `url("${img}")0/100% 100%,
      linear-gradient(#fff,#fff)`,
    backgroundColor: "#fff",
    maskSize: "55%, 100%",
    WebkitMaskComposite: active ? "destination-in" : "destination-out",
    maskPosition: "center",
    maskRepeat: "no-repeat",
    borderRadius: "pill",
    zIndex: 1,
  };
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
  clem: ["#FFB59E", "#7E008F", "#FFFAE0"],
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

const pointerArray = [
  { img: "none" },
  { img: star },
  { img: arrow },
  { img: dot },
];

const NumberContext = React.createContext();

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
                      ...ButtonBadgeStyle(value.img, isActive),
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

const Pointer = ({ value }) => {
  return (
    <NumberContext.Consumer>
      {({ pointer: [pointer, setPointer], bg: [bg, setBg] }) => {
        const isActive = value === pointer;
        return (
          <Flex
            onClick={() => setPointer(value)}
            sx={{
              position: "relative",
              ...center,
              ...ButtonStyle,
            }}
          >
            <div>
              {value.img !== "none" ? (
                <div>
                  <div
                    sx={{
                      ...ButtonBadgeStyle(value.img, isActive),
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
                <Text sx={{ opacity: 0.7 }}>Arrow</Text>
              )}
            </div>
          </Flex>
        );
      }}
    </NumberContext.Consumer>
  );
};

const OptionRow = ({ array, label, children }) => {
  return (
    <Flex
      sx={{
        ...OptionRowStyle,
      }}
    >
      <Text mr={3} sx={{ fontSize: 2 }}>
        {label}
      </Text>
      <Flex sx={{ maxWidth: "200px" }}>{children}</Flex>
    </Flex>
  );
};

export const Modal = () => {
  const [bg, setBg] = React.useState(colorPalette.ocean);
  const [br, setBr] = React.useState(brArray[0]);
  const [teamBadge, setTeamBadge] = React.useState(teamArray[0]);
  const [pointer, setPointer] = React.useState(pointerArray[0]);

  return (
    <NumberContext.Provider
      value={{
        bg: [bg, setBg],
        br: [br, setBr],
        teamBadge: [teamBadge, setTeamBadge],
        pointer: [pointer, setPointer],
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
          <Cursor bg={bg} br={br} team={teamBadge} pointer={pointer}></Cursor>
          <Flex sx={{ ...ColorPickerStyle }}>
            {Object.values(colorPalette).map((color) => {
              return <ColorSwatch key={color} color={color}></ColorSwatch>;
            })}
          </Flex>
        </Flex>
        <OptionRow label="Team Badge">
          {brArray.map((br) => {
            return <Br key={br} value={br}></Br>;
          })}
        </OptionRow>
        <OptionRow label="Team Badge">
          {teamArray.map((team) => {
            return <Team key={team.name} value={team}></Team>;
          })}
        </OptionRow>
        <OptionRow label="Pointer">
          {pointerArray.map((pointer) => {
            return <Pointer key={pointer.img} value={pointer}></Pointer>;
          })}
        </OptionRow>
      </Box>
    </NumberContext.Provider>
  );
};
