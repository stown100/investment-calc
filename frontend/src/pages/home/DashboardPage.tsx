import React, { useState } from "react";
import { Box } from "@mui/material";
import { Calculator } from "../../features/calculator/ui/Calculator";
import { InvestmentSummary } from "../../features/investment-summary/ui/InvestmentSummary";
import { AddProjectModal } from "../../features/add-project/ui/AddProjectModal";
import { AddCryptoProjectModal } from "../../features/add-project/ui/AddCryptoProjectModal";

// Dashboard page of the application
export const DashboardPage = () => {
  const [regularModalOpened, setRegularModalOpened] = useState(false);
  const [cryptoModalOpened, setCryptoModalOpened] = useState(false);

  return (
    <Box sx={{ width: "100vw", py: 2 }}>
      <Box sx={{ maxWidth: "1392px", width: "100%", mx: "auto", px: 2 }}>
        <InvestmentSummary />

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: { xs: "column", lg: "row" },
          }}
        >
          <Box sx={{ flex: { lg: 1 } }}>
            <Calculator />
          </Box>
        </Box>

        <AddProjectModal
          opened={regularModalOpened}
          onClose={() => setRegularModalOpened(false)}
        />
        <AddCryptoProjectModal
          opened={cryptoModalOpened}
          onClose={() => setCryptoModalOpened(false)}
        />
      </Box>
    </Box>
  );
};
