/**
 * @format
 */

import 'react-native';
import React from 'react';
import PostDetail from '../src/screens/Stack/PostDetail';

// Note: import explicitly to use the types shiped with jest.
import {it} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { CommentList } from '../src/components/comment';
import { PostList } from '../src/components/post';

it('renders correctly', () => {
  renderer.create(<CommentList comments={[{id: 0, name: 'test', body: 'test message', email: 'test@test.com'}]} />);
  renderer.create(<PostDetail route={{params: {postId: 3}}} />);
});
