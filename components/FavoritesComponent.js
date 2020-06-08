import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import Swipeout from 'react-native-swipeout';
import { deleteFavorite } from '../redux/ActionCreators';

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
            return (
                <ListItem
                    title={item.name}
                    subtitle={item.description}
                    leftAvatar={{ source: { uri: baseUrl + item.image } }}
                    onPress={() => navigate('AdminInfo', { tipsId: item.id })}
                />
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