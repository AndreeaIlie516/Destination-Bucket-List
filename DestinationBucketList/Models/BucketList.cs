namespace DestinationBucketList.Models
{
    public class BucketList
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        public Users User { get; set; } = null!;
        public virtual ICollection<BucketListItem> Items { get; set; } = null!;
    }

    public class BucketListItem
    {
        public int Id { get; set; }
        public int? PublicDestinationId { get; set; }
        public PublicDestination PublicDestination { get; set; }
        public int? PrivateDestinationId { get; set; }
        public PrivateDestination PrivateDestination { get; set; }
        public DateTime CheckIn { get; set; }
        public DateTime CheckOut { get; set; }
    }
}
