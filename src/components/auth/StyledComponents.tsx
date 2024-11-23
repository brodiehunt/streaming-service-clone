import styled from 'styled-components'

export const FormWrapper = styled.div`
  padding: 1.5rem;
  box-shadow:
    0 10px 15px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0 / 0.1);
  margin: 0 auto;
  max-width: 600px;
  position: relative;
  z-index: 2;
  background-color: #fff;
  border-radius: 4px;

  form {
    margin-bottom: 10px;
  }

  .password-specification {
    margin-bottom: 20px;
  }

  .home-link-button {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: 700;
    color: rgb(101, 101, 101);
    background-color: white;
    border: 2px solid rgb(218, 218, 218);
    border-radius: 4px;
    height: 48px;
    padding: 0 24px;
    transition-property: color, background-color, border-color;
    transition-duration: 200ms;
    cursor: pointer;

    &:hover {
      background-color: rgb(246, 246, 246);
      color: #000;
      border-color: rgb(164, 164, 164);
    }
  }
  .under-form-navigation {
    text-align: center;
    padding: 24px 0px;

    a {
      color: #00beff;
      font-weight: 700;
      &:hover,
      &:focus {
        color: rgb(0, 148, 201);
      }
    }
  }

  @media (min-width: 768px) {
    .two-col {
      display: flex;
      gap: 24px;
    }
  }
`
