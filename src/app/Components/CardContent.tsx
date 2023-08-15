import {
  Card,
  CardMedia,
  Typography,
  CardContent as MUICardContent,
  Rating,
  CardHeader,
} from "@mui/material";
import { Content } from "../api";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { DateTime } from "luxon";

interface CardContentProps {
  item: Content;
}
export function CardContent({ item }: CardContentProps) {
  return (
    <Card sx={{ maxWidth: 300 }} key={item.id} variant="elevation">
      <CardHeader
        title={
          <Typography
            gutterBottom
            variant="body1"
            fontWeight="500"
            component="p"
          >
            {item.title}
          </Typography>
        }
        subheader={
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
        }
      />

      <CardMedia
        component="img"
        image={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
        alt={item.title}
      />

      <MUICardContent>
        <Typography variant="body1" fontWeight="600" py={2}>
          Data de lançamento:
          {DateTime.fromISO(item.release_date).toFormat("dd/MM/yyyy")}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {item.overview}
        </Typography>
      </MUICardContent>
    </Card>
  );
}
