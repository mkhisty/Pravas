import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, LayoutAnimation, Platform, UIManager } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { itemStyles } from "../scripts/style.js";
import { deleteTask } from "../scripts/dataManager.js";

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function Item({ props, addItem, changepf, changeMode }) {
  props = props || { name: "", fields: [{ label: "", type: "Checkbox" }] };
  const [isChecked, setChecked] = useState({});
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [isCollapsed]);

  async function changeCheck(n, v) {
    setChecked(prevChecked => ({ ...prevChecked, [n]: v }));
    if (v) {
      await saveProgress(props.name, n);
    }
  }

  async function saveProgress(taskName, fieldName) {
    try {
      const today = new Date().toISOString().split('T')[0];
      const progressKey = `progress_${today}`;
      const storedProgress = await AsyncStorage.getItem(progressKey);
      let todayProgress = storedProgress ? JSON.parse(storedProgress) : [];
      todayProgress.push({ taskName, fieldName });
      await AsyncStorage.setItem(progressKey, JSON.stringify(todayProgress));
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }

  function editTask() {
    changepf(props);
    changeMode(false);
    addItem(true);
  }

  function toggleCollapse() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsCollapsed(!isCollapsed);
  }

  return (
    <View style={[itemStyles.container, { borderColor: props.color }]}>
      <View style={itemStyles.header}>
        <Text style={[itemStyles.title, { backgroundColor: props.color }]}>{props.name}</Text>
        <View style={itemStyles.controls}>
          <TouchableOpacity onPress={toggleCollapse}>
            <FontAwesome
              name={isCollapsed ? "chevron-down" : "chevron-up"}
              color="#fefefe"
              style={[itemStyles.slider, { backgroundColor: props.color }]}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={editTask}>
            <FontAwesome
              name="edit"
              color="#fefefe"
              style={[itemStyles.slider, { backgroundColor: props.color }]}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteTask(props.id)}>
            <FontAwesome
              name="trash"
              color="#fefefe"
              style={[itemStyles.slider, { backgroundColor: props.color }]}
            />
          </TouchableOpacity>
        </View>
      </View>
      {!isCollapsed && (
        <View style={itemStyles.content}>
          <View style={itemStyles.stack}>
            {props.fields.map((f, index) => {
              if (f.type === "Checkbox") {
                return (
                  <View key={index} style={itemStyles.checkContainer}>
                    <Checkbox
                      style={itemStyles.checkbox}
                      value={isChecked[f.label]}
                      onValueChange={(v) => changeCheck(f.label, v)}
                      color={isChecked[f.label] ? '#4630EB' : undefined}
                    />
                    <Text style={itemStyles.label}>{f.label}</Text>
                  </View>
                );
              } else {
                return (
                  <View key={index} style={itemStyles.checkContainer}>
                    <Text style={itemStyles.label}>{f.label + ':'}</Text>
                    <TextInput style={itemStyles.textInput} />
                  </View>
                );
              }
            })}
          </View>
        </View>
      )}
    </View>
  );
}
