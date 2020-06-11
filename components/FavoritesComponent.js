import React, { Component } from 'react';
import { FlatList, View, Text, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import Swipeout from 'react-native-swipeout';
import { deleteFavorite } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        tips: state.tips,
        favorites: state.favorites
    };
};

const mapDispatchToProps = {
    deleteFavorite: campsiteId => (deleteFavorite(campsiteId))
};

class Favorites extends Component {

    static navigationOptions = {
        title: 'Favorites'
    }

    render() {
        const { navigate } = this.props.navigation;
        const renderFavoriteItem = ({ item }) => {
            const rightButton = [
                {
                    text: 'Delete',
                    type: 'delete',
                    onPress: () => {
                        Alert.alert(
                            'Delete Favorite?',
                            'Are you sure you wish to delete the tip: ' + item.name + ' as a favorite?',
                            [
                                {
                                    text: 'Cancel',
                                    onPress: () => console.log(item.name + 'Not Deleted'),
                                    style: ' cancel'
                                },
                                {
                                    text: 'OK',
                                    onPress: () => this.props.deleteFavorite(item.id)
                                }
                            ],
                            //Disables the ability to exit the box without selecting an option
                            { cancelable: false }
                        );
                    }
                }
            ];

            return (
                <Swipeout right={rightButton} autoClose={true}>
                    <Animatable.View animation='fadeInRightBig' duration={500}>

                        <ListItem
                            title={item.name}
                            subtitle={item.description}
                            leftAvatar={{ source: { uri: baseUrl + item.image } }}
                            onPress={() => navigate('TipInfo', { tipsId: item.id })}
                        />
                    </Animatable.View>

                </Swipeout>
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
                data={this.props.tips.tips.filter(
                    tip => this.props.favorites.includes(tip.id)
                )}
                renderItem={renderFavoriteItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);