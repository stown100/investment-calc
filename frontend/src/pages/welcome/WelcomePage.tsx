import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  useTheme,
  alpha,
} from "@mui/material";
import {
  TrendingUp,
  Calculate,
  PieChart,
  Security,
  Speed,
  CloudSync,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        height: "100%",
        background: `linear-gradient(135deg, ${alpha(
          theme.palette.primary.main,
          0.05
        )} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
        backdropFilter: "blur(10px)",
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: `0 12px 24px ${alpha(theme.palette.primary.main, 0.2)}`,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 2,
          }}
        >
          <Box
            sx={{
              width: 70,
              height: 70,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
            }}
          >
            {icon}
          </Box>
        </Box>
        <Typography
          variant="h6"
          component="h3"
          align="center"
          gutterBottom
          sx={{ fontWeight: 600 }}
        >
          {title}
        </Typography>
        <Typography variant="body2" align="center" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

interface ImagePlaceholderProps {
  height?: string | number;
  text?: string;
}

const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  height = 400,
  text = "Image Placeholder",
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        height: height,
        background: `linear-gradient(135deg, ${alpha(
          theme.palette.primary.main,
          0.1
        )} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
        border: `2px dashed ${alpha(theme.palette.primary.main, 0.3)}`,
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Typography
        variant="h6"
        color="text.secondary"
        sx={{
          fontWeight: 500,
          opacity: 0.7,
        }}
      >
        {text}
      </Typography>
      {/* Decorative elements */}
      <Box
        sx={{
          position: "absolute",
          top: -50,
          right: -50,
          width: 150,
          height: 150,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${alpha(
            theme.palette.primary.main,
            0.2
          )} 0%, transparent 70%)`,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -30,
          left: -30,
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${alpha(
            theme.palette.secondary.main,
            0.2
          )} 0%, transparent 70%)`,
        }}
      />
    </Box>
  );
};

