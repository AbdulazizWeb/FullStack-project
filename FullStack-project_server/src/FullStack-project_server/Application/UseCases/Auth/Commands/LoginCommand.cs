using FullStack_project_server.Application.Abstractions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace FullStack_project_server.Application.UseCases.Auth.Commands;

public sealed class LoginCommand : IRequest<string>
{
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
}

public class LoginCommandHandler(IApplicationDbContext db, ITokenService tokenService, IHashService hashService) 
    : IRequestHandler<LoginCommand, string>
{
    private readonly IApplicationDbContext _db = db;
    private readonly ITokenService _tokenService = tokenService;
    private readonly IHashService _hashService = hashService;
    
    public async Task<string> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        var user = await _db.Users
            .Include(x => x.UserRoles)
            .ThenInclude(r => r.Role)
            .FirstOrDefaultAsync(x => x.Email == request.Email, cancellationToken);

        if (user == null || !_hashService.Verify(request.Password, user.PasswordHash))
        {
            throw new UnauthorizedAccessException("Invalid email or password");
        }

        var roles = user.UserRoles.Select(x => x.Role.Name);
        var token = _tokenService.GenerateToken(user.Id, user.Email, roles);
        
        return token;
    }
}