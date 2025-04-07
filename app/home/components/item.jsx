import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, TextInput, LayoutAnimation, Platform, UIManager } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { itemStyles } from "../../../scripts/style.js";
import { LevelContext } from "../../../scripts/context.js";
import { deleteTask,changeFieldData, getAll, wipe } from "../../../scripts/database.js";

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {UIManager.setLayoutAnimationEnabledExperimental(true);}

export default function Item({ props }) {
  props = props || { name: "", fields: [{ label: "", type: "checkbox" }] };
  props.fields = JSON.parse(props.fields_data) || {};
  const [isChecked, setChecked] = useState({});
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [, changepf] = useContext(LevelContext)["task"]
  const [, setMode] = useContext(LevelContext)["mode"]


  async function changeCheck(n, v) {
    console.log(isChecked);

    setChecked({ ...isChecked, [n]: v });
    await changeFieldData(n, v== true ? 1: 0).then((r) => {
      console.log("changed", r);
    });
    console.log(isChecked);
    await getAll("fieldData").then((r) => {
      console.log("please", r);
    })
  }

  function editTask() {
    changepf(props);
    setMode(true);
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
              if (f.type == "checkbox") {
                return (
                  <View key={index} style={itemStyles.checkContainer}>
                    <Checkbox
                      style={itemStyles.checkbox}
                      value={isChecked[f.key]}
                      onValueChange={(v) => changeCheck(f.key, v)}
                      color={isChecked[f.label] ? '#4630EB' : undefined}
                    />
                    <Text style={itemStyles.label}>{f.label}</Text>
                  </View>
                );
              } else if(f.type=="numerical"){
                return (
                  <View key={index} style={itemStyles.checkContainer}>
                  <Text style={itemStyles.label}>
                    {f.label + ':'}
                  </Text>
                  <TextInput
                    style={itemStyles.numericalInput}
                    keyboardType="numeric"
                    onChangeText={(text) => {
                      const textValue = text.replace(/[^0-9]/g, '');
                        const floatValue = parseFloat(textValue) || 0;
                        changeFieldData(f.key, floatValue).then((r) => {
                        console.log("changed", r);
                        });
                    }}
                  />
                  </View>
                );
              } else if(f.type=="text"){
                return (
                  <View key={index} style={itemStyles.textInputContainer}>
                  <Text style={itemStyles.label}>
                  {f.label + ':'}
                  </Text>
                  <TextInput
                  multiline={true}
                  style={itemStyles.textInput}
                  onChangeText={(text) => {
                    const textValue = text.replace(/[^a-zA-Z0-9 ]/g, '');
                    changeFieldData(f.key, textValue).then((r) => {
                      console.log("changed", r);
                    });
                  }}
                  />
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
