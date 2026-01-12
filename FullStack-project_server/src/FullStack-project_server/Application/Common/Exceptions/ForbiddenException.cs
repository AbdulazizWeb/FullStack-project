namespace FullStack_project_server.Application.Common.Exceptions;

public sealed class ForbiddenException(string message) : AppException(message)
{
    
}