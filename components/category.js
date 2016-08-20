import React, { Component } from 'react';
import {
	Image,
	Text,
	View,
	TouchableOpacity,
	StyleSheet,
} from 'react-native';

class Category extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<TouchableOpacity onPress={this.props.handlePress} >
				<View>
					<Image source={{uri: this.props.cover}} style={styles.img}/>
					<Text style={styles.cateName}>{this.props.name}</Text>
				</View>
			</TouchableOpacity>
		);
	}
	
}

const styles = StyleSheet.create({
	 img: {
	    borderRadius: 6,
	    height: 100,
	    width: 100,
	  },
	  cateName: {
	    alignSelf: 'center',
	    justifyContent: 'center',
	    marginBottom: 15,
  	  },
});

export default Category;