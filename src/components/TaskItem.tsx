import React, { useEffect, useRef, useState } from 'react';
import {Image, TouchableOpacity, View, Text, StyleSheet, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { Task } from './TasksList';
import trashIcon from '../assets/icons/trash/trash.png';
import editIcon from '../assets/icons/edit/edit.png';

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
    <View style={styles.container}>
      <View style={styles.infoContainer}>
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

      <View style={styles.iconsContainer}>
        {inEditing ? (
          <TouchableOpacity onPress={handleCancelEditing}>
            <Icon name="x" size={24} color="#b2b2b2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleStartEditing}>
            <Image source={editIcon} />
          </TouchableOpacity>
        )}

        <View style={styles.iconsDivider}/>

        <TouchableOpacity
          onPress={() => removeTask(task.id)}
          disabled={inEditing}
        >
          <Image source={trashIcon} style={{ opacity: inEditing ? 0.2 : 1}}/>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  infoContainer:{
    flex: 1,
  },

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
  },
  iconsContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 24
  },
  iconsDivider:{
    width: 1,
    height: 24,
    backgroundColor: 'rgba(196, 196, 196, 0.24)',
    marginHorizontal: 12
  }
})