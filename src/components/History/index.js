import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext, useEffect, useState, useRef} from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
const HistoryComponent = () => {
  const navigation = useNavigation();
  const [historys, setHistorys] = useState([]);
  const [historysSearch, setHistorysSearch] = useState(null);
  const [token, setToken] = useState('');
  const [searchText, setSearchText] = useState('');
  const [leaf, setLeaf] = useState(null);
  const [uriLeaf, setUriLeaf] = useState('');

  const searchInputRef = useRef(null);
  useEffect(() => {
    const fetchData = async () => {
      const accessToken = await AsyncStorage.getItem('token');
      console.log(accessToken);
      setToken(accessToken);
      console.log('token ben nay:', token);
    };
    fetchData();
  }, []);

  const getHistory = async () => {
    console.log('token trong get ne:', token);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        'http://172.20.10.3:8000/users/history',
        config,
      );
      console.log(response.data.data);
      //setHistorys(JSON.parse(response.data).data);
      const historysArray = Object.values(response.data.data);
      setHistorys(historysArray);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getHistory();
  }, [token]);
  //setHistorys([1]);

  const handleSearch = async () => {
    try {
      // const searchText = searchInputRef.current.value;
      // console.log('searc:', searchText);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      // Gọi API hoặc xử lý tìm kiếm dựa trên searchText ở đây
      const response = await axios.get(
        `http://172.20.10.3:8000/users/history?search=${searchText}`,
        config,
      );
      const historysSearchArray = Object.values(response.data.data);
      setHistorysSearch(historysSearchArray);
      console.log('Đang tìm kiếm:', searchText);
    } catch (error) {
      console.error('Lỗi khi tìm kiếm:', error);
    }
  };

  const handleGetDetailLeaf = async idLeaf => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `http://172.20.10.3:8000/leaf/${idLeaf}`,
        config,
      );

      const leafDetail = Object.values(response.data.data);
      setLeaf(leafDetail);

      // Xử lý dữ liệu chi tiết của lá cây tại đây
      console.log(leafDetail[0]);
    } catch (error) {
      console.error('Lỗi khi lấy chi tiết lá cây:', error);
    }
  };

  const handleLeafClick = (id, uri) => {
    handleGetDetailLeaf(id);
    setUriLeaf(uri);
  };

  const handleBackHistory = () => {
    setLeaf(null);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            style={styles.header}>
            <Image
              source={require('../../asserts/images/backBtn.png')}
              style={styles.image}
            />
          </TouchableOpacity>
          <View style={styles.history}>
            <Text style={styles.text}>History</Text>
          </View>
        </View>
        <View style={styles.searchInput}>
          <TextInput
            ref={searchInputRef}
            style={styles.input}
            placeholder="Search medical plant..."
            placeholderTextColor="#fff"
            onChangeText={value => setSearchText(value)}
          />
          <TouchableOpacity style={styles.wrapperIcon} onPress={handleSearch}>
            <MaterialIcon name="search" style={styles.searchIcon} />
          </TouchableOpacity>
        </View>
        {leaf !== null ? (
          <View>
            <View style={styles.detailLeaf}>
              <Image
                source={{uri: uriLeaf}}
                style={{width: 180, height: 180, borderRadius: 20}}
              />
            </View>
            <Text style={styles.nameLeaf}>{leaf[0]}</Text>
            <Text style={styles.description}>{leaf[1]}</Text>
            <TouchableOpacity onPress={handleBackHistory}>
              <View style={[styles.history, {marginLeft: 20, width: 80}]}>
                <Text style={styles.text}>Back</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.resultHistory}>
            {historysSearch === null && historys !== null
              ? historys.map((history, index) => (
                  <View
                    key={index}
                    style={[
                      styles.imageHistory,
                      index !== historys.length - 1 && {marginRight: 20},
                    ]}>
                    <TouchableOpacity
                      onPress={() =>
                        handleLeafClick(history.id, history.image)
                      }>
                      <Image
                        source={{uri: history.image}}
                        style={{width: 96, height: 96, borderRadius: 20}}
                      />
                    </TouchableOpacity>
                  </View>
                ))
              : historysSearch !== null &&
                historysSearch.map((history, index) => (
                  <View
                    key={index}
                    style={[
                      styles.imageHistory,
                      index !== historysSearch.length - 1 && {marginRight: 20},
                    ]}>
                    <TouchableOpacity
                      onPress={() =>
                        handleLeafClick(history.id, history.image)
                      }>
                      <Image
                        source={{uri: history.image}}
                        style={{width: 96, height: 96, borderRadius: 20}}
                      />
                    </TouchableOpacity>
                  </View>
                ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default HistoryComponent;

const styles = StyleSheet.create({
  container: {
    flex: 100,
    backgroundColor: '#164655',
    fontFamily: 'K2D',
  },
  header: {
    //flex: 20,
    flexDirection: 'row',
    //justifyContent: 'space-between',
    marginRight: '50%',
    alignItems: 'center',
    //backgroundColor: 'yellow',
  },
  image: {
    width: 40,
    height: 40,
    marginTop: 20,
    marginLeft: 20,
    resizeMode: 'cover',
  },

  history: {
    width: 100,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(217, 217, 217, 0.5)',
    borderRadius: 20,
    marginTop: 20,
  },

  wrapperIcon: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(217, 217, 217, 0.44)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
    right: 10,
    top: '50%',
    transform: [{translateY: -18}], // Chỉnh sửa transform để căn giữa icon search với TextInput
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 500,
  },
  nameLeaf: {
    color: 'white',
    fontSize: 22,
    fontWeight: 500,
    alignSelf: 'center',
  },
  description: {
    color: 'white',
    fontSize: 16,
    marginHorizontal: 20,
    marginVertical: 20,
    textAlign: 'justify',
  },
  imageHistory: {
    width: 96,
    height: 96,
    backgroundColor: 'rgba(217, 217, 217, 0.33)',
    marginLeft: 20,
    marginRight: 20,
    marginVertical: 20,
    borderRadius: 20,
  },
  resultHistory: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    marginVertical: 20,
    flexDirection: 'row',
    //justifyContent: 'center',
    //backgroundColor: 'yellow',
    flexWrap: 'wrap', // đảm bảo các view xuống hàng nếu chúng vượt quá kích thước của container
  },
  searchInput: {
    position: 'relative',
    marginTop: 20,
    backgroundColor: 'transparent',
    padding: 3,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 20,
    marginHorizontal: 20,
  },
  searchIcon: {
    position: 'absolute',
    color: '#fff',
    fontSize: 26,
    top: 6,
    left: 6,
  },
  input: {
    color: '#fff',
    fontSize: 14,
  },
  detailLeaf: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginVertical: 20,
  },
});
