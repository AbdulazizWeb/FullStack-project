namespace FullStack_project_server.Application.Abstractions;

public interface ICurrentUserService
{
    bool IsAuthenticated { get; }
    Guid UserId { get; }
    string? Email { get; }
    IReadOnlyList<string>? Roles { get; }
    
    bool IsInRole(string role);
}