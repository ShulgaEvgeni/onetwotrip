import React from 'react';
import axios from 'axios';
// import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
// import { withRouter } from "react-router-dom";
// import Platform from 'react-platform-js';
import SwipeableViews from 'react-swipeable-views';
import Icon24Back from '@vkontakte/icons/dist/24/browser_back';
import connect from '@vkontakte/vkui-connect';


import { platform } from '@vkontakte/vkui';
const osname = platform();

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			listitemheight: "calc(100vh - 111px)",
			headermain: "58px",
			navigation: false,
			index: 0,
			nait1Color: "#FFF",
			nati1Backgr: "#744fc5",
			nait2Color: "#744fc5",
			nati2Backgr: "#FFF",
			railways: [],
			avia: [],
			token: null,
		}
	}

	handleChangeIndex = index => {
		this.setState({ index });
		if (index === 0) {
			this.setState({
				navigation: false,
				nait1Color: "#FFF",
				nati1Backgr: "#744fc5",
				nait2Color: "#744fc5",
				nati2Backgr: "#FFF"
			});
		}
		else {
			this.setState({
				navigation: true,
				nait1Color: "#744fc5",
				nati1Backgr: "#FFF",
				nait2Color: "#FFF",
				nati2Backgr: "#744fc5"
			});
		}
	};

	backApp = () => { this.props.history.go(-1) }
	goApp = (ways) => { this.props.history.push('/' + ways); }

	changeNavigation = (val) => {
		this.state.navigation = val;
		if (!this.state.navigation) {
			this.setState({
				index: 0,
				nait1Color: "#FFF",
				nati1Backgr: "#744fc5",
				nait2Color: "#744fc5",
				nati2Backgr: "#FFF"
			});
		}
		else {
			this.setState({
				index: 1,
				nait1Color: "#744fc5",
				nati1Backgr: "#FFF",
				nait2Color: "#FFF",
				nati2Backgr: "#744fc5"
			});
		}
	}

	componentDidMount() {
		// connect.send('VKWebAppGetUserInfo', {});
		var that = this
		if (osname === "android") {
			console.log("de android")
			var heightHeader = document.getElementsByClassName('header-main');
			var heightMainContent = document.getElementsByClassName('main-content');
			heightHeader[0].style.height = "58px";
			heightMainContent[0].style.height = "calc(100vh - 58px)";
		}
		if (osname === "ios") { console.log("de ios") }
		if (window.innerWidth >= 936) {
			var heightMainContent = document.getElementsByClassName('main-content');
			heightMainContent[0].style.height = "calc(100vh - 130px)";
		}
		connect.send("VKWebAppSetViewSettings", { "status_bar_style": "light", "action_bar_color": "#212121" });
		axios
			.post('https://vk-app--wl.onetwotrip.com/_auth/authenticate/auth-by-vk?ENVID=sandbox-partners', {
				headers: {
		        	'Content-Type': 'application/json',
		        	'Access-Control-Allow-Origin': '*'
		    	},
		    	body: {
		    		userId: String(this.props.fetchedUser.id),
					accessToken: "7395b5397395b5397395b5397f73f2dd8e773957395b5392f9902637a8a38cd5484e3ff"		
		    	}

			})
			.then(function (response) {
				console.log(response.data)
				alert(response.data)
				axios
					.get('https://vk-app--wl.onetwotrip.com/_api/buyermanager/getUserInfo2/?showOnlyOrders=true', {				
					})
					.then(function (response) {
						console.log(response.data, that.props.fetchedUser.id);
						alert(response.data.error);
				});
		});
	}

	story = () => {
		connect.send('VKWebAppGetAuthToken', { "app_id": 6777015, "scope": "stories" });
		setTimeout(() => { alert(this.state.token); }, 2000)
	}

	render() {
		let navibt1 = {
			color: this.state.nait1Color,
			background: this.state.nati1Backgr,
		}

		let navibt2 = {
			color: this.state.nait2Color,
			background: this.state.nati2Backgr,
		}

		let railways;
		railways = this.state.railways.map((data) =>
			<div>
				<div className="list-card">
					<div className="list-card-header">
						<p>{data.name}</p>
						<p>{data.date} на {data.time}</p>
					</div>
					<div className="list-card-id">
						<p>Заказ {data.id}</p>
					</div>
				</div>
			</div>
		);

		let header; let btloginHead;
		if (window.innerWidth >= 936) {
			if (this.props.statusUser) {
				btloginHead = <div className="header-1-bt-user" onClick={() => { this.goApp('login') }}>
					<p>Личный кабинет </p>
				</div>
			}
			else {
				btloginHead = <div className="header-1-bt-user" onClick={() => { this.goApp('login') }} >
					<p style={{ marginRight: "5px" }}>Войти </p>
				</div>
			}
			header =
				<div className="header-main" style={{ height: "130px", background: "#3a3a3a" }}>
					<div className="header-1">
						<div className="header-2">
							<div className="header-2-top">
								<div style={{ width: "72px" }}></div>
								<div className="header-logo" onClick={() => { this.goApp('') }}><img src="../icon/logo.svg" alt="logo" /></div>
								{btloginHead}
							</div>
							<div className="header-2-bottom" style={{ height: "60px" }}>
								<div className="header-menu-item" onClick={() => { this.goApp('railways') }}><img src="../icon/train.svg" alt="train" />Ж/д билеты</div>
								<div className="header-menu-item" onClick={() => { this.goApp('hotel') }}><img src="../icon/hotels.svg" alt="hotels" />Отели</div>
								<div className="header-menu-item" onClick={() => { this.goApp('avia') }}><img src="../icon/avia.svg" alt="avia" />Авиабилеты</div>
							</div>
						</div>

					</div>
				</div>
		}
		else {
			header =
				<div className="header-main" style={{ height: this.state.headermain }}>
					<div className="header-1">
						<div className="header-menu-bt" onClick={this.backApp}> <Icon24Back /> </div>
						<div className="header-logo"><img src="../icon/logo.svg" alt="logo" /></div>
						<div style={{ width: "28px", height: "28px" }}></div>
					</div>
				</div>
		}

		return (
			<div className="wrapper">
				<div className="header-ios"></div>
				{header}
				<div className="main-content" style={{ height: this.state.maincontent }}>
					<div className="navigation">
						<div className="navigation-1">
							<div className="navigation-item-1" style={navibt1} onClick={() => { this.changeNavigation(false) }} >Активные заказы</div>
							<div className="navigation-item-2" style={navibt2} onClick={() => { this.changeNavigation(true) }} >Архив</div>
						</div>
					</div>
					<div className="list">
						<SwipeableViews index={this.state.index} onChangeIndex={this.handleChangeIndex}>
							<div className="list-item" style={{ height: this.state.listitemheight }}>
								<div className="list-item-railways-header">Ж/д билеты</div>
								<div className="list-item-railways">
									{railways}
								</div>
							</div>
							<div className="list-item" style={{ height: this.state.listitemheight }}>
								{/* <div className="qwe" onClick={this.story}>  </div> */}
							</div>
						</SwipeableViews>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;