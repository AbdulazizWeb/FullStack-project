namespace FullStack_project_server.Application.DTOs;

public sealed record ReportDto(
    Guid Id,
    string Title,
    string Period,
    decimal Total,
    DateTime GeneratedAt
);