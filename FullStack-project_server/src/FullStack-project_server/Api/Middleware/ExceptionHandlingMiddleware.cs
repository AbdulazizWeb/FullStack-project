using System.Text.Json;
using FullStack_project_server.Application.Common.Exceptions;
using ValidationException = System.ComponentModel.DataAnnotations.ValidationException;

namespace FullStack_project_server.Api.Middleware;

public class ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
{
    private readonly RequestDelegate _next = next;
    private readonly ILogger<ExceptionHandlingMiddleware> _logger = logger;

    public async Task Invoke(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (ValidationException ex)
        {
            context.Response.StatusCode = StatusCodes.Status400BadRequest;
            await WriteJson(context, new { message = ex.Message });
        }
        catch (UnauthorizedAccessException ex)
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            await WriteJson(context, new { message = ex.Message });
        }
        catch (ConflictException ex)
        {
            context.Response.StatusCode = StatusCodes.Status409Conflict;
            await WriteJson(context, new { message = ex.Message });
        }
        catch (ForbiddenException ex)
        {
            context.Response.StatusCode = StatusCodes.Status403Forbidden;
            await WriteJson(context, new { message = ex.Message });
        }
        catch (NotFoundException ex)
        {
            context.Response.StatusCode = StatusCodes.Status404NotFound;
            await WriteJson(context, new { message = ex.Message });
        }
        catch (AppException ex)
        {
            _logger.LogError(ex, "Unhandled exception");
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;
            await WriteJson(context, new { message = "Internal server error" });
        }
    }

    private static async Task WriteJson(HttpContext context, object obj)
    {
        context.Response.ContentType = "application/json";
        var json = JsonSerializer.Serialize(obj);
        await context.Response.WriteAsync(json);
    }
    
}