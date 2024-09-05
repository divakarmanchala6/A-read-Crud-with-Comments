// Import AsyncStorage for local storage and uuidv4 for unique ID generation
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';

const file = "this is crud operations with comments"
// Function to save a new item to local storage
export const saveItem = async (title, description) => {
  try {
    const id = uuidv4(); // Generate a unique ID for the new item
    const newItem = { id, title, description }; // Create a new item object

    // Fetch existing items from local storage
    const storedItems = await AsyncStorage.getItem('items');
    const parsedItems = storedItems ? JSON.parse(storedItems) : []; // Parse or initialize the items array

    parsedItems.push(newItem); // Add the new item to the array

    // Save the updated items array back to local storage
    await AsyncStorage.setItem('items', JSON.stringify(parsedItems));
    return parsedItems; // Return the updated items array
  } catch (error) {
    console.error('Error saving item:', error); // Log any errors
    throw error; // Re-throw the error for further handling
  }
};

// Function to fetch all items from local storage
export const fetchItems = async () => {
  try {
    // Fetch items from local storage
    const storedItems = await AsyncStorage.getItem('items');
    return storedItems ? JSON.parse(storedItems) : []; // Return parsed items or an empty array
  } catch (error) {
    console.error('Error fetching items:', error); // Log any errors
    throw error; // Re-throw the error for further handling
  }
};

// Function to delete an item from local storage by ID
export const deleteItem = async (id) => {
  try {
    // Fetch existing items from local storage
    const storedItems = await AsyncStorage.getItem('items');
    const parsedItems = storedItems ? JSON.parse(storedItems) : []; // Parse or initialize the items array

    // Filter out the item to delete by its ID
    const updatedItems = parsedItems.filter(item => item.id !== id);

    // Save the updated items array back to local storage
    await AsyncStorage.setItem('items', JSON.stringify(updatedItems));
    return updatedItems; // Return the updated items array
  } catch (error) {
    console.error('Error deleting item:', error); // Log any errors
    throw error; // Re-throw the error for further handling
  }
};

// Function to edit an existing item in local storage by ID
export const editItem = async (id, newTitle, newDescription) => {
  try {
    // Fetch existing items from local storage
    const storedItems = await AsyncStorage.getItem('items');
    const parsedItems = storedItems ? JSON.parse(storedItems) : []; // Parse or initialize the items array

    // Map through the items array to find and update the item
    const updatedItems = parsedItems.map(item =>
      item.id === id ? { ...item, title: newTitle, description: newDescription } : item
    );

    // Save the updated items array back to local storage
    await AsyncStorage.setItem('items', JSON.stringify(updatedItems));
    return updatedItems; // Return the updated items array
  } catch (error) {
    console.error('Error editing item:', error); // Log any errors
    throw error; // Re-throw the error for further handling
  }
};
