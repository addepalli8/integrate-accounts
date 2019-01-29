import React, { Component } from 'react';
import { Card, CardMedia, Avatar } from '@material-ui/core';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentWillMount() {
		this.query();
  }
  //query for retriving th neccessary information
  //retriving the data using fetch api and store t to data
  //extracting data to the simpler forms for representation of the whole data
  //used material ui for the presentation
	query = () => {
		fetch('https://api.github.com/search/users?q=repos:%3E-1&sort=joined&order=desc&per_page=100')
			.then((resp) => resp.json())
			.then((data) => {
				this.setState({
					users: data.items.map((user, i) => (
						<Card key={i} className="card">
							<CardMedia>
								<Avatar
									alt="complex"
									src={user.avatar_url}
									style={{ width: 120, height: 120, marginLeft: 28,marginTop:3 }}
								/>
							</CardMedia>
							 <h4 className="name">Name : {user.login}</h4>
							<p className="info">Id : {user.id}</p>
							<p className="info"><a className="link" href={user.html_url}>Github</a></p>
							<h3 className="info">Score : {user.score}</h3>
						</Card>
					))
				});
			})
			.catch(() => {
				console.log('error');
			});
	};
//calling the whole state to the main point to exhibit the web application
	render() {
		return <div ><p className="head"><h3 className="htext">100 Latest Github accounts and their information</h3></p><div className="App">{this.state.users}</div></div>;
	}
}

export default App;
