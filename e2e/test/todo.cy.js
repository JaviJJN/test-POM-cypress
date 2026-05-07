
import TodoPage from "../../pages/TodoPage"

describe('Test Cypress sencillo, TodoMVC', () => {
  const todoPage = new TodoPage();

  // Ejecuta antes de cada prueba para no repetir código
  beforeEach(() => {
  
  cy.visit('https://todomvc.com/examples/react/dist/#/')
 })

  // Crear una tarea y verificar que se muestre en la lista de tareas

  it('Crear una tarea',  () => {

   const taskName = 'cypress';
   todoPage.addTodo(taskName);
   todoPage.validateTodoExists(taskName); 
   
    
  })

  // Crear una tarea, marcarla como completada y verificar que se muestre como tal

  it('Marcar una tarea como completada', () => {
    const taskName = 'cypress';
    todoPage.addTodo(taskName);

    // Marcamos el checkbox
    todoPage.elements.todoItemLabel(taskName).parents('li').find('input[type="checkbox"]').check()

      //Verificamos que la tarea se muestre como completada
    todoPage.elements.todoItemLabel(taskName).parents('li').should('have.class', 'completed')
  })

  // Desmarcar una tarea completada
  it('Desmarcar una tarea completada', () => {
    

    const taskName = 'cypress';
    todoPage.addTodo(taskName);
    todoPage.elements.todoItemLabel(taskName).parents('li').find('input[type="checkbox"]').check()
    todoPage.elements.todoItemLabel(taskName).parents('li').find('input[type="checkbox"]').uncheck()
    todoPage.elements.todoItemLabel(taskName).should('not.have.class', 'completed')
    
  })

  // Editar una tarea

  it('Editar una tarea', () => {
    const taskName = 'cypress';
    const newTaskName = 'cypress hill';
    
    todoPage.addTodo(taskName);

    todoPage.elements.todoItemLabel(taskName).dblclick();
    cy.focused().clear().type(`${newTaskName}{enter}`);
    todoPage.validateTodoExists(newTaskName);
  })

  // Eliminar una tarea
  it('Borrar tarea', () => {
  
  const taskName = 'cypress';
  todoPage.addTodo(taskName);
  todoPage.elements.todoItemLabel(taskName).parents('li').find('button.destroy').click({ force: true });
  todoPage.elements.todoItemLabel(taskName).should('not.exist');
  
})

  //Agrega varias tareas a la lista, algunas completadas y otras no completadas. Haz clic en el botón de filtro correspondiente a las tareas completadas.
  //Verifica que solo se muestren las tareas completadas en la lista. Haz clic en el botón de filtro correspondiente a las tareas no completadas.
  //Verifica que solo se muestren las tareas no completadas en la lista. Haz clic en el botón "All" para volver a mostrar todas las tareas en la lista.
  it('Filtrar tareas', () => {
  
  const task1 = 'tarea 1';
  const task2 = 'tarea 2';
  const task3 = 'tarea 3';
  const otherTask = 'otra tarea';

  todoPage.addTodo(task1);
  todoPage.addTodo(task2);
  todoPage.addTodo(task3);
  todoPage.addTodo(otherTask);

   
  todoPage.elements.todoItemLabel(task1).parents('li').find('input[type="checkbox"]').check({ force: true });
  todoPage.elements.todoItemLabel(otherTask).parents('li').find('input[type="checkbox"]').check({ force: true });

 // Filtro de tareas completadas filterCompleted is not a function ERROR
    cy.get('.filters').contains('Completed').click()
  todoPage.elements.todoItems().should('have.length', 2)
  todoPage.elements.todoItemLabel(task1).should('be.visible')
  todoPage.elements.todoItemLabel(otherTask).should('be.visible')
  
  //En la lista no deben aparecer las tareas no completadas
  todoPage.elements.todoItems().should('have.length', 2)
  todoPage.elements.todoItems().should('not.contain', task2)
  todoPage.elements.todoItems().should('not.contain', task3)


  // Filtro de tareas no completadas
  cy.get('.filters').contains('Active').click()
  todoPage.elements.todoItems().should('have.length', 2)
  todoPage.elements.todoItemLabel(task2).should('be.visible')
  todoPage.elements.todoItemLabel(task3).should('be.visible')

  todoPage.elements.todoItems().should('not.contain', task1)
  todoPage.elements.todoItems().should('not.contain', otherTask)

  // Filtro de todas las tareas
  cy.get('.filters').contains('All').click()
  todoPage.elements.todoItems().should('have.length', 4)
  todoPage.elements.todoItemLabel(task1).should('be.visible')
  todoPage.elements.todoItemLabel(task2).should('be.visible')
  todoPage.elements.todoItemLabel(task3).should('be.visible')
  todoPage.elements.todoItemLabel(otherTask).should('be.visible')

  })

  it('Test POM', function() {});
})