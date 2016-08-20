import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';

class LoadError extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
				<View style={styles.abs}>
					<TouchableOpacity onPress={this.props.reload.bind(this)}>
						<View style={{justifyContent:'center',alignItems:'center'}}>
							<Text style={{marginBottom: 10}}>加载失败</Text>
							<Image source={require('../public/reload.png')} />
						</View>
					</TouchableOpacity>
				</View>
		);
	}
}

const styles = StyleSheet.create({
	abs: {
		position: 'absolute',
		left: 0, right: 0,
		top: 0, bottom: 0,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 10,
	},
});

export default LoadError;