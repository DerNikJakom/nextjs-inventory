import React from "react";
import { Box, Typography } from "@mui/material";

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
  return (
    <Box sx={{ bgcolor: "background.default", color: "text.primary", p: 3 }}>
      <Typography variant="h4" color="primary">
        Willkommen!
      </Typography>
      <Typography variant="body1" color="secondary">
        Dies ist eine Login-Seite mit globalem Theme.
      </Typography>
    </Box>
  );
};

export default LoginPage;
