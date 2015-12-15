'use strict';

var React = require('react-native');
var moment = require('moment');
var PushPayload = require('./PushPayload');

var {
  Text,
  View,
  Component,
  ListView,
  ActivityIndicatorIOS,
  Image,
  TouchableHighlight
} = React;


class Feed extends Component {
	constructor(props){
		super(props);

		var ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});

		this.state = {
			dataSource: ds,
			showProgress: true
		};
	}

	componentDidMount(){
		this.fetchFeed();
	}

	fetchFeed(){

		require('./AuthService').getAuthInfo((err, authInfo)=> {
			var url = 'https://api.github.com/users/'
				+ authInfo.user.login
				+ '/events';

			fetch(url, {
				headers: authInfo.header
			})
			.then((response)=> response.json())
			.then((responseData)=> {
				var feedItems = responseData.filter((ev)=> ev.type == 'PushEvent');
				var feedList = [];
				for (var i=0;i<feedItems.length;i++)
				{
					feedList.push([feedItems[i].actor.avatar_url,
						feedItems[i].created_at,
						feedItems[i].actor.login,
						feedItems[i].payload.ref,
						feedItems[i].repo.name,
						feedItems[i].payload.commits,
						feedItems[i].sha,
						feedItems[i].message
					]);
				}				this.setState({
					showProgress: false,
					dataSource: this.state.dataSource.cloneWithRows(feedList)});
					
			})
		});
	}

	pressRow(rowData){
		this.props.navigator.push({
			title: 'Push Event',
			component: PushPayload,
			passProps: {
				pushEvent: rowData
			}
		});
	}

	renderRow(rowData){
		return (
			<TouchableHighlight
				onPress={()=> this.pressRow(rowData)}
				underlayColor='#ddd'
			>
				<View style={{
					flex: 1,
					flexDirection: 'row',
					padding: 20,
					alignItems: 'center',
					borderColor: '#D7D7D7',
					borderBottomWidth: 1
				}}>
					<Image
						source={{uri: rowData[0]}}
						style={{
							height: 36,
							width: 36,
							borderRadius: 18
						}} />
					<View style={{
						paddingLeft: 20
					}}>
						<Text style={{backgroundColor: '#fff'}}>
							{moment(rowData[1]).fromNow()}
						</Text>
						<Text style={{backgroundColor: '#fff'}}>
							{rowData[2]} pushed to
						</Text>
						<Text style={{backgroundColor: '#fff'}}>
							{rowData[3].replace('refs/heads/','')}
						</Text>
						<Text style={{backgroundColor: '#fff'}}>
							at <Text style={{
								fontWeight: "600"
							}}>{rowData[4]}</Text>
						</Text>
					</View>
				</View>
			</TouchableHighlight>

		);
	}

	render(){
		if(this.state.showProgress){
			return (
				<View style={{
					flex: 1,
					justifyContent: 'center'
				}}>
					<ActivityIndicatorIOS
						size="large"
						animating={true} />
				</View>
			);
		}

		return (
			<View style={{
				flex: 1,
				justifyContent: 'flex-start',
				marginTop: 60
			}}>
				<ListView
					dataSource={this.state.dataSource}
					renderRow={this.renderRow.bind(this)} />
			</View>
        )
	}

};



module.exports = Feed;