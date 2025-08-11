import React from 'react';
import { Button, Box, Stack, Typography } from '@mui/material';
import { useNotification } from '../context/NotificationContext';

export const NotificationDemo: React.FC = () => {
  const { showNotification } = useNotification();

  const handleShowSuccess = () => {
    showNotification('This is a success message!', 'success');
  };

  const handleShowError = () => {
    showNotification('This is an error message!', 'error');
  };

  const handleShowWarning = () => {
    showNotification('This is a warning message!', 'warning');
  };

  const handleShowInfo = () => {
    showNotification('This is an info message!', 'info');
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Test Notifications
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
        <Button 
          variant="contained" 
          color="success" 
          size="small"
          onClick={handleShowSuccess}
        >
          Success
        </Button>
        <Button 
          variant="contained" 
          color="error" 
          size="small"
          onClick={handleShowError}
        >
          Error
        </Button>
        <Button 
          variant="contained" 
          color="warning" 
          size="small"
          onClick={handleShowWarning}
        >
          Warning
        </Button>
        <Button 
          variant="contained" 
          color="info" 
          size="small"
          onClick={handleShowInfo}
        >
          Info
        </Button>
      </Stack>
    </Box>
  );
};
