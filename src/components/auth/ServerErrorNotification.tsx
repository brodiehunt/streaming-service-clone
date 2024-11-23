import styled from 'styled-components'
import { IoIosCloseCircle } from 'react-icons/io'

const ErrorNotification = styled.div`
  padding: 0.75rem 3rem 0.75rem 1.5rem;
  margin-bottom: 24px;
  border-radius: 4px;
  background-color: rgb(254 202 202);
  color: rgb(220 38 38);
  border: 1px solid rgb(220 38 38);
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

const ServerErrorNotification: React.FC<{
  children: React.ReactNode
  setServerError: React.Dispatch<React.SetStateAction<string>>
}> = ({ children, setServerError }) => {
  return (
    <ErrorNotification role="alert">
      {children}
      <button
        onClick={() => setServerError('')}
        aria-label="Close error element"
      >
        <IoIosCloseCircle className="close-circle" />
      </button>
    </ErrorNotification>
  )
}

export default ServerErrorNotification
