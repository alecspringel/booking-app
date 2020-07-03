import React, { Component } from "react";
import styled from "styled-components";

const Modal = (props) => {
  return (
    <Background>
      <Content {...props}>{props.content}</Content>
    </Background>
  );
};

export default Modal;

const Background = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`;

const Content = styled.div`
  position: relative;
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  border-radius: ${(props) => props.theme.border};
  box-shadow: 3px 3px 9px #48484830;
  width: ${(props) => props.width || "500px"};
`;
