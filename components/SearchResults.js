'use strict'

import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View,
    TouchableHighlight,
    FlatList,
    Text,
} from 'react-native';
import RecipeView from './RecipeView';

class ListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.index);
  }

  render() {
    const item = this.props.item;
    return (
      <TouchableHighlight
        onPress={this._onPress}
        underlayColor='#dddddd'>
      <View>
        <View style={styles.rowContainer}>
        <Image style={styles.thumb} source={{ url: item.recipe.image}} />
        <View style={styles.textContainer}>
          <Text style={styles.label}>{item.recipe.label}</Text>
          <Text style={styles.healthLabels}
            numberOfLines={3}>{" " + item.recipe.healthLabels.join(", ")}</Text>
          </View>
        </View>
        <View style={styles.separator}/>
      </View>
    </TouchableHighlight>
    );
  }
}

export default class SearchResults extends Component <{}> {
  _keyExtractor = (item, index) => index;

  _renderItem = ({item, index}) => (
    <ListItem
      item={item}
      index={index}
      onPressItem={this._onPressItem}
    />
  );

    _onPressItem = (index) => {
      this.props.navigator.push({
        title: "Recipe",
        component: RecipeView,
        passProps: {
          recipe: this.props.recipes[index],
          user: this.props.user
        }
      });
    };

  render() {
    return (
      <FlatList
        data={this.props.recipes}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#F3C677'
  },
  label: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#F9564F'
  },
  healthLabels: {
    fontSize: 20,
    color: '#0C0A3E'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  },
});
