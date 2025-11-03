import React from "react";
import { Box, Alert, Button } from "@mui/material";
import { Refresh as RefreshIcon } from "@mui/icons-material";

type Props = {
  error: string;
  loadData: () => void;
};

export const PageError: React.FC<Props> = ({ error, loadData }) => {
  return (
    <Box sx={{ p: 3 }}>
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
      <Button onClick={loadData} startIcon={<RefreshIcon />}>
        Retry
      </Button>
    </Box>
  );
};
