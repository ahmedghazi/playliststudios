"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import clsx from "clsx";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999999;

  opacity: 0;

  pointer-events: none;
  will-change: transform;
  /* mix-blend-mode: difference; */
  transition: transform 150ms ease-out;
  .dot {
    width: 2rem;
    height: 2rem;
    border-radius: 100%;
    border: var(--border);
    border-color: white;
    background: ${(props) => props.color};

    transition: background-color 150ms ease, transform 150ms ease-out;
  }
  svg {
    opacity: 0;
  }
  &.is-anchor-or-button {
    .dot {
      transform: scale(1.5);
    }
  }
  &.is-mousedown {
  }
  &.is-input {
    visibility: hidden;
  }

  display: none;
  @media (hover: hover) {
    display: block;
  }
  @media not all and (hover: none) {
  }
`;

//https://codepen.io/Starglider/pen/LYEELVy?editors=0010
type Props = {
  color: string;
  size: number;
};
const Cursor = ({ color, size }: Props) => {
  // const inertia = 0.3;
  const [css, setCss] = useState({ x: 0, y: 0, opacity: 0, rotate: 0 });
  const [isAnchorOrButton, setIsAnchorOrButton] = useState<boolean>(false);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [isInput, setIsInput] = useState<boolean>(false);

  useEffect(() => {
    document.body.classList.add("has-custom-cursor");
    // console.log(document.body);
    // return () => document.body.classList.remove('has-custom-cursor');
  }, []);

  useEffect(() => {
    const _onMouseMove = (e: MouseEvent) => {
      const __isAnchorOrButton = _getIsAnchorOrButton(e.target);
      setIsAnchorOrButton(__isAnchorOrButton);

      const __isInput = _getIsInput(e.target);
      setIsInput(__isInput);

      let offset = size / 2;

      setCss((css) => ({
        ...css,
        x: e.clientX - offset,
        y: e.clientY - offset,
        opacity: 1,
      }));
    };

    document.addEventListener("mousemove", _onMouseMove);
    document.addEventListener("mousedown", _onMouseDown);
    document.addEventListener("mouseup", _onMouseUp);

    return () => {
      document.removeEventListener("mousemove", _onMouseMove);
      document.removeEventListener("mousedown", _onMouseDown);
      document.removeEventListener("mouseup", _onMouseUp);
    };
  }, [size]);

  // const _update = e => {}

  const _onMouseDown = () => setIsMouseDown(true);
  const _onMouseUp = () => setIsMouseDown(false);

  const _getIsAnchorOrButton = (target: any) => {
    // console.log(target.classList.contains("button"));
    // console.log(target.role)
    // alert("here")
    return (
      target.tagName.toLowerCase() === "a" ||
      target.tagName.toLowerCase() === "button" ||
      target.classList.contains("button") ||
      target.classList.contains("btn") ||
      target.classList.contains("pointer") ||
      target.classList.contains("cursor-pointer") ||
      target.role === "button"
    );
  };
  const _getIsInput = (target: any) => target.role === "textbox";
  // console.log(css)
  return (
    <Wrapper
      color={color}
      // size={size}
      className={clsx(
        "cursor",
        isAnchorOrButton ? "is-anchor-or-button" : "",
        isMouseDown ? "is-mousedown" : "",
        isInput ? "is-input" : ""
      )}
      style={{
        transform: `translate(${css.x}px, ${css.y}px)`,
        opacity: css.opacity,
      }}>
      <div className='dot'></div>
    </Wrapper>
  );
};

export default Cursor;
