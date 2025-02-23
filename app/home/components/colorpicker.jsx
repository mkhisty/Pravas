import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Button from "./button";

// Generate 50 colors using shades
const colors = [
'#e7e5e4', '#a8a29e', '#78716c', '#57534e', '#44403c', '#292524', '#1c1917',
 '#fca5a5', '#f87171', '#ef4444', '#dc2626', '#b91c1c', '#991b1b', '#450a0a',
 '#fde047', '#facc15', '#eab308', '#ca8a04', '#a16207', '#854d0e', '#422006',
 '#86efac', '#4ade80', '#22c55e', '#16a34a', '#15803d', '#166534', '#052e16',
'#6ee7b7', '#34d399', '#10b981', '#059669', '#047857', '#065f46', '#022c22',
 '#93c5fd', '#60a5fa', '#3b82f6', '#2563eb', '#1d4ed8', '#1e40af', '#172554',
 '#a5b4fc', '#818cf8', '#6366f1', '#4f46e5', '#4338ca', '#3730a3','#312e81', 
 
];

// Get device width and height
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Calculate the number of swatches per row and swatch size dynamically

export default  function ColorPicker({switchView,setColor}){
  const [selectedColor, setSelectedColor] = useState('#FFFFFF');

  return (
    <View style={styles.container}>

      <View style={styles.swatchesContainer}>
        {colors.map((color, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.swatch, { backgroundColor: color, width: "14.2799%", height: "9%" }, selectedColor==color? {borderWidth:3,borderRadius:2}:{borderWidth: 0}]}
            onPress={() => {setSelectedColor(color);setColor(color)}}
          />
        ))}
      </View>
      <View style={styles.recents}><Text>the recent will go here</Text></View>
      <Button text={"Set Color "} icon={"check"} color={"#000000"} func={()=>switchView("f") } mLeft={'22.5%'} width={"55%"} ></Button>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
    flex: 1,
    flexDirection:"column",
    height:"100%",
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  recents:{
    height:"20%",
    borderWidth:1,
    marginBottom:"5%"
  },
  swatchesContainer: {

    height:"auto",
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    overflow:"hidden",
    padding:0,
    borderWidth:1,
    borderRadius:5,
    borderWidth:3,
    marginBottom:"5%",
    width:"70%",
    marginLeft:"15%"
  },
  swatch: {
    aspectRatio:1,
},
  colorPreview: {
    width: '100%',
    height: 150,
  },
  colorCode: {
    fontSize: 18,
    textAlign: 'center',
  },
});

