import { Card, CardContent, Typography } from "@mui/material";

const CardInfo = ({ title, value, icon }) => {
  return (
    <Card sx={{ minWidth: 275, margin: 2 }}>
      <CardContent>
        {icon && <div>{icon}</div>}
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="h6">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardInfo;
