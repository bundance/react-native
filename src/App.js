import React, { Component } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { getChatLog } from './state/messages/messages.actions';
import { getMembers } from './state/members/members.actions';
import { getRichMessages } from './state/messages/messages.selectors';
import { selectMembers } from './state/members/members.selectors';


/**
 * ListItme - renders an individual List Item
 */
class ListItem extends React.PureComponent {
  
  state = {
    showEmail: false
  }
  
  changeShowEmailState = showEmail => this.setState({ showEmail });

  render() {
    const { item } = this.props;
    const { showEmail } = this.state;
    
    const avatar = item && item.member && item.member.avatar;

    return (
      <TouchableWithoutFeedback 
        onPressIn={() => this.changeShowEmailState(true)}
        onPressOut={() => this.changeShowEmailState(false)}
      >
        <View style={styles.listItem}>
          <Image style={{width: 100, height: 100}} source={{ uri: avatar }}/>
          <View>
            <Text style={styles.timestamp}>{ item.messageBody.timestamp }</Text>
            <Text style={styles.message}>
              { item.messageBody.message }
            </Text>
            { showEmail && <Text style={styles.email}>{item && item.member && item.member.email}</Text> }
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}


/**
 * Main App component - renderes a List of messages
 */
class App extends Component {
  
  componentDidMount(){
    this.props.getChatLog();
    this.props.getMembers();
  }

  keyExtractor = item => (item && item.messageBody.id)

  renderItem = ({item}) => (
    <ListItem item={item}/>
  );

  render() {
    const { messages } = this.props;
    
    return (
      <View style={styles.container}>
        <FlatList
          data={messages}
          extraData={this.state}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem} 
        />
      </View>
    );
  }
}

// Connect App to the Redux store
const mapStateToProps = state => ({
  members: selectMembers(state),
  messages: getRichMessages(state)
});

const mapDispatchToProps = ({
  getChatLog,
  getMembers
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);


// Styles for the app
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
    padding: 30
  },
  email: {
    fontSize: 8,
    marginLeft: 10
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10
  },
  message: {
    fontSize: 10,
    textAlign: 'left',
    margin: 10,
  },
  timestamp: {
    fontSize: 6,
    fontStyle: 'italic',
    marginLeft: 10
  }
});
