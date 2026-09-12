using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using TaskManagement.Application.Interfaces;
using TaskManagement.Domain.Entities;
using TaskManagement.Domain.Enums;
using TaskManagement.Infrastructure.Persistence;

namespace TaskManagement.Infrastructure.Repositories
{
    public class TaskRepository : ITaskRepository
    {
        private readonly ApplicationDbContext _context;

        public TaskRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<int> CreateAsync(Tasks task)
        {
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();
            return task.Id;
        }

        public async Task<IEnumerable<Tasks>> GetAllAsync(int? userId, TaskStatusEnum? status)
        {
            var query = _context.Tasks.Include(t => t.User).AsQueryable();

            if (userId.HasValue)
                query = query.Where(t => t.UserId == userId.Value);

            if (status.HasValue)
                query = query.Where(t => t.Status == status.Value);

            return await query.OrderByDescending(t => t.CreatedAt).ToListAsync();
        }

        public async Task<Tasks?> GetByIdAsync(int id)
        {
            return await _context.Tasks.FindAsync(id);
        }

        public async Task UpdateStatusAsync(int id, TaskStatusEnum newStatus)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task != null)
            {
                task.Status = newStatus;
                await _context.SaveChangesAsync();
            }
        }
    }
}
