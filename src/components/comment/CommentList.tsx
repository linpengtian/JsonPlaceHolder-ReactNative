import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { IComment } from '../interfaces/index';

const CommentList = ({comments}: any) => {
  return comments.map((comment: IComment) => (
    <View style={styles.container} key={comment.id}>
      <Text style={styles.name}>{comment.name.toUpperCase()}</Text>
      <Text style={styles.body}>{comment.body}</Text>
      <Text style={styles.email}>{comment.email}</Text>
    </View>
  ));
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 8,
  },
  email: {
    fontSize: 12,
    fontWeight: '300',
    fontStyle: 'italic',
    marginTop: 15,
  },
  name: {
    fontSize: 15,
    fontWeight: '400',
    marginTop: 15,
  },
  body: {
    fontSize: 14,
    fontWeight: '300',
    marginTop: 15,
  },
});

export default CommentList;
