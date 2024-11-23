import styled from 'styled-components'
import { UseFormRegister, FieldValues, Path } from 'react-hook-form'

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1rem;
`

const InputLabel = styled.label`
  font-size: 16px;
  color: rgba(0, 0, 0, 0.8);
`

const InputField = styled.input<{ $errorStyle?: boolean }>`
  padding: 10px 8px;
  border-radius: 4px;
  border: 1px solid rgb(218, 218, 218);
  transition-property: border-color;
  transition-duration: 200ms;
  border-color: ${props =>
    props.$errorStyle ? 'rgb(220 38 38)' : 'rgb(218, 218, 218)'};

  &:focus {
    outline: none;
    border-color: ${props =>
      props.$errorStyle ? 'rgb(220 38 38)' : '#00beff'};
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
    /* -webkit-text-fill-color: white !important; */
  }
`

const InputError = styled.div`
  color: rgb(220 38 38);
  font-size: 12px;
  font-weight: 500;
`

interface FormInputProps<T extends FieldValues> {
  register: UseFormRegister<T>
  type: string
  name: Path<T>
  label: string
  error?: string | undefined
}

const FormInput = <T extends FieldValues>({
  type,
  name,
  label,
  register,
  error,
}: FormInputProps<T>) => {
  const errorId = `${name}-error`

  return (
    <InputWrapper>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <InputField
        {...register(name)}
        type={type}
        id={name}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? errorId : undefined}
        $errorStyle={error ? true : false}
      ></InputField>
      {error && (
        <InputError id={errorId} role="alert">
          {error}
        </InputError>
      )}
    </InputWrapper>
  )
}

export default FormInput
