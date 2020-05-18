import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

const ListItem = ({item}) => {
  return (
    <TouchableOpacity style={styles.listItem}>
      <View style={styles.listItemView}>
        <Image
          source={require('../assets/item1.png')}
          style={styles.listImage}
        />
        <Text style={styles.ListItemText}>{item.name}</Text>
        <Icon
          name="cancel"
          size={20}
          color="red"
          style={styles.delete}
          // onPress={() => deleteItem(item.id)}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  listItemView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ListItemText: {
    fontSize: 18,
    marginLeft: 10,
  },
  listImage: {
    width: 50,
    height: 50,
  },
  delete: {
    position: 'absolute',
    right: 10,
  },
});
export default React.memo(ListItem);
