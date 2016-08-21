import React, { Component } from 'react';
import {
	Navigator,
	BackAndroid,
	ToastAndroid,
	Platform,
} from 'react-native';
import codePush from "react-native-code-push";
import Home from './home';

class App extends Component {
	constructor(props) {
		super(props);
		this.isIOS = Platform.OS === 'ios'?true:false;
	}

	// 初始化时就通过箭头函数绑定this，方便日后removeEventListener.
	// 详见：http://bbs.reactnative.cn/topic/15/react-react-native-%E7%9A%84es5-es6%E5%86%99%E6%B3%95%E5%AF%B9%E7%85%A7%E8%A1%A8/2
	onBackAndroid = () => {
	    const nav = this.refs.nav;
	    const routers = nav.getCurrentRoutes();
	    if (routers.length > 1) {
	      nav.pop();
	      return true;
	    }
	    if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
	      return false;
	    }
	    this.lastBackPressed = Date.now();
	    ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
	    return true;
  	}

	componentDidMount() {
		if (!this.isIOS) {
			BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
		}
	}

	componentWillUnmount() {
	   if (!this.isIOS) {
	     BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
	   }
	 }

	render() {
		const props = {
			initialRoute: { 
				component: Home,
				params: { isIOS: this.isIOS },
			},
			configureScene(route) {
				return Navigator.SceneConfigs.VerticalUpSwipeJump;
			},
			renderScene(route, navigator) {
				const Comp = route.component;
				return <Comp nav={navigator} {...route.params}/>
			},
		};

		return (
			<Navigator {...props} ref='nav' />
		);
	}
}

export default codePush(App);


