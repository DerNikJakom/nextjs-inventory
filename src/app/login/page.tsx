"use client";

import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";

// const Copyright = (props) => {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       <Link color="inherit" href="https://www.askuma.ag/">
//         ASKUMA AG
//       </Link>{" "}
//       {new Date().getFullYear()}
//     </Typography>
//   );
// };

const LoginPage = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/"); // Weiterleitung zur Startseite
  };

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        p: 3,
        textAlign: "center",
      }}
    >
      <Typography variant="h4" color="primary" gutterBottom>
        Willkommen!
      </Typography>
      <Typography variant="body1" color="secondary" gutterBottom>
        Dies ist eine Login-Seite.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin} // Weiterleitung auslösen
        sx={{ mt: 2 }}
      >
        Login
      </Button>
    </Box>
  );
};

export default LoginPage;
