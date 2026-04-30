import { Text, View, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useState, useEffect } from 'react';

import { FilterStatus } from '@/types/FilterStatus';
import { itemsStorage, ItemStorage } from '@/storage/itemsStorage';

import { styles } from './styles';
import { Filter } from '@/components/Filter/index';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button/index';
import { Item } from '@/components/Item';



const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]

export function Home() {
  const [items, setItems] = useState<ItemStorage[]>([]);
  const [filter, setFilter] = useState(FilterStatus.PENDING)
  const [description, setDescription] = useState("")

  async function handleAddItem() {
    if (!description.trim()) {
      return Alert.alert("Adicionar", "Informe uma descrição para adicionar um item!");
    }

    const newItem = {
      id: Math.random().toString(36).substring(2),
      description,
      status: FilterStatus.PENDING,
    };

    await itemsStorage.addItems(newItem)
    await itemsByStatus()
    setDescription("")
    setFilter(FilterStatus.PENDING)

    Alert.alert("Adicionar", `Adicionado ${description} com sucesso!`,)

  }

  async function itemsByStatus() {
    try {
      const storageResponse = await itemsStorage.getByStatus(filter)
      setItems(storageResponse)
    }
    catch (error) {
      console.log(error)
      Alert.alert("Erro", "Erro ao listar itens")
    }
  }

  async function handleRemove(id: string) {
  try {
    Alert.alert(
      "Remover",
      "Deseja remover o Item?",
      [
        { text: "Não", style: "cancel" },
        {
          text: "Sim",
          onPress: async () => {
            await itemsStorage.removeItem(id);
            await itemsByStatus();
            Alert.alert("Remover", "Item removido com sucesso!");
          },
        },
      ]
    );
  } catch (error) {
    console.log(error);
    Alert.alert("Erro", "Erro ao remover item");
  }
}

  async function handleStatus(id: string){
    try {
      await itemsStorage.toggleStatus(id)
      await itemsByStatus()
      Alert.alert("Status", "Status alterado com sucesso!")
    } catch (error) {
      console.log(error)
      Alert.alert("Erro", "Erro ao alterar status")
    }
  }

  async function handleClear(){
    Alert.alert("Limpar", "Deseja limpar todos os itens da lista?",[
      {text: "Não", style: "cancel"},
      {text: "Sim", onPress: async () => {
        try{
          const allItems = await itemsStorage.getItems();
          if(allItems.length == 0){
            Alert.alert("Limpar", "Nenhum item na lista para remover!")
            return;
          }
          await itemsStorage.clearItems()
          await itemsByStatus()
        } catch(error){
          console.log(error)
          Alert.alert("Erro", "Erro ao limpar itens")
        }
      }},
      
    ])
  }

  useEffect(() => {
    itemsByStatus()
  }, [filter])

  return (
    <>
      <View style={styles.container}>
        <Image source={require("@/assets/logo.png")} style={styles.logo} />

        <View style={styles.form}>
          <Input placeholder="O que você precisa comprar?" onChangeText={setDescription} value={description} />
          <Button title="Adicionar" onPress={handleAddItem} />
        </View>

        <View style={styles.content}>

          <View style={styles.header}>
            {FILTER_STATUS.map((status) => (
              <Filter key={status} status={status} isActive={status === filter}
                onPress={() => setFilter(status)}
              />
            ))
            }

            <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
              <Text style={styles.clearText}>Limpar</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Item
                data={item}
                onStatus={() => handleStatus(item.id)}
                onRemove={() => handleRemove(item.id)} />
            )}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={() => <Text style={styles.listEmpty}>Nenhum item na lista.</Text>}
          />
        </View>
      </View>
    </>
  );
}




