using DestinationBucketListAPI;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Moq.EntityFrameworkCore;
using Microsoft.CodeAnalysis;
using System.Collections.Generic;
using DestinationBucketList.Models;
using DestinationBucketList.Repository;
using DestinationBucketListAPI.Controllers;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace DestinationBucketList_xUnitTests
{
    public class UnitTest1
    {
        [Fact]
        public void TestUserRegister()
        {

            var user = new Users
            {
                Email = "testingemail@test.test",
                FirstName = "testingfirst",
                LastName = "testinglast",
                Username = "tester",
                Password = "testingpassword",
                AccessLevel = 0
            };

            Assert.Equal("testingemail@test.test", user.Email);
            Assert.Equal("testingfirst", user.FirstName);
            Assert.Equal("testinglast", user.LastName);
            Assert.Equal("tester", user.Username);
            Assert.Equal("testingpassword", user.Password);
            Assert.Equal(0, (decimal)user.AccessLevel);

            user.AccessLevel = (AccessLevel)1;

            Assert.Equal(1, (decimal)user.AccessLevel);
        }

        [Fact]
        public async void TestPublicDestinationAdd()
        {

            var publicdestinatation = new List<PublicDestination>
            {
                new PublicDestination
                {
                    Name = "test",
                    Geolocation = "testlocation",
                    Image = "testlink",
                    Description = "testdecs"
                },

                 new PublicDestination
                {
                    Name = "test1",
                    Geolocation = "testlocation1",
                    Image = "testlink1",
                    Description = "testdecs1"
                },

                  new PublicDestination
                {
                    Name = "test2",
                    Geolocation = "testlocation2",
                    Image = "testlink2",
                    Description = "testdecs2"
                }
            };

            var mockContext = new Mock<BucketListDatabaseContext>();
            mockContext.Setup(PB => PB.PublicDestinations).ReturnsDbSet(publicdestinatation);
            var controller = new PublicDestinationController(mockContext.Object);

            var result = await controller.GetAllPages(0, 10);
            var viewResults = Assert.IsType<ActionResult<IEnumerable<PublicDestination>>>(result);

            var model = Assert.IsAssignableFrom<IEnumerable<PublicDestination>>(viewResults.Value);
            Assert.Equal(3, model.Count());
        }

        private Mock<DbSet<T>> MockDbSet<T>(List<T> data) where T : class
        {
            var queryableData = data.AsQueryable();
            var mockDbSet = new Mock<DbSet<T>>();

            mockDbSet.As<IQueryable<T>>().Setup(m => m.Provider).Returns(queryableData.Provider);
            mockDbSet.As<IQueryable<T>>().Setup(m => m.Expression).Returns(queryableData.Expression);
            mockDbSet.As<IQueryable<T>>().Setup(m => m.ElementType).Returns(queryableData.ElementType);
            mockDbSet.As<IQueryable<T>>().Setup(m => m.GetEnumerator()).Returns(queryableData.GetEnumerator());

            mockDbSet.Setup(d => d.Add(It.IsAny<T>())).Callback<T>(data.Add);
            mockDbSet.Setup(d => d.Remove(It.IsAny<T>())).Returns<T>(entity =>
            {
                data.Remove(entity);
                return null;
            });

            return mockDbSet;
        }

        [Fact]
        public async Task TestPublicDestinationDelete_BadId()
        {
            var publicDestinations = new List<PublicDestination>
            {
                new PublicDestination
                {
                    Id = 1,
                    Name = "test1",
                    Geolocation = "testlocation1",
                    Image = "testlink1",
                    Description = "testdecs1"
                },
                new PublicDestination
                {
                    Id = 2,
                    Name = "test2",
                    Geolocation = "testlocation2",
                    Image = "testlink2",
                    Description = "testdecs2"
                },
                new PublicDestination
                {
                    Id = 3,
                    Name = "test3",
                    Geolocation = "testlocation3",
                    Image = "testlink3",
                    Description = "testdecs3"
                }
            };

            var mockContext = new Mock<BucketListDatabaseContext>();
            var mockDbSet = MockDbSet(publicDestinations);
            mockContext.Setup(db => db.PublicDestinations).Returns(mockDbSet.Object);

            var controller = new PublicDestinationController(mockContext.Object);

            var destinationIdToDelete = 4; // Non-existent destination ID

            var result = await controller.DeletePublicDestination(destinationIdToDelete);
            var actionResult = Assert.IsType<NotFoundResult>(result);
            Assert.Equal(404, actionResult.StatusCode);

            var deletedDestination = publicDestinations.SingleOrDefault(d => d.Id == destinationIdToDelete);
            Assert.Null(deletedDestination);
        }
    }
}