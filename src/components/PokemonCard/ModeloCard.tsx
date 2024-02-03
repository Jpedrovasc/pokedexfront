import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

interface PokemonCardProps {
  id: string;
  name: string;
  image: string;
  types: string[];
}

const PokemonCard: React.FC<PokemonCardProps> = (props) => {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          src={props.image}
          alt="Imagem do Pokémon"
          style={{
            float: "left",
            width: "100%",
            position: "relative",
            height: "100%",
            objectFit: "cover",
            top: 0,
          }}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {"N° " + props.id}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              fontSize: "11px",
              borderRadius: "3px",
              margin: "1px",
              textAlign: "center",
            }}
          >
            {props.types.map((type, index) => (
              <Typography
                key={index}
                variant="body2"
                color="text.secondary"
                style={{ marginRight: 8 }}
              >
                {type}
              </Typography>
            ))}
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PokemonCard;
