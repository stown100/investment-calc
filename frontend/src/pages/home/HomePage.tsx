import React, { useState } from "react";
import {
  Typography,
  Paper,
  Box,
  Button,
  Container,
} from "@mui/material";
import { Add as AddIcon, Business as BusinessIcon } from "@mui/icons-material";
import { ProjectList } from "../../entities/project/ui/ProjectList";
import { ProjectSorting } from "../../entities/project/ui/ProjectSorting";
import { ProjectStatusFilter } from "../../entities/project/ui/ProjectStatusFilter";
import { ProjectSearch } from "../../entities/project/ui/ProjectSearch";
import { Calculator } from "../../features/calculator/ui/Calculator";
import { InvestmentSummary } from "../../features/investment-summary/ui/InvestmentSummary";
import { AddProjectModal } from "../../features/add-project/ui/AddProjectModal";
import { ThemeToggle } from "../../shared/ui/ThemeToggle";
import { NotificationDemo } from "../../shared/ui/NotificationDemo";

// Main page of the application
export const HomePage = () => {
  const [modalOpened, setModalOpened] = useState(false);

  return (
    <Box sx={{ width: '100vw', py: 2 }}>
      <Container maxWidth="xl" sx={{ px: 1.5 }}>
        <Paper 
          elevation={1} 
          sx={{ 
            p: 1.5, 
            mb: 2, 
            borderRadius: 2,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white'
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between' 
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <BusinessIcon sx={{ fontSize: 20 }} />
              <Typography variant="h4" component="h1" sx={{ fontWeight: 500 }}>
                Investment Projects
              </Typography>
            </Box>
            <ThemeToggle />
          </Box>
        </Paper>

        <InvestmentSummary />

        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          flexDirection: { xs: 'column', lg: 'row' } 
        }}>
          <Box sx={{ flex: { lg: 1 }, mb: 2 }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              mb: 1.5 
            }}>
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
                  textTransform: 'none',
                  boxShadow: 2
                }}
              >
                Add Project
              </Button>
            </Box>

            <Box sx={{ 
              display: 'flex', 
              gap: 2, 
              alignItems: 'flex-end', 
              mb: 2,
              flexWrap: 'wrap'
            }}>
              <ProjectSearch />
              <ProjectSorting />
              <ProjectStatusFilter />
            </Box>

            <ProjectList />
          </Box>
          <Box sx={{ flex: { lg: 1 } }}>
            <Calculator />
            <Box sx={{ mt: 2 }}>
              <NotificationDemo />
            </Box>
          </Box>
        </Box>

        <AddProjectModal
          opened={modalOpened}
          onClose={() => setModalOpened(false)}
        />
      </Container>
    </Box>
  );
};
