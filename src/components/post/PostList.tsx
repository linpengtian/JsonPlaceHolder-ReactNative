import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { IPost } from '../interfaces';

const favorite_icon = require('../../../assets/favorite.png');
const unfavorite_icon = require('../../../assets/unfavorite.png');
const delete_icon = require('../../../assets/delete.png');

const PostList = ({posts, onPress, onFavorite, onDelete}: any) => {
  //console.log(posts);
  return posts.map((post: IPost) => (
    <TouchableOpacity onPress={() => onPress(post.id)} key={post.id}>
      <View style={styles.contaniner}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.title}>{post.title.toUpperCase()}</Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => onFavorite(post.id)} key={`like_${post.id}`}>
              <Image source={post.like ? favorite_icon : unfavorite_icon} style={{width: 40, height: 40, resizeMode: 'contain'}}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDelete(post.id)} key={`delete_${post.id}`}>
              <Image source={delete_icon} style={{width: 40, height: 40, resizeMode: 'contain'}}/>
            </TouchableOpacity>
          </View>
          
        </View>        
        
        <Text style={styles.body}> {post.body} </Text>
      </View>
    </TouchableOpacity>
  ));
};

const styles = StyleSheet.create({
  contaniner: {
    margin: 10,
    padding: 10,
    borderBottomWidth: 0.2,
  },
  title: {
    marginBottom: 10,
    fontSize: 15,
    fontWeight: 'bold',
    maxWidth: '80%'
  },
  body: {
    color: 'black',
    opacity: 0.5,
  },
});

export default PostList;
