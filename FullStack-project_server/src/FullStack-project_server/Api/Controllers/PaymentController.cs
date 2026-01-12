using FullStack_project_server.Application.UseCases.UserCases.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FullStack_project_server.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class PaymentController(IMediator mediator) : ControllerBase
{
    private readonly IMediator _mediator = mediator;
    
    [HttpGet("all")]
    public async Task<IActionResult> GetAllPayments()
    {
        var result = await _mediator.Send(new GetAllPaymentsQuery());
        return Ok(result);
    }
}