import React from 'react';
import connect from '@vkontakte/vkui-connect-mock';
// import '@vkontakte/vkui/dist/vkui.css';
import { Route } from "react-router-dom";
import './App.css';
import Main from './components/js/Main';
import Railways from './components/js/Railways';
import Avia from './components/js/Avia';
import Hotel from './components/js/Hotel';
import Login from './components/js/Login';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			fetchedUser: null,
			statusUser: false,
		};
	}

	changeStatusUser = (val) =>{
		this.setState({statusUser: val});
	}

	loadwhitelabelOTT = (gadgetPath, gadgetId, blockId) => {
  		const hash = Date.now();
		const container = document.getElementById(blockId);
		// window[`config_${gadgetId}`];
		const script = document.createElement('script');
		script.src = `${gadgetPath}${gadgetId}.js?a=${hash}`;
		script.async = true;
		container.appendChild(script);
  	}

	componentDidMount() {
		connect.subscribe((e) => {
			switch (e.detail.type) {
				case 'VKWebAppGetUserInfoResult':
					this.setState({ fetchedUser: e.detail.data });
					// console.log(e.detail.data);
					break;
				default:
					console.log(e.detail.type);
			}
		});
		connect.send('VKWebAppGetUserInfo', {});

	}

	render() {
		return (
			<div className="panel">				
				<div className="content">						
					<Route exact path="/" render={props => 
						<Main {...props}
							statusUser={this.state.statusUser}
							changeStatusUser={this.changeStatusUser}
						/>}
					/>
					<Route exact path="/railways" render={props => 
						<Railways {...props}
							statusUser={this.state.statusUser}
							changeStatusUser={this.changeStatusUser}
							loadwhitelabelOTT={this.loadwhitelabelOTT}
						/>}
					/>
					<Route exact path="/avia" render={props => 
						<Avia {...props}
							statusUser={this.state.statusUser}
							changeStatusUser={this.changeStatusUser}
							loadwhitelabelOTT={this.loadwhitelabelOTT}
						/>}
					/>	
					<Route exact path="/hotel" render={props => 
						<Hotel {...props}
							statusUser={this.state.statusUser}
							changeStatusUser={this.changeStatusUser}
							loadwhitelabelOTT={this.loadwhitelabelOTT}
						/>}
					/>
					<Route exact path="/login" render={props => 
						<Login {...props}
							fetchedUser={this.state.fetchedUser}
							statusUser={this.state.statusUser}
							changeStatusUser={this.changeStatusUser}
						/>}
					/>				
													
				</div>
			</div>	
		);
	}
}

export default App;
