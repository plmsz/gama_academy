import styled from 'styled-components/';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;

  .wrapper {
    display: grid;
    .card {
      background-color: #c2ccd5;
      border-radius: 22px;
      padding: 12px;
      margin: 22px 0;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        border-radius: 100%;
      }
      .content-information {
        display: grid;
        margin: 15px;
        p {
          color: #0f3042;
        }
      }
    }
  }
`;
