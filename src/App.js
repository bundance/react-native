import React, { Component } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getChatLog } from './state/messages/messages.actions';
import { selectMessages } from './state/messages/messages.selectors';

class App extends Component {
  componentDidMount(){
    this.props.getChatLog();
  }

  keyExtractor = item => (item && item.id)

  render() {
    const { messages } = this.props;
    
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
  messages: selectMessages(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({ getChatLog }, dispatch);

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
