import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Grow,
} from "@mui/material";
import LiveTvRoundedIcon from "@mui/icons-material/LiveTvRounded";
interface ListContentProps {
  items: string[];
}
export function ListContent({ items }: ListContentProps) {
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
        <Grow in key={item}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <LiveTvRoundedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={<Typography variant="body1">{item}</Typography>}
            />
          </ListItem>
        </Grow>
      ))}
    </List>
  );
}
