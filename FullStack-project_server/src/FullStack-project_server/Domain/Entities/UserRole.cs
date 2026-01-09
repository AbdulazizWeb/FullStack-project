namespace FullStack_project_server.Domain.Entities;

public class UserRole
{
    public Guid UserId { get; set; }
    public User User { get; set; } = null!;
    public Guid RoleId { get; set; }
    public Role Role { get; set; } = null!;
    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
}