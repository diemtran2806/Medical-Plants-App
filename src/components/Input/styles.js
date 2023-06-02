import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  wrapper: {
    height: 52,
    width: 323,
    borderRadius: 20,
    backgroundColor: 'rgba(214, 207, 207, 0.61)',
    flexDirection: 'row',
    paddingHorizontal: 5,
    alignItems: 'center',
    marginTop: 10,
    color: 'white',
  },
  inputContainer: {
    paddingVertical: 12, //khoảng cách giữa 2 input ó
  },
  textInput: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: 16,
  },
  error: {
    color: '#79AEA5',
    paddingTop: 5,
  },
});
