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
    [Route("api/PublicDestinations")]
    [ApiController]
    public class PublicDestinationController : ControllerBase
    {
        private readonly BucketListDatabaseContext _dbContext;

        public PublicDestinationController(BucketListDatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("{page}/{pageSize}")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<PublicDestination>>> GetAllPages(int page = 0, int pageSize = 10)
        {
            return await _dbContext.PublicDestinations
                .Skip(page * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<PublicDestination>>> GetAll()
        {
            return await _dbContext.PublicDestinations
                .ToListAsync();
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<PublicDestination>> GetById(int id)
        {
            if (_dbContext.PublicDestinations == null)
            {
                return NotFound();
            }
            var dest = await _dbContext.PublicDestinations.FindAsync(id);

            if (dest == null)
            {
                return NotFound();
            }

            return dest;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult<PublicDestination>> Create(PublicDestination destination)
        {
            /*
            var extracted = UsersController.ExtractJWTToken(User);
            if (extracted == null)
                return Unauthorized("!ERROR! Invalid token!");

            if (extracted.Item2 == AccessLevel.Regular)
                return Unauthorized("!ERROR! You do not have permission to do this!");
            */

            if (destination.Name.Length < 1 || destination.Geolocation.Length < 1 || destination.Image.Length < 1 || destination.Description.Length < 1)
                return BadRequest("!ERROR! Invalid input");

            var dest = new PublicDestination    
            {
                Name = destination.Name,
                Geolocation = destination.Geolocation,
                Image = destination.Image,
                Description = destination.Description
            };

            _dbContext.PublicDestinations.Add(dest);
            await _dbContext.SaveChangesAsync();
            
            return NoContent();
        }

        [HttpDelete("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> DeletePublicDestination(int id)
        {
            /*
            var extracted = UsersController.ExtractJWTToken(User);
            if (extracted == null)
                return Unauthorized("!ERROR! Invalid token!");

            if (extracted.Item2 == AccessLevel.Regular)
                return Unauthorized("!ERROR! You do not have permission to do this!");
            */

            var dest = await _dbContext.PublicDestinations.FindAsync(id);
            if (dest == null)
                return NotFound();

            _dbContext.PublicDestinations.Remove(dest);
            await _dbContext.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> Update(int id, PublicDestination dest)
        {
            /*
            var extracted = UsersController.ExtractJWTToken(User);
            if (extracted == null)
                return Unauthorized("!ERROR! Invalid token!");

            if (extracted.Item2 == AccessLevel.Regular)
                return Unauthorized("!ERROR! You do not have permission to do this!");
            */

            var destToUpate = await _dbContext.PublicDestinations.FindAsync(id);
            if (destToUpate == null)
            {
                return NotFound();
            }

            destToUpate.Name = dest.Name;
            destToUpate.Geolocation = dest.Geolocation;
            destToUpate.Image = dest.Image;
            destToUpate.Description = dest.Description;

            await _dbContext.SaveChangesAsync();
            return NoContent();
        }
    }
}