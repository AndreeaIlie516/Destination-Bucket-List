using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using DestinationBucketList.Models;

namespace DestinationBucketList.Repository;

    public partial class BucketListDatabaseContext : DbContext
    {
        public BucketListDatabaseContext() { }

        public BucketListDatabaseContext(DbContextOptions<BucketListDatabaseContext> options): base(options) 
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<BucketList>()
                 .HasOne(b => b.User)
                 .WithOne()
                 .HasForeignKey<BucketList>(b => b.UserId); 

            modelBuilder.Entity<BucketListItem>()
                 .HasOne(i => i.PublicDestination)
                 .WithMany()
                 .HasForeignKey(i => i.PublicDestinationId)
                 .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<BucketListItem>()
                .HasOne(i => i.PrivateDestination)
                .WithMany()
                .HasForeignKey(i => i.PrivateDestinationId)
                .OnDelete(DeleteBehavior.Restrict);
        }

        public virtual DbSet<Users> Users { get; set; }
        public virtual DbSet<PublicDestination> PublicDestinations { get; set; }
        public virtual DbSet<PrivateDestination> PrivateDestinations { get; set; }
        public virtual DbSet<BucketList> BucketList { get; set; }
        public virtual DbSet<BucketListItem> BucketListItems { get; set; }
    }