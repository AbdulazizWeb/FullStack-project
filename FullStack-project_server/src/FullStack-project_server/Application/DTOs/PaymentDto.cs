namespace FullStack_project_server.Application.DTOs;

public sealed record PaymentDto(
    Guid Id,
    decimal Amount,
    string Currency,
    string Status,
    DateTime CreatedAt
);