import React, {Dispatch, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {getArticles} from '../store/actions/articleActions';
import ArticleCard from '../components/ArticleCard';

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen = ({navigation}: HomeScreenProps) => {
  // Get the list of articles from the Redux store
  const articles = useSelector((state: any) => state.articles.articles);
  // // Get the loading status from the Redux store
  const isLoading = useSelector((state: any) => state.articles.loading);
  // // Get any errors from the Redux store
  const error = useSelector((state: any) => state.articles.error);

  const dispatch: Dispatch<any> = useDispatch();

  // Call the getArticles action when the component mounts
  useEffect(() => {
    dispatch(getArticles());
  }, []);

  // Render each article in the FlatList as an ArticleCard component
  const renderItem = ({item}) => (
    <ArticleCard
      article={item}
      onPress={() => navigation.navigate('Article', {slug: item.slug})}
    />
  );

  return (
    <View style={styles.container}>
      {isLoading && <Text>Loading articles...</Text>}
      {error && <Text>Error: {error.message}</Text>}
      {!isLoading && !error && articles && (
        <FlatList
          data={articles}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});

export default HomeScreen;
