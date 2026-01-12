using FullStack_project_server.Application.Abstractions;
using FullStack_project_server.Application.Common.Guards;
using FullStack_project_server.Application.Common.Exceptions;
using FullStack_project_server.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FullStack_project_server.Application.UseCases.AdminCases.Commands;

public sealed record EditUserCommand(
    Guid Id, 
    string FirstName, 
    string LastName, 
    string Email, 
    string Password, 
    Guid[] RoleIds) 
    : IRequest<Unit>;

public class EditUserCommandHandler(IApplicationDbContext context, IHashService hashService, ICurrentUserService currentUser) 
    : IRequestHandler<EditUserCommand, Unit>
{
    private readonly IApplicationDbContext _context = context;
    private readonly IHashService _hashService = hashService;
    private readonly ICurrentUserService _currentUser = currentUser;
    public async Task<Unit> Handle(EditUserCommand request, CancellationToken cancellationToken)
    {
        var newRoleIds = request.RoleIds.Distinct().ToHashSet();
        var adminRole = await _context.Roles.FirstOrDefaultAsync(x => x.Name == "ADMIN", cancellationToken);
        if (newRoleIds.Contains(adminRole!.Id))
            throw new ForbiddenException("Assigning ADMIN role is not allowed");
        
        Guard.ValidateEmail(request.Email);
        Guard.ValidatePassword(request.Password);
        
        var user = await _context.Users
            .Include(x => x.UserRoles)
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

        if (user == null)
            throw new NotFoundException("User not found");
        
        if (user.Email != request.Email)
        {
            if (await _context.Users.AnyAsync(x => x.Email == request.Email, cancellationToken))
                throw new ConflictException("User with the specified email already exists.");
        }
        
        
        var oldRoleIds = user.UserRoles.Select(x => x.RoleId).ToHashSet();
        
        var toRemove = user.UserRoles.Where(x => !newRoleIds.Contains(x.RoleId)).ToList();
        _context.UserRoles.RemoveRange(toRemove);
        
        var toAdd = newRoleIds.Where(id => !oldRoleIds.Contains(id)).Select(id => new UserRole{UserId = user.Id, RoleId = id}).ToList();
        _context.UserRoles.AddRange(toAdd);
        
        
        user.FirstName = request.FirstName;
        user.LastName = request.LastName;
        user.Email = request.Email.Trim();
        user.PasswordHash = _hashService.HashPassword(request.Password);
        await _context.SaveChangesAsync(cancellationToken);
        
        return Unit.Value;
    }
}

