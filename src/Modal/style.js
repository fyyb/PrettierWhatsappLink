const style = `
  %MODAL% {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1000;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  %MODAL% .modal-box {
    border-radius: 5px;
    background-color: #fff;

    display: flex;
    flex-direction: column;
    min-width: 280px;
  }

  %MODAL% .modal-header {
    padding: 15px;
    border-bottom: 1px solid #000;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  %MODAL% .modal-header span {
    flex: 1;
    font-weight: bold;
    font-size: 18px;
    color: #000;
  }

  %MODAL% .modal-header button {
    background: none;
    outline: none;
    border: none;
    color: #000;
    opacity: .5;
    cursor: pointer;
    position: relative;
    right: 0;
    transition: color 2s;
  }

  %MODAL% .modal-header button:hover {
    opacity: 1
  }

  %MODAL% .modal-body {
    padding: 15px 15px 25px;
  }

  @media (min-width: 600px)
  {
    %MODAL% .modal-box {
      min-width: 500px;
    }
    %MODAL% .modal-header {
      padding: 20px;
    }
    %MODAL% .modal-body {
      padding: 20px 20px 30px;
    }
  }
`;
export default style;
