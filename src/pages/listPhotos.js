import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import getPhotos from '../service/getphotos';
import CardLayout from '../components/Card';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: 0,
		minWidth: 100,
		padding: theme.spacing(1)
	},
	media: {
		height: 150
	}
}));

const Photo = (props) => {
	const classes = useStyles();
	const [ cardData, setCardData ] = useState([]);
	const [ count, setCount ] = useState(10);
	const [ page, setPage ] = useState(1);

	const getData = (page) => {
		getPhotos(page)
			.then((response) => {
				console.log(response.total);
				setCardData(response.data);
			})
			.catch((err) => console.error(err))
			.finally(console.log('Data fetched'));
	};

	useEffect(() => {
		getData(1);
	}, []);

	return (
		<div className={classes.root}>
			<Pagination
				onChange={(event, value) => {
					setPage(value);
					getData(value);
				}}
				page={page}
				count={count}
				variant="outlined"
				shape="rounded"
			/>
			<Grid container component="main" className={classes.root}>
				{cardData && cardData.map((item) => <CardLayout key={item.id} item={item} classes={classes} />)}
			</Grid>
		</div>
	);
};

export default Photo;
