import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';

class ListItem extends Component {
	constructor(props) {
		super(props);
		this.state = { cover: require('../public/defaultCover.jpg') }
	}

	handlePress(params, nav) {
		const navToContent = this.props.navToContent;
		if (navToContent) {
			navToContent(params, nav);
		}
	}

	componentDidMount() {
		// 优化listView卡顿问题,当图片过大时，渲染需要消耗更多时间。而图片尺寸往往与图片大小成正比
		Image.getSize(this.props.cover, (width, height) => {
			if (width > 1000 || height > 1500) {
				return;
			}
			this.setState({ cover: { uri: this.props.cover } });
		}, (err) => {return;});
	} 

	render() {
		const { author, updated, finished, cover, navToContent, nav, name, id, isIOS } = this.props;
		const params = {
			author,
			updated,
			finished,
			cover,
			name,
			id,
			isIOS,
		};

		return (
			<TouchableOpacity onPress={this.handlePress.bind(this, params, nav)} style={{overflow: 'hidden'}}>
				<View style={styles.container}>
					<Image source={this.state.cover} style={styles.cover} />
					<View style={styles.info}>
						<Text style={styles.title}>{name}</Text>
						<Text>{author?'作者:  ':''}{author}</Text>
						<Text>{updated?'更新:  ':''}{updated}</Text>
						<Text style={finished?{color: 'yellowgreen'}:{color: '#F84F95'}}>{finished?'已完结':'连载中'}</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		paddingVertical: 10,
		borderBottomWidth: .5,
		borderBottomColor: '#EEE',
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

});

export default ListItem;