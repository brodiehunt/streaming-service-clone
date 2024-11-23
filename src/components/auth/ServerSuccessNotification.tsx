import styled from 'styled-components'
import { IoIosCloseCircle } from 'react-icons/io'

const ErrorNotification = styled.div`
  padding: 0.75rem 3rem 0.75rem 1.5rem;
  margin-bottom: 24px;
  border-radius: 4px;
  background-color: rgb(187 247 208);
  color: rgb(22 163 74);
  border: 1px solid rgb(22 163 74);
  position: relative;

  button {
    background: none;
    border: none;
    height: fit-content;
    width: fit-content;
    position: absolute;
    top: 0.75rem;
    right: 1.5rem;
  }

  .close-circle {
    width: 1.5rem;
    height: 1.5rem;
  }
`

const ServerSuccessNotification: React.FC<{
  children: React.ReactNode
  setServerSuccess: React.Dispatch<React.SetStateAction<string>>
}> = ({ children, setServerSuccess }) => {
  return (
    <ErrorNotification role="alert">
      {children}
      <button
        onClick={() => setServerSuccess('')}
        aria-label="Close success notification"
      >
        <IoIosCloseCircle className="close-circle" />
      </button>
    </ErrorNotification>
  )
}

export default ServerSuccessNotification
