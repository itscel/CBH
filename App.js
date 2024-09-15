import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  SafeAreaView,
  FlatList,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Icon from "react-native-vector-icons/Ionicons";

const App = () => {
  const initialState = {
    id: 0,
    title: "",
    description: "",
    completed: false,
  };

  const [todo, setTodo] = useState([
    {
      id: 1,
      title: "Buy groceries",
      description: "Milk, Bread, Eggs",
      completed: false,
    },
    {
      id: 2,
      title: "Do laundry",
      description: "Wash clothes",
      completed: false,
    },
    {
      id: 3,
      title: "Read a book",
      description: 'Read "The Great Gatsby"',
      completed: true,
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [newTodo, setNewTodo] = useState(initialState);
  const [allChecked, setAllChecked] = useState(false);

  const handleChange = (name, value) => {
    setNewTodo((prevState) => ({ ...prevState, [name]: value }));
  };

  const clearNewTodo = () => {
    setNewTodo(initialState);
  };

  const addTodo = () => {
    if (!newTodo.title || !newTodo.description) {
      Alert.alert("Please enter both title and description.");
      return;
    }

    const newId = todo.length ? todo[todo.length - 1].id + 1 : 1;
    const updatedTodo = [{ ...newTodo, id: newId }, ...todo];
    setTodo(updatedTodo);
    clearNewTodo();
    setShowModal(false);
  };

  const updateTodo = (item) => {
    const updatedTodo = todo.map((todoItem) =>
      todoItem.id === item.id
        ? { ...todoItem, completed: !todoItem.completed }
        : todoItem
    );
    setTodo(updatedTodo);
  };

  const toggleAll = (checkAll) => {
    const updatedTodo = todo.map((item) => ({
      ...item,
      completed: checkAll,
    }));
    setTodo(updatedTodo);
    setAllChecked(checkAll);
  };

  const renderTodo = ({ item }) => (
    <TouchableOpacity
      style={{
        backgroundColor: "#fff",
        borderRadius: 10,
        elevation: 5,
        padding: 15,
        marginVertical: 5,
        marginHorizontal: 10,
        borderLeftColor: "#ff66b2",
        borderLeftWidth: 5,
      }}
      onPress={() =>
        Alert.alert(`${item.title}`, `${item.description}`, [
          {
            text: item.completed ? "Mark Incomplete" : "Mark Complete",
            onPress: () => updateTodo(item),
          },
          {
            text: "Ok",
            style: "cancel",
          },
        ])
      }
    >
      <BouncyCheckbox
        isChecked={item.completed}
        fillColor="#ff66b2"
        onPress={() => updateTodo(item)}
        style={{ marginRight: 10 }}
      />
      <Text
        style={{
          fontSize: 16,
          textDecorationLine: item.completed ? "line-through" : "none",
        }}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  const pendingCount = todo.filter((item) => !item.completed).length;
  const completedCount = todo.filter((item) => item.completed).length;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 20,
          backgroundColor: "#fff",
          elevation: 5,
        }}
      >
        <Text style={{ color: "#ff66b2", fontWeight: "bold", fontSize: 28 }}>
          To-Do List
        </Text>
        <Text style={{ fontSize: 16 }}>
          {pendingCount} {pendingCount === 1 ? "task" : "tasks"} pending
          {completedCount > 0 ? `, ${completedCount} completed` : ""}
        </Text>
      </View>

      <FlatList
        data={todo.filter((item) => !item.completed)}
        renderItem={renderTodo}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ flexGrow: 1, marginTop: 10 }}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No pending tasks
          </Text>
        }
      />

      <FlatList
        data={todo.filter((item) => item.completed)}
        renderItem={renderTodo}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ flexGrow: 1, marginTop: 10 }}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No completed tasks
          </Text>
        }
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => setShowModal(true)}
          style={{
            backgroundColor: "#ff66b2",
            borderRadius: 50,
            width: 60,
            height: 60,
            alignItems: "center",
            justifyContent: "center",
            elevation: 8,
          }}
        >
          <Text style={{ fontSize: 36, color: "#fff" }}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => toggleAll(!allChecked)}
          style={{
            backgroundColor: "#ff66b2",
            borderRadius: 8,
            width: "40%",
            alignItems: "center",
            padding: 10,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Icon
            name={allChecked ? "checkbox-outline" : "square-outline"}
            size={24}
            color="#fff"
            style={{ marginRight: 8 }}
          />
          <Text style={{ fontSize: 18, color: "#fff" }}>
            {allChecked ? "Uncheck All" : "Check All"}
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View
          style={{
            flex: 1,
            paddingHorizontal: 20,
            backgroundColor: "#f5f5f5",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Text style={{ color: "#ff66b2", fontSize: 28 }}>
              Add a Todo Item
            </Text>
            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={{
                backgroundColor: "#ff66b2",
                borderRadius: 50,
                width: 40,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                elevation: 8,
              }}
            >
              <Text style={{ fontSize: 24, color: "#fff" }}>X</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            placeholder="Title"
            value={newTodo.title}
            onChangeText={(text) => handleChange("title", text)}
            style={{
              backgroundColor: "#fff",
              paddingHorizontal: 10,
              borderRadius: 8,
              marginVertical: 10,
              borderColor: "#ff66b2",
              borderWidth: 1,
            }}
          />
          <TextInput
            placeholder="Description"
            value={newTodo.description}
            onChangeText={(text) => handleChange("description", text)}
            style={{
              backgroundColor: "#fff",
              paddingHorizontal: 10,
              borderRadius: 8,
              marginVertical: 10,
              borderColor: "#ff66b2",
              borderWidth: 1,
              height: 100,
              textAlignVertical: "top",
            }}
            multiline
          />

          <View style={{ width: "100%", alignItems: "center", marginTop: 20 }}>
            <TouchableOpacity
              onPress={addTodo}
              style={{
                backgroundColor: "#ff66b2",
                width: "80%",
                borderRadius: 8,
                alignItems: "center",
                padding: 10,
                elevation: 8,
              }}
            >
              <Text style={{ fontSize: 22, color: "#fff" }}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default App;
