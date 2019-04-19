import React from 'react';
import connect from '@vkontakte/vkui-connect';
// import '@vkontakte/vkui/dist/vkui.css';
import { Route } from "react-router-dom";
import './App.css';
import './components/css/Login.css';
import './components/css/Main.css';
import Main from './components/js/Main';
import Railways from './components/js/Railways';
import Avia from './components/js/Avia';
import Hotel from './components/js/Hotel';
import Login from './components/js/Login';

var TERM_URL;

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			userConnect: false,
			fetchedUser: null,
			statusUser: false,
			gadgetPath: null,
			gadgetId: null,
			TERM_URL: null,
		};
	}

	changeStatusUser = (val) => {
		this.setState({ statusUser: val });
	}

	loadWL = (config) => {
		const hash = Date.now();
		const container = document.getElementById("whitelabelOTT");
		const scrollBlock = document.getElementById('scroll-block');
		container.innerHTML = "";
		console.log(config);
		const gadgetConfig = config || {};
		gadgetConfig.nodeToScroll = scrollBlock;
		gadgetConfig.test = {
			testPayment: true,
			ENVID: "sandbox-18",
		};
		window[`config_${this.state.gadgetId}`] = gadgetConfig;
		const script = document.createElement('script');
		script.src = `${this.state.gadgetPath}${this.state.gadgetId}.js?_=${hash}&ENVID=sandbox-18`;
		script.async = true;
		container.appendChild(script);
	}

	startApp = (gadgetPath, gadgetId, config) => {
		this.setState({
			gadgetPath: gadgetPath,
			gadgetId: gadgetId,
		})
		setTimeout(() => {
			window[`gadget_ready_${this.state.gadgetId}`] = () => {
				window[`gadget_${this.state.gadgetId}`].facade.on('vkpay', (payload) => {
					console.log("qwe2")
					if (!payload.TermUrl) {
						console.error('Отсутствует TermUrl');
						this.loadWL();
						return;
					}
					if (!payload.vkPayData) {
						console.error('Отсутствует vkPayData');
						this.loadWL();
						return;
					}
					localStorage.setItem('termURL', payload.TermUrl);
					// this.state.TERM_URL = payload.TermUrl;
					TERM_URL = payload.TermUrl;
					// this.setState({TERM_URL: payload.TermUrl})
					window[`gadget_${this.state.gadgetId}`].destroy();
					console.log('Отправка запроса VK Pay');
					console.log(payload.vkPayData);
					connect.send("VKWebAppOpenPayForm", { "app_id": 6777015, "action": "pay-to-service", "params": payload.vkPayData })
				});
			};
			this.loadWL(config);
		}, 1)
	}

	componentDidMount() {
		connect.subscribe((e) => {
			switch (e.detail.type) {
				case 'VKWebAppGetUserInfoResult':
					this.setState({ fetchedUser: e.detail.data });
					break;
				case 'VKWebAppAccessTokenReceived':
					this.setState({ token: e.detail.data.access_token });
					break;
				case 'VKWebAppOpenPayFormResult':
					console.log(e.detail.data);
					if (e.detail.data.status) {
						const extraData = JSON.parse(e.detail.data.extra);
						const PaRes = {
							paymentToken: {
								orderId: extraData.order_id,
								transactionId: e.detail.data.transaction_id
							}
						};
						console.log(TERM_URL);
						if (TERM_URL == null) {
							console.error('Отсутствует TERM_URL после удачной оплаты!!!');
							this.loadWL();
							return;
						}
						console.log('Оплата vk прошла успешно');
						const fullTermUrl = `${TERM_URL}&PaRes=${encodeURIComponent(JSON.stringify(PaRes))}`;
						this.startApp(this.state.gadgetPath, this.state.gadgetId, { gadget: { host: fullTermUrl } })
					} else {
						console.warn('Оплата vk прошла с ошибкой');
						console.log(e.detail.data);
						this.loadWL();
					}
					break;
				case 'VKWebAppOpenPayFormFailed':
					console.warn('Оплата vk прошла с ошибкой');
					console.log(e.detail.data);
					this.loadWL();
					break;
				default:
					console.log(e.detail.type);
			}
		});
		connect.send('VKWebAppGetUserInfo', {});
		connect.send("VKWebAppSetViewSettings", { "status_bar_style": "light", "action_bar_color": "#212121" });
	}

	render() {
		if (this.state.userConnect) {
			
		}
		else {
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
								startApp={this.startApp}
							/>}
						/>
						<Route exact path="/avia" render={props =>
							<Avia {...props}
								statusUser={this.state.statusUser}
								changeStatusUser={this.changeStatusUser}
								startApp={this.startApp}
							/>}
						/>
						<Route exact path="/hotel" render={props =>
							<Hotel {...props}
								statusUser={this.state.statusUser}
								changeStatusUser={this.changeStatusUser}
								startApp={this.startApp}
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
}

export default App;
