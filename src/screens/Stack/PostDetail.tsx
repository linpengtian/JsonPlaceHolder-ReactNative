import React, {useState, useEffect, useLayoutEffect} from 'react';
import {ScrollView, Text, StyleSheet, View} from 'react-native';
import {Loader} from '../../components/common';
import {CommentList} from '../../components/comment';
import { IComment, IPost, IUser } from '../../components/interfaces';

const PostDetail = ({route} : any) => {
  const {postId} = route.params;

  const [post, setPost] = useState<IPost>();
  const [user, setUser] = useState<IUser>();
  const [comments, setComments] = useState<IComment>();
  const [isReady, setReady] = useState<boolean>(false);

  useLayoutEffect(() => {
    fetchGetByIdPost(postId);
  }, [postId]);

  useEffect(() => {
    if (post && user && comments) {
      setReady(true);
    }
  }, [comments, post, user]);

  const fetchGetByIdPost = async(id: number) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const fetchPost = await res.json();
    setPost(fetchPost);
    await fetchGetUserById(fetchPost.userId);
    await fetchGetByIdComments(postId);
  };

  const fetchGetUserById = async(id: number) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    const fetchUser = await res.json();
    setUser(fetchUser);
  }

  const fetchGetByIdComments = async(id: number) => {
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
          <Text style={styles.titleText}>{post?.title.toUpperCase()}</Text>
          <Text style={styles.bodyText}>{post?.body}</Text>
          <Text style={styles.username}>by {user?.name}({user?.email})</Text>
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
  titleText: {
    marginLeft: 12,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 12,
  },
  bodyText: {
    marginLeft: 12,
    fontSize: 18,
    marginTop: 12,
  },
  username: {
    marginLeft: 12,
    fontSize: 16,
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
