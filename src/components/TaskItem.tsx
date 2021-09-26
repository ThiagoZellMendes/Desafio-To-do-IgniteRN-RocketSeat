import React, { useEffect, useRef, useState } from 'react';
import {Image, TouchableOpacity, View, Text, StyleSheet, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png'
import { Task } from './TasksList';


interface TasksItemProps {
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (taskId: number, taskNewTitle: string) => void;
}

export function TaskItem({task, toggleTaskDone,removeTask,editTask}: TasksItemProps) {
//estados que ser usados para monitorar se o title da task esta em edição(inEditing) ou se ela foi editada(editedTitleTask).
 const[inEditing, setInEditing] = useState(false);
 const[editedTitleTask, setEditedTitleTask] = useState(task.title);

//referencia usada para manipular imperativemente o TextInput, para que quando apertar no botão de editar, ele abra o teclado...
//...e quando sair da edição ele feche o teclado.
 const textInputRef = useRef<TextInput>(null);

 //função que abre o modo edição
 function handleStartEditing(){
  setInEditing(true)
 }
//função que cancela o modo edição
 function handleCancelEditing(){
  setEditedTitleTask(task.title)
}
//função e conclui e seta o novo title para a task, além de fechar o modo Edição.
 function handleSubmitEditing(){
    editTask(task.id, editedTitleTask)
    setInEditing(false)
}

useEffect(() => {
  
  if (textInputRef.current) {
    if (inEditing) {
      textInputRef.current.focus();
    } else {
      textInputRef.current.blur();
    }
  }
}, [inEditing])
 
  return (
    <>
      <View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => {
            toggleTaskDone(task.id);
          }}
        >
          <View
            style={
              task.done == true ? styles.taskMarkerDone : styles.taskMarker
            }
          >
            {task.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            ref={textInputRef}
            style={task.done ? styles.taskTextDone : styles.taskText}
            value={editedTitleTask}
            editable={inEditing}
            onChangeText={setEditedTitleTask}
            onSubmitEditing={handleSubmitEditing}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={{ paddingHorizontal: 24 }}
        onPress={() => removeTask(task.id)}
      >
        <Image source={trashIcon} />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  }
})