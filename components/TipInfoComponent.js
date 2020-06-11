import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Linking, Modal, Button, StyleSheet } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
  return {
    tips: state.tips,
    comments: state.comments,
    favorites: state.favorites
  };
};

const mapDispatchToProps = {
  postFavorite: tipId => (postFavorite(tipId)),
  postComment: (tipId, rating, author, text) => (postComment(tipId, rating, author, text))
};

function RenderTip(props) {

  const {  } = props;

  if (tip) {
    return (
      <Animatable.View animation='fadeInDown' duration={1000} delay={500}>

        <Card
          featuredTitle={tip.name}
          image={{ uri: baseUrl + tip.image }}>
          <Text style={{ margin: 10 }}>
            {tip.description}
          </Text>
          <View
            style={{
              display: 'flex', flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
            <Icon
              name={props.favorite ? 'heart' : 'heart-o'}
              type='font-awesome'
              color='#f50'
              raised
              reverse
              onPress={() => props.favorite ?
                console.log("Already set as a favorite tip") : props.markFavorite()}
            />
            <Icon
              style={styles.cardItem}
              name='pencil'
              type='font-awesome'
              color='#5637DD'
              raised
              reverse
              onPress={() => props.onShowModal()}
            />
            <Icon
              containerStyle={{
                paddingRight: 8,
                alignSelf: 'flex-end',
              }}
              name={props.message ? 'envelope' : 'envelope-o'}
              type='font-awesome'
              color='#0000FF'
              raised
              reverse
              onPress={() => props.message()}
            />
          </View>
        </Card>
      </Animatable.View>

    );
  }
  return <View />;
}

function RenderComments({ comments }) {

  const renderCommentItem = ({ item }) => {
    return (
      <View style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.text}</Text>
        <Rating
          readOnly
          startingValue={item.rating}
          imageSize={10}
          style={{ alignItems: 'flex-start', paddingVertical: '5%' }}
        />

        <Text style={{ fontSize: 12 }}>{` -- ${item.author}, ${item.date}`}</Text>
      </View>
    )
  };
  return (
    <Animatable.View animation='fadeInUp' duration={1000} delay={500}>

      <Card title='Reviews'>
        <FlatList
          data={comments}
          renderItem={renderCommentItem}
          keyExtractor={item => item.id.toString()}
        />
      </Card>
    </Animatable.View>


  )
}

class TipInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      rating: 5,
      author: '',
      text: ''
    };
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  handleComment(tipId) {
    this.props.postComment(tipId, this.state.rating, this.state.author, this.state.text);
    this.toggleModal();
  }

  resetForm() {
    this.setState({
      rating: 5,
      author: '',
      text: '',
      showModal: false
    });
  }

  markFavorite(tipId) {
    this.props.postFavorite(tipId);
  }

  message() {
    Linking.openURL('mailto:mailto@dealsandcodescommunity@gmail.com');
  }

  static navigationOptions = {
    title: 'Quick Tips Information'
  };

  render() {
    const tipId = this.props.navigation.getParam('tipId');
    const tip = this.props.filter(tip => tip.id === tipId)[0];
    const comments = this.props.comments.comments.filter(comment => comment.tipId === tipId);
    return (
      <ScrollView>
        <RenderTip
          tip={tip}
          favorite={this.props.favorites.includes(tipId)}
          markFavorite={() => this.markFavorite(tipId)}
          onShowModal={() => this.toggleModal()}
          message={() => this.message()}
        />
        <RenderComments comments={comments} />

        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.showModal}
          onRequestClose={() => this.toggleModal()}>
          <View style={styles.modal}>
            <Rating
              showRating
              startingValue={5}
              imageSize={40}
              onFinishRating={rating => this.setState({ rating: rating })}
              style={{ paddingVertical: 10 }}
            />
            <Input
              placeholder='Author'
              leftIcon={{
                type: 'font-awesome',
                name: 'user-o'
              }}
              type='font-awesome'
              leftIconContainerStyle={{ paddingRight: 10 }}
              onChangeText={(author) => this.setState({ author: author })}
              value={this.state.author}

            />
            <Input
              placeholder='Comment'
              leftIcon={{
                type: 'font-awesome',
                name: 'comment-o'
              }}
              type='font-awesome'
              leftIconContainerStyle={{ paddingRight: 10 }}
              onChangeText={(text) => { this.setState({ text: text }) }}
              value={this.state.text}

            />
            <View steyle={{ margin: 10 }}>
              <Button
                title='Submit'
                color='#5637DD'
                onPress={() => {
                  this.handleComment(tipId);
                  this.resetForm();
                }} />
            </View>
            <View style={{ margin: 10 }}>
              <Button
                onPress={() => {
                  this.toggleModal();
                  this.resetForm();
                }}
                color='#808080'
                title='Cancel'
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  cardRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    margin: 20
  },
  cardItem: {
    flex: 1,
    margin: 10
  },
  modal: {
    justifyContent: 'center',
    margin: 20
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TipInfo);