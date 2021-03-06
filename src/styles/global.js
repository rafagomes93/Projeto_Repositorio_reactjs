import {createGlobalStyle} from 'styled-components';

export default createGlobalStyle`
  *{
    padding: 0;
    margin: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html, body, #root{
    min-height: 100%;
  }

  body{
    background: #0d2636;
    font-size: 14px;
    -webkit-font-smoothing: antiliased !important;
  }

  body, input, button{
    color: 222;
    font-size: 14px;
    font-family: arial, sans-serif;
  }

  button{
    cursor: pointer;
  }
`;