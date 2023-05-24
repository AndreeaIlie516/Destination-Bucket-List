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

namespace DestinationBucketListAPI.Controllers
{
    [Route("api/Users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly BucketListDatabaseContext _dbContext;
        private readonly JwtSetter _jwtSetter;

        public UsersController(BucketListDatabaseContext dbContext, IOptions<JwtSetter> JwtSetter)
        {
            _dbContext = dbContext;
            _jwtSetter = JwtSetter.Value;
        }
        public static string HashPassword(string password)
        {
            byte[] hashBytes = SHA256.HashData(Encoding.UTF8.GetBytes(password));
            return BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
        }

        private string GenerateJwtToken(Users user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtSetter.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Role, user.AccessLevel.ToString())
                }),
                Expires = DateTime.UtcNow.AddHours(2),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<ActionResult<Users>> Register(Users useradded)
        {

            var user = new Users
            {
                Email = useradded.Email,
                FirstName = useradded.FirstName,
                LastName = useradded.LastName,
                Username = useradded.Username,
                Password = HashPassword(useradded.Password!),
                AccessLevel = useradded.AccessLevel
            };

            _dbContext.Users.Add(user);
            await _dbContext.SaveChangesAsync();
            return NoContent();
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<Users>>> GetUsers()
        {
            if (_dbContext.Users == null)
                return NotFound();

            return await _dbContext.Users.ToListAsync();
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<ActionResult<dynamic>> Login(UserDTO User)
        {
            if (User.Email == null || User.Password == null)
                return BadRequest();

            var hashedPassword = HashPassword(User.Password);
            var user = await _dbContext.Users
                .SingleOrDefaultAsync(u => u.Email == User.Email && u.Password != null && u.Password == hashedPassword);

            if (user == null)
                return Unauthorized("!ERROR! Invalid email or password!");

            var token = GenerateJwtToken(user);
            user.Password = null;

            return new
            {
                user,
                token
            };
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<Users>> GetUser(int id)
        {
            if (_dbContext.Users == null)
                return NotFound();

            var user = await _dbContext.Users
                .FirstOrDefaultAsync(x => x.Id == id);

            if (user == null)
                return NotFound();

            return user;
        }

        [HttpDelete("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _dbContext.Users.FindAsync(id);
            if (user == null)
                return NotFound();

            _dbContext.Users.Remove(user);
            await _dbContext.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> Update(int id, Users user)
        {

            var userToUpate = await _dbContext.Users.FindAsync(id);
            if (userToUpate == null)
            {
                return NotFound();
            }

            userToUpate.Email = user.Email;
            userToUpate.FirstName = user.FirstName;
            userToUpate.LastName = user.LastName;
            userToUpate.Username = user.Username;
            userToUpate.Password = HashPassword(user.Password!);
            userToUpate.AccessLevel = user.AccessLevel;

            await _dbContext.SaveChangesAsync();

            return NoContent();
        }
    }
}
