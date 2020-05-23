import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {base_url} from "../mixins/global_vars";

const ListItem = ({item}) => {
  return (
    <TouchableOpacity style={styles.listItem}>
      <View style={styles.listItemView}>
        <Image
          source={{uri:base_url+'image/'+item.avatar}}
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
    borderRadius:100/2,
    width: 40,
    height: 40,
  },
  delete: {
    position: 'absolute',
    right: 10,
  },
});
export default React.memo(ListItem);
