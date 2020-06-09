import React, { Component } from 'react';
import { ScrollView, Text, FlatList, View } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
  return {
    partners: state.partners
  };
};

function Mission() {

  return (
    <Card
      title={"About Us"}>
      <View style={{ display: "flex", flexDirection: "row", flex: 1, flexWrap: 'wrap' }}>
        <Text>At Stress Less, our goal is to create an atmosphere that allows you to feel more relaxed and more in-tune with yourself.
        We hope you found the tools here to be helpful. We would love to hear from you with any concerns, ideas, or inquiries.
        </Text>
      </View>
    </Card>
  )
}

class AboutComponent extends Component {

  static navigationOptions = {
    title: 'About Us'
  }
  render() {


    const renderPartner = ({ item }) => {
      return (
        <ListItem
          title={item.name}
          subtitle={item.description}
          leftAvatar={{ source: { uri: baseUrl + item.image } }}
        />
      );
    };


    if (this.props.partners.isLoading) {
      return (
        <ScrollView>
          <Mission />
          <Card
            title={"Partners"}>
            <Loading />
          </Card>
        </ScrollView>
      )
    }
    if (this.props.partners.errMess) {
      return (
        <ScrollView>
          <Animatable.View animation='fadeInDown' duration={1000} delay={500}>
            <Mission />
            <Card
              title="Community Partners">
              <Text>{this.props.partners.errMess}</Text>
            </Card>
          </Animatable.View>
        </ScrollView>
      );
    }
    return (
      <ScrollView>
        <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
          <Mission />
          <Card
            title="Community Partners">
            <FlatList
              data={this.props.partners.partners}
              renderItem={renderPartner}
              keyExtractor={item => item.id.toString()}
            />
          </Card>
        </Animatable.View>
      </ScrollView>
    );
  }
}
export default connect(mapStateToProps)(AboutComponent);
