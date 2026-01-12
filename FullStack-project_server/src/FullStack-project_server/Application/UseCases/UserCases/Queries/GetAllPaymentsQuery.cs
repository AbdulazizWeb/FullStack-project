using FullStack_project_server.Application.DTOs;
using MediatR;

namespace FullStack_project_server.Application.UseCases.UserCases.Queries;

public sealed record GetAllPaymentsQuery() : IRequest<List<PaymentDto>>;

public class GetAllPaymentsQueryHandler : IRequestHandler<GetAllPaymentsQuery, List<PaymentDto>>
{
    public async Task<List<PaymentDto>> Handle(GetAllPaymentsQuery request, CancellationToken cancellationToken)
    {
       
        var payments = new List<PaymentDto>
        {
            new(
                Guid.NewGuid(),
                120.50m,
                "USD",
                "Completed",
                DateTime.UtcNow.AddDays(-1)
            ),
            new(
                Guid.NewGuid(),
                75.00m,
                "USD",
                "Pending",
                DateTime.UtcNow.AddDays(-2)
            ),
            new(
                Guid.NewGuid(),
                300.00m,
                "EUR",
                "Failed",
                DateTime.UtcNow.AddDays(-5)
            )
        };

        return payments;
    }
}

