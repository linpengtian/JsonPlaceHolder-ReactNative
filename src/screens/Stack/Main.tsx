import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Loader} from '../../components/common';
import {PostList} from '../../components/post';
import { IPost } from '../../components/interfaces';

const Main = ({navigation}: any) => {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    getAllPost();
  }, []);

  const getAllPost = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const fetchPosts = await res.json();
    setPosts(fetchPosts);
  };

  const goToDetail = (id: number) => {
    navigation.navigate('PostDetailStack', {postId: id});
  };

  const onFavorite = (id: number) => {
    setPosts(posts.map((post) => {
      if (post.id === id) {
        if (post.like == true) {
          return {...post, like: false};
        } else {
          return {...post, like: true};
        }        
      }
      return post;
    }));
  }


  const onDelete = async(id: number) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE',
    });
    const result = await res.json();
    console.log(result);

    setPosts((posts) => {
      return posts.filter((post) => post.id !== id);
    })
  }

  const onHideUnfavorites = () => {
    setPosts((posts) => {
      return posts.filter((post) => post.like === true);
    })
  }

  const onRefresh = async() => {
    getAllPost();
  }

  return (
    <View style={{flex: 1}}>
      <Text style={styles.title}>Posts</Text>

      <TouchableOpacity onPress={onRefresh}>
        <Text style={styles.button}>Refresh</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onHideUnfavorites}>
        <Text style={styles.button}>Delete unfavorite posts</Text>
      </TouchableOpacity>

      <ScrollView style={{backgroundColor: 'white'}}>
        {posts ? (
          <View>
            <PostList posts={posts} onPress={goToDetail} onFavorite={onFavorite} onDelete={onDelete}/>
          </View>
        ) : (
          <Loader />
        )}
      </ScrollView>
    </View>
    
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 12,
    marginBottom: 12,
  },
  button: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
    marginLeft: 12,
    marginBottom: 10
  }
});

export default Main;
