using FullStack_project_server.Application.UseCases.UserCases.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FullStack_project_server.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class ReportController(IMediator mediator) : ControllerBase
{
    private readonly IMediator _mediator = mediator;
    
    [HttpGet("all")]
    public async Task<IActionResult> GetAllReports()
    {
        var result = await _mediator.Send(new GetAllReportsQuery());
        return Ok(result);
    }
}