import React, { Component } from 'react';
import {
	Image,
	Text,
	View,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
} from 'react-native';

class Category extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<TouchableOpacity onPress={this.props.handlePress} >
				<View>
					<Image source={{uri: this.props.cover}} style={{borderRadius: 6, width: this.props.imgWH, height: this.props.imgWH}}/>
					<Text style={styles.cateName}>{this.props.name}</Text>
				</View>
			</TouchableOpacity>
		);
	}
	
}

const styles = StyleSheet.create({
	  cateName: {
	    alignSelf: 'center',
	    justifyContent: 'center',
	    marginBottom: 15,
  	  },
});

Category.defaultProps = {
	imgWH: Dimensions.get('window').width < 360?(Dimensions.get('window').width-60)/3: 100
};

export default Category;