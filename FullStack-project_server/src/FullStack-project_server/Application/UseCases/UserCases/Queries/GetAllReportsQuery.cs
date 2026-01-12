using FullStack_project_server.Application.DTOs;
using MediatR;

namespace FullStack_project_server.Application.UseCases.UserCases.Queries;

public sealed record GetAllReportsQuery() : IRequest<List<ReportDto>>;

public class GetAllReportsQueryHandler : IRequestHandler<GetAllReportsQuery, List<ReportDto>>
{
    public async Task<List<ReportDto>> Handle(GetAllReportsQuery request, CancellationToken cancellationToken)
    {
        var reports = new List<ReportDto>
        {
            new(Guid.NewGuid(),
                "Sales Report", 
                "2026-01", 
                12500.75m, 
                DateTime.UtcNow.AddHours(-2)
            ),
            new(Guid.NewGuid(), 
                "Payments Summary", 
                "2025-Q4", 
                9840.00m, 
                DateTime.UtcNow.AddDays(-1)
            ),
            new(Guid.NewGuid(), 
                "Profit/Loss", 
                "2025-12", 
                3100.20m, 
                DateTime.UtcNow.AddDays(-3)
            )
        };

        return reports;
    }
}

