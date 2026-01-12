using FullStack_project_server.Application.UseCases.AdminCases.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FullStack_project_server.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class RoleController(IMediator mediator) : ControllerBase
{
    private readonly IMediator _mediator = mediator;
    
    [Authorize(Roles = "ADMIN")]
    [HttpGet("all")]
    public async Task<IActionResult> GetAllRoles()
    {
        var result = await _mediator.Send(new GetAllRolesQuery());
        return Ok(result);
    }
}