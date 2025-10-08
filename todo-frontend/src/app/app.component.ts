import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService, TodoItem } from './services/todo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  todos: TodoItem[] = [];
  newTodoTitle = '';

  editingTodo: TodoItem | null = null;
  originalTitle = '';

  constructor(
    private todoService: TodoService,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todoService.getTodos().subscribe(data => {
      this.todos = data;
      this.cdr.detectChanges(); 
    });
  }

  addTodo(): void {
    if (this.newTodoTitle.trim() === '') {
      return;
    }
    this.todoService.addTodo({ title: this.newTodoTitle }).subscribe((newTodoFromServer) => {
      this.todos = [...this.todos, newTodoFromServer];
      this.newTodoTitle = '';
    });
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.todos = this.todos.filter(todo => todo.id !== id);
    });
  }

  toggleCompletion(todo: TodoItem): void {
    const updatedTodo = { ...todo, isCompleted: !todo.isCompleted };
    this.todos = this.todos.map(t => (t.id === updatedTodo.id ? updatedTodo : t));
    this.todoService.updateTodo(updatedTodo).subscribe({
      error: () => {
        this.todos = this.todos.map(t => (t.id === todo.id ? todo : t));
      }
    });
  }

  startEdit(todo: TodoItem): void {
    this.editingTodo = { ...todo };
    this.originalTitle = todo.title;
  }

  cancelEdit(): void {
    this.editingTodo = null;
  }

  saveEdit(): void {
    if (this.editingTodo && this.editingTodo.title.trim()) {
      const updatedTodo = this.editingTodo;
      this.todoService.updateTodo(updatedTodo).subscribe(() => {
        this.todos = this.todos.map(t => (t.id === updatedTodo.id ? updatedTodo : t));
        this.editingTodo = null;
      });
    }
  }
}