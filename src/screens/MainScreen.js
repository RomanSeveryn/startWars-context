import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Pagination } from '../components/Pagination';
import { useNavigation } from '@react-navigation/native';
import { usePeopleContext } from '../providers/PeopleProvider';
import { ADDITIONAL_INFO_SCREEN } from '../constants/constant';

const { height, width } = Dimensions.get('window');

export const MainScreen = () => {
  const {
    data,
    setData,
    text,
    onChangeText,
    filteredUsers,
    saveNamed,
    setSavedName,
    fans,
    setFans,
    clearFans,
    loading,
  } = usePeopleContext();
  const countPages = Math.ceil(data?.count / 10);
  const navigation = useNavigation();

  const onPressCard = (item) => {
    navigation.navigate(ADDITIONAL_INFO_SCREEN, {
      params: {
        item,
      },
    });
  };

  const onPressFavorite = (item) => {
    const newItem = {
      ...item,
      favorite: !item?.favorite,
    };
    const newData = data?.results?.map((elem) =>
      elem?.name === newItem?.name ? newItem : elem,
    );
    setData({ ...data, results: newData });
    if (saveNamed.includes(item.name)) {
      const newArr = saveNamed.filter((elem) => elem !== item.name);
      setSavedName([...newArr]);
      const newFans = fans.map((elem) =>
        elem.gender === item.gender ? { ...elem, count: elem.count - 1 } : elem,
      );
      setFans(newFans);
    } else {
      setSavedName((prev) => [...prev, item.name]);
      const newFans = fans.map((elem) =>
        elem.gender === item.gender ? { ...elem, count: elem.count + 1 } : elem,
      );

      setFans(newFans);
    }
  };

  const LoadingComponent = () => {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  };

  if (!data) {
    return <LoadingComponent />;
  }

  const keyExtractor = (item) => item.name;

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => onPressCard(item)}
        style={styles.wrapperStar}
      >
        <TouchableOpacity onPress={() => onPressFavorite(item)}>
          <AntDesign
            name="hearto"
            size={24}
            color={item?.favorite ? 'red' : 'black'}
          />
        </TouchableOpacity>
        <Image
          source={{ uri: `https://robohash.org/${item?.name}` }}
          style={styles.image}
        />
        <View>
          <Text style={styles.marginLeft}>{item?.name}</Text>
          <Text style={styles.marginLeft}>{item?.birth_year}</Text>
          <Text style={styles.marginLeft}>{item?.gender}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 18, fontWeight: 500 }}>Star Wars</Text>

      <View style={styles.list}>
        <View style={styles.buttonClearWrapper}>
          <TouchableOpacity
            onPress={() => clearFans(data)}
            style={styles.buttonClear}
          >
            <Text style={styles.buttonClearText}>CLEAR FANS</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerFans}>
          {fans?.map((elem) => {
            return (
              <View key={elem.id} style={styles.wrapperFans}>
                <Text>{elem.count}</Text>
                <Text>{elem.name}</Text>
              </View>
            );
          })}
        </View>
        <TextInput
          onChangeText={onChangeText}
          value={text}
          placeholder="Search"
          style={styles.input}
        />
        {!loading ? (
          <FlatList
            data={filteredUsers || []}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
          />
        ) : (
          <LoadingComponent />
        )}
      </View>

      <Pagination maxPage={countPages} color={'black'} sizeRatio={1} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    height: height * 0.75,
    width: width,
  },
  buttonClearWrapper: {
    margin: 12,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  buttonClear: { borderWidth: 1, borderColor: 'red', padding: 12 },
  buttonClearText: { color: 'red' },
  containerFans: {
    flexDirection: 'row',
    margin: 12,
    justifyContent: 'space-between',
  },
  wrapperFans: {
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    paddingLeft: 5,
    height: 44,
    width: 100,
  },
  input: {
    height: 40,
    margin: 12,
    borderColor: 'grey',
    borderWidth: 1,
    paddingLeft: 12,
  },
  wrapperStar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: (height * 0.75) / 10,
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 12,
    padding: 12,
    borderColor: 'grey',
    borderWidth: 1,
  },
  image: { height: 28, width: 28, marginLeft: 12 },
  marginLeft: { marginLeft: 12 },
});
