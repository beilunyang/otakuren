import React, { Component } from 'react';
import {
	ListView,
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Dimensions,
} from 'react-native';
import { Bubbles } from 'react-native-loader';
import LoadError from '../components/error';
import { GET_COMIC_EP } from '../utils/api'; 
import { ajax } from '../utils/util';

class Reader extends Component {
	constructor(props) {
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			isLoaded: false,
			isTouch: false,
			pics: ds,
		};
		this.flag = false;
	}
	back() {
		const nav = this.props.nav;
		if (nav) {
			nav.pop();
		}
	}
	showToolbar() {
		if (this.state.isTouch) {
			this.setState({isTouch: false});
		} else {
			this.setState({isTouch: true});
		}
	}

	hideLoader() {
		if (this.state.isLoaded === false) {
			this.setState({isLoaded: true});
		}
	}

	load(i=0) {
		if (i > 10) {
			return this.setState({ isLoaded: true, isError: true });
		} 
		this.setState({
			isError: false,
			isLoaded: false,
		});
		this.flag = true;
		i++;
		ajax({
			url: GET_COMIC_EP(this.props.id, this.props.ep),
			success: (json) => {
				if (this.flag) {
					this.setState({
						pics: this.state.pics.cloneWithRows(json),
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

	render() {
		const self = this;
		const props = {
			dataSource: this.state.pics,
			renderRow(v) {
				const p = {
					source: {
						uri: v.url
					},
					style: {
						width: Dimensions.get('window').width,
						height: Dimensions.get('window').width*(v.height/v.width),
					},
					resizeMode: 'stretch',
					onLoad: self.hideLoader.bind(self),
				};
				return (<TouchableWithoutFeedback onPress={self.showToolbar.bind(self)}>
							<Image {...p}/>
						</TouchableWithoutFeedback>);
			}
		};
		return(	
			<View style={styles.container}>
				{this.state.isTouch?<View style={[styles.toolbar,this.props.isIOS?{paddingTop:20}:{paddingTop:10}]}>
						<TouchableOpacity onPress={this.back.bind(this)}>
							<View><Text style={styles.text}>&lt;返回</Text></View>
						</TouchableOpacity>
						<Text style={styles.text}>{'第'+this.props.ep+'話'}</Text>
					</View>:<View />
					// 此处，当isTouch为false时，渲染一个空View,因为如果false时不渲染任何组件，,会导致页面空白。不知道是不是RN自身bug 
				}
				{!this.state.isLoaded?<TouchableWithoutFeedback onPress={this.showToolbar.bind(this)}>
										<View style={styles.abs}>
											<Bubbles size={10} color='rgba(248,79,149,.4)' />
										</View>
									  </TouchableWithoutFeedback>:<View />}
				{this.state.isError?<TouchableWithoutFeedback onPress={this.showToolbar.bind(this)}>
										<View style={styles.loaderContainer}><LoadError reload={this.load.bind(this)} /></View>
									</TouchableWithoutFeedback>:null}
				<ListView {...props} />
			</View>			
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#FFF',
		justifyContent: 'center',
	},
	toolbar: {
		zIndex: 10,
		position: 'absolute',
		left:0,top:0,right:0,
		backgroundColor: 'rgba(0,0,0,.6)',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
		paddingBottom: 10,
	},
	text: {
		fontSize: 18,
		color: '#FFF',
	},
	loaderContainer: {
		backgroundColor: '#FFF',
		position: 'absolute',
		left: 0, right: 0,
		top: 0, bottom: 0,
	},
	abs: {
		position: 'absolute',
		left: 0, right: 0,
		top: 0, bottom: 0,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default Reader;