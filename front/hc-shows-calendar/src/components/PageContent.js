import { Typography } from "@mui/material";

function PageContent({ title, children }) {
    return (
      <>
        <Typography variant="h2">{title}</Typography>
        {children}
      </>
    );
  }
  
  export default PageContent;