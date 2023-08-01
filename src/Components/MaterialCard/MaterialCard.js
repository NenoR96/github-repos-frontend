import React from 'react';
import './MaterialCard.css'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Rating from '@mui/material/Rating';

export default function MaterialCard(props) {

  const handleFavorite = () => {
    props.handleFavorites(props.repo);
  }

  const handleShare = () => {
    window.open(props.repo.html_url, '_blank', 'noreferrer');
  }

  return (
    <Card sx={{ width: '100%' }}>
      <CardContent>
        <Typography variant="h5" component="div" className="card-title">
          {props.repo.name}
        </Typography>
        <Box className="card-rating">
          <Rating name="read-only" value={5} readOnly />
          ({props.repo.stargazers_count})
        </Box>
        <Typography variant="body2">
          {props.repo.description}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="add to favorites" onClick={handleFavorite}>
          <FavoriteIcon color={props.repo.isFavorite ? "primary" : "default"} />
        </IconButton>
        <IconButton aria-label="share" onClick={handleShare}>
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}