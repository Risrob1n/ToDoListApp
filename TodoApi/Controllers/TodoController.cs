using Microsoft.AspNetCore.Mvc;
using TodoApi.Models;

namespace TodoApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : ControllerBase
    {
        private static readonly List<TodoItem> _todos = new();
        private static int _nextId = 1;

        // GET: api/todo
        [HttpGet]
        public ActionResult<List<TodoItem>> GetTodos()
        {
            return _todos;
        }

        // POST: api/todo
        [HttpPost]
        public ActionResult<TodoItem> AddTodo(TodoItem newTodo)
        {
            if (string.IsNullOrEmpty(newTodo.Title))
            {
                return BadRequest("Title cannot be empty.");
            }

            newTodo.Id = _nextId++;
            newTodo.IsCompleted = false;
            _todos.Add(newTodo);

            return CreatedAtAction(nameof(GetTodos), new { id = newTodo.Id }, newTodo);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateTodo(int id, TodoItem updatedTodo)
        {
            if (id != updatedTodo.Id)
            {
                return BadRequest("ID mismatch between route and body.");
            }

            var todo = _todos.FirstOrDefault(t => t.Id == id);
            if (todo == null)
            {
                return NotFound();
            }

            todo.Title = updatedTodo.Title;
            todo.IsCompleted = updatedTodo.IsCompleted;

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTodo(int id)
        {
            var todo = _todos.FirstOrDefault(t => t.Id == id);
            if (todo == null)
            {
                return NotFound();
            }

            _todos.Remove(todo);
            return NoContent(); 
        }
    }
}