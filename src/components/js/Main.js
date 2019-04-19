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
import Icon24Back from '@vkontakte/icons/dist/24/browser_back';
import connect from '@vkontakte/vkui-connect';


import { platform } from '@vkontakte/vkui';
const osname = platform();
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
var scrollTemp = 0;
const scrollTempS = 20;

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			burgerMenuOpen: false,
			indexADBlock: 0,
			indexInfoBlockSl: 0,
			InfoText: [],
			InfoBanner: [],
			InfoBannerL: 0,
		}
	}

	scroll = (e) => {
		if (window.innerWidth >= 936) {
			var scroll = document.getElementsByClassName("main-content");
			var heightHeader = document.getElementsByClassName('header-main');
			var heightHeader1 = document.getElementsByClassName('header-2-bottom');
			if (scroll[0].scrollTop > scrollTemp) {
				var a = heightHeader[0].clientHeight - scrollTempS + "px";
				console.log(a);
				heightHeader[0].style.height = a;
				heightHeader1[0].style.height = heightHeader1[0].clientHeight - scrollTempS + "px";
				scroll[0].style.height = "calc(100vh - " + heightHeader[0].clientHeight + "px)";
				scrollTemp = scroll[0].scrollTop;

			}
			if (scroll[0].scrollTop < scrollTemp) {
				var a = heightHeader[0].clientHeight + scrollTempS + "px";
				console.log(a);
				heightHeader[0].style.height = a;
				heightHeader1[0].style.height = heightHeader1[0].clientHeight + scrollTempS + "px";
				scroll[0].style.height = "calc(100vh - " + heightHeader[0].clientHeight + "px)";
				scrollTemp = scroll[0].scrollTop;

			}
		}
	}

	componentDidMount() {
		connect.send("VKWebAppSetViewSettings", { "status_bar_style": "light", "action_bar_color": "#212121" });
		if (osname === "android") {
			console.log("de android")
			var heightHeader = document.getElementsByClassName('header-main');
			var heightMainContent = document.getElementsByClassName('main-content');
			var heightBurgerMenu = document.getElementsByClassName('burger-menu');
			heightHeader[0].style.height = "58px";
			heightMainContent[0].style.height = "calc(100vh - 58px)";
			heightBurgerMenu[0].style.height = "calc(100vh - 58px)";
			heightBurgerMenu[0].style.top = "58px";
		}
		if (osname === "ios") { console.log("de ios") }
		this.props.history.replace('/');
		var that = this;
		axios
			.get('/content/infoText.json', {
				params: {},
			})
			.then(function (response) {
				that.setState({ InfoText: response.data.Text });
			});
		axios
			.get('/content/banners/infoBanner.json', {
				params: {},
			})
			.then(function (response) {
				if (window.innerWidth >= 936) {
					var temp = [];
					for (var i = 0; i < response.data.Info.length; i += 2) {
						var a
						if (response.data.Info[i + 1] == undefined) {
							a = [response.data.Info[i], response.data.Info[0]];
						}
						else {
							a = [response.data.Info[i], response.data.Info[i + 1]];
						}
						temp.push(a);
					}
					console.log(temp)
					var heightHeader = document.getElementsByClassName('header-main');
					heightHeader[0].style.minHeight = "130px";
					heightHeader[0].style.maxHeight = "256px";
					var heightMainContent = document.getElementsByClassName('main-content');
					heightMainContent[0].style.height = "calc(100vh - 256px)";
					var OtherContent = document.getElementsByClassName('other-content');
					OtherContent[0].style.marginLeft = "160px";
					OtherContent[0].style.marginRight = "160px";
					var Footer = document.getElementsByClassName('footer');
					Footer[0].style.marginLeft = "160px";
					Footer[0].style.marginRight = "160px";

					that.setState({
						InfoBanner: temp,
						InfoBannerL: Math.ceil(response.data.Info.length / 2),

					});
				}
				else {
					that.setState({ InfoBanner: response.data.Info, InfoBannerL: response.data.Info.length });
				}
			});
	}

	handleChangeIndexADBlock = indexADBlock => {
		this.setState({ indexADBlock });
	};

	handleChangeIndexInfoBlockSl = indexInfoBlockSl => {
		this.setState({ indexInfoBlockSl });
	};

	goApp = (ways) => { this.props.history.push('/' + ways); }

	//backApp = () => { this.props.history.go(-1) }

	changeStatusBurgerMenu = () => {
		// var munubt = document.getElementsByClassName('header-menu-bt');
		var burgerMenu = document.getElementsByClassName('burger-menu');
		if (this.state.burgerMenuOpen) {
			// munubt[0].style.transform = "rotate(0deg)";
			burgerMenu[0].style.left = "-100%";
		}
		else {
			// munubt[0].style.transform = "rotate(360deg)";
			burgerMenu[0].style.left = "0";
		}
		this.setState({ burgerMenuOpen: !this.state.burgerMenuOpen });
	}

	render() {

		let infoText;
		infoText = this.state.InfoText.map((data) =>
			<div className="info-block-slider-item">
				<p className="bottom">{data[1]}</p>
			</div>
		);

		let burgerMenuOpen;
		if (this.state.burgerMenuOpen) { burgerMenuOpen = <Icon24Back /> }
		else { burgerMenuOpen = <Icon28Menu /> }



		let baner; let btloginHead; let header; let mainContentBtUser; let mainContentMenu; let infoBlock; let supBlock; let supBlockLink
		if (window.innerWidth >= 936) {
			supBlock =
				<div className="sup-block">
					<div className="sup-block-item">
						<div className="sup-block-item-h">Звонок в поддержку</div>
						<p>+7 495 981 68 81</p>
						<p>+7 495 646 83 62</p>
					</div>
					<div className="sup-block-item">
						<div className="sup-block-item-h">Онлайн-звонок</div>
						<div style={{ display: "flex" }}>
							<img src="../icon/callIcon.svg" alt="callIcon" />
							<a href="skype:services.ott"><img src="../icon/skypeIcon.svg" alt="skypeIcon" /></a>
						</div>
					</div>
					<div className="sup-block-item">
						<div className="sup-block-item-h">Чат с оператором</div>
						<div style={{ display: "flex" }}>
							<a href="https://vk.com/im?sel=-24421945"><img src="../icon/vkIcon.svg" alt="vkIcon" /></a>
							<a href="tg://resolve?domain=onetwotrip_support_bot"><img src="../icon/teleIcon.svg" alt="teleIcon" /></a>
							<a href="https://www.facebook.com/messages/t/175064085850585"><img src="../icon/FBIcon.svg" alt="FBIcon" /></a>
							<a href="http://chats.viber.com/onetwotrip"><img src="../icon/viberIcon.svg" alt="viberIcon" /></a>
							<a ><img src="../icon/WAppIcon.svg" alt="WAppIcon" /></a>
						</div>
					</div>
				</div>
			supBlockLink =
				<div className="sup-block-link">
					<a href="//support.onetwotrip.com/hc/ru">ПОМОЩЬ 24 ЧАСА</a>
					<a href="https://www.onetwotrip.com/ru/about/">О КОМПАНИИ</a>
					<a href="https://www.onetwotrip.com/ru/loyalty/bonuses">БОНУСЫ</a>
					<a href="https://www.onetwotrip.com/ru/loyalty/gifts/">ПОДАРОЧНЫЙ СЕРТИФИКАТ</a>
					<a>СТРАХОВАНИЕ</a>
					<a>БЛОГ</a>
					<a>КАРЬЕРА</a>
					<a>ПАРТНЁРАМ</a>
					<a>АГЕНТАМ</a>
					<a>ОТЕЛЯМ</a>
					<a>КОРПОРАТИВНЫМ КЛИЕНТАМ</a>
					<a>ОТЗЫВЫ</a>
				</div>
			infoBlock =
				<div className="info-block-1">
					<div className="info-block-item-1" style={{ marginRight: "8px" }}>
						<img src="../icon/cheap.svg" alt="cheap" />
						<div className="info-block-item-text">
							<p className="top">Кешбэк с каждой покупки</p>
							<p className="bottom">10% за отели с предоплатой, 2% за авиабилеты и 3% за ж/д билеты (до 300р)</p>
						</div>
					</div>
					<div className="info-block-item-1" style={{ marginLeft: "8px", marginRight: "8px" }}>
						<img src="../icon/inertar.svg" alt="inertar" />
						<div className="info-block-item-text">
							<p className="top">Широкий инвентарь</p>
							<p className="bottom">800 авиакомпаний, 2 млн отелей и ж/д билеты по России и Европе</p>
						</div>
					</div>
					<div className="info-block-item-1" style={{ marginLeft: "8px" }}>
						<img src="../icon/support.svg" alt="support" />
						<div className="info-block-item-text">
							<p className="top">Поддержка 24 / 7</p>
							<p className="bottom">Ответим на ваши вопросы по телефону и в мессенджерах</p>
						</div>
					</div>
				</div>
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
				<div className="header-main" style={{ height: "256px", background: "#3a3a3a" }}>
					<div className="header-1">
						<div className="header-2">
							<div className="header-2-top">
								<div style={{ width: "72px" }}></div>
								<div className="header-logo"><img src="../icon/logo.svg" alt="logo" /></div>
								{btloginHead}
							</div>
							<div className="header-2-bottom">
								<div className="header-menu-item" onClick={() => { this.goApp('railways') }}><img src="../icon/train.svg" alt="train" />Ж/д билеты</div>
								<div className="header-menu-item" onClick={() => { this.goApp('hotel') }}><img src="../icon/hotels.svg" alt="hotels" />Отели</div>
								<div className="header-menu-item" onClick={() => { this.goApp('avia') }}><img src="../icon/avia.svg" alt="avia" />Авиабилеты</div>
							</div>
						</div>

					</div>
				</div>
			baner = this.state.InfoBanner.map((data) =>
				<div className="rek-block-item-dbl">
					<div className="rek-block-item" style={{ marginRight: "10px" }}>
						<img src={data[0]} alt="img" />
					</div>
					<div className="rek-block-item" style={{ marginLeft: "10px" }}>
						<img src={data[1]} alt="img" />
					</div>
				</div>
			);
		}
		else {
			infoBlock =
				<div className="info-block">
					<div className="info-block-item">
						<img src="../icon/cheap.svg" alt="cheap" />
						<div className="info-block-item-text">
							<p className="top">Кешбэк с каждой покупки</p>
							<p className="bottom">10% за отели с предоплатой, 2% за авиабилеты и 3% за ж/д билеты (до 300р)</p>
						</div>
					</div>
					<div className="info-block-item">
						<img src="../icon/inertar.svg" alt="inertar" />
						<div className="info-block-item-text">
							<p className="top">Широкий инвентарь</p>
							<p className="bottom">800 авиакомпаний, 2 млн отелей и ж/д билеты по России и Европе</p>
						</div>
					</div>
					<div className="info-block-item">
						<img src="../icon/support.svg" alt="support" />
						<div className="info-block-item-text">
							<p className="top">Поддержка 24 / 7</p>
							<p className="bottom">Ответим на ваши вопросы по телефону и в мессенджерах</p>
						</div>
					</div>
				</div>
			header =
				<div className="header-main">
					<div className="header-1">
						<div className="header-menu-bt" onClick={this.changeStatusBurgerMenu}> {burgerMenuOpen} </div>
						<div className="header-logo"><img src="../icon/logo.svg" alt="logo" /></div>
						<div style={{ width: "28px", height: "28px" }}></div>
					</div>
				</div>
			mainContentMenu = <div className="main-content-menu">
				<div className="main-content-menu-item" onClick={() => { this.goApp('railways') }}><img src="../icon/train.svg" alt="train" /><p>Ж/д билеты</p></div>
				<div className="main-content-menu-item" onClick={() => { this.goApp('hotel') }}><img src="../icon/hotels.svg" alt="hotels" /><p>Отели</p></div>
				<div className="main-content-menu-item" onClick={() => { this.goApp('avia') }}><img src="../icon/avia.svg" alt="avia" /><p>Авиабилеты</p></div>
			</div>
			if (this.props.statusUser) {
				mainContentBtUser = <div className="main-content-bt-user" onClick={() => { this.goApp('login') }}>
					<p>Личный кабинет</p>
					<img src="../icon/arrow-d-new.svg" alt="arrow-d-new" style={{ transform: "rotate(-90deg)" }} />
				</div>
			}
			else {
				mainContentBtUser = 
				<div className="main-content-bt-user" onClick={() => { this.goApp('login') }} >
					<p>Войти в личный кабинет</p>
					<img src="../icon/login.svg" alt="login" />
				</div>
			}
			baner = this.state.InfoBanner.map((data) =>
				<div className="rek-block-item">
					<img src={data} alt="img" />
				</div>
			);
		}

		return (
			<div className="wrapper">
				<div className="header-ios"></div>
				{header}
				<div className="main-content" onScroll={this.scroll}>
					<div>
						{mainContentMenu}
					</div>
					{mainContentBtUser}
					<div className="other-content">
						{infoBlock}
						<div className="info-block-slider">
							<p className="top"><b>Авиабилеты дешево</b></p>
							<AutoPlaySwipeableViews interval={7000} index={this.state.indexInfoBlockSl} onChangeIndex={this.handleChangeIndexInfoBlockSl}>
								{infoText}
							</AutoPlaySwipeableViews>
							<div className="info-block-control">
								<Pagination dots={this.state.InfoText.length} index={this.state.indexInfoBlockSl} onChangeIndex={this.handleChangeIndexInfoBlockSl} />
							</div>
						</div>
						{supBlock}
						{supBlockLink}
					</div>
					<div className="footer">
						<p>Содержимое сайта является объектом авторских прав. ©2018 OneTwoTrip Ltd. Все права защищены. Запрещается копировать, использовать, распространять, модифицировать любое содержимое этого сайта. OneTwoTrip не несет ответственности за информацию, представленную на внешних сайтах.</p>
					</div>
				</div>
				<div className="burger-menu">
					<div className="burger-menu-list-item">
						<div className="burger-menu-item" onClick={() => { this.goApp('avia') }}>
							<p>Авиабилеты</p><img src="../icon/avia.svg" alt="avia" />
						</div>
						<div className="burger-menu-item" onClick={() => { this.goApp('hotel') }}>
							<p>Отели</p><img src="../icon/hotels.svg" alt="hotels" />
						</div>
						<div className="burger-menu-item" onClick={() => { this.goApp('railways') }} >
							<p>Ж/д билеты</p><img src="../icon/train.svg" alt="train" />
						</div>
						<div className="burger-menu-item-bottom" onClick={() => { this.goApp('login') }} style={{ marginTop: "30px", width: "95%", marginLeft: "2.5%" }} >
							<p>Личный кабинет</p>
						</div>
						<div className="burger-menu-item-bottom" style={{ width: "95%", marginLeft: "2.5%" }}>
							<a href="https://support.onetwotrip.com/hc/ru">Поддержка 24/7</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Main; 