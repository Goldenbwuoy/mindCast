// @flow

import React, { Component } from 'react';
import { FlatList } from 'react-native';

import FeaturedListItem from './FeaturedListItem';
import AuthorsListItem from '../../AuthorsListItem';
import TrendingListItem from './trending';
import List from './List';

type Props = {
  trendingPodcasts: Array<Object>,
  featuredPodcasts: Array<Object>,
  authors: Array<Object>,
  setListRef: Function,
};

class TabContent extends Component<Props, {}> {
  handleRef = (ref: Object): void => {
    const { setListRef } = this.props;

    if (ref) {
      ref.getScrollResponder().setNativeProps({
        scrollEnabled: false,
      });

      setListRef(ref);
    }
  };

  render() {
    const { trendingPodcasts, featuredPodcasts, authors } = this.props;

    const items = [
      {
        id: 'trending',
        UI: <TrendingListItem
          podcasts={trendingPodcasts}
        />,
      },
      {
        id: 'featured',
        UI: (
          <List
            dataset={featuredPodcasts}
            render={(item, index) => (
              <FeaturedListItem
                podcastImage={item.imageURL}
                isFirst={index === 0}
                author={item.author}
                title={item.title}
                stars={item.stars}
              />
            )}
          />
        ),
      },
      {
        id: 'authors',
        UI: (
          <List
            dataset={authors}
            render={(item, index) => (
              <AuthorsListItem
                podcastImage={item.imageURL}
                isFirst={index === 0}
                author={item.author}
                title={item.title}
                stars={item.stars}
              />
            )}
          />
        ),
      },
    ];

    return (
      <FlatList
        ref={ref => this.handleRef(ref)}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => item.UI}
        keyExtractor={item => item.id}
        data={items}
        pagingEnabled
        horizontal
      />
    );
  }
}

export default TabContent;