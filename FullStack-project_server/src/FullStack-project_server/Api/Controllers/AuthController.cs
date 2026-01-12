using FullStack_project_server.Application.UseCases.AuthCases.Commands;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace FullStack_project_server.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController(IMediator mediator) : ControllerBase
{
    private readonly IMediator _mediator = mediator;

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginCommand command)
    {
        var token = await _mediator.Send(command);
        return Ok(token);
    }
}