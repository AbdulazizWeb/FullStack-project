using FullStack_project_server.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace FullStack_project_server.Infrastructure.Persistence.Seed;

public static class DbSeeder
{
    public static async Task SeedAsync(ApplicationDbContext context)
    {
        var adminRole = await EnsureRole(context, "ADMIN");
        var userRole = await EnsureRole(context, "PAYMENT");
        var reportRole = await EnsureRole(context, "REPORTS");

        var adminEmail = "admin@gmail.com";

        var adminUser = await context.Users
            .FirstOrDefaultAsync(x => x.Email == adminEmail);

        if (adminUser == null)
        {
            adminUser = new User
            {
                Id = Guid.NewGuid(),
                Email = adminEmail,
                FirstName = "Admin",
                LastName = "User",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin_777"),
            };
            
            context.Users.Add(adminUser);
            await context.SaveChangesAsync();
        }
        
        var hasAdminRole = await context.UserRoles.AnyAsync(x => 
            x.UserId == adminUser.Id && 
            x.RoleId == adminRole.Id );

        if (!hasAdminRole)
        {
            context.UserRoles.Add(new UserRole
            {
                UserId = adminUser.Id,
                RoleId = adminRole.Id,
            });
            
            await context.SaveChangesAsync();
        }
    }


    private static async Task<Role> EnsureRole(ApplicationDbContext context, string roleName)
    {
        var role = await context.Roles
            .FirstOrDefaultAsync(x => x.Name == roleName);
        if (role != null) 
            return role;

        role = new Role
        {
            Id = Guid.NewGuid(),
            Name = roleName,
        };

        context.Roles.Add(role);
        await context.SaveChangesAsync();
        return role;

    }
}