using TaskManagement.Domain.Enums;

namespace TaskManagement.Domain.Entities
{
    public class Tasks
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public TaskStatusEnum Status { get; set; } = TaskStatusEnum.Pending;
        public int UserId { get; set; }
        public string? AdditionalInfo { get; set; }
        public DateTime CreatedAt { get; set; }

        public User? User { get; set; }
    }
}
