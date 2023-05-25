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
    [Route("api/BucketList")]
    [ApiController]
    public class BucketListController : ControllerBase
    {
        private readonly BucketListDatabaseContext _dbContext;

        public BucketListController(BucketListDatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("{page}/{pageSize}")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<BucketList>>> GetAllPages(int page = 0, int pageSize = 10)
        {
            return await _dbContext.BucketList
                .Skip(page * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<BucketList>>> GetAll()
        {
            return await _dbContext.BucketList
                .ToListAsync();
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<BucketList>> GetById(int id)
        {
            if (_dbContext.BucketList == null)
            {
                return NotFound();
            }
            var dest = await _dbContext.BucketList
                .Include(x => x.Items)     
                .Include(x => x.User)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (dest == null)
            {
                return NotFound();
            }

            return dest;
        }

        [HttpGet("BucketListItems")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<BucketListItem>>> GetAllLists()
        {
            return await _dbContext.BucketListItems
                .ToListAsync();
        }

        [HttpGet("{id}/BucketListItems")]
        [AllowAnonymous]
        public async Task<ActionResult<BucketListItem>> GetByIdList(int id)
        {
            if (_dbContext.BucketListItems == null)
            {
                return NotFound();
            }
            var dest = await _dbContext.BucketListItems
                .Include(x => x.PublicDestination)
                .Include(x => x.PrivateDestination)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (dest == null)
            {
                return NotFound();
            }

            return dest;
        }

        [HttpGet("/user/{userId}")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<BucketList>>> GetByUserId(int userId)
        {
            if (_dbContext.BucketList == null)
            {
                return NotFound();
            }

            return await _dbContext.BucketList
                .Include(x => x.Items)
                    .ThenInclude(item => item.PublicDestination)
                .Include(x => x.Items)
                    .ThenInclude(item => item.PrivateDestination)
                .Where(x => x.UserId == userId)
                .ToListAsync();
        }

        [HttpGet("{page}/{pageSize}/{userId}")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<BucketList>>> GetByUserIdPage(int userId, int page = 0, int pageSize = 10)
        {
            if (_dbContext.BucketList == null)
            {
                return NotFound();
            }

            return await _dbContext.BucketList
                .Include(x => x.Items)
                .Where(x => x.UserId == userId)
                .Skip(page * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }

        [HttpPost("{bucketListId}/{bucketListItemId}/item")]
        [AllowAnonymous]
        public async Task<IActionResult> AddItemToBucketList(int bucketListId, int bucketListItemId)
        {
            var bucketList = await _dbContext.BucketList.FindAsync(bucketListId);
            if (bucketList == null)
            {
                return NotFound();
            }

            var bucketListItem = await _dbContext.BucketListItems.FindAsync(bucketListItemId);
            if (bucketListItem == null) 
            {
                return NotFound();
            }

            if (bucketList.Items == null)
            {
                bucketList.Items = new List<BucketListItem>();
            }

            bucketList.Items.Add(bucketListItem);
            await _dbContext.SaveChangesAsync();
            return NoContent();
        }

        [HttpPost("{publicDestinationId}/{checkIn}/{checkOut}/PublicDestinationBucketlistItem")]
        [AllowAnonymous]
        public async Task<IActionResult> AddPublicDestinationBucketlistItem(int publicDestinationId, DateTime checkIn, DateTime checkOut)
        {
            var blitem = new BucketListItem
            {
                PublicDestinationId = publicDestinationId,
                CheckIn = checkIn,
                CheckOut = checkOut
            };

            _dbContext.BucketListItems.Add(blitem);
            await _dbContext.SaveChangesAsync();
            return NoContent();
        }

        [HttpPost("{privateDestinationId}/PrivateDestinationBucketlistItem")]
        [AllowAnonymous]
        public async Task<IActionResult> AddPrivateDestinationBucketlistItem(int privateDestinationId)
        {
            var privateDestination = await _dbContext.PrivateDestinations.FindAsync(privateDestinationId);

            if (privateDestination == null) 
            {
                return NotFound();
            }

            var blitem = new BucketListItem
            {
                PrivateDestinationId = privateDestinationId,
                CheckIn = privateDestination.CheckIn,
                CheckOut= privateDestination.CheckOut
            };

            _dbContext.BucketListItems.Add(blitem);
            await _dbContext.SaveChangesAsync();
            return NoContent();
        }

    }
}
