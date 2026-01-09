using FullStack_project_server.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace FullStack_project_server.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<ApplicationDbContext>(options =>
        {
            options.UseNpgsql(configuration.GetConnectionString("Default"));
        });
        return services;
    }
}