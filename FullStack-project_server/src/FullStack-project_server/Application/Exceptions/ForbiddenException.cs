namespace FullStack_project_server.Application.Exceptions;

public sealed class ForbiddenException(string message) : AppException(message)
{
    
}