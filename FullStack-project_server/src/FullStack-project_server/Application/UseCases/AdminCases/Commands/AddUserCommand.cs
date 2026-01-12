using FullStack_project_server.Application.Abstractions;
using FullStack_project_server.Application.Common.Guards;
using FullStack_project_server.Application.Common.Exceptions;
using MediatR;
using FullStack_project_server.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace FullStack_project_server.Application.UseCases.AdminCases.Commands;

public sealed record AddUserCommand(string FirstName, string LastName, string Email, string Password, Guid[] RoleIds) : IRequest<Unit>;

public class AddUserCommandHandler(IApplicationDbContext context, IHashService hashService, ICurrentUserService currentUser) 
    : IRequestHandler<AddUserCommand, Unit>
{
    private readonly IApplicationDbContext _context = context;
    private readonly IHashService _hashService = hashService;
    private readonly ICurrentUserService _currentUser = currentUser;
    public async Task<Unit> Handle(AddUserCommand request, CancellationToken cancellationToken)
    {
        Guard.ValidatePassword(request.Password);
        Guard.ValidateEmail(request.Email);
        
        var adminRole = _context.Roles.FirstOrDefault(x => x.Name == "ADMIN");
        if (request.RoleIds.Contains(adminRole!.Id))
            throw new ForbiddenException("You cannot add admin user");
        
        if (await _context.Users.AnyAsync(x => x.Email == request.Email, cancellationToken))
            throw new ConflictException("User with the specified email already exists.");
        
        if (request.RoleIds.Length <= 0)
            throw new ValidationException("Validation error", new Dictionary<string, string[]>
                {["roleIds"] = ["Role is required."]});
        
        var rolesCount = await _context.Roles.CountAsync(x => request.RoleIds.Contains(x.Id), cancellationToken);
        if (rolesCount != request.RoleIds.Distinct().Count())
            throw new NotFoundException("One or more roles were not found");
        
        
        var user = new User
        {   Id = Guid.NewGuid(),    
            FirstName = request.FirstName,
            LastName = request.LastName,
            Email = request.Email,
            PasswordHash = _hashService.HashPassword(request.Password)
        };
        _context.Users.Add(user);

        var userRoles = request.RoleIds.Distinct().Select(roleId => new UserRole
        {
            RoleId = roleId,
            UserId = user.Id
        });

        await _context.UserRoles.AddRangeAsync(userRoles, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}


