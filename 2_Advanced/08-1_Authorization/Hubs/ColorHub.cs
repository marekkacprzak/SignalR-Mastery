
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

[Authorize()]
public class ColorHub : Hub
{
    [Authorize]
    // [Authorize(Roles="ADMIN")]
    public Task ChangeBackground(string color)
    {

        return Clients.All.SendAsync("changeBackground", color);
    }
}