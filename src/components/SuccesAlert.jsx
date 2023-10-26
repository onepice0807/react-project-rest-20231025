import * as React from 'react';
import Alert from '@mui/material/Alert';
import { AlertTitle } from '@mui/material';

const SuccessAlert = ({ title, msg }) => {
  return (
    <Alert severity='success'>
      <AlertTitle>{title}</AlertTitle>
      {msg}
    </Alert>
  );
};

export default SuccessAlert;
