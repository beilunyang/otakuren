import React, { Component } from 'react';
import {
	ScrollView,
	View,
	Text,
	StyleSheet,
} from 'react-native';
import Category from '../components/category';
import Search from '../components/search';
import ListComic from './list';
import LoadError from '../components/error';
import { Bubbles } from 'react-native-loader';
import { GET_COMIC_CATEGORYS, GET_COMIC_LIST } from '../utils/api'; 


class Home extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			categorys: [],
			isError: false,
			isLoaded: false,
		};
	}

	load() {
		this.setState({
			isError: false,
			isLoaded: false,
		});
		fetch(GET_COMIC_CATEGORYS())
			.then((res) => {
				if (res.status >= 200 && res.status < 300) {
					return res.json();
				}
				return Promise.reject(new Error(res.status));
			})
			.then((json) => {
				this.setState({ categorys: json, isLoaded: true });
			})
			.catch((err) => {
				this.setState({ isError: true, isLoaded: true });
			});
	}

	componentDidMount() {
		this.load();
	}

	handlePress(id, name, all_comics) {
		const nav = this.props.nav;
		if (nav) {
			nav.push({
				component: ListComic,
				params: {
					id,
					name,
					reqUrl: GET_COMIC_LIST,
					pages: Math.ceil(all_comics/20),
				},
			});
		}
	}

	render() {
		const categorys = [];
		this.state.categorys.forEach((v, i) => {
			categorys.push(<Category name={v.name} cover={v.cover_image} key={i} handlePress={this.handlePress.bind(this, v.id, v.name, v.all_comics)} />);
		});

		return (
			<View style={{flex: 1, backgroundColor: '#FFF'}}>
				<Text style={styles.header}>咔咪漫畫</Text>
				<ScrollView style={{flex: 1}} >
					<Search nav={this.props.nav}/>
					<View style={styles.scrollView}>
						{ categorys }
					</View>
				</ScrollView> 
				{!this.state.isLoaded?<View style={styles.abs}><Bubbles size={10} color='rgba(248,79,149,.4)'  /></View>:null}
				{this.state.isError?<LoadError reload={this.load.bind(this)} />:null}
			</View>
		);
	}

}

const styles = StyleSheet.create({
	header: {
		backgroundColor: '#F84F95',
		fontSize: 20,
	  	fontWeight: '800',
		color: '#FFF',
	  	textAlign: 'center',
	  	padding: 10,
		borderBottomWidth: 1,
	},
	scrollView: {
	  	flexDirection: 'row',
	    flexWrap: 'wrap',
	    alignItems: 'center',
	    padding: 10,
	    justifyContent: 'space-around',
	    paddingTop: 20,
	},
	abs: {
		position: 'absolute',
		left: 0, right: 0,
		top: 0, bottom: 0,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default Home;