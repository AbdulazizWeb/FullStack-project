using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using FullStack_project_server.Application.Abstractions;
using Microsoft.IdentityModel.Tokens;

namespace FullStack_project_server.Infrastructure.Services;

public class JwtService(IConfiguration configuration) : ITokenService
{
    public string GenerateToken(Guid userId, string email, IEnumerable<string?> roles)
    {
        var jwtSection = configuration.GetSection("Jwt");
        
        var issuer = jwtSection["Issuer"] ?? throw new InvalidOperationException("Jwt:Issuer missing");
        var audience = jwtSection["Audience"] ?? throw new InvalidOperationException("Jwt:Audience missing");
        var key =  jwtSection["Secret"] ?? throw new InvalidOperationException("Jwt:Secret missing");

        var expiresMinutesRaw = jwtSection["ExpirationMinutes"] ?? "60";
        if (!int.TryParse(expiresMinutesRaw, out var expiresMinutes))
            expiresMinutes = 60;

        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, userId.ToString()),
            new(JwtRegisteredClaimNames.Email, email),
            new(ClaimTypes.NameIdentifier, userId.ToString()),
            new(ClaimTypes.Email, email)
        };

        foreach (var role in roles.Distinct())
            if (role != null)
                claims.Add(new Claim(ClaimTypes.Role, role));

        var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
        var credentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: issuer,
            audience: audience,
            claims: claims,
            expires: DateTime.Now.AddMinutes(expiresMinutes),
            signingCredentials: credentials
            );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}