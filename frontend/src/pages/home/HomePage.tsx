import React, { useState } from "react";
import { Typography, Box, Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { ProjectList } from "../../entities/project/ui/ProjectList";
import { ProjectSorting } from "../../entities/project/ui/ProjectSorting";
import { ProjectStatusFilter } from "../../entities/project/ui/ProjectStatusFilter";
import { ProjectSearch } from "../../entities/project/ui/ProjectSearch";
import { Calculator } from "../../features/calculator/ui/Calculator";
import { InvestmentSummary } from "../../features/investment-summary/ui/InvestmentSummary";
import { AddProjectModal } from "../../features/add-project/ui/AddProjectModal";

// Main page of the application
export const HomePage = () => {
  const [modalOpened, setModalOpened] = useState(false);

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
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setModalOpened(true)}
                size="small"
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  boxShadow: 2,
                }}
              >
                Add Project
              </Button>
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
          opened={modalOpened}
          onClose={() => setModalOpened(false)}
        />
      </Box>
    </Box>
  );
};
