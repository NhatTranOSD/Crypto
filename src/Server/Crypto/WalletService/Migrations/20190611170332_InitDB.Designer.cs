﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WalletService.Data;

namespace WalletService.Migrations
{
    [DbContext(typeof(WalletContext))]
    [Migration("20190611170332_InitDB")]
    partial class InitDB
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.4-servicing-10062")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("WalletService.Models.Wallet", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Address");

                    b.Property<DateTime>("CreatedDate");

                    b.Property<string>("UserId");

                    b.HasKey("Id");

                    b.ToTable("Wallets");
                });

            modelBuilder.Entity("WalletService.Models.WalletCurrency", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CurrencyType");

                    b.Property<string>("WalletId");

                    b.HasKey("Id");

                    b.HasIndex("WalletId");

                    b.ToTable("WalletCurrencys");
                });

            modelBuilder.Entity("WalletService.Models.WalletCurrency", b =>
                {
                    b.HasOne("WalletService.Models.Wallet", "Wallet")
                        .WithMany("WalletCurrencys")
                        .HasForeignKey("WalletId");
                });
#pragma warning restore 612, 618
        }
    }
}
