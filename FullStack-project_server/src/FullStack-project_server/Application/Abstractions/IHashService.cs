namespace FullStack_project_server.Application.Abstractions;

public interface IHashService
{
    string HashPassword(string password);
    bool Verify(string password, string hashedPassword);
}