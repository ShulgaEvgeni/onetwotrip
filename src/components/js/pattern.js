import React from 'react';
// import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
// import { withRouter } from "react-router-dom";
// import Platform from 'react-platform-js'
import Icon24Back from '@vkontakte/icons/dist/24/browser_back';
// import '../css/Pattern.css';


class Pattern extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

  	backApp = () => { this.props.history.go(-1) }
  	
	render() {

			return (
				<div className="wrapper">
										
				</div>
			);
	}
}

export default Pattern;