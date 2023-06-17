import React, { useState, useEffect, ReactNode } from "react";
import clsx from "clsx";
import styled from "styled-components";

import { publish } from "pubsub-js";

const Container = styled.div`
  /* height: calc(100vh - (var(--header-height) + var(--space-md) * 2)); */
`;

type Props = {
  children: ReactNode;
  isActive: boolean;
};
const Modal = ({ children, isActive }: Props) => {
  const [active, setActive] = useState<boolean>(isActive);

  useEffect(() => {
    publish("IS_MODAL", active);
  }, [active]);

  return (
    <Container
      className={clsx(
        "modal sticky-  bg-bg right-0 top-header-height- bottom-0- w-1/2- h-full- z-10 py-md-",
        isActive ? "" : "hidden"
      )}>
      <div className='sticky top-0'>
        <div className='inner'>{children}</div>
      </div>
    </Container>
  );
};

export default Modal;
