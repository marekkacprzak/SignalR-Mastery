using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

public class ViewHub : Hub
{
    private static int ViewCount {get;set;} = 0;

    public async Task NotifyWatching(){
        ViewCount++;

        await this.Clients.All.SendAsync("viewCountUpdate", ViewCount);
    }
}