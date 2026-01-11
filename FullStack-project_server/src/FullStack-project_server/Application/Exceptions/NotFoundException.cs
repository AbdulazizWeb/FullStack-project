namespace FullStack_project_server.Application.Exceptions;

public sealed class NotFoundException(string message) : AppException(message)
{
    
}