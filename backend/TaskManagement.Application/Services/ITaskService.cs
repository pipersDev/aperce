using TaskManagement.Application.DTOs;
using TaskManagement.Application.Interfaces;
using TaskManagement.Domain.Entities;
using TaskManagement.Domain.Enums;

namespace TaskManagement.Application.Services
{
    public interface ITaskService
    {
        Task<IEnumerable<TaskDTOs>> GetTasksAsync(int? userId, TaskStatusEnum? status);
        Task<TaskDTOs> CreateTaskAsync(CreateTaskDto dto);
        Task ChangeTaskStatusAsync(int id, TaskStatusEnum newStatus);
    }

    public class TaskService: ITaskService
    {
        private readonly ITaskRepository _taskRepository;
        private readonly IUserRepository _userRepository;

        public TaskService(ITaskRepository taskRepository, IUserRepository userRepository)
        {
            _taskRepository = taskRepository;
            _userRepository = userRepository;
        }

        public async Task<IEnumerable<TaskDTOs>> GetTasksAsync(int? userId, TaskStatusEnum? status)
        {
            var tasks = await _taskRepository.GetAllAsync(userId, status);
            return tasks.Select(t => new TaskDTOs(
                t.Id,
                t.Title,
                t.Description,
                t.Status.ToString(),
                t.UserId,
                t.User?.Name,
                t.AdditionalInfo,
                t.CreatedAt
            ));
        }

        public async Task<TaskDTOs> CreateTaskAsync(CreateTaskDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Title))
                throw new ArgumentException("El título de la tarea es obligatorio.");

            var user = await _userRepository.GetByIdAsync(dto.UserId);
            if (user == null)
                throw new KeyNotFoundException($"El usuario asignado con ID {dto.UserId} no existe.");

            var task = new Tasks
            {
                Title = dto.Title,
                Description = dto.Description,
                UserId = dto.UserId,
                Status = TaskStatusEnum.Pending,
                AdditionalInfo = dto.AdditionalInfo,
                CreatedAt = DateTime.UtcNow
            };

            var newId = await _taskRepository.CreateAsync(task);
            return new TaskDTOs(newId, task.Title, task.Description, task.Status.ToString(), task.UserId, user.Name, task.AdditionalInfo, task.CreatedAt);
        }

        public async Task ChangeTaskStatusAsync(int id, TaskStatusEnum newStatus)
        {
            var currentTask = await _taskRepository.GetByIdAsync(id);
            if (currentTask == null)
                throw new KeyNotFoundException($"La tarea con ID {id} no existe.");

            // Regla de Negocio: No se permite cambiar una tarea directamente de Pending a Done
            if (currentTask.Status == TaskStatusEnum.Pending && newStatus == TaskStatusEnum.Done)
            {
                throw new InvalidOperationException("No se permite cambiar el estado directamente de 'Pending' a 'Done'. Debe pasar por 'InProgress'.");
            }

            await _taskRepository.UpdateStatusAsync(id, newStatus);
        }
    }
}
