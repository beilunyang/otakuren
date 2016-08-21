import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import Home from '../views/home';

class Header extends Component {
	constructor(props) {
		super(props);
	}

	back() {
		const nav = this.props.nav;
		if (nav) {
			nav.pop();
		}
	}

	search() {
		const nav = this.props.nav;
		if (nav) {
			nav.push({
				component: Home,
			});
		}
	}

	render() {
		return (
			<View style={[styles.header, this.props.isIOS?{paddingTop:13, zIndex:1000}:null]}>
				<TouchableOpacity onPress={this.back.bind(this)}> 
					<Text style={styles.back} >&lt;返回</Text>
				</TouchableOpacity>
				<Text style={styles.title}>{this.props.name || '咪咔漫畫'}</Text>
				<TouchableOpacity onPress={this.search.bind(this)}> 
					<Text style={styles.back} >搜索</Text>
				</TouchableOpacity>
			</View>
		);
	}

}

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: '#F84F95',
		paddingHorizontal: 20,
	},
	back: {
		flex: 1,
		paddingTop: 12,
		color: '#FFF',
		fontSize: 18,
	},
	title: {
		marginVertical: 10,
		color: '#FFF',
		fontSize: 20,
	},
});

export default Header;