using Microsoft.AspNetCore.Mvc;
using TaskManagement.Application.DTOs;
using TaskManagement.Application.Interfaces;
using TaskManagement.Domain.Entities;

namespace TaskManagement.Api.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UsersController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var users = await _userRepository.GetAllAsync();
            var dtos = users.Select(u => new UserDto(u.Id, u.Name, u.Email));
            return Ok(dtos);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateUserDto dto)
        {
            if (await _userRepository.ExistsEmailAsync(dto.Email))
                return BadRequest(new { message = "El correo ya está registrado." });

            var user = new User { Name = dto.Name, Email = dto.Email, CreatedAt = DateTime.UtcNow };
            var id = await _userRepository.CreateAsync(user);

            return CreatedAtAction(nameof(GetAll), new { id }, new UserDto(id, user.Name, user.Email));
        }
    }
}
