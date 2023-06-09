﻿// <auto-generated />
using System;
using DestinationBucketList.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace DestinationBucketListAPI.Migrations
{
    [DbContext(typeof(BucketListDatabaseContext))]
    [Migration("20230525130440_Initial")]
    partial class Initial
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("DestinationBucketList.Models.BucketList", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("BucketList");
                });

            modelBuilder.Entity("DestinationBucketList.Models.BucketListItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("BucketListId")
                        .HasColumnType("int");

                    b.Property<DateTime>("CheckIn")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("CheckOut")
                        .HasColumnType("datetime2");

                    b.Property<int?>("PrivateDestinationId")
                        .HasColumnType("int");

                    b.Property<int?>("PublicDestinationId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("BucketListId");

                    b.HasIndex("PrivateDestinationId");

                    b.HasIndex("PublicDestinationId");

                    b.ToTable("BucketListItems");
                });

            modelBuilder.Entity("DestinationBucketList.Models.PrivateDestination", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CheckIn")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("CheckOut")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Geolocation")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Image")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("PrivateDestinations");
                });

            modelBuilder.Entity("DestinationBucketList.Models.PublicDestination", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Geolocation")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Image")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("PublicDestinations");
                });

            modelBuilder.Entity("DestinationBucketList.Models.Users", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("AccessLevel")
                        .HasColumnType("int");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Username")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("DestinationBucketList.Models.BucketList", b =>
                {
                    b.HasOne("DestinationBucketList.Models.Users", "User")
                        .WithOne()
                        .HasForeignKey("DestinationBucketList.Models.BucketList", "UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("DestinationBucketList.Models.BucketListItem", b =>
                {
                    b.HasOne("DestinationBucketList.Models.BucketList", null)
                        .WithMany("Items")
                        .HasForeignKey("BucketListId");

                    b.HasOne("DestinationBucketList.Models.PrivateDestination", "PrivateDestination")
                        .WithMany()
                        .HasForeignKey("PrivateDestinationId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("DestinationBucketList.Models.PublicDestination", "PublicDestination")
                        .WithMany()
                        .HasForeignKey("PublicDestinationId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.Navigation("PrivateDestination");

                    b.Navigation("PublicDestination");
                });

            modelBuilder.Entity("DestinationBucketList.Models.PrivateDestination", b =>
                {
                    b.HasOne("DestinationBucketList.Models.Users", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("DestinationBucketList.Models.BucketList", b =>
                {
                    b.Navigation("Items");
                });
#pragma warning restore 612, 618
        }
    }
}
