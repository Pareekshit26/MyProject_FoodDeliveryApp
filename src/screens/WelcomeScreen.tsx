import React, { useRef, useState } from 'react';
import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import General from '../contants/General';
import { setHeight, setWidth } from '../utils/Display';

import { useDispatch } from 'react-redux';
import StorageService from '../services/StorageService';
import GeneralAction from '../actions/GeneralAction';

const pageStyle = (isActive: boolean) =>
  isActive ? styles.page : {...styles.page, backgroundColor: '#C2C2CB'};

const Pagination = ({index}: any) => {
  return (
    <View style={styles.pageContainer}>
      {[...Array(General.Welcome_Contents.length).keys()].map((_, i) =>
        i === index ? (
          <View style={pageStyle(true)} key={i} />
        ) : (
          <View style={pageStyle(false)} key={i} />
        ),
      )}
    </View>
  );
};

export default function WelcomeScreen(props: any) {

  const [welcomeListIndex, setWelcomeListIndex] = useState(0);
  const welcomeList = useRef();

  const onViewRef = useRef(({changed}: any) => {
    setWelcomeListIndex(changed[0].index);
  });
  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});

  const pageScroll = () => {
    welcomeList.current.scrollToIndex({
      index: welcomeListIndex < 2 ? welcomeListIndex + 1 : welcomeListIndex,
    });
  };

  const dispatch = useDispatch();

  const navigate = () => {
    StorageService.setFirstTimeUse().then(() => {
      dispatch(GeneralAction.setIsFirstTimeUse());
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'#fff'}
        translucent
      />
      <View style={styles.welcomeListContainer}>
        <FlatList
          ref={welcomeList}
          data={General.Welcome_Contents}
          keyExtractor={item => item.title}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          overScrollMode="never"
          viewabilityConfig={viewConfigRef.current}
          onViewableItemsChanged={onViewRef.current}
          renderItem={({item}) => (
            <View style={styles.list}>
              <Image
                style={styles.image}
                source={item.image}
                resizeMode="contain"
              />
              <Text style={styles.titleText}>{item.title}</Text>
              <Text style={styles.contentText}>{item.content}</Text>
            </View>
          )}
        />
      </View>
      <Pagination index={welcomeListIndex} />
      {welcomeListIndex === 2 ? (
        <TouchableOpacity
          style={styles.getStartButton}
          activeOpacity={0.8}
          onPress={() => navigate()}>
          <Text style={styles.getStartButtonText}>Get started</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.btnContainer}>
          <TouchableOpacity
            // style={styles.btn}
            activeOpacity={0.8}
            onPress={() => welcomeList.current.scrollToEnd()}>
            <Text style={styles.btnText}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.8}
            onPress={() => pageScroll()}>
            <Text style={styles.btnText}>Next</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: setWidth(100),
  },
  image: {
    height: setHeight(30),
    width: setWidth(60),
  },
  titleText: {
    fontSize: setWidth(5),
    fontFamily: 'Poppins-Bold',
    color: '#000',
  },
  contentText: {
    fontSize: setWidth(5),
    fontFamily: 'Poppins-Light',
    color: '#000',
    textAlign: 'center',
    width: setWidth(100),
  },
  list: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageContainer: {
    flexDirection: 'row',
  },
  page: {
    height: setWidth(2),
    width: setWidth(3),
    backgroundColor: '#0A8791',
    borderWidth: 1,
    borderRadius: setWidth(1),
    marginHorizontal: setWidth(1),
    borderColor: '#fff',
  },
  welcomeListContainer: {
    height: setHeight(60),
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: setWidth(90),
    position: 'absolute',
    bottom: setHeight(4),
  },
  btnText: {
    fontSize: setWidth(4),
    color: '#000',
    fontFamily: 'Poppins-Bold',
    lineHeight: setWidth(4) * 1.4,
  },
  btn: {
    backgroundColor: '#CEE8E7',
    paddingVertical: setHeight(3),
    paddingHorizontal: setWidth(5),
    borderRadius: setWidth(10),
  },
  getStartButton: {
    backgroundColor: '#0A8791',
    paddingVertical: setHeight(1),
    paddingHorizontal: setWidth(8),
    borderRadius: setWidth(2),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: setWidth(1),
    position: 'absolute',
    bottom: setHeight(8),
  },
  getStartButtonText: {
    color: '#fff',
    fontSize: setWidth(5),
    lineHeight: setWidth(5) * 1.4,
    fontFamily: 'Poppins-Medium',
  },
});
