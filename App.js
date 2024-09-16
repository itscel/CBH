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

const App = () => {
  const initialState = {
    id: "",
    title: "",
    description: "",
    completed: false,
  };


  const [todo, setTodo] = useState([
    {
      id: `id-${Date.now()}`,
      title: "Buy groceries",
      description: "Milk, Bread, Eggs",
      completed: false,
    },
    {
      id: `id-${Date.now() + 1}`, 
      title: "Do laundry",
      description: "Wash clothes",
      completed: false,
    },
    {
      id: `id-${Date.now() + 2}`, 
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

    const newId = `id-${Date.now()}`;

    setTodo([{ ...newTodo, id: newId }, ...todo]);
    clearNewTodo();
    setShowModal(false);
  };

  const updateTodo = (item) => {
    setTodo(
      todo.map((todoItem) =>
        todoItem.id === item.id
          ? { ...todoItem, completed: !todoItem.completed }
          : todoItem
      )
    );
  };

  const toggleAll = (checkAll) => {
    setTodo(todo.map((item) => ({ ...item, completed: checkAll })));
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
        flexDirection: "row",
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
      <View style={{ padding: 20, backgroundColor: "#fff", elevation: 5 }}>
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
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ flexGrow: 1, marginTop: 10 }}
        removeClippedSubviews={true} 
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No pending tasks
          </Text>
        }
      />

      <FlatList
        data={todo.filter((item) => item.completed)}
        renderItem={renderTodo}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ flexGrow: 1, marginTop: 10 }}
        removeClippedSubviews={true}
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
          padding: 20,
        }}
      >

        <TouchableOpacity
          onPress={() => toggleAll(!allChecked)}
          style={{
            backgroundColor: "#ff66b2",
            borderRadius: 8,
            width: "45%",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 10,
            paddingHorizontal: 15,
            elevation: 4,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            {allChecked ? "Uncheck All" : "Check All"}
          </Text>
        </TouchableOpacity>

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
        
      </View>
      
      <Modal
        animationType="slide"
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View
          style={{
            flex: 1,
            padding: 20,
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
              padding: 10,
              borderRadius: 8,
              marginVertical: 10,
              borderColor: "#ff66b2",
              borderWidth: 1,
            }}
            accessibilityLabel="Title input"
          />
          <TextInput
            placeholder="Description"
            value={newTodo.description}
            onChangeText={(text) => handleChange("description", text)}
            style={{
              backgroundColor: "#fff",
              padding: 10,
              borderRadius: 8,
              marginVertical: 10,
              borderColor: "#ff66b2",
              borderWidth: 1,
              minHeight: 120,
              maxHeight: 120,
              textAlignVertical: "top",
            }}
            multiline
            numberOfLines={5}
            accessibilityLabel="Description input"
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
