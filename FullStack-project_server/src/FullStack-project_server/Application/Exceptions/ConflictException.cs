namespace FullStack_project_server.Application.Exceptions;

public sealed class ConflictException(string message) : AppException(message)
{
    
}