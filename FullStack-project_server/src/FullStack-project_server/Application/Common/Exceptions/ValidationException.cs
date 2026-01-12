namespace FullStack_project_server.Application.Common.Exceptions;

public sealed class ValidationException(string message, Dictionary<string, string[]>? errors = null) : AppException(message)
{
    public Dictionary<string, string[]> Errors { get; } = errors ?? new Dictionary<string, string[]>();

}