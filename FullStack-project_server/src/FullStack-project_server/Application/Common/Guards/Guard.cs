using FullStack_project_server.Application.Common.Exceptions;

namespace FullStack_project_server.Application.Common.Guards;

public abstract class Guard
{
    public static void ValidatePassword(string password)
    {
        if (password.Length < 8)
            throw new ValidationException("Password must be at least 8 characters long.");
        if (!password.Any(char.IsUpper))
            throw new ValidationException("Password must have a upper case letter.");
        if (!password.Any(char.IsLower))
            throw new ValidationException("Password must have a lower case letter.");
        if (!password.Any(char.IsDigit))
            throw new ValidationException("Password must have a digit");
    }

    public static void ValidateEmail(string email)
    {
        if (string.IsNullOrWhiteSpace(email))
            throw new ValidationException("Validation failed", new Dictionary<string, string[]>
            {
                ["email"] = ["Email is required."]
            });
        if (!email.Contains('@') || !email.Contains('.'))
            throw new ValidationException("Validation failed", new Dictionary<string, string[]>
            {
                ["email"] = ["Email format is invalid"]
            });
    }
}