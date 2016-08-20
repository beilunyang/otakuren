import React, { Component } from 'react';
import {
	ListView,
	View,
	Text,
	StyleSheet,
	ToastAndroid,
	TouchableOpacity,
	InteractionManager,
} from 'react-native';
import { Bubbles } from 'react-native-loader';
import Category from '../components/category';
import ListItem from '../components/listItem';
import LoadError from '../components/error';
import Header from '../components/header';
import Content from './content';


class ListComic extends Component {
	constructor(props) {
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			comics: ds,
			isError: false,
			isLoaded: true,
		};
		this.page = 1; // 當前頁數
		this.originData = []; 
		this.reqLock = false; // 請求鎖
		this.reqUrl = this.props.id?this.props.reqUrl.bind(this, this.props.id):this.props.reqUrl.bind(this, this.props.searchValue);
	}

	load() {
		this.setState({
			isError: false,
			isLoaded: false,
		});
		
		fetch(this.reqUrl())
			.then((res) => {
				if (res.status >= 200 && res.status < 300) {
					return res.json();
				}
				return Promise.reject(new Error(res.status));
			})
			.then((json) => {
				this.originData = json;
				this.setState({comics: this.state.comics.cloneWithRows(json), isLoaded: true});
			})
			.catch((err) => {
				this.setState({ isError: true, isLoaded: true })
			});
	}

	componentDidMount() {
		// 所有动画执行完成后执行回调，so isLoaded初始化值为true
		InteractionManager.runAfterInteractions(() => this.load());
	}

	navToContent(params, nav) {
		if (nav) {
			nav.push({
				component: Content,
				params,
			});
		}
	}

	showMore() {
		if (this.page < this.props.pages || this.props.pages === undefined) {
			this.reqLock = true; // 獲得請求鎖，優化重複加載
			//fetch(GET_COMIC_LIST(this.props.id, this.page+1))
			fetch(this.reqUrl(this.page+1))
				.then((res) => {
					if (res.status >= 200 && res.status < 300) {
						return res.json();
					}
					return Promise.reject(new Error(res.status));
				})
				.then((json) => {
					this.reqLock = false; // 釋放鎖
					this.originData = this.originData.concat(json);
					this.setState({comics: this.state.comics.cloneWithRows(this.originData)});
					this.page++;
				})
				.catch((err) => {
					this.reqLock = false;
					// 这里有点bug
					ToastAndroid.show('加載更多數據失敗\n移動一下重新加載', ToastAndroid.SHORT);
				});	
		}
	}

	render() {
		const self = this;
		const props = {
			dataSource: this.state.comics,
			renderRow(v) {
				const p = {
					author: v.author,
					updated: v.updated_at,
					name: v.name,
					finished: Number(v.finished),
					cover: v.cover_image,
					navToContent: self.navToContent,
					nav: self.props.nav,
					id: self.props.id,
				};
				return <ListItem {...p}  />
			},
			onEndReached() {
				if (!self.reqLock) {
					self.showMore();
				}
			},
			initialListSize: 10,
			removeClippedSubviews: true,
			onEndReachedThreshold: 20,
			renderFooter() {
				if (self.originData.length !== 0 && self.page+1 < self.props.pages) {
					return <Text style={{textAlign: 'center', paddingVertical: 15}}>正在加載</Text> ;
				}
			}
		};
		return(
			<View style={styles.container}>
				<Header nav={this.props.nav} name={this.props.name} />
				<ListView  {...props} />
				{!this.state.isLoaded?<View style={styles.abs}><Bubbles size={10} color='rgba(248,79,149,.4)'  /></View>:null}
				{this.state.isError?<LoadError reload={this.load.bind(this)} />:null}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFF',
	},
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
	catName: {
		marginVertical: 10,
		color: '#FFF',
		fontSize: 20,
	},
	abs: {
		position: 'absolute',
		left: 0, right: 0,
		top: 0, bottom: 0,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default ListComic;