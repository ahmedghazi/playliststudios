import React, { useState, useEffect, ReactNode } from "react";
import clsx from "clsx";
import styled from "styled-components";
import { publish } from "pubsub-js";

interface ContainerProps {
  $isActive: boolean;
}

const Container = styled.div<ContainerProps>`
  transition: transform 0.2s var(--cubic);
  transform: ${(p) => (p.$isActive ? "translateY(0)" : "translateY(100%)")};
  opacity: ${(p) => (p.$isActive ? "0.9" : "0")};
  @media screen and (max-width: 1080px) {
    /* opacity: ${(p) => (p.$isActive ? "1" : "0")}; */
  }
`;

type ModalProps = {
  children: ReactNode;
  isActive: boolean;
};
const Modal = ({ children, isActive }: ModalProps) => {
  const [active, setActive] = useState<boolean>(isActive);

  // useEffect(() => {
  //   // publish("IS_MODAL", active);
  // }, [active]);

  return (
    <Container
      $isActive={isActive}
      className={clsx("modal z-10 md:pl-lg", isActive ? "is-active" : "")}>
      <div className='sticky top-0'>
        <div className='inner'>{children}</div>
      </div>
    </Container>
  );
};

export default Modal;