export const WelcomePage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const handleGetStarted = () => {
    navigate("/auth");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          theme.palette.mode === "dark"
            ? `linear-gradient(180deg, ${theme.palette.background.default} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`
            : `linear-gradient(180deg, ${theme.palette.background.default} 0%, ${alpha(theme.palette.primary.main, 0.03)} 100%)`,
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          color: "white",
          py: { xs: 8, md: 12 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background decorative elements */}
        <Box
          sx={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: alpha("#fff", 0.05),
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -150,
            left: -150,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: alpha("#fff", 0.05),
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 4,
              alignItems: "center",
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  textShadow: "0 2px 10px rgba(0,0,0,0.2)",
                }}
              >
                Investment Calculator
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  opacity: 0.95,
                  fontWeight: 400,
                  fontSize: { xs: "1.1rem", md: "1.3rem" },
                }}
              >
                Manage your investments easily and effectively
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
                A professional tool for tracking your investment portfolio,
                calculating returns, and planning your financial future.
                Everything an investor needs in one place.
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={handleGetStarted}
                sx={{
                  backgroundColor:
                    theme.palette.mode === "dark" ? "#fff" : "#fff",
                  color: theme.palette.mode === "dark" ? "#667eea" : "#667eea",
                  px: 5,
                  py: 1.5,
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  textTransform: "none",
                  boxShadow:
                    theme.palette.mode === "dark"
                      ? "0 4px 20px rgba(255,255,255,0.3)"
                      : "0 4px 20px rgba(0,0,0,0.2)",
                  "&:hover": {
                    backgroundColor:
                      theme.palette.mode === "dark" ? "#f0f0f0" : "#f8f8f8",
                    transform: "translateY(-3px)",
                    boxShadow:
                      theme.palette.mode === "dark"
                        ? "0 8px 30px rgba(255,255,255,0.4)"
                        : "0 8px 30px rgba(0,0,0,0.3)",
                  },
                  transition: "all 0.3s ease-in-out",
                }}
              >
                Get Started
              </Button>
            </Box>
            <Box sx={{ flex: 1, width: "100%" }}>
              <ImagePlaceholder
                height={350}
                text="Hero Image - Dashboard Preview"
              />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{ fontWeight: 600, mb: 2 }}
          >
            Platform Features
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 700, mx: "auto" }}
          >
            Everything you need for professional investment management
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 4,
          }}
        >
          <FeatureCard
            icon={<Calculate sx={{ fontSize: 40 }} />}
            title="Accurate Calculations"
            description="Automatic calculation of profit, returns, and forecasting future results taking into account all investment parameters"
          />
          <FeatureCard
            icon={<PieChart sx={{ fontSize: 40 }} />}
            title="Data Visualization"
            description="Clear charts and graphs for portfolio analysis, tracking growth dynamics, and asset allocation"
          />
          <FeatureCard
            icon={<TrendingUp sx={{ fontSize: 40 }} />}
            title="Growth Tracking"
            description="Real-time monitoring of asset value changes and analysis of historical data"
          />
          <FeatureCard
            icon={<Security sx={{ fontSize: 40 }} />}
            title="Security"
            description="Reliable protection of your data using modern encryption and authentication methods"
          />
          <FeatureCard
            icon={<Speed sx={{ fontSize: 40 }} />}
            title="Fast Performance"
            description="Instant data loading and immediate calculations for comfortable application use"
          />
          <FeatureCard
            icon={<CloudSync sx={{ fontSize: 40 }} />}
            title="Cloud Storage"
            description="Access your data from any device at any time thanks to cloud storage"
          />
        </Box>
      </Container>

      {/* How it works Section */}
      <Box
        sx={{
          background:
            theme.palette.mode === "dark"
              ? alpha(theme.palette.primary.main, 0.05)
              : alpha(theme.palette.primary.main, 0.02),
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ mb: 6, textAlign: "center" }}>
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              sx={{ fontWeight: 600, mb: 2 }}
            >
              How Does It Work?
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Three simple steps to effective investment management
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              gap: 6,
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                  color: "white",
                  fontSize: "2rem",
                  fontWeight: 700,
                }}
              >
                1
              </Box>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                Create an Account
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Quick registration in just a few seconds. No complex forms or
                lengthy verifications.
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                  color: "white",
                  fontSize: "2rem",
                  fontWeight: 700,
                }}
              >
                2
              </Box>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                Add Projects
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Enter information about your investments: stocks,
                cryptocurrency, real estate, and other assets.
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                  color: "white",
                  fontSize: "2rem",
                  fontWeight: 700,
                }}
              >
                3
              </Box>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                Analyze Results
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Get detailed analytics, forecasts, and recommendations for
                making informed decisions.
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Use Cases Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{ fontWeight: 600, mb: 2 }}
          >
            Who Is This Tool For?
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Investment Calculator is designed for a wide range of investors
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
            gap: 4,
          }}
        >
          <Card
            sx={{
              p: 3,
              height: "100%",
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: 3,
              },
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              💼 Beginner Investors
            </Typography>
            <Typography variant="body1" color="text.secondary">
              A simple and intuitive interface will help you understand the
              basics of investing. Track your first investments, learn to
              analyze results, and make informed decisions.
            </Typography>
          </Card>
          <Card
            sx={{
              p: 3,
              height: "100%",
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: 3,
              },
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              📈 Experienced Traders
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Advanced analytics tools and detailed statistics for professional
              portfolio management. Quick access to all important metrics and
              indicators.
            </Typography>
          </Card>
          <Card
            sx={{
              p: 3,
              height: "100%",
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: 3,
              },
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              🎯 Long-term Investors
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Plan your financial future with forecasts and calculators. Track
              progress toward financial goals and adjust your strategy based on
              data.
            </Typography>
          </Card>
          <Card
            sx={{
              p: 3,
              height: "100%",
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: 3,
              },
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              🔄 Portfolio Diversifiers
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage different asset classes in one place. Monitor portfolio
              balance, analyze risk-return ratios for each instrument.
            </Typography>
          </Card>
        </Box>
      </Container>

      {/* Screenshots Section */}
      <Box
        sx={{
          background:
            theme.palette.mode === "dark"
              ? alpha(theme.palette.primary.main, 0.05)
              : alpha(theme.palette.primary.main, 0.02),
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ mb: 6, textAlign: "center" }}>
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              sx={{ fontWeight: 600, mb: 2 }}
            >
              See How It Looks
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Modern and intuitive interface
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <ImagePlaceholder height={450} text="Main Dashboard Screenshot" />
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
                gap: 4,
              }}
            >
              <ImagePlaceholder height={300} text="Projects Table View" />
              <ImagePlaceholder height={300} text="Calculator & Analytics" />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          color: "white",
          py: 8,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: -50,
            right: -50,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: alpha("#fff", 0.05),
          }}
        />
        <Container
          maxWidth="md"
          sx={{ textAlign: "center", position: "relative", zIndex: 1 }}
        >
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{ fontWeight: 700, mb: 2 }}
          >
            Ready to Start?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.95 }}>
            Join thousands of investors who are already managing their finances
            effectively
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={handleGetStarted}
            sx={{
              backgroundColor: theme.palette.mode === "dark" ? "#fff" : "#fff",
              color: theme.palette.mode === "dark" ? "#667eea" : "#667eea",
              px: 6,
              py: 2,
              fontSize: "1.2rem",
              fontWeight: 700,
              textTransform: "none",
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 4px 20px rgba(255,255,255,0.3)"
                  : "0 4px 20px rgba(0,0,0,0.2)",
              "&:hover": {
                backgroundColor:
                  theme.palette.mode === "dark" ? "#f0f0f0" : "#f8f8f8",
                transform: "translateY(-3px)",
                boxShadow:
                  theme.palette.mode === "dark"
                    ? "0 8px 30px rgba(255,255,255,0.4)"
                    : "0 8px 30px rgba(0,0,0,0.3)",
              },
              transition: "all 0.3s ease-in-out",
            }}
          >
            Create Free Account
          </Button>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          py: 4,
          textAlign: "center",
          borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary">
            © {currentYear} Investment Calculator. All rights reserved.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Professional tool for investment management
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};
