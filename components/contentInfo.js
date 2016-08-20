import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import Reader from '../views/reader';

class ContentInfo extends Component {
	constructor(props) {
		super(props);
	}

	readOne() {
		const nav = this.props.nav;
		if (nav) {
			nav.push({
				component: Reader,
				params: { ep: 1, id: this.props.id },
			});
		}
	}

	render() {
		const { cover, name, author, read } = this.props;
		return (
			<View style={styles.container}>
				<Image source={{uri: cover}} style={styles.cover}/>
				<View style={styles.info}>
					<Text style={styles.title}>{name}</Text>
					<Text>{author?'作者:  ':''}{author}</Text>
					<View style={{flexDirection: 'row'}}>
						<TouchableOpacity style={styles.touch} activeOpacity={.7} onPress={this.readOne.bind(this)}>
							<Text style={{color: '#FFF'}}>開始閱讀</Text>
						</TouchableOpacity>
						{/*<TouchableOpacity style={styles.touch} activeOpacity={.7}>
							<Text style={{color: '#FFF'}}>下載漫畫</Text>
						</TouchableOpacity> */}
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		paddingVertical: 10,
	},
	cover: {
		alignSelf: 'center',
		width: 90,
		height: 120,
		marginLeft: 15,
		borderRadius: 5,
	},
	info: {
		flex: 1,
		paddingHorizontal: 10,
		justifyContent: 'space-around',
	},
	title: {
		color: '#000',
	},
	touch: {
		backgroundColor: '#F84F95',
		borderWidth: .5,
		borderColor: '#CCC',
		borderRadius: 5,
		paddingHorizontal: 15,
		paddingVertical: 7,
		marginRight: 20,
	},
});

export default ContentInfo;