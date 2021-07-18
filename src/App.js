import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';

function App() {
  const [tasks, setTasks] = useState([]);    
  const {isLoading, error, sendRequest: fetchTasks} = useHttp();

  useEffect(() => {
    const transformTask = task => {
      const loadedTasks = [];
  
      for (const taskKey in task) {
        loadedTasks.push({ id: taskKey, text: task[taskKey].text });
      }
  
      setTasks(loadedTasks);
    }

    fetchTasks({url:'https://react-http-89898-default-rtdb.firebaseio.com/tasklist.json'},
    transformTask);
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
