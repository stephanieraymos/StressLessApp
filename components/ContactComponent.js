import React, { Component } from 'react'
import { Text, ScrollView } from 'react-native';
import { tips } from '../shared/tips';
import { Card } from 'react-native-elements';
import { RenderTip } from './TipInfoComponent';
import * as Animatable from 'react-native-animatable';

class ContactComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tips: TIPS,
    };
  }

  static navigationOptions = {
    title: 'Contact Us'
  }
  render() {
    <RenderTip />
    return (
      <ScrollView>
        <Animatable.View animation='fadeInDown' duration={1000} delay={1000}>

          <Card
            title={"Contact Information"}
            wrapperStyle={{ margin: 20 }} >
            <Text
              onPress={() => this.props.tip.email}>
              Email: stephanieraymos.com
        </Text>
          </Card>
        </Animatable.View>

      </ScrollView>
    )
  }
}

export default ContactComponent
