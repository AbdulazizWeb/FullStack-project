using FullStack_project_server.Application.Abstractions;
using FullStack_project_server.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FullStack_project_server.Application.UseCases.AdminCases.Queries;

public sealed record GetAllRolesQuery() : IRequest<List<Role>>;

public class GetAllRolesQueryHandler(IApplicationDbContext context, IHashService hashService, ICurrentUserService currentUser) : IRequestHandler<GetAllRolesQuery, List<Role>>
{
    private readonly IApplicationDbContext _context = context;
    private readonly IHashService _hashService = hashService;
    private readonly ICurrentUserService _currentUser = currentUser;
    public async Task<List<Role>> Handle(GetAllRolesQuery request, CancellationToken cancellationToken)
    {
        var roles = await _context.Roles.Where(x => x.Name != "ADMIN").AsNoTracking().ToListAsync(cancellationToken);
        return roles;
    }
}

