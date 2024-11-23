import * as React from 'react'

interface EmailTemplateProps {
  givenName: string
  url: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  givenName,
  url,
}) => (
  <div>
    <h1>Welcome, {givenName}!</h1>
    <a href={url}>Reset your password here</a>
  </div>
)
