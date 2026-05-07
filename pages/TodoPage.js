class TodoPage {
  // Selectores
  elements = {
    inputNewTodo: () => cy.get('input.new-todo'),
    todoItemLabel: (itemText) => cy.contains('label', itemText),
    todoItems: () => cy.get('.todo-list li'),
    deleteButton: (taskName) =>
      cy.contains('li', taskName).find('button.destroy')
  };

  // Métodos
  addTodo(taskName) {
    this.elements.inputNewTodo().type(`${taskName}{enter}`);
  }

  deleteTodo(taskName) {
    this.elements.todoItemLabel(taskName).dblclick();
    this.elements.deleteButton(taskName).click();
  }

  validateTodoExists(taskName) {
    this.elements.todoItemLabel(taskName).should('be.visible');
  }
}

export default TodoPage;