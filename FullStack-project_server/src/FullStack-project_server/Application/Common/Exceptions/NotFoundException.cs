namespace FullStack_project_server.Application.Common.Exceptions;

public sealed class NotFoundException(string message) : AppException(message)
{
    
}