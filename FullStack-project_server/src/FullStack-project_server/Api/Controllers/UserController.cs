using FullStack_project_server.Application.UseCases.AdminCases.Queries;
using FullStack_project_server.Application.UseCases.AdminCases.Commands;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FullStack_project_server.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize(Roles = "ADMIN")]
public class UserController(IMediator mediator) : ControllerBase
{
    private readonly IMediator _mediator = mediator;
    
    [HttpPost]
    public async Task<IActionResult> AddUser(AddUserCommand command)
    {
        await _mediator.Send(command);
        return Ok();
    }
    
    [HttpPut]
    public async Task<IActionResult> EditUsers(EditUserCommand command)
    {
        await _mediator.Send(command);
        return Ok();
    } 
    
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteUsers(Guid id)
    {
        await _mediator.Send(new DeleteUserCommand(id));
        return Ok();
    } 
    
    [HttpGet("all")]
    public async Task<IActionResult> GetAllUsers()
    {
        var result = await _mediator.Send(new GetAllUsersQuery());
        return Ok(result);
    }
}