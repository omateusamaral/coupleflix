import {
  List,
  Typography,
  Stack,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CardActions,
  Rating,
} from "@mui/material";
import { Content } from "../api";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
interface ListContentProps {
  items: Content[];
}
export function ListContent({ items }: ListContentProps) {
  return (
    <List
      dense
      component="div"
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "16px",
      }}
    >
      {items.map((item) => (
        <Card sx={{ maxWidth: 300 }} key={item.id} variant="elevation">
          <CardActionArea>
            <CardMedia
              component="img"
              image={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={item.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="p">
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.overview}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Stack direction="column">
              <Rating
                name="read-only"
                precision={0.5}
                icon={<FavoriteIcon fontSize="inherit" />}
                emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                size="small"
                sx={{
                  "& .MuiRating-iconFilled": {
                    color: "#ff6d75",
                  },
                }}
                value={item.vote_average}
                max={10}
                readOnly
              />
              <Typography variant="body2">
                Data de lançamento: {item.release_date}
              </Typography>
            </Stack>
          </CardActions>
        </Card>
      ))}
    </List>
  );
}
