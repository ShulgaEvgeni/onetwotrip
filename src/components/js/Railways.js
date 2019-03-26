import React from 'react';
// import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
// import { withRouter } from "react-router-dom";
// import Platform from 'react-platform-js'
import Icon24Back from '@vkontakte/icons/dist/24/browser_back';
// import '../css/Railways.css';

import { platform } from '@vkontakte/vkui';
const osname = platform();

class Railways  extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			headerios: "0px",
			headermain: "58px",
			burgermenu: "calc(100vh - 58px)",
			maincontent: "calc(100vh - 58px)"
		}
	}

	componentDidMount() {
		if(osname === "ios"){ 
			this.setState({ 
				headerios: "20px",
				headermain: "45px",
				burgermenu: "calc(100vh - 45px - env(safe-area-inset-top))",
				maincontent: "calc(100vh - 45px - env(safe-area-inset-top))"  
			})
		}
		if(osname === "android"){ console.log("de android") }
		setTimeout(this.props.loadwhitelabelOTT("https://static.onetwotrip.com/gadgets/vk-app/prod/vk_railways_vk-app/", "5c6bfe4e6135562ac4c38940", "whitelabelOTTRailways"), 1);
	}

  	backApp = () => { this.props.history.go(-1) /*setTimeout(()=>{this.props.history.push('/avia');}, 2)*/  }
  	goApp = (ways) => { this.props.history.push('/'+ways); }
  	
	render() {

		let header; let btloginHead;
			if (window.innerWidth >= 936) {
				if(this.props.statusUser){
					btloginHead = <div className="header-1-bt-user" onClick={()=>{this.goApp('login')}}>
											<p>Личный кабинет </p>
											<img src="../icon/arrow-d-new.svg" alt="arrow-d-new" style={{transform: "rotate(-90deg)"}}/>
										</div>
				}
				else{
					btloginHead = <div className="header-1-bt-user" onClick={()=>{this.goApp('login')}} >
											<p style={{marginRight: "5px"}}>Войти </p>
											<img src="../icon/loginBr.svg" alt="login"/>
										</div>
				}
				header = 
					<div className="header-main" style={{height: "70px"}}> 
						<div className="header-1"> 
							<div className="header-2"> 
								<div className="header-logo" onClick={() => {this.goApp('')}}><img src="../icon/logo.svg" alt="logo"/></div> 
								<div style={{background: "hsla(0,0%,100%,.2)"}} className="header-menu-item" onClick={() => {this.goApp('railways')}}><img src="../icon/train.svg" alt="train"/><p>Ж/д билеты</p></div>
								<div className="header-menu-item" onClick={() => {this.goApp('hotel')}}><img src="../icon/hotels.svg" alt="hotels"/><p>Отели</p></div>
								<div className="header-menu-item" onClick={() => {this.goApp('avia')}}><img src="../icon/avia.svg" alt="avia"/><p>Авиабилеты</p></div>
							</div>
							{btloginHead}
						</div>  
					</div>
			}
			else {
				header = 
					<div className="header-main" style={{height: this.state.headermain}}> 
						<div className="header-1"> 
							<div className="header-menu-bt" onClick={this.backApp}> <Icon24Back /> </div> 
							<div className="header-logo"><img src="../icon/logo.svg" alt="logo"/></div> 
							<div style={{width: "28px", height: "28px"}}></div>
						</div> 
					</div>
			}

		return (
			<div className="wrapper">
				<div className="header-ios"></div>
				{header}
				<div className="main-content" style={{height: this.state.maincontent}}>
					<div id="whitelabelOTTRailways"></div>
				</div>							
			</div>
		);
	}
}

export default Railways;