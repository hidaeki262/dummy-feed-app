import React, {useState, useEffect, Dispatch} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  deleteComment,
  getArticle,
  getArticleComments,
  postComment,
} from '../store/actions/articleActions';

interface ArticleScreenProps {
  route: any;
  navigation: any;
}

const ArticleScreen = ({route}: ArticleScreenProps) => {
  // Get the selected article from the Redux store
  const article = useSelector((state: any) => state.articles.article);
  // Get a list of comments article from the Redux store
  const comments = useSelector((state: any) => state.articles.comments);
  // Get session from the Redux store
  const user = useSelector((state: any) => state.auth.user);

  console.log(article);
  const [commentText, setCommentText] = useState('');
  const {slug} = route.params;
  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    dispatch(getArticle(slug));
    dispatch(getArticleComments(slug));
  }, []);

  const handleCommentSubmit = () => {
    if (commentText.trim() === '') {
      Alert.alert('Error', 'Comment cannot be empty');
    } else {
      dispatch(postComment(slug, commentText, user.user.token));
      setCommentText('');
    }
  };

  const handleCommentDelete = (commentId: number) => {
    dispatch(deleteComment(slug, commentId, user.user.token));
  };

  const renderItem = ({item}) => (
    <View style={styles.comment}>
      <Text style={styles.commentName}>{item.author.username}</Text>
      <Text style={styles.commentText}>{item.body}</Text>
      <TouchableOpacity onPress={() => handleCommentDelete(item.id)}>
        <Text style={styles.deleteButton}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.post}>
      <Text style={styles.postTitle}>{article.title}</Text>
      <Text style={styles.postBody}>{article.body}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={comments}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={renderHeader}
        ListHeaderComponentStyle={{marginBottom: 20}}
        ListEmptyComponent={() => (
          <Text style={{textAlign: 'center'}}>No comments yet.</Text>
        )}
        contentContainerStyle={{paddingBottom: 20}}
        keyboardShouldPersistTaps="always"
      />
      <View style={styles.commentContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Add a comment"
          value={commentText}
          onChangeText={setCommentText}
          onSubmitEditing={handleCommentSubmit}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom: 20,
  },
  post: {
    marginBottom: 20,
  },
  postTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  postBody: {
    fontSize: 16,
    textAlign: 'justify',
  },
  commentContainer: {
    flex: 1,
    marginVertical: 30,
    justifyContent: 'center',
  },
  commentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  commentInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  comment: {
    marginBottom: 10,
  },
  commentName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  commentText: {
    fontSize: 16,
  },
  deleteButton: {
    color: 'red',
  },
});

export default ArticleScreen;
