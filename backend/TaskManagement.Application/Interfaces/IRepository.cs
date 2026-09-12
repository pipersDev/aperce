using TaskManagement.Domain.Entities;
using TaskManagement.Domain.Enums;

namespace TaskManagement.Application.Interfaces
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetAllAsync();
        Task<User?> GetByIdAsync(int id);
        Task<int> CreateAsync(User user);
        Task<bool> ExistsEmailAsync(string email);
    }

    public interface ITaskRepository
    {
        Task<IEnumerable<Tasks>> GetAllAsync(int? userId, TaskStatusEnum? status);
        Task<Tasks?> GetByIdAsync(int id);
        Task<int> CreateAsync(Tasks task);
        Task UpdateStatusAsync(int id, TaskStatusEnum newStatus);
    }
}
