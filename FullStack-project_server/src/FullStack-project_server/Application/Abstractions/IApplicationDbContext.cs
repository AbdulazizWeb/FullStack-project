using FullStack_project_server.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace FullStack_project_server.Application.Abstractions;

public interface IApplicationDbContext
{
    DbSet<User> Users { get; }
    DbSet<Role> Roles { get; }
    DbSet<UserRole> UserRoles { get; }
    
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}