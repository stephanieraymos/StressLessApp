import React, { Component } from 'react'
import { Button } from 'react-native'
import {
  StackNavigator,
} from 'react-navigation';
import Music from './MusicComponent';

class Activities extends Component {

  handlePress() {
    StackNavigator(page);
  }

  render() {
    return (
      <div>
        <Button
          type="submit"
          onPress= {() => {
            this.handlePress(this.Music);
          }}
        />
      </div>
    )
  }
}

export default Activities
