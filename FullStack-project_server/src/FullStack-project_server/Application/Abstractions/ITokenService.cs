namespace FullStack_project_server.Application.Abstractions;

public interface ITokenService
{
    string GenerateToken(Guid userId, string email, IEnumerable<string?> roles);
}