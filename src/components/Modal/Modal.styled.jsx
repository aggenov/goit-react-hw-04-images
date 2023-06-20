import styled from "@emotion/styled";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
`

export const ModalWinow = styled.div`
position: absolute;
top: 50%;
transform: translateY(-62%);
max-width: calc(100vw - 48px);
max-height: calc(100vh - 180px);
padding: auto;
`