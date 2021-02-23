import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import Avatar from '@material-ui/core/Avatar';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		maxWidth: '50'
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3)
	},
	grid: {
		paddingLeft: 10
	}
}));

const CardLayout = (props) => {
	const classe = useStyles();
	const { item, classes } = props;
	const [ open, setOpen ] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
		console.log(item);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const renderModal = () => {
		return (
			<div>
				<Modal
					aria-labelledby="transition-modal-title"
					aria-describedby="transition-modal-description"
					className={classe.modal}
					open={open}
					onClose={handleClose}
					closeAfterTransition
					BackdropComponent={Backdrop}
					BackdropProps={{
						timeout: 500
					}}
				>
					<Fade in={open}>
						<div className={classe.paper}>
							{/* user name, likes count, user's social links, */}
							<CardMedia className={classes.media} image={item.urls.full} title={item.alt_description} />
							<Grid container direction="row" alignItems="center">
								<Grid item>
									<Avatar alt={item.user.name} src={item.user.profile_image.large} />
								</Grid>
								<Grid item className={classe.grid}>
									<h2 id="transition-modal-title">{item.user.name}</h2>
								</Grid>
							</Grid>
							{item.user.bio && (
								<div>
									Bio:
									<Typography
										variant="inherit"
										component="subtitle1"
										align="justify"
										display="block"
										paragraph
										style={{ wordWrap: 'break-word' }}
									>
										{item.user.bio}
									</Typography>
								</div>
							)}
							{item.user.instagram_username && (
								<p>
									Instagram:
									<Typography
										variant="inherit"
										component="subtitle1"
										align="justify"
										display="block"
										paragraph
										style={{ wordWrap: 'break-word' }}
									>
										<Link href={'https://instagram.com/' + item.user.instagram_username}>
											{item.user.instagram_username}
										</Link>
									</Typography>
								</p>
							)}
							{item.user.twitter_username && (
								<p>
									Twitter:
									<Typography
										variant="inherit"
										component="subtitle1"
										align="justify"
										display="block"
										paragraph
										style={{ wordWrap: 'break-word' }}
									>
										<Link href={'https://twitter.com/' + item.user.twitter_username}>
											{item.user.twitter_username}
										</Link>
									</Typography>
								</p>
							)}
							{item.user.links && (
								<IconButton color="primary" aria-label="add to shopping cart">
									<Link href={item.user.links.html}>
										Visit me <DirectionsWalkIcon />
									</Link>
								</IconButton>
							)}
						</div>
					</Fade>
				</Modal>
			</div>
		);
	};

	return (
		<Grid item xs={3} sm={3} md={3}>
			<Card style={{ margin: 20 }} className={classes.root}>
				<CardActionArea onClick={handleOpen}>
					<CardMedia className={classes.media} image={item.urls.thumb} title={item.alt_description} />
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2">
							{item.user.name}
						</Typography>
						<Typography variant="body2" color="textSecondary" component="p">
							{item.description}
						</Typography>
					</CardContent>
				</CardActionArea>
				<CardActions>
					<IconButton aria-label="likes">
						<FavoriteIcon />
						{item.user.total_likes}
					</IconButton>
				</CardActions>
			</Card>
			{renderModal()}
		</Grid>
	);
};

export default CardLayout;
