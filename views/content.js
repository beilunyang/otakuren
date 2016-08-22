import React, { Component } from 'react';
import {
	View,
	Image,
	Text,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import { Bubbles } from 'react-native-loader';
import Reader from './reader';
import LoadError from '../components/error';
import ContentInfo from '../components/contentInfo';
import Header from '../components/header';
import { GET_COMIC } from '../utils/api'; 
import { ajax } from '../utils/util';

class Content extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			description: '', 
			epCount: 0,
			isError: false,
			isLoaded: false,
		 };
		 this.flag = false;
		 this.timeout = true;
	}

	load(i=0) {
		if (i>10) {
			return this.setState({ isError: true, isLoaded: true });
		}
		this.setState({
			isError: false,
			isLoaded: false,
		});
		this.flag = true;
		i++;
		ajax({
			url: GET_COMIC(this.props.id),
			success: (json) => {
				if (this.flag) {
					this.setState({
						description: json.comic.description,
						epCount: json.ep_count,
						isLoaded: true,
					});
				}
			},
			error: (err) => {
				if (err.message === '0') {
					return this.load(i);
				}
				if (this.flag) {
					this.setState({ isError: true, isLoaded: true });
				}
			},
			timeout: 2000,
		});
	}

	componentDidMount() {
		this.load();
	}

	componentWillUnmount() {
		this.flag = false;
	}

	read(i) {
		const nav = this.props.nav;
		if (nav) {
			nav.push({
				component: Reader,
				params: { ep: i, id: this.props.id },
			});
		}
	}

	render() {
		const { cover, author, updated, finished, name, nav, id, isIOS } = this.props;
		const props = {
			cover,
			author,
			name,
			nav,
			id,
			isIOS,
		};
		const eps = [];
		let epCount = this.state.epCount;
		if (epCount) {
			for (let i = 1; i < epCount+1; i++) {
				eps.push(<TouchableOpacity key={i} style={styles.ep} onPress={this.read.bind(this, i)} isIOS={isIOS}><Text>第{i}話</Text></TouchableOpacity>);
			}
		}

		return(
			<View style={{backgroundColor: '#F2F2F2', flex: 1}}>
				<Header nav={this.props.nav} isIOS={this.props.isIOS}/>
				<View style={{backgroundColor: '#FFF'}}>
					<ContentInfo {...props} />
				</View>
				<Text style={styles.des}>{this.state.description?'简介:  ':''}{this.state.description}</Text>
				<View style={styles.ab}>
					<Text>{finished?'已完結':'連載中'}</Text>
					<Text>{updated?'最後更新:':''}{updated}</Text>
				</View>
				<View style={{flexDirection: 'row', marginTop: 10}}>
					{eps}
				</View>
				{!this.state.isLoaded?<View style={styles.center}><Bubbles size={10} color='rgba(248,79,149,.4)' /></View>:null}
				{this.state.isError?<LoadError reload={this.load.bind(this)} />:null}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	header: {
		backgroundColor: '#F84F95',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
	des: {
		paddingHorizontal: 20,
		paddingBottom: 20,
		paddingTop: 5,
		backgroundColor: '#FFF',
	},
	text: {
		color: '#FFF',
		fontSize: 18,
	},
	ab: {
		flexDirection: 'row', 
		justifyContent: 'space-between',
		paddingHorizontal: 15,
		marginTop: 10,
	},
	ep: {
		backgroundColor: '#FFF',
		borderWidth: .5,
		borderColor: '#CCC',
		borderRadius: 5,
		paddingHorizontal: 15,
		paddingVertical: 7,
		marginHorizontal: 10,
	},
	center: {
		flex: 1,
		marginTop: 40,
		alignItems: 'center',
	}


});

export default Content;
