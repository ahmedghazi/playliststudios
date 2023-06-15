import React, { useState, useEffect, ReactNode } from "react";
import clsx from "clsx";
import styled from "styled-components";

import { publish } from "pubsub-js";

const Container = styled.div`
  height: calc(100vh - (var(--header-height) + var(--space-md) * 2));
  /* overflow-y: auto; */
  // display: flex;
  // justify-content: center;
  // align-items: center;
  /* figure {
    height: 100vh;
  }
  .gatsby-image-wrapper,
  img {
    width: 100%;
    height: 100%;
  }
  .loader {
    animation: blink-animation 1s steps(5, start) infinite;
  } */
`;

type Props = {
  children: ReactNode;
};
const Modal = ({ children }: Props) => {
  const [active, setActive] = useState<boolean>(true);

  useEffect(() => {
    publish("IS_MODAL", active);
  }, [active]);

  return (
    <Container
      className={clsx(
        "modal absolute  bg-bg right-0 top-0 bottom-0 w-1/2 h-full z-10 ",
        active ? "" : "hidden"
      )}>
      <div className=''>
        <div className='inner'>{children}</div>
      </div>
    </Container>
  );
};

export default Modal;
