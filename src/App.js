import './App.css';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Container from '@material-ui/core/Container';
import SearchIcon from '@material-ui/icons/Search';
import BookIcon from '@material-ui/icons/Book';
import Box from '@material-ui/core/Box';
import Photo from './pages/listPhotos';
import Search from './pages/searchPhoto';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
require('dotenv').config();

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		maxWidth: 500,
		marginTop: 10
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 1
	}
}));

function TabPanel(props) {
	const { children, value, index, ...other } = props;
	return <div {...other}>{value === index && <Box p={3}>{children}</Box>}</div>;
}

function App() {
	const classes = useStyles();
	const [ value, setValue ] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<AppBar position="static">
			<Toolbar>
				<Typography variant="h6" className={classes.title}>
					React App Gallery
				</Typography>

				<React.Fragment>
					<Container fixed>
						<Paper square className={classes.root}>
							<Tabs
								value={value}
								onChange={handleChange}
								variant="fullWidth"
								indicatorColor="primary"
								textColor="primary"
								aria-label="icon tabs example"
							>
								<Tab icon={<BookIcon />} aria-label="favorite" />
								<Tab icon={<SearchIcon />} aria-label="phone" />
							</Tabs>
						</Paper>
						<TabPanel value={value} index={0}>
							<Photo />
						</TabPanel>
						<TabPanel value={value} index={1}>
							<Search />
						</TabPanel>
					</Container>
				</React.Fragment>
			</Toolbar>
		</AppBar>
	);
}

export default App;
