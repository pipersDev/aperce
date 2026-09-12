using System;
using System.ComponentModel.DataAnnotations;
using TaskManagement.Domain.Enums;

namespace TaskManagement.Application.DTOs
{
    public record UserDto(int Id, string Name, string Email);
    public record CreateUserDto([Required] string Name,[Required, EmailAddress] string Email);
    public record TaskDTOs(
        int Id,
        string Title,
        string? Description,
        string Status,
        int UserId,
        string? UserName,
        string? AdditionalInfo,
        DateTime CreatedAt
    );

    public record CreateTaskDto(
        [Required(ErrorMessage = "El título es obligatorio.")] string Title,
        string? Description,
        [Required(ErrorMessage = "La tarea debe tener un usuario asignado.")] int UserId,
        string? AdditionalInfo
    );

    public record UpdateTaskStatusDto(
        [Required] TaskStatusEnum NewStatus
    );
}
