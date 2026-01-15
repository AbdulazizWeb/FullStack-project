using FullStack_project_server.Application.Abstractions;
using FullStack_project_server.Application.DTOs;
using FullStack_project_server.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FullStack_project_server.Application.UseCases.AdminCases.Queries;

public sealed record GetAllUsersQuery() : IRequest<List<UserDto>>;

public class GetAllUsersQueryHandler(IApplicationDbContext context, IHashService hashService, ICurrentUserService currentUser) : IRequestHandler<GetAllUsersQuery, List<UserDto>>
{
    private readonly IApplicationDbContext _context = context;
    private readonly IHashService _hashService = hashService;
    private readonly ICurrentUserService _currentUser = currentUser;

    public async Task<List<UserDto>> Handle(GetAllUsersQuery request, CancellationToken cancellationToken)
    {
        var adminRole = await _context.Roles.FirstOrDefaultAsync(x => x.Name == "ADMIN", cancellationToken);

        var users = _context.Users
            .Include(x => x.UserRoles)
            .AsNoTracking()
            .Where(u => !_context.UserRoles.Any(ur => ur.UserId == u.Id && ur.RoleId == adminRole!.Id))
            .Select(x => new UserDto(x.Id, x.FirstName, x.LastName, x.Email,
                x.UserRoles.Select(ur => new Role
                {
                    Id =ur.RoleId, 
                    Name = ur.Role.Name
                }).ToList()
                ))
            .ToList();
        
        return users;
    }
}

