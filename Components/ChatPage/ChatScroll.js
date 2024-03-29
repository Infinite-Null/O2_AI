import {FlatList} from 'react-native';
import React, {memo, useRef} from 'react';
import Person from './Person';
import Ai from './Ai';

function ChatScroll({chat, scrollEnabled}) {
  const scrollViewRef = useRef();
  return (
    <FlatList
      automaticallyAdjustKeyboardInsets={false}
      keyboardShouldPersistTaps={'never'}
      overScrollMode={'always'}
      bounces={true}
      bouncesZoom={true}
      ref={scrollViewRef}
      decelerationRate={'fast'}
      onContentSizeChange={() => {
        if (scrollEnabled) {
          scrollViewRef.current.scrollToEnd({animated: true});
        }
      }}
      data={chat}
      renderItem={({item}) => {
        if (item.role === 'user') {
          return <Person text={item.parts} />;
        } else {
          return <Ai text={item.parts} />;
        }
      }}
      keyExtractor={(_, index) => index.toString()}
    />
  );
}

export default memo(ChatScroll);


