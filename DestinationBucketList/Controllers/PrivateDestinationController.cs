using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using NuGet.Common;
using DestinationBucketList.Models;
using DestinationBucketList.Repository;
using Microsoft.Data.SqlClient;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using DestinationBucketListAPI.Models;
using static System.Net.Mime.MediaTypeNames;

namespace DestinationBucketListAPI.Controllers
{
    [Route("api/PrivateDestinations")]
    [ApiController]
    public class PrivateDestinationController : ControllerBase
    {
        private readonly BucketListDatabaseContext _dbContext;

        public PrivateDestinationController(BucketListDatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("{page}/{pageSize}")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<PrivateDestination>>> GetAllPages(int page = 0, int pageSize = 10)
        {
            return await _dbContext.PrivateDestinations
                .Skip(page * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<PrivateDestination>>> GetAll()
        {
            return await _dbContext.PrivateDestinations
                .ToListAsync();
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<PrivateDestination>> GetById(int id)
        {
            if (_dbContext.PrivateDestinations == null)
            {
                return NotFound();
            }
            var dest = await _dbContext.PrivateDestinations.FindAsync(id);

            if (dest == null)
            {
                return NotFound();
            }

            return dest;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult<PrivateDestination>> Create(PrivateDestination destination)
        {
            /*
            var extracted = UsersController.ExtractJWTToken(User);
            if (extracted == null)
                return Unauthorized("!ERROR! Invalid token!");
            */

            if (destination.Name.Length < 1 || destination.Geolocation.Length < 1 || destination.Image.Length < 1 || destination.Description.Length < 1)
                return BadRequest("!ERROR! Invalid input");

            var dest = new PrivateDestination
            {
                Name = destination.Name,
                Geolocation = destination.Geolocation,
                Image = destination.Image,
                Description = destination.Description,
                CheckIn = destination.CheckIn,
                CheckOut = destination.CheckOut,
                //UserId = (int?)extracted.Item1,
                UserId = 1
            };

            _dbContext.PrivateDestinations.Add(dest);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> DeletePrivateDestination(int id)
        {
            /*
            var extracted = UsersController.ExtractJWTToken(User);
            if (extracted == null)
                return Unauthorized("!ERROR! Invalid token!");
            */

            var dest = await _dbContext.PrivateDestinations.FindAsync(id);
            if (dest == null)
                return NotFound();

            _dbContext.PrivateDestinations.Remove(dest);
            await _dbContext.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> Update(int id, PrivateDestination dest)
        {
            /*
            var extracted = UsersController.ExtractJWTToken(User);
            if (extracted == null)
                return Unauthorized("!ERROR! Invalid token!");      
            */

            var destToUpate = await _dbContext.PrivateDestinations.FindAsync(id);
            if (destToUpate == null)
            {
                return NotFound();
            }

            destToUpate.Name = dest.Name;
            destToUpate.Geolocation = dest.Geolocation;
            destToUpate.Image = dest.Image;
            destToUpate.Description = dest.Description;
            destToUpate.CheckIn = dest.CheckIn;
            destToUpate.CheckOut = dest.CheckOut;

            await _dbContext.SaveChangesAsync();
            return NoContent();
        }

    }
}
