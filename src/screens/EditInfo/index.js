import {Text} from 'react-native';
import {useState, useRef, useContext} from 'react';

import EditInfoComponent from '../../components/EditInfo/Index';
import {useNavigation} from '@react-navigation/native';
import {updateUser} from '../../context/actions/auth/updateUser';
import {GlobalContext} from '../../context/Provider';

const EditInfo = () => {
  const [form, setForm] = useState({});
  const navigation = useNavigation();
  const {
    authDispatch,
    authState: {error, loading},
  } = useContext(GlobalContext);

  const sheetRef = useRef(null);

  const closeSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.close();
    }
  };

  const openSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.open();
    }
  };

  const onChangeText = ({name, value}) => {
    setForm({...form, [name]: value});
  };
  const onSubmit = () => {
    if (form.username && form.email) {
      updateUser(form)(authDispatch);
    }
    navigation.navigate('Setting');
  };
  return (
    <EditInfoComponent
      onSubmit={onSubmit}
      onChangeText={onChangeText}
      form={form}
      sheetRef={sheetRef}
      closeSheet={closeSheet}
      openSheet={openSheet}
    />
  );
};

export default EditInfo;
