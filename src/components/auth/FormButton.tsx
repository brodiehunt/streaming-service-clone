import styled from 'styled-components'

const FormButtonEl = styled.button`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 700;
  color: #000;
  background-color: #00beff;
  border-radius: 4px;
  height: 48px;
  padding: 0 24px;
  transition-property: color, background-color, border-color;
  transition-duration: 200ms;
  cursor: pointer;

  &:hover {
    background-color: rgb(0, 148, 201);
    color: #000;
  }

  &:focus {
  }
`

const FormButton: React.FC<{
  children: React.ReactNode
  disabled: boolean
}> = ({ children }) => {
  return <FormButtonEl>{children}</FormButtonEl>
}

export default FormButton
