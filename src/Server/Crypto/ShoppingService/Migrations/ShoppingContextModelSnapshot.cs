﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using ShoppingService.Data;

namespace ShoppingService.Migrations
{
    [DbContext(typeof(ShoppingContext))]
    partial class ShoppingContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.4-servicing-10062")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("ShoppingService.Data.Entities.Order", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("BuyerEmail")
                        .IsRequired();

                    b.Property<Guid>("BuyerId");

                    b.Property<DateTime>("CreatedDate");

                    b.Property<string>("Currency")
                        .IsRequired();

                    b.Property<int>("OrderStatus");

                    b.Property<Guid>("ProductId");

                    b.Property<string>("ProductName")
                        .IsRequired();

                    b.Property<decimal>("TotalPayment");

                    b.Property<int>("TotalProducts");

                    b.Property<string>("TxHash")
                        .IsRequired();

                    b.Property<DateTime>("UpdatedDate");

                    b.HasKey("Id");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("ShoppingService.Data.Entities.Product", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Currency");

                    b.Property<string>("Description");

                    b.Property<string>("Name");

                    b.Property<string>("PictureUri");

                    b.Property<decimal>("Price");

                    b.Property<int>("Stock");

                    b.HasKey("Id");

                    b.ToTable("Products");
                });
#pragma warning restore 612, 618
        }
    }
}
