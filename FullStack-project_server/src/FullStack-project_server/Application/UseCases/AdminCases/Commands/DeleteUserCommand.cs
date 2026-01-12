using FullStack_project_server.Application.Abstractions;
using FullStack_project_server.Application.Common.Exceptions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FullStack_project_server.Application.UseCases.AdminCases.Commands;

public sealed record DeleteUserCommand(Guid Id) : IRequest<Unit>;

public class DeleteUserCommandHandler(IApplicationDbContext context, IHashService hashService, ICurrentUserService currentUser) : IRequestHandler<DeleteUserCommand, Unit>
{
    private readonly IApplicationDbContext _context = context;
    private readonly IHashService _hashService = hashService;
    private readonly ICurrentUserService _currentUser = currentUser;
    public async Task<Unit> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

        if (user == null)
            throw new NotFoundException("User not found");

        _context.Users.Remove(user);
        await _context.SaveChangesAsync(cancellationToken);
        
        return Unit.Value;
    }
}

