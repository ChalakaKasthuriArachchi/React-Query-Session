import React from 'react'
import styled, { css, keyframes } from 'styled-components'
import { ImSpinner2 } from 'react-icons/im'

export const Wrapper = styled.div`
  display: flex;
  height: 96vh;
`

export const SidebarStyles = styled.div`
  width: 175px;
  border-right: 1px solid black;
  padding: 1rem;
  font-size: 25px;
`

export const Main = styled.div`
  flex: 1;
  padding: 1rem;
`
export const StyledButton = styled.button`
  height: 45px;
  width: 125px;
  font-size: 20px;
  border-radius: 4px;
  cursor: pointer;
`

export const StyledP = styled.p`
  font-size: 20px;
`

export const StyledSpan = styled.span`
  font-weight: normal; 
  font-size: 20px;
`

export const PostStyles = styled.div`
  display: inline-block;
  border: solid 1px rgba(130, 130, 130, 0.3);
  padding: 1rem;
  color: inherit;

  :hover {
    text-decoration: none;
    h3 {
      text-decoration: underline;
    }
  }

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.5;
      pointer-events: none;
    `}
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

export function Loader(props) {
  return (
    <ImSpinner2
      {...props}
      css={`
        vertical-align: middle;
        animation: ${rotate} 1s linear infinite;
      `}
    />
  )
}
