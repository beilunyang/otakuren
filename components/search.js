import React, { Component } from 'react';
import {
	View,
	Text,
	TextInput,
	StyleSheet,
} from 'react-native';
import { SEARCH_COMICS } from '../utils/api';
import ListComic from '../views/list';

class Search extends Component {
	constructor(props) {
		super(props);
	}

	handleSumbit(e) {
		const nav = this.props.nav;
		if (nav) {
			nav.push({
				component: ListComic,
				params: {
					searchValue: e.nativeEvent.text,
					reqUrl: SEARCH_COMICS,
					isIOS: this.props.isIOS,
				} 
			});
		}
	}

	render() {
		const props = {
			placeholder: '裝填彈藥吧biubiu',
			underlineColorAndroid: 'transparent',
			onSubmitEditing: this.handleSumbit.bind(this),
			style: styles.searchInput,
			autoCorrect: false,
			autoCapitalize: 'none',
			keyboardType: 'default',
			selectionColor: '#F84F95',
		};
		return (
			<View style={styles.search}>
				<TextInput {...props} />
			</View>
		);
	}

}




const styles = StyleSheet.create({ 
  search: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 20, 
    marginHorizontal: 20,
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    paddingHorizontal: 10,
  }, 
  searchInput: {
    flex: 1,
    fontSize: 18,
    //paddingVertical: 5,
    height: 50,
    textAlign: 'center',
    color: '#233',
  },

});

export default Search;