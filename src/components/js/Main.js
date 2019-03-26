import React from 'react';
import axios from 'axios';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Pagination from '../modules/Pagination';
//import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
//import { withRouter } from 'react-router-dom';
//import Platform from 'react-platform-js';
//import Icon24Back from '@vkontakte/icons/dist/24/browser_back';
import Icon28Menu from '@vkontakte/icons/dist/28/menu';
import Icon28Add from '@vkontakte/icons/dist/28/add_outline';
import '../css/Main.css';

import { platform } from '@vkontakte/vkui';
const osname = platform();
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			burgerMenuOpen: false,
			indexADBlock: 0,
			indexInfoBlockSl: 0,
			headermain: "58px",
			burgermenu: "calc(100vh - 58px)",
			burgermenuTop: "58px",
			maincontent: "calc(100vh - 58px)",
			InfoText: [],
			InfoBanner: [],
			InfoBannerL: 0,
		}
	}

	

  	componentDidMount() {
  		console.log(osname);
		if(osname === "ios"){ 
			this.setState({
				headermain: "45px",
				burgermenu: "calc(100vh - 45px - env(safe-area-inset-top))",
				burgermenuTop: "calc(45px + env(safe-area-inset-top))",
				maincontent: "calc(100vh - 45px - env(safe-area-inset-top) - env(safe-area-inset-bottom))"  
			})
		}
		if(osname === "android"){ console.log("de android") }
		this.props.history.replace('/');
		var that = this; 
		axios
			.get('/content/infoText.json', {
				params: {},								
			})
			.then(function (response) {
				that.setState({InfoText: response.data.Text});
		});
		axios
			.get('/content/banners/infoBanner.json', {
				params: {},								
			})
			.then(function (response) {
				if (window.innerWidth >= 936){
					var temp = [];
					for (var i = 0; i < response.data.Info.length; i+=2) {
						var a
						if (response.data.Info[i+1] == undefined) {
							a = [response.data.Info[i], response.data.Info[0]];
						}
						else {
							a = [response.data.Info[i], response.data.Info[i+1]];
						}
					 	temp.push(a);
					} 
					console.log(temp)
					that.setState({InfoBanner: temp, InfoBannerL: Math.ceil(response.data.Info.length/2)});
				}
				else{
					that.setState({InfoBanner: response.data.Info, InfoBannerL: response.data.Info.length});
				}				
		});
	}

	handleChangeIndexADBlock = indexADBlock => {
	    this.setState({ indexADBlock });
	};

	handleChangeIndexInfoBlockSl = indexInfoBlockSl => {
	    this.setState({ indexInfoBlockSl });
	};

	goApp = (ways) => { this.props.history.push('/'+ways); }
  	
  	//backApp = () => { this.props.history.go(-1) }

  	changeStatusBurgerMenu = () => {
  		var munubt = document.getElementsByClassName('header-menu-bt');
  		var burgerMenu = document.getElementsByClassName('burger-menu');
  		if(this.state.burgerMenuOpen){
			munubt[0].style.transform = "rotate(0deg)";
			burgerMenu[0].style.left = "-100%";
  		}
  		else{
  			munubt[0].style.transform = "rotate(45deg)";
  			burgerMenu[0].style.left = "0";
  		}
  		this.setState({burgerMenuOpen: !this.state.burgerMenuOpen});  		
  	}

	render() {

		let infoText;
		infoText = this.state.InfoText.map((data) =>
			<div className="info-block-slider-item"> 									
				<p className="bottom"><b>{data[0]}</b><br/>{data[1]}</p>
			</div>
		);

		let burgerMenuOpen;
		if (this.state.burgerMenuOpen){ burgerMenuOpen = <Icon28Add/> }
		else { burgerMenuOpen = <Icon28Menu/> }

		

		let baner; let btloginHead; let header; let mainContentBtUser; let mainContentMenu
		if (window.innerWidth >= 936){
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
							<div className="header-logo"><img src="../icon/logo.svg" alt="logo"/></div> 
							<div className="header-menu-item" onClick={() => {this.goApp('railways')}}><img src="../icon/train.svg" alt="train"/><p>Ж/д билеты</p></div>
							<div className="header-menu-item" onClick={() => {this.goApp('hotel')}}><img src="../icon/hotels.svg" alt="hotels"/><p>Отели</p></div>
							<div className="header-menu-item" onClick={() => {this.goApp('avia')}}><img src="../icon/avia.svg" alt="avia"/><p>Авиабилеты</p></div>
						</div>
						{btloginHead}
					</div>  
				</div>
			baner = this.state.InfoBanner.map((data) =>
				<div className="rek-block-item-dbl">
					<div className="rek-block-item" style={{marginRight: "10px"}}>
						<img src={data[0]} alt="img"/>
					</div>
					<div className="rek-block-item" style={{marginLeft: "10px"}}>
						<img src={data[1]} alt="img"/>
					</div>
				</div>
			);	
		}
		else{
			header = 
				<div className="header-main" style={{height: this.state.headermain}}> 
					<div className="header-1"> 
						<div className="header-menu-bt" onClick={this.changeStatusBurgerMenu}> {burgerMenuOpen} </div> 
						<div className="header-logo"><img src="../icon/logo.svg" alt="logo"/></div> 
						<div style={{width: "28px", height: "28px"}}></div>
					</div> 
				</div>
			mainContentMenu =  <div className="main-content-menu">
									<div className="main-content-menu-item" onClick={() => {this.goApp('railways')}}><img src="../icon/train.svg" alt="train"/><p>Ж/д билеты</p></div>
									<div className="main-content-menu-item" onClick={() => {this.goApp('hotel')}}><img src="../icon/hotels.svg" alt="hotels"/><p>Отели</p></div>
									<div className="main-content-menu-item" onClick={() => {this.goApp('avia')}}><img src="../icon/avia.svg" alt="avia"/><p>Авиабилеты</p></div>
								</div>
			if(this.props.statusUser){
				mainContentBtUser = <div className="main-content-bt-user" onClick={()=>{this.goApp('login')}}>
										<p>Личный кабинет</p>
										<img src="../icon/arrow-d-new.svg" alt="arrow-d-new" style={{transform: "rotate(-90deg)"}}/>
									</div>
			}
			else{
				mainContentBtUser = <div className="main-content-bt-user" onClick={()=>{this.goApp('login')}} >
										<p>Войти в личный кабинет</p>
										<img src="../icon/login.svg" alt="login"/>
									</div>
			}
			baner = this.state.InfoBanner.map((data) =>
				<div className="rek-block-item">
					<img src={data} alt="img"/>
				</div>
			);
		}

		return (
			<div className="wrapper">
				<div className="header-ios"></div> 
				{header} 
				<div className="main-content" style={{height: this.state.maincontent}}>
				<div>
					{mainContentMenu}					
				</div>
					{mainContentBtUser}
					<div className="othet-content">
						<div className="rek-block">
							
							<div className="rek-block-content">
								<AutoPlaySwipeableViews interval={5000} index={this.state.indexADBlock} onChangeIndex={this.handleChangeIndexADBlock}>
									{baner}
								</AutoPlaySwipeableViews>
								<div className="rek-block-control">
									<Pagination dots={this.state.InfoBannerL} index={this.state.indexADBlock} onChangeIndex={this.handleChangeIndexADBlock} />
								</div>
							</div>							
						</div>
						<div className="info-block">
							<div className="info-block-item">
								<img src="../icon/cheap.svg" alt="cheap"/>
								<div className="info-block-item-text">
									<p className="top">Вернём до 10% с покупки</p>
									<p className="bottom">на бонусный счет для оплаты будущих путешествий</p>
								</div>
							</div>
							<div className="info-block-item">
								<img src="../icon/push.svg" alt="push"/>
								<div className="info-block-item-text">
									<p className="top">Цены ещё ниже</p>
									<p className="bottom">в мобильном приложении OneTwoTrip, получите ссылку на скачивание</p>
								</div>
							</div>
							<div className="info-block-item">
								<img src="../icon/support.svg" alt="support"/>
								<div className="info-block-item-text">
									<p className="top">Поддержка 24 / 7</p>
									<p className="bottom">Ответим на ваши вопросы по телефону и в мессенджерах</p>
								</div>
							</div>
						</div>
						<div className="info-block-slider">
							<p className="top"><b>Авиабилеты дешево</b></p>
							<AutoPlaySwipeableViews interval={15000} index={this.state.indexInfoBlockSl} onChangeIndex={this.handleChangeIndexInfoBlockSl}>
								{infoText}
							</AutoPlaySwipeableViews>
							<div className="info-block-control">
								<Pagination dots={this.state.InfoText.length} index={this.state.indexInfoBlockSl} onChangeIndex={this.handleChangeIndexInfoBlockSl} />
							</div>
						</div>
					</div>
					<div className="footer">
						<p>Содержимое сайта является объектом авторских прав. ©2018 OneTwoTrip Ltd. Все права защищены. Запрещается копировать, использовать, распространять, модифицировать любое содержимое этого сайта. OneTwoTrip не несет ответственности за информацию, представленную на внешних сайтах.</p>
					</div>
				</div>
				<div className="burger-menu" style={{height: this.state.burgermenu, top: this.state.burgermenuTop}}>
					<div className="burger-menu-list-item"> 
						<div className="burger-menu-item" onClick={() => {this.goApp('avia')}}>
							<p>Авиабилеты</p><img src="../icon/avia.svg" alt="avia"/>
						</div>
						<div className="burger-menu-item" onClick={() => {this.goApp('hotel')}}>
							<p>Отели</p><img src="../icon/hotels.svg" alt="hotels"/>
						</div>
						<div className="burger-menu-item" onClick={() => {this.goApp('railways')}}>
							<p>Ж/д билеты</p><img src="../icon/train.svg" alt="train"/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Main; 