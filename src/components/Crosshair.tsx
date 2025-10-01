import React from 'react';
import styled from 'styled-components';

export function Crosshair() {
  return (
    <Root>
      <Mark>
        <H />
        <V />
      </Mark>
    </Root>
  );
}

const Root = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
`;

const Mark = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  display: grid;
  place-items: center;
  opacity: 0.85;
`;

const H = styled.span`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 14px;
  height: 2px;
  background: rgba(255, 255, 255, 0.75);
  transform: translate(-50%, -50%);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.35);
`;

const V = styled.span`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 2px;
  height: 14px;
  background: rgba(255, 255, 255, 0.75);
  transform: translate(-50%, -50%);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.35);
`;


