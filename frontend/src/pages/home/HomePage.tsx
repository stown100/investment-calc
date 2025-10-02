import React, { useState } from "react";
import { Typography, Box } from "@mui/material";
import { ProjectList } from "../../entities/project/ui/ProjectList";
import { ProjectSorting } from "../../entities/project/ui/ProjectSorting";
import { ProjectStatusFilter } from "../../entities/project/ui/ProjectStatusFilter";
import { ProjectSearch } from "../../entities/project/ui/ProjectSearch";
import { Calculator } from "../../features/calculator/ui/Calculator";
import { InvestmentSummary } from "../../features/investment-summary/ui/InvestmentSummary";
import { AddProjectModal } from "../../features/add-project/ui/AddProjectModal";
import { AddCryptoProjectModal } from "../../features/add-project/ui/AddCryptoProjectModal";
import { AddProjectDropdown } from "../../features/add-project/ui/AddProjectDropdown";

// Main page of the application
export const HomePage = () => {
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
          <Box sx={{ flex: { lg: 1 }, mb: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1.5,
              }}
            >
              <Typography variant="h5" component="h2" sx={{ fontWeight: 500 }}>
                Project List
              </Typography>
              <AddProjectDropdown
                onAddRegularProject={() => setRegularModalOpened(true)}
                onAddCryptoProject={() => setCryptoModalOpened(true)}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "flex-end",
                mb: 2,
                flexWrap: "wrap",
              }}
            >
              <ProjectSearch />
              <ProjectSorting />
              <ProjectStatusFilter />
            </Box>

            <ProjectList />
          </Box>
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
