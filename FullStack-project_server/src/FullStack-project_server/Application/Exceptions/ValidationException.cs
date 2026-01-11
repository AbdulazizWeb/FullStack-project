namespace FullStack_project_server.Application.Exceptions;

public sealed class ValidationException(string message, Dictionary<string, string[]>? errors) : AppException(message)
{
    public Dictionary<string, string[]> Errors { get; } = errors ?? new Dictionary<string, string[]>();

}