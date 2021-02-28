/** @jsxRuntime classic */
/** @jsx jsx */

import { jsx, Flex } from "theme-ui";
import { center } from "./globalCSS";
import { returnColorType } from "./utils";

const brArray = [24, 16, 8, 0];

const ArrowStyle = {
  height: 4,
  width: 4,
  top: -3,
  left: -3,
  position: "absolute",
  transform: "rotate(-45deg)",
  transition: "background 0.2s ease",
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

export const Cursor = ({ bg, br, team, pointer }) => {
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
      {pointer.img === "none" ? (
        <Arrow
          sx={{
            top: `${ArrowDistanceArray[brArray.indexOf(br)]}px`,
            left: `${ArrowDistanceArray[brArray.indexOf(br)]}px`,
          }}
          num={br}
          color={bg}
        ></Arrow>
      ) : (
        <div
          sx={{
            mask: `url("${pointer.img}")0/100% 100%`,
            background: returnColorType(bg).isGradient ? bg : bg[0],
            height: 4,
            width: 4,
            top: `${ArrowDistanceArray[brArray.indexOf(br)]}px`,
            left: `${ArrowDistanceArray[brArray.indexOf(br)]}px`,
            position: "absolute",
          }}
        ></div>
      )}

      <span
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
