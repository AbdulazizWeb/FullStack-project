namespace FullStack_project_server.Application.Common.Exceptions;

public sealed class ConflictException(string message) : AppException(message)
{
    
}