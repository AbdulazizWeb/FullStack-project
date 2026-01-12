using FullStack_project_server.Domain.Entities;

namespace FullStack_project_server.Application.DTOs;

public record UserDto(
    Guid Id,
    string FirstName,
    string LastName,
    string Email,
    List<Guid> RoleIds
);