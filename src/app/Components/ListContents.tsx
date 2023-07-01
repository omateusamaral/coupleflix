import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
} from "@mui/material";
import LiveTvRoundedIcon from "@mui/icons-material/LiveTvRounded";
interface ListContentsProps {
  items: string[];
}
export function ListContents({ items }: ListContentsProps) {
  return (
    <List
      dense
      sx={{
        overflow: "auto",
        maxHeight: 600,
        width: 600,
      }}
    >
      {items.map((item) => (
        <ListItem key={item}>
          <ListItemAvatar>
            <Avatar>
              <LiveTvRoundedIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={<Typography variant="body1">{item}</Typography>}
          />
        </ListItem>
      ))}
    </List>
  );
}
