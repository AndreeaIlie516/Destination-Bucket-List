namespace DestinationBucketList.Models
{
    public abstract class Destinations
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Geolocation { get; set; }
        public string? Image { get; set; }
        public string? Description { get; set; }
    }

    public class PublicDestination : Destinations
    {
    }

    public class PrivateDestination : Destinations
    {
        public DateTime CheckIn { get; set; }
        public DateTime CheckOut { get; set; }
        public int UserId { get; set; }
        public Users User { get; set; } = null!;
    }
}
