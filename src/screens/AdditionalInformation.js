import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Image,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');

export const AdditionalInformation = () => {
  const navigation = useNavigation();
  const {
    params: {
      params: { item },
    },
  } = useRoute();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonBack}>
        <TouchableOpacity onPress={goBack}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Image
        source={{ uri: `https://robohash.org/${item?.name}` }}
        style={styles.image}
      />
      <Text style={styles.name}>{item?.name}</Text>
      <Text style={styles.birth}>{item?.birth_year}</Text>
      <Text style={styles.gender}>{item?.gender}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { marginLeft: 12, marginRight: 12 },
  buttonBack: { marginTop: 12, marginBottom: 12 },
  image: { height: height * 0.3, width, marginBottom: 24 },
  name: { fontSize: 28, fontWeight: 500, padding: 4 },
  birth: { fontSize: 22, fontWeight: 500, padding: 4 },
  gender: { fontSize: 18, fontWeight: 500, padding: 4 },
});
