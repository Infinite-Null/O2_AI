/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
const {TouchableOpacity, View, Text} = require('react-native');
const {Image} = require('react-native-svg');

export function EachFeaturesCard({title, discreption, route, image, color}) {
  console.log(image);
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        backgroundColor: color,
        borderRadius: 10,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20,
      }}>
      <Image source={image} style={{height: 100, width: 100}} />
      <View>
        <Text
          style={{
            color: 'rgb(240, 240, 240)',
            fontSize: 20,
            fontWeight: 'bold',
            paddingHorizontal: 10,
          }}>
          {title}
        </Text>
        <Text
          style={{
            paddingHorizontal: 10,
          }}>
          {discreption}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
