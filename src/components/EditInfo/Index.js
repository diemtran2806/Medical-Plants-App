import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  Alert,
} from 'react-native';
import Input from '../Input';
import CustomButton from '../CustomButton';
import avataDefault from '../../asserts/images/avataDefault.png';
import ImagePicker from '../ImagePicker';

const EditInfoComponent = ({
  openSheet,
  closeSheet,
  sheetRef,
  onSubmit,
  onChangeText,
  form,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>Edit Your Info</Text>
      </View>
      <View style={styles.info}>
        {/* <Image
          width={150}
          height={150}
          //source={{uri: localFile?.path || localFile || DEFAULT_IMAGE_URI}}
          source={avataDefault}
          style={styles.avata}
        />
        <TouchableOpacity onPress={openSheet}>
          <Text style={styles.chooseImg}>Choose image</Text>
        </TouchableOpacity>
        <ImagePicker /> */}
        <Input
          label="Username"
          placeholder="Enter Username"
          onChangeText={value => {
            onChangeText({name: 'username', value});
          }}
          // error={error?.username?.[0]}
        />
        <Input
          label="Email"
          placeholder="Enter Email"
          onChangeText={value => {
            onChangeText({name: 'email', value});
          }}
          // error={error?.username?.[0]}
        />
      </View>
      <View style={styles.wrapBtn}>
        <CustomButton primary title="Save" onPress={onSubmit} />
      </View>
    </View>
  );
};

export default EditInfoComponent;

const styles = StyleSheet.create({
  container: {
    flex: 100,
    backgroundColor: '#164655',
    fontFamily: 'K2D',
  },
  info: {
    flex: 70,
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
  },
  header: {
    flex: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    color: 'white',
    fontSize: 26,
    fontWeight: 800,
  },
  wrapBtn: {
    flex: 20,
  },
  image: {
    width: 40,
    height: 40,
    marginTop: 20,
    marginLeft: 20,
    resizeMode: 'cover',
  },
  avata: {
    //flex: 20,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#79AEA5',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginVertical: 20,
  },
  chooseImg: {
    color: 'white',
    textAlign: 'center',
  },
});
