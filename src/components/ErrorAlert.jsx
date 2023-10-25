import * as React from 'react';
import Alert from '@mui/material/Alert';
import { AlertTitle } from '@mui/material';

const ErrorAlert = ({ title, msg }) => {
  return (
    <Alert severity='error'>
      <AlertTitle>{title}</AlertTitle>
      {msg}
    </Alert>
  );
};

export default ErrorAlert;
