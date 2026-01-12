using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using FullStack_project_server.Application.Abstractions;

namespace FullStack_project_server.Infrastructure.Services;

public class CurrentUserService(IHttpContextAccessor http) : ICurrentUserService
{
    private readonly IHttpContextAccessor _http = http;
    private ClaimsPrincipal? Principal =>  _http.HttpContext?.User;

    public bool IsAuthenticated => Principal?.Identity?.IsAuthenticated == true;

    public Guid UserId
    {
        get
        {
            var idString = Principal?.FindFirstValue(ClaimTypes.NameIdentifier) ?? 
                           Principal?.FindFirstValue(ClaimTypes.Name) ?? 
                           Principal?.FindFirstValue(JwtRegisteredClaimNames.Sub);
            
            return Guid.TryParse(idString, out var id) ? id : Guid.Empty;

        }
    }

    public string? Email => Principal?.FindFirstValue(ClaimTypes.Email) ??
                            Principal?.FindFirstValue(JwtRegisteredClaimNames.Email);
    
    public IReadOnlyList<string> Roles => 
        Principal?.FindAll(ClaimTypes.Role).Select(x => x.Value).Distinct().ToList()
        ?? [];


    public bool IsInRole(string role) => Principal?.IsInRole(role) == true;
}