import AsyncStorage from "@react-native-async-storage/async-storage";
import { FilterStatus } from "@/types/FilterStatus";
import { Alert } from "react-native";
const ITEMS_KEY = '@comprar:items'

export type ItemStorage = {
    id: string,
    description: string,
    status: FilterStatus,
}

async function getItems(): Promise<ItemStorage[]> {
    try{
        const storage = await AsyncStorage.getItem(ITEMS_KEY)
        return storage ? JSON.parse(storage) : [];

    } catch (error){
        throw new Error("GET ITEMS: " + error);
    }
}

async function saveItems(items: ItemStorage[]): Promise<void>{
    try {
        await AsyncStorage.setItem(ITEMS_KEY, JSON.stringify(items));
    } catch (error){
        throw new Error("SAVE ITEMS: " + error);
    }
}

async function toggleStatus(id: string): Promise<ItemStorage[]> {
    const allItems = await getItems();
    const updatedItems = allItems.map(item => item.id === id ? { ...item, status: item.status === FilterStatus.PENDING ? FilterStatus.DONE : FilterStatus.PENDING} : item);
    await saveItems(updatedItems);
    return updatedItems;
}

async function removeItem(id: string): Promise<void> {
    const allItems = await getItems();
    const updatedItems = allItems.filter(item => item.id !== id);
    await saveItems(updatedItems);
}

async function addItems(newItem : ItemStorage): Promise<ItemStorage[]>{
    try {
        const allItems = await getItems();
        const updatedItems = [...allItems, newItem];
        await saveItems(updatedItems);
        return updatedItems;
        
    } catch (error){
        throw new Error("ADD ITEMS: " + error);
    }
}

async function getByStatus(status: FilterStatus): Promise<ItemStorage[]>{
    const allItems = await getItems();
    return allItems.filter(item => item.status === status);
}

async function clearItems(): Promise<void> {
    try{
        await AsyncStorage.removeItem(ITEMS_KEY)
    } catch(error){
        throw new Error("CLEAR ITEMS: " + error);
    }
}

export const itemsStorage = {
    getItems,
    getByStatus,
    saveItems,
    addItems,
    toggleStatus,
    removeItem,
    clearItems,
}


