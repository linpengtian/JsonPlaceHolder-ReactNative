import React, {useState, useEffect, useLayoutEffect} from 'react';
import {ScrollView, Text, StyleSheet, View} from 'react-native';
import {Loader} from '../../components/common/Loader';
import {CommentList} from '../../components/comment';

const PostDetail = ({route}) => {
  const {postId} = route.params;

  const [post, setPost] = useState();
  const [user, setUser] = useState();
  const [comments, setComments] = useState();
  const [isReady, setReady] = useState(false);

  useLayoutEffect(() => {
    fetchGetByIdPost(postId);
    fetchGetByIdComments(postId);
  }, [postId]);

  useEffect(() => {
    if (post && user && comments) {
      setReady(true);
    }
  }, [comments, post]);

  const fetchGetByIdPost = async id => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const fetchPost = await res.json();
    setPost(fetchPost);
    fetchGetUserById(fetchPost.userId);
  };

  const fetchGetUserById = async id => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    const fetchUser = await res.json();
    console.log(fetchUser);
    setUser(fetchUser);
  }

  const fetchGetByIdComments = async id => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
    );
    const fetchComments = await res.json();
    setComments(fetchComments);
  };

  return (
    <ScrollView style={styles.container}>
      {isReady ? (
        <View>
          <Text style={styles.title}>{post.title.toUpperCase()}</Text>
          <Text style={styles.body}>{post.body}</Text>
          <Text style={styles.username}>by {user.name}({user.email})</Text>
          <Text style={styles.commentsTitle}>Commnets</Text>
          <CommentList comments={comments} />
        </View>
      ) : (
        <Loader />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    marginLeft: 12,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 12,
  },
  body: {
    marginLeft: 12,
    fontSize: 18,
    fontWeight: '200',
    marginTop: 12,
  },
  username: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '300',
    fontStyle: 'italic',
    marginTop: 12,
  },
  commentsTitle: {
    marginLeft: 12,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 18,
  },
});

export default PostDetail;
