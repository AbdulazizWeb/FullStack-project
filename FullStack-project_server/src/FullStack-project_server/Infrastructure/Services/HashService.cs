using FullStack_project_server.Application.Abstractions;

namespace FullStack_project_server.Infrastructure.Services;

public class HashService : IHashService
{
    public string HashPassword(string password)
    {
        if (string.IsNullOrWhiteSpace(password)) 
            throw new ArgumentException("Password cannot be empty");
        
        return BCrypt.Net.BCrypt.HashPassword(password);
    }

    public bool Verify(string password, string hashedPassword)
    {
        if (string.IsNullOrWhiteSpace(password) || string.IsNullOrWhiteSpace(hashedPassword)) 
           return false;
        
        return BCrypt.Net.BCrypt.Verify(password, hashedPassword);
    }
}