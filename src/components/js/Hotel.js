import React from 'react';
// import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
// import { withRouter } from "react-router-dom";
// import Platform from 'react-platform-js'
import Icon24Back from '@vkontakte/icons/dist/24/browser_back';
import connect from '@vkontakte/vkui-connect';
// import '../css/Hotel.css';

import { platform } from '@vkontakte/vkui';
const osname = platform();

class Hotel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			headermain: "58px",
			maincontent: "calc(100vh - 58px)"
		}
	}

	componentDidMount() {
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
		this.props.startApp("https://static.onetwotrip.com/gadgets/vk-app/prod/vk_hotel_vk-app/", "5c6bfe336135562ac4c3893e");
		connect.send("VKWebAppSetViewSettings", { "status_bar_style": "light", "action_bar_color": "#212121" });
	}

	backApp = () => { this.props.history.go(-1) }
	goApp = (ways) => { this.props.history.push('/' + ways); }

	render() {

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
				<div className="header-main">
					<div className="header-1">
						<div className="header-menu-bt" onClick={this.backApp}> <Icon24Back /> </div>
						<div className="header-logo"><img src="../icon/logo.svg" alt="logo" /></div>
						<div style={{ width: "28px", height: "28px" }}></div>
					</div>
				</div>
		}

		return (
			<div className="wrapper">
				<div className="header-ios" ></div>
				{header}
				<div className="main-content" >
					<div id="scroll-block" >
						<div id="whitelabelOTT" style={{ height: "100%" }} onScroll={this.scroll}></div>
					</div>
				</div>
			</div>
		);
	}
}

export default Hotel;