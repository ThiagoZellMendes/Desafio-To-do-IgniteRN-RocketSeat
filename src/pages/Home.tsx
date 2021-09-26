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
    //alerta o usuario e pede para ele confimar a remoção da TASK escolhida.
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

  function handleEditTask(taskId: number, taskNewTitle: string) {
    //Desestrutura o Task sem ferir o principio da imutabilidade.
    const updatedTaskTitle = tasks.map(task =>({...task}));
    //busca no array se a Task que quero editar, se encontra no array
    const searchItem = updatedTaskTitle.find(item => item.id === taskId);
    
    if(!searchItem){
      return;
    }else{
      searchItem.title = taskNewTitle
      setTasks(updatedTaskTitle)
    }
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
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