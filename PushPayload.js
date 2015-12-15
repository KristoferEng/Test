'use strict';

var React = require('react-native');
var moment = require('moment');

var {
  Text,
  View,
  Component,
  ListView,
  Image,
  StyleSheet
} = React;


class PushPayload extends Component {
	constructor(props){
		super(props);

		var ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});

		this.state = {
			dataSource: ds.cloneWithRows(props.pushEvent[5]),
			pushEvent: props.pushEvent
		};
	}

	renderRow(rowData){
		return(
			<View style={{
				flex: 1,
				justifyContent: 'center',
				borderColor: '#D7D7D7',
				borderBottomWidth: 1,
				paddingTop: 20,
				paddingBottom: 20,
				padding: 10
			}}>
				<Text><Text style={styles.bold}>{rowData.sha.substring(0,6)}</Text> - {rowData.message}</Text>
			</View>
		);
	}

	render(){

		return (
			<View style={{
				flex: 1,
				paddingTop: 80,
				justifyContent: 'flex-start',
				alignItems: 'center'
			}}>
				<Image
					source={{uri: this.state.pushEvent[0]}}
					style={{
						height: 120,
						width: 120,
						borderRadius: 60
					}} />
				<Text style={styles.bold}>{this.state.pushEvent[2]}</Text>
				<Text>pushed to <Text style={styles.bold}>{(this.state.pushEvent[3]).replace('refs/heads/', '')}</Text></Text>
				<Text> at <Text style={styles.bold}>{this.state.pushEvent[4]}</Text></Text>
				<Text style={{
					paddingTop: 40,
					fontSize: 20
				}}>
					{this.state.pushEvent[5].length} Commits
				</Text>

				<ListView
					contentInset={{
						top: -300
					}}
					dataSource={this.state.dataSource}
					renderRow={this.renderRow.bind(this)} />
			</View>
        )
	}

};

var styles = StyleSheet.create({
	bold: {
		fontWeight: '800',
		fontSize: 16
	}
});

module.exports = PushPayload;