import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import searchPhotos from '../service/searchphotos';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import CardLayout from '../components/Card';
import Loader from '../loading.gif';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: 0,
		minWidth: 100,
		padding: theme.spacing(1),
		alignItems: 'center'
	},
	media: {
		height: 150
	},
	input: {
		marginTop: 12
	}
}));

const Search = (props) => {
	const classes = useStyles();
	const [ data, setData ] = useState([]);
	const [ query, setQuery ] = useState('');
	const [ page, setPage ] = useState(1);
	const [ loading, setLoading ] = useState(false);
	const [ message, setMessage ] = useState('');
	const [ count, setCount ] = useState(1);
	let cancel = '';

	const fetchData = (query, page) => {
		if (cancel) {
			cancel.cancel();
		}
		cancel = axios.CancelToken.source();

		searchPhotos(query, page, cancel.token)
			.then((response) => {
				console.log(response.data.total);
				const noResults = !response.data.results.length ? 'Try to use the search box' : '';
				setData(response.data.results);
				setCount(response.data.total);
				setMessage(noResults);
				setLoading(false);
			})
			.catch((error) => {
				if (axios.isCancel(error) || error) {
					setLoading(false);
					setMessage('Failed to fetch the data');
				}
			})
			.finally('Data fetched');
	};

	const handleOnChange = (event) => {
		const query = event.target.value;
		if (!query) {
			setData([]);
			setQuery(query);
			setMessage('');
		} else {
			setQuery(query);
			setLoading(true);
			setMessage('');
		}
	};

	useEffect(
		() => {
			fetchData(query, page);
		},
		[ query ]
	);

	useEffect(
		() => {
			fetchData(query, page);
		},
		[ page ]
	);

	const renderCards = () => {
		if (Object.keys(data).length && data.length) {
			return (
				<Grid container component="main" className={classes.root}>
					{data && data.map((item) => <CardLayout key={item.id} item={item} classes={classes} />)}
				</Grid>
			);
		}
	};

	return (
		<div className={classes.root}>
			<Pagination
				onChange={(event, value) => {
					setPage(value);
				}}
				page={page}
				count={parseInt(count / 10)}
				variant="outlined"
				shape="rounded"
			/>
			<TextField
				label="Search image by name"
				type="text"
				value={query}
				className={classes.input}
				onChange={handleOnChange}
				InputProps={{
					endAdornment: (
						<InputAdornment>
							<IconButton>
								<SearchIcon />
							</IconButton>
						</InputAdornment>
					)
				}}
			/>
			{message && <p>{message}</p>}
			<img src={Loader} className={`search-loading ${loading ? 'show' : 'hide'}`} alt="Loader" />
			{renderCards()}
		</div>
	);
};

export default Search;
