const style = `
  %MODAL% {
    box-sizing: border-box;
  }

  %MODAL% .modal-body form {
    display: flex;
    flex-direction: column;
    color: #000;
  }

  %MODAL% .modal-body form label {
    margin-bottom: 5px;
  }

  %MODAL% .modal-body form input[type="text"],
  %MODAL% .modal-body form input[type="email"],
  %MODAL% .modal-body form select {
    padding: 10px;
    outline: none;
    border: 1px solid #ccc;
    border-radius: 2px;
    margin-bottom: 15px;
  }

  %MODAL% .modal-body form select option:first-child {
    display: none;
  }

  %MODAL% .modal-body form select option {
    font-size: 14px;
  }

  %MODAL% .modal-body form input[type="submit"] {
    padding: 16px;
    border-radius: 2px;
    background-color: #01e675;
    color: #fff;
    cursor:pointer;
    border: none;
    margin-top: 10px;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 1px;
  }

  %MODAL% .modal-body form input[type="submit"]:hover {
    background-color: #01e600;
  }
`;

export default style;
