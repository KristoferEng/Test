'use strict';

var React = require('react-native');
var SearchResults = require('./SearchResults');

var {
  Text,
  View,
  TextInput,
  Component,
  TouchableHighlight,
  StyleSheet
} = React;

class Search extends Component {
	constructor(props){
		super(props);

		this.state = {
			searchQuery: true
		}
	}

	render(){

		return (
			<View style={styles.container}>
				<TextInput
					onChangeText={(text)=> this.setState({
						searchQuery: text
					})}
					style={styles.input}
					placeholder="Search Query"/>
				<TouchableHighlight
					onPress={this.onSearchPressed.bind(this)}
					style={styles.button}>
					<Text style={styles.buttonText}>
						Search
					</Text>
				</TouchableHighlight>

			</View>
		);
	}

	onSearchPressed(){
		this.props.navigator.push({
			title: 'Results',
			component: SearchResults,
			passProps: {
				searchQuery: this.state.searchQuery
			}
		});
	}
};

var styles = StyleSheet.create({
	container: {
		backgroundColor: '#ADE044',
		flex: 1,
		paddingTop: 100,
		padding: 10,
		alignItems: 'center'
	},
	logo: {
		width: 66,
		height: 55
	},
	heading: {
		fontSize: 30,
		marginTop: 10
	},
	input: {
		height: 50,
		marginTop: 10,
		padding: 4,
		fontSize: 18,
		borderWidth: 1,
		borderColor: '#48bbec'
	},
	button: {
		height: 50,
		backgroundColor: '#48BBEC',
		alignSelf: 'stretch',
		marginTop: 10,
		justifyContent: 'center'
	},
	buttonText: {
		fontSize: 22,
		color: '#fff',
		alignSelf: 'center'
	}
});

module.exports = Search;