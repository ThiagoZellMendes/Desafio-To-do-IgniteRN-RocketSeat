import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';


export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    //procura pelo titulo em TASK, caso o titulo já exista emite um alerta, caso não, adiciona uma nova TASK
    const searchtitle = tasks.find(title => title.title === newTaskTitle);
    if(searchtitle) {
      return Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      )
    }else{
    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    setTasks(oldState => [...oldState, data])
  
  }
}

  function handleToggleTaskDone(id: number) {
    const updatedTask = tasks.map(task => ({...task}));
    const searchItem = updatedTask.find(item => item.id === id);
    
    if(!searchItem){
      return;
    }else{
      searchItem.done = !searchItem.done;
      setTasks(updatedTask)
    }
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
    
    [
      {text: "Não", style: 'cancel'},
      {text: "Sim", 
        onPress:() => setTasks(oldState => oldState.filter(task => task.id != id))
      }
    ]
    )
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})