import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Image} from 'react-native';
import {formatDate} from '../utils/helpers';

interface ArticleCardProps {
  article: any;
  onPress: () => void;
}

const ArticleCard = ({article, onPress}: ArticleCardProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: article?.author?.image}} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{article?.title}</Text>
        <Text style={styles.author}>{article?.author?.username}</Text>
        <Text style={styles.date}>{formatDate(article?.createdAt)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textContainer: {
    flex: 1,
    marginTop: 16,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  author: {
    fontSize: 14,
    color: '#999',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: '#999',
  },
});

export default ArticleCard;
