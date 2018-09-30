import React, { Component } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { getChatLog } from './state/messages/messages.actions';
import { getMembers } from './state/members/members.actions';
import { selectMessages } from './state/messages/messages.selectors';
import { selectMembers } from './state/members/members.selectors';

class App extends Component {
  componentDidMount(){
    this.props.getChatLog();
    this.props.getMembers();
  }

  keyExtractor = item => (item && item.id)

  render() {
    const { members, messages } = this.props;
    console.log({ members });
    
    return (
      <View style={styles.container}>
        <FlatList
          data={messages}
          keyExtractor={this.keyExtractor}
          renderItem={({ item }) => (<Text style={styles.welcome}>{item.message}</Text>) }
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  members: selectMembers(state),
  messages: selectMessages(state)
});

const mapDispatchToProps = ({
  getChatLog,
  getMembers
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
