import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
  return {
    tips: state.tips,
  };
};


class Directory extends Component {


  static navigationOptions = {
    title: 'Directory'
  };

  render() {
    const { navigate } = this.props.navigation;
    const renderDirectoryItem = ({ item }) => {
      return (
        <Animatable.View animation='fadeInRightBig' duration={2000}>

          <Tile
            title={item.name}
            caption={item.description}
            featured
            onPress={() => navigate('TipInfo', { tipId: item.id })}
            imageSrc={{ uri: baseUrl + item.image }}
          />
        </Animatable.View>

      );
    };

    if (this.props.tips.isLoading) {
      return <Loading />;
    }
    if (this.props.tips.errMess) {
      return (
        <View>
          <Text>{this.props.tips.errMess}</Text>
        </View>
      );
    }
    return (
      <FlatList
        data={this.props.tips.tips}
        renderItem={renderDirectoryItem}
        keyExtractor={item => item.id.toString()}
      />
    );
  }

}
export default connect(mapStateToProps)(Directory);