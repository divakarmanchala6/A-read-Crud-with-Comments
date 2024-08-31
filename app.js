import React, { useState, useEffect } from 'react'; // Import React and necessary hooks
import { View, TextInput, Button, Text, FlatList, TouchableOpacity } from 'react-native'; // Import UI components
import { saveItem, fetchItems, deleteItem, editItem } from './storage'; // Import storage utility functions

const App = () => {
  // State variables for input fields, items list, edit mode, and item ID for editing
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [items, setItems] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editItemId, setEditItemId] = useState(null);

  // Function to handle saving an item
  const handleSaveItem = async () => {
    if (editMode) {
      await handleEditItem(); // If in edit mode, call the handleEditItem function
    } else {
      try {
        // Save the new item and update the state with the returned items list
        const updatedItems = await saveItem(title, description);
        setItems(updatedItems);
        setTitle(''); // Clear input fields
        setDescription('');
      } catch (error) {
        console.error('Error saving item:', error); // Log any errors
      }
    }
  };

  // Function to handle deleting an item
  const handleDeleteItem = async (id) => {
    try {
      // Delete the item by ID and update the state with the returned items list
      const updatedItems = await deleteItem(id);
      setItems(updatedItems);
    } catch (error) {
      console.error('Error deleting item:', error); // Log any errors
    }
  };

  // Function to handle editing an item
  const handleEditItem = async () => {
    try {
      // Edit the item by ID and update the state with the returned items list
      const updatedItems = await editItem(editItemId, title, description);
      setItems(updatedItems);
      setTitle(''); // Clear input fields
      setDescription('');
      setEditMode(false); // Exit edit mode
      setEditItemId(null); // Clear edit item ID
    } catch (error) {
      console.error('Error editing item:', error); // Log any errors
    }
  };

  // Function to initiate edit mode for an item
  const startEditingItem = (item) => {
    setEditMode(true); // Set edit mode to true
    setEditItemId(item.id); // Set the ID of the item to be edited
    setTitle(item.title); // Populate input fields with existing item data
    setDescription(item.description);
  };

  // useEffect hook to fetch items from local storage when the component mounts
  useEffect(() => {
    const loadItems = async () => {
      try {
        // Fetch stored items and update the state
        const storedItems = await fetchItems();
        setItems(storedItems);
      } catch (error) {
        console.error('Error fetching items:', error); // Log any errors
      }
    };

    loadItems(); // Call the function to load items
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <View style={{ padding: 20 }}>
      {/* Input fields for title and description */}
      <TextInput
        placeholder="Enter title"
        value={title}
        onChangeText={setTitle}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <TextInput
        placeholder="Enter description"
        value={description}
        onChangeText={setDescription}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      {/* Button to save or edit item */}
      <Button title={editMode ? "Edit Item" : "Save Item"} onPress={handleSaveItem} />

      {/* List of items displayed using FlatList */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text>ID: {item.id}</Text>
            <Text>Title: {item.title}</Text>
            <Text>Description: {item.description}</Text>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              {/* Edit button */}
              <TouchableOpacity onPress={() => startEditingItem(item)} style={{ marginRight: 10 }}>
                <Text style={{ color: 'blue' }}>Edit</Text>
              </TouchableOpacity>
              {/* Delete button */}
              <TouchableOpacity onPress={() => handleDeleteItem(item.id)}>
                <Text style={{ color: 'red' }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default App;
