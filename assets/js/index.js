const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');
const completedTaskCount = document.getElementById('completedTaskCount');

let tasks = [
  { id: 1, description: 'Hacer la compra', completed: false },
  { id: 2, description: 'Estudiar para el examen', completed: true },
  { id: 3, description: 'Ir al gimnasio', completed: false }
];

function renderTasks() {
  taskList.innerHTML = '';
  let completedTasks = 0;

  tasks.forEach(task => {
    const taskElement = document.createElement('div');
    taskElement.className = 'task form-check';
    taskElement.innerHTML = `
      <input class="form-check-input" type="checkbox" ${task.completed ? 'checked' : ''} id="task-${task.id}">
      <label class="form-check-label ${task.completed ? 'completed' : ''}" for="task-${task.id}">
        ${task.description}
      </label>
      <span class="delete-icon ms-auto" onclick="deleteTask(${task.id})">&times;</span>
    `;
    taskList.appendChild(taskElement);

    if (task.completed) {
      completedTasks++;
    }
  });

  taskCount.textContent = `Total de Tareas: ${tasks.length}`;
  completedTaskCount.textContent = `Tareas Completadas: ${completedTasks}`;
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

addTaskBtn.addEventListener('click', () => {
  const newTaskDescription = taskInput.value.trim();
  if (newTaskDescription !== '') {
    const newTask = { id: tasks.length + 1, description: newTaskDescription, completed: false };
    tasks.push(newTask);
    taskInput.value = '';
    renderTasks();
  }
});

taskList.addEventListener('change', event => {
  const checkbox = event.target;
  const taskId = parseInt(checkbox.id.split('-')[1]);
  const task = tasks.find(task => task.id === taskId);
  task.completed = checkbox.checked;
  renderTasks();
});

renderTasks();
